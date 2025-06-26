# Changelog

All notable changes to this Discord plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.5] - 2024-12-24

### Fixed

- Fixed GitHub Actions artifacts upload path issues completely
- Enhanced package creation logic with better error checking
- Added detailed debugging information for troubleshooting
- Improved file validation in packaging process

### Build

- Modified workflow to use correct plugin directory paths
- Enhanced temporary package creation with validation

## [1.0.4] - 2024-06-26

### Fixed

- Resolved GitHub Actions artifact upload path issues
- Fixed relative pathing errors in CI/CD pipeline
- Improved artifact handling for plugin packages

### Build

- Updated workflow to use correct file paths for artifact uploads

## [1.0.3] - 2024-06-26

### Fixed

- Fixed .choiceformpkg file creation issues in CI/CD pipeline
- Resolved tar command errors with special characters in package names
- Improved package file naming for GitHub Releases compatibility

### Build

- Enhanced workflow reliability for plugin packaging
- Added proper error handling for manual package creation

## [1.0.2] - 2024-06-26

### Fixed

- Fixed plugin registry JSON generation issues
- Corrected GitHub repository URLs in workflow
- Improved GitHub Pages deployment process

### Documentation

- Updated README with registry fix testing notes

## [1.0.1] - 2024-06-26

### Fixed

- Improved GitHub Pages deployment compatibility
- Enhanced plugin registry generation

### Documentation

- Updated README with deployment testing notes

## [1.0.0] - 2024-06-26

### Added

- Initial release of Discord plugin
- Send messages to Discord channels using webhooks
- Random bot usernames and avatars functionality
- Support for plain text messages
- Support for embed messages with title, description, color, and URL
- Webhook URL validation
- Comprehensive error handling and logging
- Dual output ports (success/error) for workflow control
- TypeScript support with complete type definitions

### Features

- **Random Bot Identity**: Automatically generates random bot names and avatars for each message
- **Webhook Integration**: Secure messaging through Discord webhooks
- **Embed Support**: Rich message formatting with embeds
- **Error Handling**: Robust error management with detailed logging
- **Validation**: Input validation for webhook URLs and message content

### Security

- Webhook token masking in logs for security
- Input validation to prevent malformed requests
- Safe error handling to avoid information leakage

### Technical

- Built with @choiceform/automation-sdk
- TypeScript implementation with type safety
- Compatible with automation platform architecture
- Follows official plugin development standards
