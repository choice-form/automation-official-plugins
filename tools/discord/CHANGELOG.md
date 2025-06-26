# Changelog

All notable changes to this Discord plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-12-24

### Added

- 🎯 **Configuration Schema System**: Comprehensive user configuration fields
- 📋 **Structured Configuration**: Webhook URL, message content, bot appearance settings
- 🔒 **Field Validation**: URL pattern validation, character limits, required fields
- 🎨 **UI Enhancements**: Field grouping, ordering, and display hints
- 🔧 **Expression Support**: Dynamic content support for message fields
- 🛡️ **Security**: Sensitive field marking for webhook URLs

### Technical

- Updated to @choiceform/automation-sdk v1.4.0
- Added NodeConfigSchema with 4 configuration fields
- Implemented field groups: Connection, Message, Appearance
- Added comprehensive validation rules and UI hints
- Enhanced automation platform integration capabilities

### Configuration Fields

- **Webhook URL**: Required, validated Discord webhook URL
- **Message Content**: Optional, supports expressions, 2000 char limit
- **Bot Username**: Optional, supports expressions, 80 char limit
- **Bot Avatar URL**: Optional, supports expressions, image URL validation

## [1.0.8] - 2024-12-24

### Changed

- 🚀 **Major Infrastructure Upgrade**: Updated to use @choiceform/automation-sdk v1.3.0
- ✨ **Native Package Creation**: Now uses SDK's built-in .choiceformpkg creation feature
- 🔧 **Simplified CI/CD**: Removed manual package creation logic from GitHub Actions
- 📦 **Improved Build Process**: More reliable and standardized plugin packaging

### Technical

- Updated GitHub Actions workflow to use official SDK build command
- Removed 50+ lines of manual tar/gzip packaging code
- Enhanced error handling and package validation
- Standardized with automation-plugin-sdk best practices

## [1.0.7] - 2024-12-24

### Fixed

- Fixed package filename generation - removed leading dash from plugin names
- Corrected .choiceformpkg download URLs in registry and GitHub releases
- Package files now have clean names: `choiceform-discord-1.0.7.choiceformpkg` instead of `-choiceform-discord-1.0.7.choiceformpkg`

### Build

- Enhanced SAFE_NAME processing to strip leading/trailing dashes
- Improved filename sanitization for cross-platform compatibility

## [1.0.6] - 2024-12-24

### Fixed

- Fixed GitHub Actions artifact naming issues with forward slash characters
- Resolved CI/CD pipeline issues that prevented proper plugin packaging
- Maintained registry design architecture (lightweight index + full package downloads)

### Build

- Enhanced artifact name generation to comply with file system limitations
- Improved workflow reliability for cross-platform compatibility

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
