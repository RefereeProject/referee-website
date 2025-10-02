#!/bin/bash

# Read hook input JSON from stdin
input_json=$(cat)

# Project type validation
if [ ! -f "tsconfig.json" ] && [ ! -f "package.json" ]; then
    echo '{"suppressOutput": true}'
    exit 0
fi

if [ -f "Cargo.toml" ]; then
    echo '{"suppressOutput": true}'
    exit 0
fi

# Extract modified file path
file_path=$(echo "$input_json" | jq -r '.tool_input.file_path // empty')

if [ -z "$file_path" ] || ! echo "$file_path" | rg -q '\.(ts|tsx|js|jsx)$'; then
    echo '{"suppressOutput": true}'
    exit 0
fi

echo "🔍 Running TypeScript validation with intelligent error classification..."

# Run validation checks
tsc_output=""
eslint_output=""
tsc_exit_code=0
eslint_exit_code=0

if command -v tsc >/dev/null 2>&1; then
    tsc_output=$(tsc --noEmit --pretty false 2>&1)
    tsc_exit_code=$?
fi

# Enhanced ESLint detection using ripgrep for config files
if command -v npx >/dev/null 2>&1; then
    # Use rg to find ESLint config files more efficiently
    if rg -q --files-with-matches --type json --type js '\.(eslintrc|eslint\.config)' . 2>/dev/null || \
       [ -f ".eslintrc.json" ] || [ -f ".eslintrc.js" ] || [ -f "eslint.config.js" ]; then
        eslint_output=$(npx eslint "$file_path" --format=compact 2>&1)
        eslint_exit_code=$?
    fi
fi

# Check if any issues were found
if [ $tsc_exit_code -eq 0 ] && [ $eslint_exit_code -eq 0 ]; then
    echo "✅ TypeScript validation passed - no issues detected"
    echo '{"suppressOutput": false}'
    exit 0
fi

echo "❌ Issues detected. Running error classification..."

# Prepare input for error classifier
classifier_input=$(cat << EOF
{
  "tsc_output": $(echo "$tsc_output" | jq -Rs .),
  "eslint_output": $(echo "$eslint_output" | jq -Rs .),
  "file_path": "$file_path"
}
EOF
)

# Run error classifier
if [ -f "$CLAUDE_PROJECT_DIR/.claude/hooks/error-classifier.py" ]; then
    classification=$(echo "$classifier_input" | python3 "$CLAUDE_PROJECT_DIR/.claude/hooks/error-classifier.py")
    recommended_agent=$(echo "$classification" | jq -r '.recommended_agent // "typescript-type-architect"')
    type_issues=$(echo "$classification" | jq -r '.type_issues // 0')
    nextjs_issues=$(echo "$classification" | jq -r '.nextjs_issues // 0')
    confidence=$(echo "$classification" | jq -r '.confidence // "medium"')
    
    echo "📊 Classification results:"
    echo "   Type issues: $type_issues"
    echo "   Next.js issues: $nextjs_issues" 
    echo "   Recommended agent: $recommended_agent (confidence: $confidence)"
else
    # Fallback using ripgrep for pattern matching
    if echo "$tsc_output" | rg -q '(?i)(Type|Property|Argument|Parameter)'; then
        recommended_agent="typescript-type-architect"
    else
        recommended_agent="js-nextjs-optimizer"
    fi
    echo "⚠️  Error classifier not found, using ripgrep-based fallback"
    echo "   Recommended agent: $recommended_agent"
fi

# Prepare comprehensive error context
error_context=""
if [ -n "$tsc_output" ]; then
    error_context="TypeScript Compilation Errors:\n$tsc_output\n\n"
fi
if [ -n "$eslint_output" ]; then
    error_context="${error_context}ESLint Issues:\n$eslint_output\n\n"
fi

# Generate specialist-specific instructions based on classification
if [ "$recommended_agent" = "typescript-type-architect" ]; then
    specialist_instructions="Please use the 'typescript-type-architect' specialist to analyze and fix these issues. Priority focus areas:
- Type annotations and interface definitions
- Generic type parameters and constraints  
- Import/export type declarations
- Property access and method signatures
- Type compatibility and assignability
- Strict TypeScript compiler options compliance"
    
    echo "📐 Delegating to typescript-type-architect specialist..."
else
    specialist_instructions="Please use the 'js-nextjs-optimizer' specialist to analyze and fix these issues. Priority focus areas:
- Next.js routing patterns and API routes
- React component optimization and hooks usage
- Performance improvements and bundle optimization
- Framework-specific ESLint rules compliance
- Server-side rendering and static generation patterns
- Modern JavaScript/TypeScript best practices"
    
    echo "⚡ Delegating to js-nextjs-optimizer specialist..."
fi

# Output hook response with classified recommendations
cat << EOF
{
  "systemMessage": "Code issues detected and classified. Calling $recommended_agent specialist for targeted resolution.",
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "AUTOMATED ERROR CLASSIFICATION RESULTS:\n\nFile: $file_path\nRecommended Specialist: $recommended_agent\nConfidence: ${confidence:-medium}\n\nDETECTED ISSUES:\n$error_context\n$specialist_instructions\n\nAfter applying fixes, please verify:\n1. TypeScript compilation succeeds: tsc --noEmit\n2. ESLint passes without errors: npx eslint $file_path\n3. Code maintains functionality and follows project patterns"
  }
}
EOF