/**
 * Configuration for ElevenLabs and Zapier MCPs
 */

// Load environment variables if .env file exists
try {
  require('dotenv').config();
} catch (error) {
  console.log('dotenv not loaded, using default configuration');
}

// Default Zapier MCP endpoint from Cursor settings 
// This should be replaced with the actual endpoint from your environment
const DEFAULT_ZAPIER_MCP_ENDPOINT = "https://actions.zapier.com/mcp/sk-ak-1aVbO4BVRsAuSHqFjz6dMLtT6X/sse";

// Configuration object
const config = {
  // Zapier MCP endpoint - can be overridden via environment variables
  zapierMcpEndpoint: process.env.ZAPIER_MCP_ENDPOINT || DEFAULT_ZAPIER_MCP_ENDPOINT,
  
  // Set this to true to use actual MCP tool calls (when running in Cursor)
  useMcpToolsDirectly: process.env.USE_MCP_TOOLS_DIRECTLY === 'true' || false,
  
  // Default voice ID for ElevenLabs (cgSgspJ2msm6clMCkdW9 is "Adam")
  defaultVoiceId: process.env.DEFAULT_VOICE_ID || "cgSgspJ2msm6clMCkdW9",
  
  // Default settings for voice assistants
  defaultAssistantSettings: {
    language: process.env.DEFAULT_LANGUAGE || "en",
    temperature: parseFloat(process.env.DEFAULT_TEMPERATURE || "0.7"),
    max_duration_seconds: parseInt(process.env.MAX_DURATION_SECONDS || "300", 10),
    turn_timeout: parseInt(process.env.TURN_TIMEOUT || "10", 10),
  }
};

/**
 * Updates the Zapier MCP endpoint
 * @param {string} newEndpoint - The new endpoint URL
 */
function updateZapierMcpEndpoint(newEndpoint) {
  if (!newEndpoint || typeof newEndpoint !== 'string') {
    throw new Error('Invalid Zapier MCP endpoint URL');
  }
  
  if (!newEndpoint.startsWith('https://')) {
    throw new Error('Zapier MCP endpoint must be a secure HTTPS URL');
  }
  
  config.zapierMcpEndpoint = newEndpoint;
  console.log(`Zapier MCP endpoint updated to: ${newEndpoint}`);
  return true;
}

module.exports = {
  ...config,
  updateZapierMcpEndpoint
}; 