#!/bin/bash

# Script to automate security vulnerability remediation steps

# Run npm audit to check for vulnerabilities
npm audit > audit-report.txt

echo "Audit report generated: audit-report.txt"

# Fix vulnerabilities automatically
npm audit fix

echo "Vulnerabilities fixed."

# Update dependencies
npm update

echo "Dependencies updated."

# Create a new branch for further changes
BRANCH_NAME="security-fix-$(date +%Y%m%d%H%M%S)"
git checkout -b $BRANCH_NAME

echo "Switched to new branch: $BRANCH_NAME"

# Setup GitHub Actions workflow
WORKFLOW_CONTENT="name: CI\n\non: [push, pull_request]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout code\n        uses: actions/checkout@v2\n      - name: Install dependencies\n        run: npm install\n      - name: Run audits\n        run: npm audit\n"
git add .github/workflows/ci.yml

git commit -m "Add CI workflow for vulnerabilities check"

echo "GitHub Actions workflow setup completed."

# Setup Dependabot configuration
DEPENDABOT_CONTENT="version: 2\nupdates:\n  - package-ecosystem: "npm"\n    directory: /\n    schedule:\n      interval: weekly\n"
git add .github/dependabot.yml

git commit -m "Add Dependabot configuration"

echo "Dependabot configuration added.

# Push changes to the new branch
git push origin $BRANCH_NAME

echo "Changes pushed to remote repository on branch $BRANCH_NAME"