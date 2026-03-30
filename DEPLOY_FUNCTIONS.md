# Firebase Functions — Deploy Guide

## One-time setup

```bash
# 1. Install Firebase CLI if not already
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Set secrets (Zoho SMTP credentials)
firebase functions:secrets:set ZOHO_USER
# Enter: info@talentwithus.com (or your Zoho email)

firebase functions:secrets:set ZOHO_PASS
# Enter: your Zoho app password

firebase functions:secrets:set ADMIN_EMAIL
# Enter: info@talentwithus.com (where admin notifications go)
```

## Deploy

```bash
# From the project root
firebase deploy --only functions
```

Functions deploy to **asia-south1 (Mumbai)** automatically.

## Functions included

| Function | Trigger | Sends email to |
|---|---|---|
| `onContactSubmission` | `contactSubmissions/{id}` | Admin + user confirmation |
| `onTalentApplication` | `talentApplications/{id}` | Admin + applicant confirmation |
| `onServiceInquiry` | `serviceInquiries/{id}` | Admin + user confirmation |
| `onOpenApplication` | `openApplications/{id}` | Admin + applicant confirmation |

## Zoho SMTP note

Uses `smtp.zoho.in` port 465. If your Zoho account is outside India, change host to `smtp.zoho.com`.
Generate an **App Password** in Zoho Mail settings → Security → App Passwords.
