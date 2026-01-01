# Deployment Guide

Complete guide to deploy your AI Note-Taking App to Vercel with Supabase database.

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Supabase account (sign up at https://supabase.com)
- Google Gemini API key

## Step 1: Set Up Supabase Database

### 1.1 Create a New Project

1. Go to https://supabase.com
2. Click "New Project"
3. Fill in the details:
   - **Name**: `ai-notes` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait for the project to be created (~2 minutes)

### 1.2 Get Database Connection String

1. In your Supabase project dashboard, click on "Project Settings" (gear icon)
2. Navigate to "Database" in the left sidebar
3. Scroll down to "Connection string"
4. Select "URI" tab
5. Copy the connection string (looks like: `postgresql://postgres:[YOUR-PASSWORD]@...`)
6. **Important**: Replace `[YOUR-PASSWORD]` with your actual database password

Example connection string:
```
postgresql://postgres.xxxxxxxxxxxxx:YourPassword@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### 1.3 Connection Pooler (Important for Vercel)

For serverless deployments (like Vercel), use the **pooler** connection:
1. In Supabase, go to "Database" → "Connection string"
2. Select "URI" tab
3. Make sure it shows the **pooler** URL (port 6543)
4. This is the URL you'll use as `DATABASE_URL`

## Step 2: Push Code to GitHub

### 2.1 Commit All Changes

```bash
git add -A
git commit -m "feat: Configure for Supabase and Vercel deployment"
git push origin claude/ai-note-taking-app-y60WU
```

### 2.2 Create Main Branch (if needed)

If you want to deploy from main branch:
```bash
git checkout -b main
git push origin main
```

## Step 3: Deploy to Vercel

### 3.1 Import Project

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository: `Note-Taking-App`
4. Click "Import"

### 3.2 Configure Project

1. **Framework Preset**: Next.js (auto-detected)
2. **Root Directory**: `.` (leave default)
3. **Build Command**: Leave default (uses package.json)
4. **Output Directory**: Leave default

### 3.3 Add Environment Variables

Click on "Environment Variables" and add these **one by one**:

#### 1. DATABASE_URL
```
Name: DATABASE_URL
Value: <Your Supabase connection string from Step 1.2>
```
Example:
```
postgresql://postgres.xxxxxxxxxxxxx:YourPassword@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

#### 2. GOOGLE_API_KEY
```
Name: GOOGLE_API_KEY
Value: AIzaSyA0Ol-0jPySpjfxEYuxIU0YResE33MKQXI
```
(Or your own Google Gemini API key)

#### 3. APP_PASSWORD
```
Name: APP_PASSWORD
Value: MySecureNotes2024!
```
(Or create your own secure password)

#### 4. JWT_SECRET
```
Name: JWT_SECRET
Value: 7a8f3e2c9d1b4a6e5f8c3b2a9d7e6f4c1a8b5e3d2f9c6a4b7e1d8f5c3a6b9e2d
```
(Or generate a new random 32+ character string)

**To generate a new JWT_SECRET:**
```bash
openssl rand -hex 32
```

### 3.4 Deploy

1. After adding all environment variables, click "Deploy"
2. Wait for deployment (2-3 minutes)
3. Vercel will:
   - Install dependencies
   - Generate Prisma client
   - Run database migrations
   - Build your Next.js app
   - Deploy to their edge network

## Step 4: Run Database Migrations

After first deployment, you need to initialize the database:

### Option 1: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Link to your project
vercel link

# Run migrations
vercel env pull .env.production
npx prisma migrate dev --name init
```

### Option 2: Manual Migration via Supabase

1. Go to your Supabase project
2. Click on "SQL Editor"
3. Run this SQL:

```sql
-- Create notes table
CREATE TABLE "Note" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL DEFAULT '',
  "content" TEXT NOT NULL DEFAULT '',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "tags" TEXT[],
  "category" TEXT,
  "isPinned" BOOLEAN NOT NULL DEFAULT false
);

-- Create index for better performance
CREATE INDEX "Note_isPinned_idx" ON "Note"("isPinned");
CREATE INDEX "Note_updatedAt_idx" ON "Note"("updatedAt");
```

## Step 5: Access Your Deployed App

1. Vercel will give you a URL like: `https://your-app-name.vercel.app`
2. Visit the URL
3. You'll see the login page
4. Enter your `APP_PASSWORD`
5. Start taking notes with AI! 🎉

## Step 6: Custom Domain (Optional)

### 6.1 Add Custom Domain

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### 6.2 Update DNS

Add these records to your domain:
- **Type**: CNAME
- **Name**: `@` or `www`
- **Value**: `cname.vercel-dns.com`

## Troubleshooting

### Database Connection Issues

**Error**: "Can't reach database server"
- Check if your Supabase connection string is correct
- Ensure you're using the **pooler** connection (port 6543)
- Verify password is correct (no special URL encoding needed)

**Error**: "Prisma Client not generated"
- Make sure `postinstall` script runs during build
- Check Vercel build logs
- Manually trigger: `npx prisma generate`

### Authentication Issues

**Error**: "Invalid JWT Secret"
- Ensure `JWT_SECRET` is at least 32 characters
- Check for typos in environment variables
- Redeploy after fixing

### AI Features Not Working

**Error**: "Google API key not configured"
- Verify `GOOGLE_API_KEY` is set in Vercel
- Check if API key is valid in Google AI Studio
- Ensure API key has Gemini API enabled

## Security Best Practices

### Production Environment

✅ **Do This**:
- Use strong, unique passwords
- Enable API key restrictions in Google AI Studio
- Set up billing alerts
- Use environment variables for all secrets
- Enable HTTPS (automatic on Vercel)
- Different API keys for dev/prod

❌ **Don't Do This**:
- Share your `APP_PASSWORD`
- Commit `.env` file to git
- Use weak passwords
- Expose API keys in client code
- Share database credentials

## Monitoring & Maintenance

### Vercel Dashboard

Monitor your app:
- **Analytics**: Traffic and performance
- **Logs**: Runtime and build logs
- **Deployments**: History and rollback options

### Supabase Dashboard

Monitor your database:
- **Table Editor**: View/edit notes
- **Database**: Connection pooling stats
- **API**: Usage and performance
- **Logs**: Database queries

### Updates & Redeployment

To update your app:
```bash
git add -A
git commit -m "your update message"
git push origin main
```

Vercel will automatically redeploy! 🚀

## Cost Estimation

### Free Tier Limits

**Vercel (Hobby Plan)**:
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Edge network

**Supabase (Free Plan)**:
- ✅ 500 MB database
- ✅ 1 GB file storage
- ✅ 2 GB bandwidth
- ✅ 50 MB file uploads

**Google Gemini API**:
- ✅ Free quota available
- ✅ Pay-as-you-go after quota
- ⚠️ Monitor usage to avoid charges

## Support

If you encounter issues:
1. Check Vercel build logs
2. Check Supabase logs
3. Review this deployment guide
4. Check SECURITY.md for security issues

## Next Steps

After successful deployment:
- [ ] Test all features
- [ ] Set up custom domain
- [ ] Configure API restrictions
- [ ] Set up monitoring alerts
- [ ] Create backup strategy
- [ ] Share with users!

Your AI Note-Taking App is now live! 🎉
