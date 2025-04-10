/**
 * AI Voice Assistant with ElevenLabs and Zapier Integration
 * 
 * This file demonstrates how to create AI voice assistants using ElevenLabs
 * and integrate them with various services using Zapier.
 */

const config = require('./config');

/**
 * Creates an AI voice assistant using ElevenLabs API
 * @param {string} name - Name of the assistant
 * @param {string} voiceId - ElevenLabs voice ID to use (optional)
 * @param {object} options - Additional options for the assistant
 * @returns {object} - The created assistant object
 */
async function createVoiceAssistant(name, voiceId = null, options = {}) {
  console.log(`Creating voice assistant: ${name}`);
  
  // This would be implemented with actual MCP tool calls when run
  // In a real implementation, we'd use the ElevenLabs create_agent tool
  
  const defaultOptions = {
    first_message: "Hello! How can I assist you today?",
    system_prompt: "You are a helpful AI assistant created with ElevenLabs.",
    voice_id: voiceId || "cgSgspJ2msm6clMCkdW9", // Default ElevenLabs voice
    language: "en",
    temperature: 0.7,
  };
  
  const agentOptions = { ...defaultOptions, ...options };
  
  // When using in Cursor with MCP tools, this would be:
  // const agent = await elevenlabs.create_agent({
  //   name: name,
  //   first_message: agentOptions.first_message,
  //   system_prompt: agentOptions.system_prompt,
  //   voice_id: agentOptions.voice_id,
  //   language: agentOptions.language,
  //   temperature: agentOptions.temperature
  // });
  
  // For demo purposes, we'll return a mock agent object
  return {
    id: "mock-agent-id-" + Date.now(),
    name,
    options: agentOptions,
    createdAt: new Date().toISOString()
  };
}

/**
 * Adds a knowledge base to an existing agent
 * @param {string} agentId - The ID of the agent
 * @param {string} kbName - Name for the knowledge base
 * @param {string} text - Text content for the knowledge base
 */
async function addKnowledgeBase(agentId, kbName, text) {
  console.log(`Adding knowledge base "${kbName}" to agent ${agentId}`);
  
  // In real implementation with MCP:
  // await elevenlabs.add_knowledge_base_to_agent({
  //   agent_id: agentId,
  //   knowledge_base_name: kbName,
  //   text: text
  // });
  
  return {
    success: true,
    message: `Knowledge base "${kbName}" added to agent ${agentId}`
  };
}

/**
 * Integrates a Zapier service with the voice assistant
 * @param {string} agentId - The ID of the agent
 * @param {string} serviceName - Name of the service to integrate
 * @param {object} parameters - Parameters required for the integration
 */
async function integrateZapierService(agentId, serviceName, parameters = {}) {
  console.log(`Integrating ${serviceName} with agent ${agentId}`);
  
  // This would call the appropriate Zapier MCP tool based on serviceName
  // For example, if serviceName is "gmail", we might use gmail_send_email
  
  return {
    success: true,
    message: `Successfully integrated ${serviceName} with agent ${agentId}`,
    parameters
  };
}

/**
 * Main function to demonstrate the creation and usage of voice assistants
 */
async function main() {
  console.log("AI Voice Assistant Demo with ElevenLabs and Zapier");
  console.log("Zapier MCP Endpoint:", config.zapierMcpEndpoint);
  
  // Create a customer service voice assistant
  const assistant = await createVoiceAssistant("Customer Service Bot", null, {
    first_message: "Hello! I'm your customer service assistant. How can I help you today?",
    system_prompt: "You are a helpful customer service AI assistant. Be polite, concise, and helpful."
  });
  
  console.log("Assistant created:", assistant);
  
  // Add a knowledge base with product information
  await addKnowledgeBase(assistant.id, "Product Information", 
    "Our company offers various products including smartphones, laptops, and accessories. " +
    "All products come with a 1-year warranty and 30-day money-back guarantee."
  );
  
  // Integrate with Gmail for sending confirmation emails
  await integrateZapierService(assistant.id, "gmail", {
    action: "send_email",
    parameters: {
      subject: "Customer Service - Confirmation",
      body: "Thank you for contacting our customer service."
    }
  });
  
  // Integrate with Google Calendar for scheduling callbacks
  await integrateZapierService(assistant.id, "google_calendar", {
    action: "quick_add_event",
    parameters: {
      text: "Customer callback tomorrow at 10am"
    }
  });
  
  console.log("Demo completed successfully!");
}

// If run directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  createVoiceAssistant,
  addKnowledgeBase,
  integrateZapierService
}; 