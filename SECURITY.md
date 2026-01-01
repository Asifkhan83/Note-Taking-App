# Security Policy

## Protecting Your API Keys

This application uses sensitive API keys that must be protected. Follow these security best practices:

### Environment Variables

1. **Never commit `.env` files to version control**
   - The `.env` file contains your actual API keys
   - It's already included in `.gitignore` - DO NOT remove it
   - Only commit `.env.example` as a template

2. **Use `.env.example` as a template**
   - Copy `.env.example` to `.env`
   - Fill in your actual API keys in `.env`
   - Keep `.env.example` updated with new variables (without real values)

3. **Rotate API keys regularly**
   - If you suspect a key has been compromised, rotate it immediately
   - Update your `.env` file with the new key
   - Revoke the old key in Google AI Studio

### API Key Security

#### Google Gemini API Key

Your API key is configured with professional security measures:

- ✅ Stored in `.env` file (excluded from git)
- ✅ Only accessible via environment variables
- ✅ Never exposed in client-side code
- ✅ Only used in server-side API routes

#### Best Practices

1. **Restrict API Key Usage**
   - In Google AI Studio, restrict your API key to specific domains/IP addresses
   - Enable only the APIs you need (Gemini API)
   - Set usage quotas to prevent unexpected charges

2. **Monitor API Usage**
   - Regularly check your Google Cloud Console for unusual activity
   - Set up billing alerts
   - Review API usage logs

3. **Production Deployment**
   - Use environment variables in your hosting platform (Vercel, Netlify, etc.)
   - Never hardcode API keys in your source code
   - Use different API keys for development and production

### Deployment Security Checklist

- [ ] `.env` is in `.gitignore`
- [ ] API keys are set in hosting platform's environment variables
- [ ] API key restrictions are configured in Google AI Studio
- [ ] Usage quotas are set
- [ ] Billing alerts are configured
- [ ] Different keys for dev/staging/production

## Reporting Security Issues

If you discover a security vulnerability, please email [your-email@example.com] instead of opening a public issue.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Additional Resources

- [Google AI API Key Best Practices](https://ai.google.dev/docs/api_key_best_practices)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
