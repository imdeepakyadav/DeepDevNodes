# 🛠️ Scripts Directory

This directory contains utility scripts for the DeepDevNodes project.

## Available Scripts

### 📝 create-issues.js

A utility script to help create GitHub issues from a predefined list based on the project roadmap and contribution areas.

#### Usage

**Option 1: Display GitHub CLI Commands**
```bash
node scripts/create-issues.js
```
This will output GitHub CLI commands that you can copy and paste to create issues.

**Option 2: Using GitHub CLI directly**
```bash
# First, make sure GitHub CLI is installed and authenticated
gh --version
gh auth status

# Then run the script to get commands
node scripts/create-issues.js > issue-commands.txt

# Review and run the commands
cat issue-commands.txt
```

#### Prerequisites

- [GitHub CLI](https://cli.github.com/) installed
- Authenticated with GitHub (`gh auth login`)
- Repository access permissions

#### What Issues Will Be Created

The script creates issues based on the roadmap items found in:
- `CONTRIBUTING.md` - Areas for Contribution section
- `README.md` - Roadmap section
- `ISSUES_TO_CREATE.md` - Detailed issue specifications

**Issue Categories:**
- 🔴 **High Priority** (5 issues): GraphQL support, API versioning, testing, error handling, analytics
- 🟡 **Medium Priority** (2 issues): SDKs, webhooks
- 🟢 **Good First Issues** (3 issues): Documentation, testing, typos

## 📋 Issue Templates

GitHub issue templates are located in `.github/ISSUE_TEMPLATE/`:

- `bug_report.yml` - For reporting bugs
- `feature_request.yml` - For requesting new features
- `documentation.yml` - For documentation issues
- `testing.yml` - For testing-related issues
- `config.yml` - Template configuration

These templates provide structured forms for creating consistent, high-quality issues.

## 🚀 Getting Started

1. **Review the issue list**: Check `ISSUES_TO_CREATE.md` for detailed descriptions
2. **Run the script**: `node scripts/create-issues.js`
3. **Create issues**: Use the generated GitHub CLI commands
4. **Start contributing**: Pick an issue and start working!

## 📞 Support

If you need help with the scripts or creating issues:
- Check the [CONTRIBUTING.md](../CONTRIBUTING.md) guide
- Open a discussion in [GitHub Discussions](https://github.com/imdeepakyadav/DeepDevNodes/discussions)
- Contact the maintainer: imdeepakyadav@example.com