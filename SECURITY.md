# Security Policy

## Application Security

This application implements multiple layers of security to protect your data:

### Authentication & Access Control

1. **Password Protection**
   - The app requires authentication to access notes
   - Password is stored in environment variables (not in database)
   - JWT-based session management with 7-day expiration
   - HttpOnly cookies prevent XSS attacks
   - Middleware protects all sensitive routes

2. **Session Security**
   - Secure session tokens using JWT (JSON Web Tokens)
   - Sessions encrypted with a strong secret key
   - Automatic session expiration after 7 days
   - Server-side session validation

3. **Best Practices for Passwords**
   - Use a strong, unique password for `APP_PASSWORD`
   - Minimum 12 characters recommended
   - Include uppercase, lowercase, numbers, and symbols
   - Never share your password or commit it to version control

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

Authentication & Sessions:
- [ ] Strong `APP_PASSWORD` configured (12+ characters)
- [ ] Unique `JWT_SECRET` generated (32+ random characters)
- [ ] Sessions use secure cookies in production (HTTPS)
- [ ] Password not shared or committed to version control

API Keys & Credentials:
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
