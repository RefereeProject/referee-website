# Beads - AI-Native Issue Tracking

Welcome to Beads! This repository uses **Beads** for issue tracking - a modern, AI-native tool designed to live directly in your codebase alongside your code.

## What is Beads?

Beads is issue tracking that lives in your repo, making it perfect for AI coding agents and developers who want their issues close to their code. No web UI required - everything works through the CLI and integrates seamlessly with git.

**Learn more:** [github.com/steveyegge/beads](https://github.com/steveyegge/beads)

## Quick Start

### Essential Commands

```bash
# Create new issues
bd create "Add user authentication"

# View all issues
bd list

# View issue details
bd show <issue-id>

# Update/close issues
bd update <issue-id> --claim
bd close <issue-id>

# Refresh JSONL recovery mirror when needed
bd export -o .beads/issues.jsonl

# Publish reviewed Beads changes through Git
git status --short .beads
git add -u .beads
# git add <intended-new-.beads-file>
git diff --cached --quiet .beads || git commit -m "chore(beads): sync"
git push
```

### Working with Issues

Issues in Beads are:
- **Git-native**: Stored in embedded Dolt under `.beads/` with `.beads/issues.jsonl` as a recovery/export mirror
- **AI-friendly**: CLI-first design works perfectly with AI coding agents
- **Branch-aware**: Issues can follow your branch workflow
- **Git-published**: Commit and push tracked `.beads` changes with your code

## Why Beads?

✨ **AI-Native Design**
- Built specifically for AI-assisted development workflows
- CLI-first interface works seamlessly with AI coding agents
- No context switching to web UIs

🚀 **Developer Focused**
- Issues live in your repo, right next to your code
- Works offline, syncs when you push
- Fast, lightweight, and stays out of your way

🔧 **Git Integration**
- Automatic sync with git commits
- Branch-aware issue tracking
- Dolt-native history, diff, branch, and merge support

## Get Started with Beads

Try Beads in your own projects:

```bash
# Install Beads
brew install beads
brew install dolt

# Initialize in your repo
bd init

# Create your first issue
bd create "Try out Beads"
```

## Learn More

- **Documentation**: [github.com/steveyegge/beads/docs](https://github.com/steveyegge/beads/tree/main/docs)
- **Quick Start Guide**: Run `bd quickstart`
- **Examples**: [github.com/steveyegge/beads/examples](https://github.com/steveyegge/beads/tree/main/examples)

---

*Beads: Issue tracking that moves at the speed of thought* ⚡
