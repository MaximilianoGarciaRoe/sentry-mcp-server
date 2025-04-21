# Sentry MCP Server

This is a Machine Control Protocol (MCP) server for interacting with Sentry's API.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Sentry account with API access

## Setup

- 1 Install dependencies:

  ```bash
  npm install
  ```

- 2 Configure Codeium MCP:
  - Add the following configuration to your Codeium MCP config file (`~/.codeium/windsurf/mcp_config.json`):
  
  ```json
   {
     "mcpServers": {
       "sentry": {
         "command": "npx",
         "args": [
           "-y",
           "tsx",
           "/path/to/sentry_mcp/main.ts"
         ],
         "env": {
           "SENTRY_AUTH_TOKEN": "your_auth_token",
           "SENTRY_ORG": "your_organization_slug"
         }
       }
     }
   }
   ```

## Usage

The MCP server will be automatically started by Codeium when needed. Available commands:

- `get_sentry_issue`: Retrieve information about a specific Sentry issue by ID or URL

## Development

To run the server locally for development:

```bash
npm start
```
