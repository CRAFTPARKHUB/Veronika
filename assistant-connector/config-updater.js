/**
 * Configuration Updater for Zapier MCP Endpoint
 * 
 * This utility allows you to update the Zapier MCP endpoint URL
 * in the assistant manager configuration.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Path to the assistant manager file
const ASSISTANT_MANAGER_PATH = path.join(__dirname, 'assistant-manager.js');

/**
 * Updates the Zapier MCP endpoint in the assistant manager configuration
 * @param {string} newEndpoint - The new Zapier MCP endpoint URL
 */
function updateZapierEndpoint(newEndpoint) {
  if (!newEndpoint || typeof newEndpoint !== 'string') {
    throw new Error('Invalid Zapier MCP endpoint URL');
  }
  
  if (!newEndpoint.startsWith('https://')) {
    throw new Error('Zapier MCP endpoint must be a secure HTTPS URL');
  }
  
  try {
    // Read the assistant manager file
    let content = fs.readFileSync(ASSISTANT_MANAGER_PATH, 'utf8');
    
    // Replace the Zapier MCP URL
    content = content.replace(
      /zapierMcpUrl: ".*"/,
      `zapierMcpUrl: "${newEndpoint}"`
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(ASSISTANT_MANAGER_PATH, content, 'utf8');
    
    console.log(`Zapier MCP endpoint updated to: ${newEndpoint}`);
    return true;
  } catch (error) {
    console.error(`Error updating Zapier MCP endpoint: ${error.message}`);
    return false;
  }
}

/**
 * Interactive command-line interface for updating the Zapier MCP endpoint
 */
function runInteractive() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  // Get the current endpoint from the file
  try {
    const content = fs.readFileSync(ASSISTANT_MANAGER_PATH, 'utf8');
    const match = content.match(/zapierMcpUrl: "(.*)"/);
    const currentEndpoint = match ? match[1] : 'Not found';
    
    console.log(`Current Zapier MCP endpoint: ${currentEndpoint}`);
  } catch (error) {
    console.error(`Error reading current endpoint: ${error.message}`);
  }
  
  rl.question('Enter new Zapier MCP endpoint URL: ', (answer) => {
    try {
      if (updateZapierEndpoint(answer)) {
        console.log('Configuration updated successfully!');
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
    rl.close();
  });
}

// Export functions
module.exports = {
  updateZapierEndpoint
};

// If run directly, start interactive mode
if (require.main === module) {
  console.log('=== Zapier MCP Endpoint Configuration ===');
  runInteractive();
} 