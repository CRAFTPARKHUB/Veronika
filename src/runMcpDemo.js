/**
 * ElevenLabs and Zapier MCP Demonstration
 * 
 * This file contains code that directly uses the MCP tools available in Cursor.
 * It should ONLY be executed within Cursor with MCP tools enabled.
 * 
 * This is an actual runnable demonstration that creates a voice assistant
 * and integrates it with Zapier services.
 */

/**
 * Creates a customer service voice assistant using ElevenLabs
 */
async function createCustomerServiceAssistant() {
  console.log("Creating a customer service voice assistant...");
  
  const agent = await mcp_ElevenLabs_create_agent({
    name: "Customer Service Assistant",
    first_message: "Hello! I'm your customer service assistant. How can I help you today?",
    system_prompt: "You are a helpful customer service AI assistant created with ElevenLabs. You assist customers with product inquiries, process returns, and schedule callbacks. Be polite, concise, and helpful.",
    voice_id: "cgSgspJ2msm6clMCkdW9", // Adam voice
    language: "en",
    temperature: 0.7,
    max_duration_seconds: 300,
    turn_timeout: 10
  });
  
  console.log("✅ Voice assistant created!");
  console.log(`Assistant ID: ${agent.id}`);
  console.log(`Name: ${agent.name}`);
  
  return agent;
}

/**
 * Adds a knowledge base to the assistant
 */
async function addKnowledgeBase(agentId) {
  console.log("Adding knowledge base to the assistant...");
  
  const knowledgeBase = await mcp_ElevenLabs_add_knowledge_base_to_agent({
    agent_id: agentId,
    knowledge_base_name: "Product Information",
    text: `
      # Product Information
      
      ## Smart Speakers
      Our flagship smart speaker comes with advanced voice recognition and high-quality sound. It's compatible with all major smart home systems.
      Price: $149
      Warranty: 2 years
      
      ## Wireless Headphones
      Noise-cancelling headphones with 30-hour battery life and premium audio quality.
      Price: $199
      Warranty: 1 year
      
      ## Return Policy
      Customers can return products within 30 days of purchase for a full refund.
      For damaged products, we offer a replacement or repair within the warranty period.
      
      ## Contact Information
      Customer Service: 1-800-555-1234
      Email: support@example.com
      Hours: Monday-Friday, 9am-5pm EST
    `
  });
  
  console.log("✅ Knowledge base added!");
  return knowledgeBase;
}

/**
 * Integrates with Zapier services for email, calendar, and spreadsheets
 */
async function integrateZapierServices() {
  console.log("Integrating with Zapier services...");
  
  // Create a spreadsheet for customer inquiries
  console.log("Creating a spreadsheet for customer inquiries...");
  const spreadsheet = await mcp_Zapier_MCP_google_sheets_create_spreadsheet({
    title: "Customer Inquiries Log"
  });
  console.log("✅ Spreadsheet created!");
  
  // Send an example confirmation email
  console.log("Sending a sample confirmation email...");
  const email = await mcp_Zapier_MCP_gmail_send_email({
    to: "example@example.com",
    subject: "Your Customer Service Inquiry",
    body: "Thank you for contacting our customer service. Your inquiry has been received and a representative will get back to you within 24 hours."
  });
  console.log("✅ Email sent!");
  
  // Create a calendar event for a customer callback
  console.log("Creating a calendar event for customer callback...");
  const event = await mcp_Zapier_MCP_google_calendar_quick_add_event_({
    text: "Customer callback regarding product inquiry tomorrow at 10am"
  });
  console.log("✅ Calendar event created!");
  
  return {
    spreadsheet,
    email,
    event
  };
}

/**
 * Demonstrates text-to-speech capabilities
 */
async function generateSpeech() {
  console.log("Generating speech sample...");
  
  const speech = await mcp_ElevenLabs_text_to_speech({
    text: "Hello! I'm your customer service assistant created with ElevenLabs. I can help you with product inquiries, returns, and scheduling callbacks. How can I assist you today?",
    voice_name: "Adam",
    stability: 0.5,
    similarity_boost: 0.8
  });
  
  console.log("✅ Speech generated!");
  return speech;
}

/**
 * Main function that runs the full demonstration
 */
async function runFullDemo() {
  console.log("====== ElevenLabs & Zapier MCP Demonstration ======");
  
  try {
    // Step 1: Create the voice assistant
    const assistant = await createCustomerServiceAssistant();
    
    // Step 2: Add a knowledge base
    const knowledgeBase = await addKnowledgeBase(assistant.id);
    
    // Step 3: Integrate with Zapier services
    const integrations = await integrateZapierServices();
    
    // Step 4: Generate speech sample
    const speech = await generateSpeech();
    
    console.log("\n====== Demonstration Completed Successfully! ======");
    console.log("Your voice assistant has been created and integrated with the following services:");
    console.log("- ElevenLabs Voice Assistant");
    console.log("- Knowledge Base");
    console.log("- Gmail for email notifications");
    console.log("- Google Calendar for scheduling");
    console.log("- Google Sheets for tracking inquiries");
    console.log("\nYou can now use these integrations to build powerful voice-enabled workflows!");
    
  } catch (error) {
    console.error("❌ Error in demonstration:", error);
    console.error("Please make sure you're running this in Cursor with ElevenLabs and Zapier MCPs enabled");
  }
}

// Check if we're running in Cursor with MCPs available
if (typeof mcp_ElevenLabs_create_agent === 'function' && 
    typeof mcp_Zapier_MCP_gmail_send_email === 'function') {
  console.log("MCP tools detected. Running demonstration...");
  runFullDemo();
} else {
  console.error("⚠️ This script must be run in Cursor with ElevenLabs and Zapier MCPs enabled.");
  console.error("Please open this file in Cursor and try again.");
} 