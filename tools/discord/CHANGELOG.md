# Changelog

All notable changes to this Discord plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
