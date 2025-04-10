/**
 * ElevenLabs + Zapier Assistant Runner
 * 
 * This script demonstrates how to use the assistant manager to set up
 * and use an ElevenLabs assistant with Zapier tools.
 * 
 * IMPORTANT: Run this script in Cursor with ElevenLabs and Zapier MCPs enabled!
 */

const assistantManager = require('./assistant-manager');

// You can either use an existing assistant ID or create a new one
const USE_EXISTING_ASSISTANT = false; // Set to true to use an existing assistant
const EXISTING_ASSISTANT_ID = "your-assistant-id"; // Replace with your assistant ID if using existing

// Example knowledge base content
const KNOWLEDGE_BASE_CONTENT = `
# Company Information

## Products and Services
- Product A: A premium solution for enterprise customers
- Product B: A budget-friendly option for small businesses
- Service X: 24/7 customer support
- Service Y: Custom implementation services

## Policies
- Returns: 30-day money-back guarantee
- Support hours: Monday-Friday, 9am-5pm EST
- Warranty: 1-year standard warranty on all products

## Contact Information
- Customer Service: 1-800-555-1234
- Email: support@example.com
- Website: www.example.com
`;

/**
 * Main function to run the assistant
 */
async function runAssistant() {
  console.log("=== ElevenLabs + Zapier MCP Assistant Demo ===");
  
  try {
    // Setup options
    const options = {
      // Assistant options
      name: "Customer Service AI",
      firstMessage: "Hello! I'm your AI assistant with Zapier tools. How can I help you today?",
      systemPrompt: "You are a helpful customer service AI assistant with access to various tools through Zapier. You can help with tasks like sending emails, scheduling events, creating spreadsheets, and looking up information.",
      
      // If using existing assistant
      assistantId: USE_EXISTING_ASSISTANT ? EXISTING_ASSISTANT_ID : null,
      
      // Knowledge base (optional)
      knowledgeBase: {
        name: "Company Information",
        content: KNOWLEDGE_BASE_CONTENT
      }
    };
    
    // Set up the system (assistant + Zapier tools)
    const system = await assistantManager.setupSystem(options);
    
    console.log("\n=== System Setup Complete ===");
    console.log(`Assistant ID: ${system.assistant.id}`);
    console.log(`Assistant Name: ${system.assistant.name}`);
    if (system.knowledgeBase) {
      console.log(`Knowledge Base: ${system.knowledgeBase.name || "Added"}`);
    }
    
    // Demonstrate how to use Zapier tools with the assistant
    await demonstrateCapabilities(system);
    
    console.log("\n=== Demo Completed Successfully ===");
    console.log("Your ElevenLabs assistant is now set up with Zapier tools!");
    console.log(`Remember your Assistant ID for future use: ${system.assistant.id}`);
    
  } catch (error) {
    console.error("Error running the assistant:", error);
  }
}

/**
 * Demonstrates the various capabilities of the assistant with Zapier tools
 */
async function demonstrateCapabilities(system) {
  console.log("\n=== Demonstrating Zapier Tool Capabilities ===");
  
  // Example 1: Send an email
  console.log("\n1. Sending an email via Gmail...");
  try {
    const emailResult = await system.zapierCapabilities.email.send(
      "example@example.com",
      "Test Email from AI Assistant",
      "This is a test email sent by your AI assistant using Zapier tools."
    );
    console.log("Email sent successfully!");
  } catch (error) {
    console.log("Email demo skipped - requires configuration.");
  }
  
  // Example 2: Create a calendar event
  console.log("\n2. Creating a calendar event...");
  try {
    const eventResult = await system.zapierCapabilities.calendar.createEvent(
      "Follow-up meeting tomorrow at 10am"
    );
    console.log("Calendar event created successfully!");
  } catch (error) {
    console.log("Calendar demo skipped - requires configuration.");
  }
  
  // Example 3: Create a spreadsheet
  console.log("\n3. Creating a Google Sheets spreadsheet...");
  try {
    const spreadsheetResult = await system.zapierCapabilities.spreadsheet.create(
      "Customer Inquiries"
    );
    console.log("Spreadsheet created successfully!");
  } catch (error) {
    console.log("Spreadsheet demo skipped - requires configuration.");
  }
  
  // Example 4: Generate speech from the assistant
  console.log("\n4. Generating speech from the assistant...");
  try {
    const speechResult = await system.generateSpeech(
      "Hello! I'm your AI assistant with Zapier tools. I can help you send emails, schedule events, create spreadsheets, and more!"
    );
    console.log("Speech generated successfully!");
  } catch (error) {
    console.log("Speech generation demo skipped.");
  }
  
  // Example 5: Parse a webpage
  console.log("\n5. Parsing a webpage...");
  try {
    const webResult = await system.zapierCapabilities.web.parsePage(
      "https://www.example.com"
    );
    console.log("Webpage parsed successfully!");
  } catch (error) {
    console.log("Web parsing demo skipped - requires configuration.");
  }
}

// Check if we're running in Cursor with MCPs available
if (typeof mcp_ElevenLabs_create_agent === 'function' && 
    typeof mcp_Zapier_MCP_gmail_send_email === 'function') {
  console.log("MCP tools detected. Running assistant demo...");
  runAssistant();
} else {
  console.error("⚠️ This script must be run in Cursor with ElevenLabs and Zapier MCPs enabled.");
  console.error("Please make sure both MCPs are enabled in your Cursor settings.");
} 