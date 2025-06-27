# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-01

### Added

- Initial release of GitHub plugin
- Support for creating issues with labels and assignees
- Support for creating pull requests between branches
- Ability to retrieve repository information and statistics
- List issues with filtering by state (open, closed, all)
- List pull requests with filtering options
- Create releases with tags and release notes
- Comprehensive error handling for API failures
- Input validation for all required fields
- Support for GitHub Personal Access Tokens (PAT)
- Detailed logging for debugging
- TypeScript type definitions
- Unit tests for core functionality

### Features

- **Authentication**: Secure token-based authentication using GitHub PAT
- **Issue Management**: Create and list issues with full metadata support
- **Pull Request Management**: Create and list PRs with branch management
- **Repository Info**: Get comprehensive repository statistics
- **Release Management**: Create releases with version tags
- **Error Handling**: Graceful error handling with detailed error messages
- **Validation**: Input validation for all operations
- **Logging**: Detailed operation logging for troubleshooting

### Technical Details

- Built with TypeScript for type safety
- Compatible with @choiceform/automation-sdk ^1.0.0
- Supports Node.js 18.0.0 and above
- Includes comprehensive test suite
- Full API documentation in README

### Security

- Sensitive token field is marked for secure handling
- Token validation ensures proper format
- API errors don't expose sensitive information
