# GitHub Plugin

A powerful GitHub integration plugin for automation workflows that enables interaction with GitHub repositories, issues, pull requests, and releases.

## Features

- **Create Issues**: Create new issues with labels and assignees
- **Create Pull Requests**: Open PRs between branches with metadata
- **Repository Information**: Retrieve detailed repository statistics
- **List Issues**: Query and filter repository issues
- **List Pull Requests**: Browse open, closed, or all PRs
- **Create Releases**: Publish new releases with tags

## Installation

```bash
pnpm add @choiceform/github
```

## Configuration

### Authentication

This plugin requires a GitHub Personal Access Token (PAT) for authentication. You can create one at [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens).

Required scopes:

- `repo` - Full control of private repositories
- `public_repo` - Access to public repositories (if only working with public repos)

### Plugin Configuration

| Field  | Type   | Required | Description                                 |
| ------ | ------ | -------- | ------------------------------------------- |
| token  | string | Yes      | GitHub personal access token                |
| action | select | Yes      | The GitHub action to perform                |
| owner  | string | Yes      | Repository owner (username or organization) |
| repo   | string | Yes      | Repository name                             |

### Action-Specific Fields

#### Create Issue

- `title` (required): Issue title
- `body`: Issue description
- `labels`: Comma-separated list of labels
- `assignees`: Comma-separated list of GitHub usernames

#### Create Pull Request

- `title` (required): PR title
- `body`: PR description
- `baseBranch` (required): Target branch for merge
- `headBranch` (required): Source branch with changes
- `labels`: Comma-separated list of labels
- `assignees`: Comma-separated list of GitHub usernames

#### Create Release

- `tagName` (required): Version tag (e.g., v1.0.0)
- `title`: Release title
- `body`: Release notes
- `targetCommitish`: Branch or commit SHA (default: main)
- `prerelease`: Mark as pre-release

#### List Issues/PRs

- `state`: Filter by state (open, closed, all)
- `limit`: Maximum number of results (1-100)

## Usage Examples

### Create an Issue

```javascript
{
  "token": "ghp_your_token_here",
  "action": "create-issue",
  "owner": "octocat",
  "repo": "hello-world",
  "title": "Bug: Application crashes on startup",
  "body": "## Description\nThe application fails to start...",
  "labels": "bug, high-priority",
  "assignees": "octocat, collaborator"
}
```

### Create a Pull Request

```javascript
{
  "token": "ghp_your_token_here",
  "action": "create-pr",
  "owner": "octocat",
  "repo": "hello-world",
  "title": "Feature: Add user authentication",
  "body": "This PR implements JWT-based authentication...",
  "baseBranch": "main",
  "headBranch": "feature/auth",
  "labels": "enhancement, security"
}
```

### Get Repository Information

```javascript
{
  "token": "ghp_your_token_here",
  "action": "get-repo-info",
  "owner": "facebook",
  "repo": "react"
}
```

### Create a Release

```javascript
{
  "token": "ghp_your_token_here",
  "action": "create-release",
  "owner": "octocat",
  "repo": "hello-world",
  "tagName": "v2.0.0",
  "title": "Version 2.0.0 - Major Update",
  "body": "## What's New\n- Feature A\n- Feature B\n\n## Breaking Changes\n- API endpoint changed",
  "targetCommitish": "main",
  "prerelease": false
}
```

## Output Format

### Success Response

```javascript
{
  "success": true,
  "data": {
    "action": "create-issue",
    "issue": {
      "id": 1,
      "number": 123,
      "title": "Bug: Application crashes on startup",
      "state": "open",
      "url": "https://github.com/octocat/hello-world/issues/123",
      "created_at": "2024-01-01T00:00:00Z",
      "user": "octocat"
    }
  }
}
```

### Error Response

```javascript
{
  "success": false,
  "error": "GitHub API error: 401 Unauthorized - Bad credentials",
  "data": {
    "error": "GitHub API error: 401 Unauthorized - Bad credentials",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

## Error Handling

The plugin handles various error scenarios:

- Invalid or expired authentication tokens
- Missing required fields
- API rate limiting
- Network errors
- Invalid repository or organization names

## Development

### Building

```bash
pnpm build
```

### Testing

```bash
pnpm test
```

### Validation

```bash
pnpm validate
```

## License

MIT
