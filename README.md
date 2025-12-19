# Webex OpenAPI Specifications

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![OpenAPI](https://img.shields.io/badge/OpenAPI-3.0-green.svg)](https://swagger.io/specification/)
[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/webexdev/webex-public-workspace-beta)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/webex/webex-openapi-specs)

This repository contains OpenAPI specifications for various Webex APIs and services. These specifications provide detailed documentation of API endpoints, request/response schemas, and authentication requirements for integrating with Webex platforms.

## Overview

This collection includes OpenAPI specifications for:

- **Webex Admin** - Administrative APIs for managing Webex organizations
- **Webex BroadWorks** - APIs for Webex BroadWorks integration
- **Webex Cloud Calling** - Cloud calling service APIs
- **Webex Contact Center** - Contact center management APIs
- **Webex Device** - Device management and configuration APIs
- **Webex Meeting** - Meeting creation and management APIs
- **Webex Messaging** - Messaging and collaboration APIs
- **Webex UCM** - Unified Communications Manager APIs
- **Webex Wholesale** - Wholesale platform APIs

## Repository Structure

```
webex-openapi-specs/
├── public-spec/          # OpenAPI specification files
│   ├── webex-admin.json
│   ├── webex-broadworks.json
│   ├── webex-cloud-calling.json
│   ├── webex-contact-center.json
│   ├── webex-device.json
│   ├── webex-meeting.json
│   ├── webex-messaging.json
│   ├── webex-ucm.json
│   └── webex-wholesale.json
└── postman/              # Postman collection exports
    ├── collections/
    ├── cloud calling/
    └── webex broadWorks/
```

## Usage

### Viewing Specifications

You can view and interact with these OpenAPI specifications using various tools:

1. **Swagger UI**: Import any specification file into [Swagger Editor](https://editor.swagger.io/)
2. **Postman**: Import the specification files directly into Postman
3. **OpenAPI Generators**: Use [OpenAPI Generator](https://openapi-generator.tech/) to create client libraries in various programming languages

### Importing into Postman

The complete Webex API collection is available on Postman at the [Webex Public Workspace](https://www.postman.com/webexdev/webex-public-workspace-beta). You can fork this workspace to get started quickly with testing Webex APIs.

Alternatively, Postman collections are available in the `postman/` directory and can be imported directly into Postman for testing and development.

### Generating Client Libraries

You can generate client libraries from these specifications using OpenAPI Generator:

```bash
# Example: Generate a Python client
openapi-generator-cli generate \
  -i public-spec/webex-admin.json \
  -g python \
  -o ./generated-clients/python
```

## API Documentation

Each OpenAPI specification contains:

- Complete endpoint definitions
- Request/response schemas
- Authentication requirements
- Parameter descriptions
- Example requests and responses

## Contributing

If you find issues or have suggestions for improving these specifications, please open an issue or submit a pull request.

## License

This project is licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0). See the [LICENSE](LICENSE) file for details.

You are free to:
- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material for any purpose, even commercially

Under the following terms:
- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made

## Related Resources

- [Webex Developer Portal](https://developer.webex.com/)
- [Webex API Documentation](https://developer.webex.com/docs/api/getting-started)
- [OpenAPI Specification](https://swagger.io/specification/)

## Support

For questions about using these specifications or the Webex APIs:
- Visit the [Webex Developer Community](https://community.cisco.com/t5/webex-for-developers/bd-p/disc-webex-developers)
- Check the [Webex API Documentation](https://developer.webex.com/docs)

