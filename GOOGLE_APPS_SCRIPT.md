# Google Sheets Auto-Sync Setup

**TL;DR (Quick version):**
1. Generate secret: `openssl rand -hex 32` (or PowerShell command below)
2. Add to `.env.local`: `SHEETS_WEBHOOK_SECRET=your_secret`
3. Open Sheet → Extensions → Apps Script
4. Paste script from section 4 below
5. Update 3 config values (WEBHOOK_URL, WEBHOOK_KEY, SHEET_NAME)
6. Run `setupAutomaticSync()` once
7. Done! Auto-syncs every 30 min

---

## What Gets Synced?

| Column | Source | Example |
|--------|--------|---------|
| Visitor Name | Chat submission (optional) | "John Doe" |
| Email | Chat submission (optional) | "john@example.com" |
| IP Address | Server logs | "192.168.1.1" |
| Message Count | Total messages in conversation | 5 |
| Created At | Conversation start date | "2024-01-15" |
| Updated At | Last message date | "2024-01-16" |

## Setup Steps (5 minutes)

### 1. Create a Webhook Secret

First, generate a secure random string for webhook authentication:

```bash
# On Windows (PowerShell):
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})

# On Mac/Linux:
openssl rand -hex 32
```

Copy the output (looks like: `a3f4b2c8d9e1f6g7h8i9j0k1l2m3n4o5`)

### 2. Add to Environment

Add to your `.env.local`:

```env
SHEETS_WEBHOOK_SECRET=your_generated_secret_here
```

### 3. Create/Open Your Google Sheet

1. Go to your shared Google Sheet
2. Click **Extensions** → **Apps Script**
3. Delete any existing code
4. Paste the script below

### 4. Add the Apps Script

Copy and paste this code into your Apps Script editor:

```javascript
// Configuration (update these values)
const WEBHOOK_URL = "https://your-domain.com/api/webhook/sync-to-sheets";
const WEBHOOK_KEY = "your_webhook_secret_here"; // Must match SHEETS_WEBHOOK_SECRET
const SHEET_NAME = "Sheet1"; // Name of the tab to append data
const FETCH_LIMIT = 50; // Max conversations per sync

/**
 * Fetch unsynced conversations from MongoDB via webhook
 */
function fetchConversations() {
  const url = `${WEBHOOK_URL}?webhookKey=${encodeURIComponent(WEBHOOK_KEY)}&limit=${FETCH_LIMIT}`;
  
  try {
    const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    const result = JSON.parse(response.getContentText());
    
    if (response.getResponseCode() !== 200) {
      console.error("Webhook error:", result.error);
      return [];
    }
    
    console.log(`Fetched ${result.count} conversations`);
    return result.conversations || [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

/**
 * Append conversations to the sheet
 */
function syncToSheet() {
  const conversations = fetchConversations();
  
  if (conversations.length === 0) {
    console.log("No new conversations to sync");
    return;
  }
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error(`Sheet "${SHEET_NAME}" not found`);
  }
  
  // Ensure headers exist
  const lastRow = sheet.getLastRow();
  if (lastRow === 0) {
    const headers = [
      "Visitor Name",
      "Email",
      "IP Address",
      "Message Count",
      "Created At",
      "Updated At",
      "Synced At"
    ];
    sheet.appendRow(headers);
  }
  
  // Append data rows
  const now = new Date().toISOString();
  const rows = conversations.map(conv => [
    conv.visitorName,
    conv.visitorEmail,
    conv.visitorIP,
    conv.messageCount,
    conv.createdAt,
    conv.updatedAt,
    now
  ]);
  
  rows.forEach(row => sheet.appendRow(row));
  
  // Mark as synced in database
  try {
    const postUrl = `${WEBHOOK_URL}`;
    UrlFetchApp.fetch(postUrl, {
      method: "post",
      payload: JSON.stringify({
        webhookKey: WEBHOOK_KEY,
        count: conversations.length
      }),
      contentType: "application/json",
      muteHttpExceptions: true
    });
    
    console.log(`✓ Synced ${conversations.length} conversations`);
  } catch (error) {
    console.error("Couldn't mark synced, but data saved:", error);
  }
}

/**
 * Set up automatic sync trigger (runs every 30 minutes)
 */
function setupAutomaticSync() {
  // Remove existing triggers
  PropertiesService.getScriptProperties().deleteProperty("triggerSetup");
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() === "syncToSheet") {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // Create new trigger
  ScriptApp.newTrigger("syncToSheet")
    .timeBased()
    .everyMinutes(30)
    .create();
  
  console.log("✓ Automatic sync configured (every 30 minutes)");
  syncToSheet(); // Run once immediately
}

/**
 * Manually trigger sync from Google Sheet
 * (Usage: Open Sheet → Extensions → Macros → Sync Now)
 */
function syncNow() {
  syncToSheet();
}
```

### 5. Configure the Script

**In the Apps Script editor, update these 3 values at the top:**

```javascript
// ⬇️ CHANGE THESE 3 VALUES ⬇️

const WEBHOOK_URL = "https://your-domain.com/api/webhook/sync-to-sheets";
// Example: https://manish-solanki.vercel.app/api/webhook/sync-to-sheets
// Local testing: http://localhost:3000/api/webhook/sync-to-sheets

const WEBHOOK_KEY = "your_webhook_secret_here";
// Copy from your .env.local SHEETS_WEBHOOK_SECRET
// Example: a3f4b2c8d9e1f6g7h8i9j0k1l2m3n4o5

const SHEET_NAME = "Sheet1";
// Must match your sheet tab name (case-sensitive)
// Default is "Sheet1", change only if your tab has different name
```

**How to find your values:**
- ✅ **WEBHOOK_URL**: Your deployed website + `/api/webhook/sync-to-sheets`
- ✅ **WEBHOOK_KEY**: From `.env.local` (the secret you generated earlier)
- ✅ **SHEET_NAME**: The tab name at the bottom of your Google Sheet

### 6. Run Setup (One Time Only)

**In Apps Script editor:**

1. At the top, click the **function dropdown** (shows function names)
2. Select **`setupAutomaticSync`**
3. Click the **▶ Run** button
4. Google will ask for permissions:
   - Click **"Review permissions"**
   - Select your Google account
   - Click **"Allow"**

**What happens:**
- ✅ Automatic trigger created (every 30 minutes)
- ✅ First sync runs immediately
- ✅ Data appears in your Sheet

### 7. Verify It Works

**Check the trigger:**

1. In Apps Script, click **⏰ Triggers** (left sidebar)
2. You should see:
   - **syncToSheet** → **Time-driven** → **Every 30 minutes**

**Test manually (optional):**

1. In Apps Script function dropdown, select **`syncNow`**
2. Click **▶ Run**
3. Check your Google Sheet → new rows should appear

**On your chatbot:**

1. Open your portfolio
2. Click "Ask AI" button
3. Expand visitor info form (click dropdown arrow)
4. Enter your name and email
5. Send a message
6. Wait 30 min OR run `syncNow` to see it appear in Sheet

## Troubleshooting

### "Sheet not found" error

- Make sure `SHEET_NAME` matches exactly (including capitalization)
- Default is `Sheet1`

### "Cannot read property 'length'" error

- Your webhook endpoint returned an error
- Verify your `WEBHOOK_URL` is correct (test in browser)
- Check that `WEBHOOK_KEY` matches the `SHEETS_WEBHOOK_SECRET` in `.env.local`

### Sync not running automatically

- Check your **Project Triggers** (⏱️ icon in Apps Script)
- Click **Run** once manually in the editor
- Or use the macro from Extensions menu

## Manual Export Alternative

If you prefer manual exports:

1. Go to [`/admin/conversations`](http://localhost:3000/admin/conversations)
2. Click **Export All to Sheets**
3. A CSV file downloads
4. Open Google Sheet → **File** → **Import** → paste CSV data

## API Documentation

### GET /api/webhook/sync-to-sheets

Returns unsynced conversations.

**Query Parameters:**
- `webhookKey` (required): Your secret key
- `limit` (optional): Max results, default 50

**Response:**
```json
{
  "success": true,
  "conversations": [
    {
      "visitorName": "John Doe",
      "visitorEmail": "john@example.com",
      "visitorIP": "192.168.1.1",
      "messageCount": 5,
      "createdAt": "2024-01-15",
      "updatedAt": "2024-01-16"
    }
  ],
  "count": 1
}
```

### POST /api/webhook/sync-to-sheets

Mark conversations as synced (call after appending to sheet).

**Request Body:**
```json
{
  "webhookKey": "your_secret_key",
  "count": 1
}
```

**Response:**
```json
{
  "success": true,
  "synced": 1
}
```

## Questions?

- Check your `.env.local` has `SHEETS_WEBHOOK_SECRET`
- Verify webhook URL is publicly accessible
- Google Sheets API requires no special permissions (using Apps Script)
- Your Google Sheet must be shared for the Apps Script to access it
