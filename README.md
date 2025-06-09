# Webex OpenAPI Specifications

This repository hosts OpenAPI specifications for all APIs available on the [Webex Developer Portal](https://developer.webex.com).

## Structure

The API specifications are organized in a structure that mirrors their presentation on the developer portal. This includes:

*   **Product-based Division**: APIs are grouped by their respective Webex products (e.g., Meetings, Messaging, Devices).
*   **Versioning**: Each API specification is versioned to reflect its evolution over time.

## Finding API Specifications

There are two main ways to locate an API specification within this repository:

1.  **Direct Specification**: Most services will have their OpenAPI specification located within a versioned subfolder. For example, an API might be found at `[Product]/[Service]/[Version]/spec.json`.
2.  **Shared Specification**: Some services utilize a shared specification. In these cases, you will find a `shared.json` file within the service's directory. This file will contain a reference to a specification located in the `Shared` directory. For example, if `[Product]/[Service]/shared.json` contains `"reference": "data-sources"`, the actual specification can be found in `Shared/data-sources/[Version]/spec.json`.

## Purpose

The primary goal of this repository is to provide developers with easy access to up-to-date OpenAPI specifications for Webex APIs. This enables:

*   Generating client SDKs in various programming languages.
*   Exploring API capabilities and understanding request/response formats.
*   Integrating Webex services into custom applications and workflows.

## Previewing Specifications in VSCode

This repository includes recommendations for VSCode extensions that can help you visualize OpenAPI specifications. If you have an extension like "Swagger Viewer" or "42Crunch OpenAPI (Swagger) Editor" installed, you can typically preview a `spec.json` file by:

1.  Opening the `spec.json` file in VSCode.
2.  Looking for a "Preview" or "Show Swagger UI" button or command provided by the extension. This is often located in the editor's title bar or can be accessed via the command palette (Ctrl+Shift+P or Cmd+Shift+P).
3.  Activating the preview will render the OpenAPI specification in a user-friendly UI, allowing you to explore endpoints, parameters, and schemas.

Please refer to the specific documentation of your chosen OpenAPI extension for detailed instructions.

## Contributing

Details on contributing to this repository will be added soon.

## Issues

If you find any issues with the OpenAPI specifications or have suggestions for improvement, please open an issue in this repository.
