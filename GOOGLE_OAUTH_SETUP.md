# Google OAuth Setup Guide

This guide explains how to set up Google OAuth for the Next Zen AI careers application system.

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your Project ID

## Step 2: Enable Google OAuth API

1. Go to **APIs & Services** → **Library**
2. Search for "Google Identity" or "Google+ API"
3. Click **Enable**

## Step 3: Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Select **External** (for all Google users)
3. Fill in the required fields:
   - **App name**: Next Zen AI Careers
   - **User support email**: hr@nextzenaistrategix.com
   - **Developer contact email**: your email
4. Click **Save and Continue**
5. Add scopes: `email`, `profile`, `openid`
6. Add test users if in testing mode
7. Complete the setup

## Step 4: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Select **Web application**
4. **Name**: Next Zen AI Web Client
5. **Authorized JavaScript origins**:
   ```
   http://localhost:3000
   https://your-domain.com
   ```
6. **Authorized redirect URIs**:
   ```
   http://localhost:3000/auth/callback
   https://your-domain.com/auth/callback
   https://qhgtobzpuijeqsfmzjhw.supabase.co/auth/v1/callback
   ```
7. Click **Create**
8. Copy the **Client ID** and **Client Secret**

## Step 5: Configure Supabase

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard/project/qhgtobzpuijeqsfmzjhw)
2. Go to **Authentication** → **Providers**
3. Find **Google** and click to expand
4. Toggle **Enable Sign in with Google**
5. Enter your **Client ID** and **Client Secret** from Google Cloud
6. Click **Save**

## Step 6: Configure Redirect URLs

In Supabase Dashboard:

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL**: `https://your-domain.com` (or `http://localhost:3000` for dev)
3. Add **Redirect URLs**:
   ```
   http://localhost:3000/auth/callback
   https://your-domain.com/auth/callback
   ```

## Step 7: Test the Integration

1. Start your development server: `npm run dev`
2. Go to `/careers`
3. Click on any job → Apply
4. Click "Continue with Google"
5. Sign in with your Google account
6. You should be redirected back to the application form

## Troubleshooting

### "Error 400: redirect_uri_mismatch"
- Check that the redirect URI in Google Cloud matches exactly
- Include the Supabase callback URL: `https://your-project-ref.supabase.co/auth/v1/callback`

### "Access blocked: App not verified"
- Add yourself as a test user in Google Cloud Console
- Or submit your app for verification

### User data not appearing
- Check that you've requested the correct scopes (email, profile)
- Verify the user exists in Supabase Auth → Users

## Required Credentials Summary

You need to provide these to Supabase:

| Field | Where to Get It |
|-------|-----------------|
| Client ID | Google Cloud Console → Credentials → OAuth 2.0 Client IDs |
| Client Secret | Same location as Client ID |

## Security Notes

- Never commit Client Secret to version control
- Use environment variables for sensitive data
- Enable 2FA on your Google Cloud account
- Regularly rotate credentials

## Next Steps

After setting up Google OAuth:

1. Test the full application flow
2. Verify applications are being stored in Supabase
3. Check that resumes are being uploaded to storage
4. Test the admin applications page

