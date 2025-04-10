# ElevenLabs AI Voice Assistant with Zapier Tools

This project provides a straightforward way to create and use ElevenLabs AI voice assistants with Zapier integration tools in Cursor IDE.

## Features

- Create AI voice assistants with ElevenLabs or use existing ones
- Add knowledge bases to assistants for specialized knowledge
- Connect assistants to Zapier tools for various capabilities:
  - Email sending via Gmail
  - Calendar event creation and management
  - Spreadsheet creation and management
  - Document parsing and web scraping
  - Google Drive integration
- Generate voice responses from assistants
- Create specialized assistants for specific use cases

## Prerequisites

- Cursor IDE with ElevenLabs and Zapier MCPs enabled
- Node.js installed (for configuration utilities)

## Files

- `assistant-manager.js` - Core functionality for managing assistants
- `run.js` - Simple demo to create and use a basic assistant
- `config-updater.js` - Utility to update Zapier MCP endpoint
- `create-custom-assistant.js` - Creates specialized assistants for specific purposes

## Usage

### 1. Update Zapier MCP Endpoint (if needed)

If you need to customize the Zapier MCP endpoint, run:

```bash
node config-updater.js
```

Enter your Zapier MCP endpoint URL when prompted.

### 2. Run Basic Demo

To create a basic assistant and demonstrate its capabilities:

```bash
# In Cursor IDE
node run.js
```

### 3. Create Specialized Assistants

To create assistants for specific purposes:

```bash
# In Cursor IDE
node create-custom-assistant.js
```

This will create:
- A meeting scheduler assistant
- A customer support assistant

### 4. Using Existing Assistants

To use an existing assistant you've already created:

1. Get your assistant ID from ElevenLabs
2. Open `run.js` and set:
   ```javascript
   const USE_EXISTING_ASSISTANT = true;
   const EXISTING_ASSISTANT_ID = "your-assistant-id";
   ```
3. Run the script in Cursor IDE

## Important Notes

- All scripts must be run in Cursor IDE with ElevenLabs and Zapier MCPs enabled
- The Zapier tools require proper authentication and permissions
- Some demonstrations may be skipped if the corresponding services are not configured

## Available Zapier Tools

The assistant can use these Zapier tools:

- **Email:** Send emails via Gmail
- **Calendar:** Create events and calendars
- **Spreadsheets:** Create sheets, find worksheets, create columns
- **Documents:** Parse PDF documents from URLs
- **Web:** Parse webpage content
- **Drive:** Find files in Google Drive

## Custom Assistant Examples

1. **Meeting Scheduler Assistant**
   - Specialized for creating and managing calendar events
   - Sends confirmation emails
   - Has knowledge about scheduling best practices

2. **Customer Support Assistant**
   - Helps with customer inquiries
   - Creates support tickets in spreadsheets
   - Sends response emails to customers
   - Schedules follow-ups

## Getting Assistant IDs

After creating an assistant, the script will display its ID. Save this ID if you want to reuse the assistant later without creating a new one.

## Customizing Assistants

You can customize assistants by modifying:
- Name and first message
- System prompt (instructions for the assistant)
- Knowledge base content
- Voice settings

See the examples in `create-custom-assistant.js` for guidance. 