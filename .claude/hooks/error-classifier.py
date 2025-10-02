#!/usr/bin/env python3
import json
import sys
import subprocess
import re
from typing import Dict, List, Tuple

class RipgrepErrorClassifier:
    def __init__(self):
        # TypeScript type system patterns with weights
        self.type_patterns = [
            (r"Type '.*?' is not assignable to type", 3),
            (r"Property '.*?' does not exist on type", 2),
            (r"Argument of type '.*?' is not assignable", 2),
            (r"Cannot find name '.*?'", 2),
            (r"Expected \d+ arguments, but got \d+", 2),
            (r"Generic type .* requires \d+ type argument", 3),
            (r"Index signature", 2),
            (r"Type assertion", 1),
            (r"Union type", 1),
            (r"Interface", 2),
            (r"keyof", 1),
            (r"typeof", 1),
            (r"Partial<", 1),
            (r"Record<", 1),
        ]
        
        # Next.js/React framework patterns with weights
        self.nextjs_patterns = [
            (r"next/.*", 3),
            (r"@next/.*", 3),
            (r"react/.*", 2),
            (r"jsx-.*", 2),
            (r"getServerSideProps", 3),
            (r"getStaticProps", 3),
            (r"useEffect", 2),
            (r"useState", 2),
            (r"router\.push", 2),
            (r"Image.*next/image", 2),
            (r"Link.*next/link", 2),
            (r"api/.*", 2),
            (r"_app\.", 2),
            (r"_document\.", 2),
            (r"middleware\.", 2),
        ]
        
        # Performance/optimization patterns
        self.optimization_patterns = [
            (r"bundle.*size", 2),
            (r"lazy.*loading", 2),
            (r"dynamic.*import", 2),
            (r"useMemo", 1),
            (r"useCallback", 1),
            (r"React\.memo", 1),
            (r"webpack", 1),
            (r"tree.?shaking", 2),
        ]

    def use_ripgrep_for_patterns(self, text: str, patterns: List[tuple]) -> int:
        """Use ripgrep for high-performance pattern matching"""
        if not text.strip():
            return 0
            
        score = 0
        temp_file = None
        
        try:
            # Create temporary file for ripgrep processing
            import tempfile
            import os
            
            with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.tmp') as f:
                f.write(text)
                temp_file = f.name
            
            for pattern, weight in patterns:
                try:
                    # Use ripgrep with case-insensitive matching and count
                    cmd = ['rg', '-i', '-c', '--no-heading', '--no-filename', pattern, temp_file]
                    result = subprocess.run(cmd, capture_output=True, text=True, timeout=5)
                    
                    if result.returncode == 0 and result.stdout.strip():
                        matches = int(result.stdout.strip())
                        score += matches * weight
                        
                except (subprocess.TimeoutExpired, subprocess.CalledProcessError, ValueError):
                    # Fallback to regex if ripgrep fails
                    matches = len(re.findall(pattern, text, re.IGNORECASE))
                    score += matches * weight
                    
        except Exception:
            # Complete fallback to regex-based matching
            score = self.calculate_regex_score(text, patterns)
            
        finally:
            # Clean up temporary file
            if temp_file and os.path.exists(temp_file):
                try:
                    os.unlink(temp_file)
                except OSError:
                    pass
                    
        return score

    def calculate_regex_score(self, text: str, patterns: List[tuple]) -> int:
        """Fallback regex-based pattern matching"""
        score = 0
        for pattern, weight in patterns:
            matches = len(re.findall(pattern, text, re.IGNORECASE))
            score += matches * weight
        return score

    def analyze_file_context(self, file_path: str) -> Dict[str, int]:
        """Analyze file path and nearby context using ripgrep"""
        context_scores = {"type": 0, "nextjs": 0, "optimization": 0}
        
        if not file_path:
            return context_scores
            
        try:
            # File path analysis
            if "/api/" in file_path or file_path.endswith(".api.ts"):
                context_scores["nextjs"] += 3
            elif "/pages/" in file_path or "/app/" in file_path:
                context_scores["nextjs"] += 2
            elif file_path.endswith(".d.ts") or "/types/" in file_path:
                context_scores["type"] += 3
            elif "components/" in file_path:
                context_scores["nextjs"] += 1
                
            # Use ripgrep to analyze nearby files for context
            import os
            file_dir = os.path.dirname(file_path) if file_path else "."
            
            # Check for Next.js specific files in directory
            nextjs_indicators = ['next.config.js', 'next.config.ts', 'package.json']
            for indicator in nextjs_indicators:
                indicator_path = os.path.join(file_dir, indicator)
                if os.path.exists(indicator_path):
                    # Use ripgrep to check for Next.js content
                    try:
                        cmd = ['rg', '-q', '-i', 'next', indicator_path]
                        result = subprocess.run(cmd, capture_output=True, timeout=2)
                        if result.returncode == 0:
                            context_scores["nextjs"] += 1
                    except (subprocess.TimeoutExpired, subprocess.CalledProcessError):
                        pass
                        
        except Exception:
            pass
            
        return context_scores

    def classify_errors(self, tsc_output: str, eslint_output: str, file_path: str = "") -> Dict:
        """Classify errors and recommend the best specialist agent using ripgrep"""
        
        combined_output = f"{tsc_output}\n{eslint_output}"
        
        # Use ripgrep for high-performance pattern matching
        type_score = self.use_ripgrep_for_patterns(tsc_output, self.type_patterns)
        nextjs_score = self.use_ripgrep_for_patterns(combined_output, self.nextjs_patterns)
        optimization_score = self.use_ripgrep_for_patterns(combined_output, self.optimization_patterns)
        
        # File context analysis
        file_context = self.analyze_file_context(file_path)
        type_score += file_context["type"]
        nextjs_score += file_context["nextjs"]
        optimization_score += file_context["optimization"]
        
        # Determine recommendation with confidence levels
        total_issues = type_score + nextjs_score + optimization_score
        
        if total_issues == 0:
            recommended_agent = "typescript-type-architect"  # Default fallback
            confidence = "low"
        elif type_score > nextjs_score and type_score > optimization_score:
            recommended_agent = "typescript-type-architect"
            confidence = "high" if type_score > (nextjs_score + optimization_score) else "medium"
        elif (nextjs_score + optimization_score) > 0:
            recommended_agent = "js-nextjs-optimizer"
            confidence = "high" if (nextjs_score + optimization_score) > type_score else "medium"
        else:
            recommended_agent = "typescript-type-architect"
            confidence = "medium"
        
        # Enhanced analysis with ripgrep-specific insights
        analysis = {
            "primary_category": "type" if type_score >= (nextjs_score + optimization_score) else "framework",
            "severity": "high" if total_issues > 8 else "medium" if total_issues > 3 else "low",
            "has_type_conflicts": type_score > 5,
            "has_framework_issues": nextjs_score > 3,
            "needs_optimization": optimization_score > 2,
            "file_context_bonus": sum(file_context.values()),
        }
        
        return {
            "recommended_agent": recommended_agent,
            "confidence": confidence,
            "type_issues": type_score,
            "nextjs_issues": nextjs_score,
            "optimization_issues": optimization_score,
            "total_issues": total_issues,
            "analysis": analysis,
            "ripgrep_available": self.is_ripgrep_available(),
        }

    def is_ripgrep_available(self) -> bool:
        """Check if ripgrep is available on the system"""
        try:
            subprocess.run(['rg', '--version'], capture_output=True, timeout=2)
            return True
        except (subprocess.TimeoutExpired, subprocess.CalledProcessError, FileNotFoundError):
            return False

def main():
    try:
        input_data = json.loads(sys.stdin.read())
        classifier = RipgrepErrorClassifier()
        
        result = classifier.classify_errors(
            input_data.get("tsc_output", ""),
            input_data.get("eslint_output", ""),
            input_data.get("file_path", "")
        )
        
        print(json.dumps(result, indent=2))
        
    except json.JSONDecodeError as e:
        print(json.dumps({
            "error": f"JSON decode error: {str(e)}", 
            "recommended_agent": "typescript-type-architect",
            "ripgrep_available": False
        }))
    except Exception as e:
        print(json.dumps({
            "error": f"Classification error: {str(e)}", 
            "recommended_agent": "typescript-type-architect",
            "ripgrep_available": False
        }))

if __name__ == "__main__":
    main()