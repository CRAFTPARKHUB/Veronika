/**
 * Demo script showing how to use ElevenLabs and Zapier MCPs together in Cursor
 * 
 * This script demonstrates the actual MCP tool calls that would be used
 * when running in Cursor with MCP tools available.
 * 
 * NOTE: This script is meant to be run in Cursor, not as a standalone Node.js script.
 */

// Import configuration
const config = require('./config');

// This function demonstrates creating a voice assistant using ElevenLabs MCP
async function demoCreateVoiceAssistant() {
  console.log("Demo: Creating a voice assistant with ElevenLabs MCP");
  
  try {
    // Step 1: Create the agent using ElevenLabs MCP
    const agent = await mcp_ElevenLabs_create_agent({
      name: "Customer Service Assistant",
      first_message: "Hello! I'm your customer service assistant. How can I help you today?",
      system_prompt: "You are a helpful customer service AI assistant created with ElevenLabs. You help customers with their inquiries, process returns, and schedule callbacks. Be polite, concise, and helpful.",
      voice_id: "cgSgspJ2msm6clMCkdW9", // Adam voice
      language: "en",
      temperature: 0.7,
      max_duration_seconds: 300,
      turn_timeout: 10
    });
    
    console.log("Created agent:", agent);
    
    // Step 2: Add knowledge base to the agent
    const knowledgeBase = await mcp_ElevenLabs_add_knowledge_base_to_agent({
      agent_id: agent.id,
      knowledge_base_name: "Company Policies",
      text: `
        Return Policy: Customers can return items within 30 days of purchase for a full refund.
        Shipping Policy: Standard shipping takes 3-5 business days. Express shipping is available for an additional fee.
        Warranty: All products come with a 1-year manufacturer warranty.
        Contact: For urgent matters, customers can call our hotline at 1-800-555-1234.
      `
    });
    
    console.log("Added knowledge base:", knowledgeBase);
    
    return agent;
  } catch (error) {
    console.error("Error creating voice assistant:", error);
    throw error;
  }
}

// This function demonstrates integrating the assistant with Zapier services
async function demoZapierIntegration(agentId) {
  console.log("Demo: Integrating with Zapier services");
  console.log("Using Zapier MCP endpoint:", config.zapierMcpEndpoint);
  
  try {
    // Step 1: Integrate with Gmail for sending confirmation emails
    const emailAction = await mcp_Zapier_MCP_gmail_send_email({
      to: "customer@example.com",
      subject: "Your Customer Service Inquiry",
      body: "Thank you for contacting our customer service. We have received your inquiry and will get back to you shortly."
    });
    
    console.log("Gmail integration:", emailAction);
    
    // Step 2: Integrate with Google Calendar for scheduling callbacks
    const calendarAction = await mcp_Zapier_MCP_google_calendar_quick_add_event_({
      text: "Customer callback tomorrow at 2pm"
    });
    
    console.log("Calendar integration:", calendarAction);
    
    // Step 3: Create a customer inquiry spreadsheet
    const spreadsheetAction = await mcp_Zapier_MCP_google_sheets_create_spreadsheet({
      title: "Customer Inquiries"
    });
    
    console.log("Spreadsheet integration:", spreadsheetAction);
    
    return {
      emailAction,
      calendarAction,
      spreadsheetAction
    };
  } catch (error) {
    console.error("Error integrating with Zapier services:", error);
    throw error;
  }
}

// Main demo function
async function runDemo() {
  console.log("=== AI Voice Assistant Demo with ElevenLabs and Zapier MCPs ===");
  
  try {
    // Step 1: Update Zapier MCP endpoint (if needed)
    // In a real application, you would get this from user input or environment variables
    const customEndpoint = process.env.ZAPIER_MCP_ENDPOINT || config.zapierMcpEndpoint;
    if (customEndpoint !== config.zapierMcpEndpoint) {
      config.updateZapierMcpEndpoint(customEndpoint);
    }
    
    // Step 2: Create the voice assistant
    const agent = await demoCreateVoiceAssistant();
    
    // Step 3: Integrate with Zapier services
    await demoZapierIntegration(agent.id);
    
    // Step 4: Make a text-to-speech call for demonstration
    const speech = await mcp_ElevenLabs_text_to_speech({
      text: "Hello! I'm your customer service assistant created with ElevenLabs. I'm here to help you with your inquiries.",
      voice_name: "Adam"
    });
    
    console.log("Generated speech:", speech);
    
    console.log("=== Demo completed successfully! ===");
  } catch (error) {
    console.error("Demo failed:", error);
  }
}

// Only run the demo when executed in Cursor with MCP tools available
if (typeof mcp_ElevenLabs_create_agent === 'function' && 
    typeof mcp_Zapier_MCP_gmail_send_email === 'function') {
  console.log("MCP tools detected. Running demo...");
  runDemo();
} else {
  console.log("MCP tools not available. This script should be run in Cursor with ElevenLabs and Zapier MCPs enabled.");
}

module.exports = {
  runDemo,
  demoCreateVoiceAssistant,
  demoZapierIntegration
}; 