/**
 * ElevenLabs & Zapier Assistant Manager
 * 
 * This script provides direct interaction with ElevenLabs voice assistants
 * and connects them with Zapier MCP tools.
 */

// Configuration for the assistant
const config = {
  // Default values - can be overridden
  defaultVoiceId: "cgSgspJ2msm6clMCkdW9", // Adam voice
  defaultLanguage: "en",
  defaultTemperature: 0.7,
  defaultMaxDuration: 300,
  defaultTurnTimeout: 10,
  
  // Zapier MCP URL - this should be configurable
  zapierMcpUrl: "https://actions.zapier.com/mcp/sk-ak-1aVbO4BVRsAuSHqFjz6dMLtT6X/sse"
};

/**
 * Creates a new voice assistant or uses an existing one
 * @param {object} options - Configuration options
 * @returns {Promise<object>} - The assistant object
 */
async function setupAssistant(options = {}) {
  console.log("Setting up ElevenLabs assistant...");
  
  const useExistingAssistant = options.assistantId ? true : false;
  
  if (useExistingAssistant) {
    console.log(`Using existing assistant with ID: ${options.assistantId}`);
    // Get info about the existing assistant
    const assistant = await mcp_ElevenLabs_get_agent({
      agent_id: options.assistantId
    });
    return assistant;
  } else {
    // Create a new assistant
    console.log("Creating new ElevenLabs assistant...");
    
    const assistantOptions = {
      name: options.name || "Zapier-Powered Assistant",
      first_message: options.firstMessage || "Hello! I'm your AI assistant with access to various tools. How can I help you today?",
      system_prompt: options.systemPrompt || "You are a helpful AI assistant with access to various tools through Zapier. You can help with tasks like sending emails, scheduling events, creating spreadsheets, and more.",
      voice_id: options.voiceId || config.defaultVoiceId,
      language: options.language || config.defaultLanguage,
      temperature: options.temperature || config.defaultTemperature,
      max_duration_seconds: options.maxDuration || config.defaultMaxDuration,
      turn_timeout: options.turnTimeout || config.defaultTurnTimeout
    };
    
    const assistant = await mcp_ElevenLabs_create_agent(assistantOptions);
    console.log(`Assistant created with ID: ${assistant.id}`);
    
    return assistant;
  }
}

/**
 * Adds a knowledge base to the assistant
 * @param {string} assistantId - ID of the assistant
 * @param {string} knowledgeBaseName - Name for the knowledge base
 * @param {string} content - Content for the knowledge base
 * @returns {Promise<object>} - The knowledge base object
 */
async function addKnowledgeBase(assistantId, knowledgeBaseName, content) {
  console.log(`Adding knowledge base "${knowledgeBaseName}" to assistant...`);
  
  const knowledgeBase = await mcp_ElevenLabs_add_knowledge_base_to_agent({
    agent_id: assistantId,
    knowledge_base_name: knowledgeBaseName,
    text: content
  });
  
  console.log("Knowledge base added successfully!");
  return knowledgeBase;
}

/**
 * Provides Zapier tool capabilities to the assistant
 * @param {object} assistant - The assistant object
 * @returns {object} - Zapier capabilities info
 */
function provideZapierCapabilities(assistant) {
  console.log(`Providing Zapier capabilities to assistant ${assistant.id}...`);
  
  // This is a mapping of what the assistant can do with Zapier tools
  const zapierCapabilities = {
    // Email functionality
    email: {
      send: async (to, subject, body) => {
        console.log(`Sending email to ${to}...`);
        const result = await mcp_Zapier_MCP_gmail_send_email({
          to: to,
          subject: subject,
          body: body
        });
        return result;
      }
    },
    
    // Calendar functionality
    calendar: {
      createEvent: async (text) => {
        console.log(`Creating calendar event: ${text}`);
        const result = await mcp_Zapier_MCP_google_calendar_quick_add_event_({
          text: text
        });
        return result;
      },
      
      createCalendar: async (summary, description) => {
        console.log(`Creating new calendar: ${summary}`);
        const result = await mcp_Zapier_MCP_google_calendar_create_calendar({
          summary: summary,
          description: description
        });
        return result;
      }
    },
    
    // Spreadsheet functionality
    spreadsheet: {
      create: async (title) => {
        console.log(`Creating spreadsheet: ${title}`);
        const result = await mcp_Zapier_MCP_google_sheets_create_spreadsheet({
          title: title
        });
        return result;
      },
      
      findWorksheet: async (spreadsheet, title) => {
        console.log(`Finding worksheet '${title}' in spreadsheet...`);
        const result = await mcp_Zapier_MCP_google_sheets_find_worksheet({
          spreadsheet: spreadsheet,
          title: title
        });
        return result;
      },
      
      createColumn: async (spreadsheet, worksheet, columnName) => {
        console.log(`Creating column '${columnName}' in worksheet...`);
        const result = await mcp_Zapier_MCP_google_sheets_create_spreadsheet_({
          spreadsheet: spreadsheet,
          worksheet: worksheet,
          column_name: columnName
        });
        return result;
      }
    },
    
    // Document parsing
    document: {
      parseFromUrl: async (url) => {
        console.log(`Parsing document from URL: ${url}`);
        const result = await mcp_Zapier_MCP_pdf_co_document_parser({
          url: url
        });
        return result;
      }
    },
    
    // Web parsing
    web: {
      parsePage: async (url) => {
        console.log(`Parsing webpage: ${url}`);
        const result = await mcp_Zapier_MCP_web_parser_by_zapier_parse_webpage({
          url: url
        });
        return result;
      }
    },
    
    // Google Drive functionality
    drive: {
      findFile: async (title) => {
        console.log(`Finding file in Google Drive: ${title}`);
        const result = await mcp_Zapier_MCP_google_drive_find_a_file({
          title: title
        });
        return result;
      }
    }
  };
  
  console.log("Zapier capabilities provided!");
  console.log("Assistant can now use Gmail, Google Calendar, Google Sheets, PDF parsing, Web parsing, and Google Drive tools.");
  
  return zapierCapabilities;
}

/**
 * Sets up the entire system with an assistant and Zapier tools
 * @param {object} options - Options for setup
 * @returns {Promise<object>} - The complete system
 */
async function setupSystem(options = {}) {
  console.log("Setting up ElevenLabs + Zapier MCP system...");
  
  // Step 1: Set up the assistant (new or existing)
  const assistant = await setupAssistant(options);
  
  // Step 2: If a knowledge base is provided, add it
  let knowledgeBase = null;
  if (options.knowledgeBase) {
    knowledgeBase = await addKnowledgeBase(
      assistant.id,
      options.knowledgeBase.name || "General Knowledge",
      options.knowledgeBase.content
    );
  }
  
  // Step 3: Provide Zapier capabilities
  const zapierCapabilities = provideZapierCapabilities(assistant);
  
  return {
    assistant,
    knowledgeBase,
    zapierCapabilities,
    
    // Utility functions
    async generateSpeech(text, voiceName = "Adam") {
      console.log(`Generating speech with voice ${voiceName}...`);
      const result = await mcp_ElevenLabs_text_to_speech({
        text: text,
        voice_name: voiceName
      });
      return result;
    }
  };
}

// Export the main functions
module.exports = {
  setupAssistant,
  addKnowledgeBase,
  provideZapierCapabilities,
  setupSystem,
  config
}; 