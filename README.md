# AI Voice Assistant with ElevenLabs and Zapier Integration

This project demonstrates how to create AI voice assistants using ElevenLabs MCP and integrate them with various services using Zapier MCP.

## Features

- Create voice assistants using ElevenLabs MCP
- Add knowledge bases to voice assistants
- Integrate with various services using Zapier MCP:
  - Gmail for sending emails
  - Google Calendar for scheduling events
  - Google Sheets for creating spreadsheets
- Configurable Zapier MCP endpoint

## Prerequisites

- Cursor IDE with ElevenLabs and Zapier MCPs enabled
- Node.js (for running the mock implementation)

## Project Structure

- `src/app.js`: Main application file with core functionality
- `src/config.js`: Configuration file for ElevenLabs and Zapier MCPs
- `src/mcpTools.js`: Implementation of MCP tools
- `src/demo.js`: Demonstration script showing how to use the MCPs in Cursor

## Setup

1. Clone this repository
2. Open the project in Cursor IDE
3. Make sure ElevenLabs and Zapier MCPs are enabled in Cursor Settings

## Usage

### In Cursor IDE

To run the demo in Cursor IDE, open `src/demo.js` and execute it. It will use the actual MCP tools available in Cursor.

### Configuration

To configure the Zapier MCP endpoint, you can:

1. Set the `ZAPIER_MCP_ENDPOINT` environment variable
2. Update the `zapierMcpEndpoint` value in `src/config.js`
3. Use the `updateZapierMcpEndpoint` function in your code:

```javascript
const config = require('./config');
config.updateZapierMcpEndpoint('https://your-zapier-mcp-endpoint.com');
```

### Creating a Voice Assistant

```javascript
// Using ElevenLabs MCP in Cursor
const agent = await mcp_ElevenLabs_create_agent({
  name: "Customer Service Assistant",
  first_message: "Hello! How can I help you today?",
  system_prompt: "You are a helpful customer service AI assistant.",
  voice_id: "cgSgspJ2msm6clMCkdW9", // Adam voice
  language: "en",
  temperature: 0.7
});
```

### Adding Knowledge Base to an Assistant

```javascript
// Using ElevenLabs MCP in Cursor
const knowledgeBase = await mcp_ElevenLabs_add_knowledge_base_to_agent({
  agent_id: agent.id,
  knowledge_base_name: "Company Policies",
  text: "Our return policy allows returns within 30 days of purchase."
});
```

### Integrating with Zapier Services

```javascript
// Using Zapier MCP in Cursor
const emailAction = await mcp_Zapier_MCP_gmail_send_email({
  to: "customer@example.com",
  subject: "Your Inquiry",
  body: "Thank you for contacting us."
});

const calendarAction = await mcp_Zapier_MCP_google_calendar_quick_add_event_({
  text: "Meeting tomorrow at 2pm"
});
```

## Extending the Project

### Adding New Zapier Integrations

1. Identify the Zapier MCP tool you want to use
2. Add a new function in `src/mcpTools.js` under the `zapierTools` object
3. Implement the appropriate MCP tool call

### Adding New ElevenLabs Features

1. Identify the ElevenLabs MCP tool you want to use
2. Add a new function in `src/mcpTools.js` under the `elevenLabsTools` object
3. Implement the appropriate MCP tool call

## License

MIT 