/**
 * AI Voice Assistant with ElevenLabs and Zapier Integration
 * Main JavaScript functionality
 */

// Load saved Zapier endpoint from local storage when page loads
document.addEventListener('DOMContentLoaded', function() {
    const savedEndpoint = localStorage.getItem('zapierEndpoint');
    if (savedEndpoint) {
        document.getElementById('zapierEndpoint').value = savedEndpoint;
    }
});

/**
 * Updates the Zapier MCP endpoint in local storage
 */
function updateZapierEndpoint() {
    const endpoint = document.getElementById('zapierEndpoint').value;
    if (!endpoint) {
        alert('Please enter a valid Zapier MCP endpoint');
        return;
    }
    
    // Simple validation for the endpoint format
    if (!endpoint.startsWith('https://')) {
        alert('Zapier MCP endpoint must be a secure HTTPS URL');
        return;
    }
    
    // Save to local storage
    localStorage.setItem('zapierEndpoint', endpoint);
    alert('Zapier endpoint updated successfully!');
    
    // Update UI to show it's been saved
    const configElement = document.querySelector('.zapier-config');
    const savedText = document.createElement('p');
    savedText.className = 'success-message';
    savedText.textContent = 'Endpoint saved! It will be used when running in Cursor.';
    
    // Remove any existing success messages
    const existingMessages = configElement.querySelectorAll('.success-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Add the new message
    configElement.appendChild(savedText);
} 