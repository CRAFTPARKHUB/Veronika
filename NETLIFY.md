# Deploying to Netlify

This document provides instructions for deploying the AI Voice Assistant project to Netlify.

## Prerequisites

- A Netlify account
- Git repository with your project

## Deployment Steps

1. **Push your code to a Git repository**
   
   Make sure your code is in a Git repository (GitHub, GitLab, or Bitbucket).

2. **Log in to Netlify**
   
   Go to [https://app.netlify.com/](https://app.netlify.com/) and log in to your account.

3. **Create a new site**
   
   Click on "New site from Git" and select your Git provider.

4. **Select your repository**
   
   Find and select the repository containing your AI Voice Assistant project.

5. **Configure build settings**
   
   - Build command: `npm run build`
   - Publish directory: `public`
   
   These settings are already configured in the `netlify.toml` file.

6. **Deploy the site**
   
   Click "Deploy site" to start the deployment process.

## Environment Variables

You may need to set environment variables in Netlify for your Zapier MCP endpoint:

1. Go to Site settings > Build & deploy > Environment
2. Add a variable named `ZAPIER_MCP_ENDPOINT` with your Zapier MCP endpoint URL

## Custom Domain

To set up a custom domain:

1. Go to Site settings > Domain management
2. Click "Add custom domain"
3. Follow the instructions to configure your domain

## Troubleshooting

If you encounter the "Page not found" error:

1. Make sure your `netlify.toml` file is correctly configured
2. Check that the `public` directory contains your `index.html` file
3. Verify that redirects are properly set up in `netlify.toml`
4. Check the Netlify deployment logs for any build errors

## Important Note

This frontend website is primarily an informational page. The actual functionality of creating voice assistants and using Zapier/ElevenLabs MCPs requires running the code in Cursor IDE as explained in the main README.md file. 