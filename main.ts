import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from 'zod';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Verificar que las variables de entorno requeridas estén presentes
if (!process.env.SENTRY_AUTH_TOKEN || !process.env.SENTRY_ORG) {
    console.error('Error: SENTRY_AUTH_TOKEN y SENTRY_ORG son requeridos. Por favor, configura estas variables en el archivo .env');
    process.exit(1);
}

const SENTRY_TOKEN = process.env.SENTRY_AUTH_TOKEN;
const SENTRY_ORG = process.env.SENTRY_ORG;
const SENTRY_API_BASE = `https://sentry.io/api/0/organizations/${SENTRY_ORG}/`;


const server = new McpServer({ id: 'sentry', name: 'sentry', version: '1.0.0' });


server.tool(
  'get_sentry_issue',
  'Get info about a Sentry issue',
  { issue_id_or_url: z.string().describe('Sentry issue ID or URL') },
  async ({ issue_id_or_url }) => {
    const issueId = issue_id_or_url.split('/').pop();
    if (!issueId) {
      return {
        content: [{ type: 'text', text: 'Invalid issue ID' }]
      };
    }
    const response = await fetch(`${SENTRY_API_BASE}/issues/${issueId}/events/latest/`, {
      headers: {
        Authorization: `Bearer ${SENTRY_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!data || data.detail === 'The requested resource does not exist') {
      return {
        content: [{ type: 'text', text: 'Issue not found' }]
      };
    }
    return {
      content: [{ type: 'text', text: JSON.stringify(data, null, 2) }]
    };
  }
);


const transport = new StdioServerTransport();
server.connect(transport);
