/**
 * Custom Assistant Creator
 * 
 * This script creates a specialized AI assistant for a specific purpose,
 * with relevant tools from Zapier.
 * 
 * IMPORTANT: Run this script in Cursor with ElevenLabs and Zapier MCPs enabled!
 */

const assistantManager = require('./assistant-manager');

/**
 * Creates a custom meeting scheduling assistant
 */
async function createMeetingAssistant() {
  console.log("=== Creating Meeting Scheduler Assistant ===");
  
  const options = {
    name: "Meeting Scheduler AI",
    firstMessage: "Hello! I'm your meeting scheduling assistant. How can I help you today?",
    systemPrompt: `You are a specialized AI assistant for scheduling meetings and managing calendars.
You have access to Google Calendar for creating events and Gmail for sending meeting notifications.
Your primary tasks are:
1. Schedule meetings and appointments when requested
2. Send confirmation emails about scheduled meetings
3. Help users find available time slots
4. Create new calendars for specific projects if needed

Be polite, efficient, and make the scheduling process as smooth as possible.
Always confirm the meeting details before scheduling.`,
    
    // Knowledge base with scheduling guidelines
    knowledgeBase: {
      name: "Scheduling Guidelines",
      content: `
# Meeting Scheduling Guidelines

## Available Hours
- Regular business hours: Monday-Friday, 9am-5pm
- Early meetings: Available from 8am on request
- Late meetings: Available until 6pm on request
- Weekend meetings: Only in exceptional cases

## Meeting Types
- Quick check-in: 15 minutes
- Standard meeting: 30 minutes
- Extended discussion: 45 minutes
- Strategic planning: 60 minutes
- Workshops: 90+ minutes

## Best Practices
- Include meeting agenda in calendar invite
- Add video conference link for remote participants
- Schedule buffer time between meetings (15 minutes recommended)
- Send confirmation email with meeting details
- Include relevant documents or pre-reading materials
      `
    }
  };
  
  try {
    // Set up the system
    const system = await assistantManager.setupSystem(options);
    
    console.log("\n=== Meeting Scheduler Assistant Created ===");
    console.log(`Assistant ID: ${system.assistant.id}`);
    console.log(`Assistant Name: ${system.assistant.name}`);
    if (system.knowledgeBase) {
      console.log(`Knowledge Base: ${system.knowledgeBase.name}`);
    }
    
    // Demonstrate creating a meeting
    console.log("\n=== Demonstrating Meeting Scheduling ===");
    
    // Example 1: Schedule a meeting
    console.log("\n1. Creating a calendar event for a team meeting...");
    try {
      const eventResult = await system.zapierCapabilities.calendar.createEvent(
        "Team strategy meeting next Tuesday at 11am with Marketing and Sales teams"
      );
      console.log("Calendar event created successfully!");
    } catch (error) {
      console.log("Calendar demo skipped - requires configuration.");
    }
    
    // Example 2: Send a meeting confirmation email
    console.log("\n2. Sending meeting confirmation email...");
    try {
      const emailResult = await system.zapierCapabilities.email.send(
        "team@example.com",
        "Confirmation: Team Strategy Meeting",
        `Hello team,

This is a confirmation for our team strategy meeting scheduled for next Tuesday at 11am.

Agenda:
- Q2 goals review
- New product launch planning
- Team resource allocation

Please prepare any relevant materials for the discussion.

Best regards,
Your Meeting Scheduler AI`
      );
      console.log("Meeting confirmation email sent successfully!");
    } catch (error) {
      console.log("Email demo skipped - requires configuration.");
    }
    
    // Generate speech for the assistant
    console.log("\n3. Generating assistant voice response...");
    try {
      const speechResult = await system.generateSpeech(
        "I've scheduled your team strategy meeting for next Tuesday at 11am and sent a confirmation email to the team. Is there anything else you need help with?"
      );
      console.log("Assistant speech generated successfully!");
    } catch (error) {
      console.log("Speech generation skipped.");
    }
    
    console.log("\n=== Assistant Setup Complete ===");
    console.log("Your Meeting Scheduler Assistant is ready to use!");
    console.log(`Remember your Assistant ID for future use: ${system.assistant.id}`);
    
    return system.assistant;
  } catch (error) {
    console.error("Error creating meeting assistant:", error);
    throw error;
  }
}

/**
 * Creates a custom customer support assistant
 */
async function createCustomerSupportAssistant() {
  console.log("=== Creating Customer Support Assistant ===");
  
  const options = {
    name: "Customer Support AI",
    firstMessage: "Hello! I'm your customer support assistant. How can I help you today?",
    systemPrompt: `You are a specialized AI assistant for customer support.
You have access to Gmail for responding to customer inquiries, Google Sheets for tracking customer issues,
and Google Calendar for scheduling follow-ups.
Your primary tasks are:
1. Answer customer questions using your knowledge base
2. Create support tickets by adding entries to spreadsheets
3. Send email responses to customers
4. Schedule follow-up actions when needed

Be friendly, helpful, and focus on resolving the customer's issue efficiently.`,
    
    // Knowledge base with support information
    knowledgeBase: {
      name: "Customer Support Information",
      content: `
# Customer Support Information

## Product Information
- Product A: Enterprise solution with advanced features
- Product B: Small business solution with core functionality
- Product C: Consumer version with simplified interface

## Common Issues
- Login problems: Usually resolved by password reset or clearing browser cache
- Integration errors: Check API keys and connection settings
- Performance issues: Recommend system requirements and optimization tips

## Support Policies
- Response time: Within 24 hours for standard issues
- Priority support: Available for Enterprise customers
- Refund policy: 30-day money-back guarantee
- Escalation process: Tier 1 > Tier 2 > Engineering team

## Contact Information
- Support email: support@example.com
- Support phone: 1-800-555-1234
- Hours: Monday-Friday 9am-6pm EST
      `
    }
  };
  
  try {
    // Set up the system
    const system = await assistantManager.setupSystem(options);
    
    console.log("\n=== Customer Support Assistant Created ===");
    console.log(`Assistant ID: ${system.assistant.id}`);
    console.log(`Assistant Name: ${system.assistant.name}`);
    if (system.knowledgeBase) {
      console.log(`Knowledge Base: ${system.knowledgeBase.name}`);
    }
    
    // Demonstrate some customer support actions
    console.log("\n=== Demonstrating Customer Support Actions ===");
    
    // Example 1: Create a support tracking spreadsheet
    console.log("\n1. Creating a support tracking spreadsheet...");
    try {
      const spreadsheetResult = await system.zapierCapabilities.spreadsheet.create(
        "Customer Support Tickets"
      );
      console.log("Support tracking spreadsheet created successfully!");
    } catch (error) {
      console.log("Spreadsheet demo skipped - requires configuration.");
    }
    
    // Example 2: Send a support response email
    console.log("\n2. Sending a support response email...");
    try {
      const emailResult = await system.zapierCapabilities.email.send(
        "customer@example.com",
        "Re: Login Issue - Resolution Steps",
        `Hello,

Thank you for contacting our support team about your login issue. Here are the steps to resolve the problem:

1. Clear your browser cache and cookies
2. Try using a different browser
3. Reset your password using the "Forgot Password" link

If you're still experiencing issues after trying these steps, please reply to this email with the error message you're seeing.

Best regards,
Customer Support Team`
      );
      console.log("Support response email sent successfully!");
    } catch (error) {
      console.log("Email demo skipped - requires configuration.");
    }
    
    // Example 3: Schedule a follow-up
    console.log("\n3. Scheduling a support follow-up...");
    try {
      const followupResult = await system.zapierCapabilities.calendar.createEvent(
        "Follow up with customer about login issue tomorrow at 2pm"
      );
      console.log("Follow-up scheduled successfully!");
    } catch (error) {
      console.log("Calendar demo skipped - requires configuration.");
    }
    
    console.log("\n=== Assistant Setup Complete ===");
    console.log("Your Customer Support Assistant is ready to use!");
    console.log(`Remember your Assistant ID for future use: ${system.assistant.id}`);
    
    return system.assistant;
  } catch (error) {
    console.error("Error creating customer support assistant:", error);
    throw error;
  }
}

/**
 * Main function to run assistant creation
 */
async function main() {
  try {
    // Choose which assistant to create
    console.log("=== AI Assistant Creator ===");
    console.log("1. Creating a Meeting Scheduler Assistant");
    const meetingAssistant = await createMeetingAssistant();
    
    console.log("\n2. Creating a Customer Support Assistant");
    const supportAssistant = await createCustomerSupportAssistant();
    
    console.log("\n=== All Assistants Created Successfully ===");
    console.log("Meeting Scheduler Assistant ID:", meetingAssistant.id);
    console.log("Customer Support Assistant ID:", supportAssistant.id);
    console.log("\nYou can now use these assistants in your applications!");
  } catch (error) {
    console.error("Error in main function:", error);
  }
}

// Check if we're running in Cursor with MCPs available
if (typeof mcp_ElevenLabs_create_agent === 'function' && 
    typeof mcp_Zapier_MCP_gmail_send_email === 'function') {
  console.log("MCP tools detected. Creating assistants...");
  main();
} else {
  console.error("⚠️ This script must be run in Cursor with ElevenLabs and Zapier MCPs enabled.");
  console.error("Please make sure both MCPs are enabled in your Cursor settings.");
} 