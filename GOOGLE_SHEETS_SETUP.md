# Google Sheets Integration — Setup Guide

## 1. Open the Google Apps Script Editor

1. Go to https://script.google.com
2. Click **New project**
3. Rename the project (e.g. `TMS Prospect Receiver`)

## 2. Paste the Apps Script Code

Replace the default `Code.gs` content with:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp
    .openById('1h2H0YbtJdyH76QeS_EvLovapcOlcKR7T8-iOZq2ziOM')
    .getActiveSheet();

  var data = JSON.parse(e.postData.contents);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Sales ID', 'Customer Name', 'Phone', 'Source',
      'Marketing Program', 'KTP Number', 'Address', 'Birthdate', 'Submitted At'
    ]);
  }

  sheet.appendRow([
    data.salesId,
    data.customerName,
    data.phone,
    data.source,
    data.marketingProgram || '',
    data.ktpNumber        || '',
    data.address          || '',
    data.birthdate        || '',
    data.submittedAt,
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Deploy as a Web App

1. Click **Deploy → New deployment**
2. Click the gear icon → select **Web app**
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/AKfy.../exec`)

## 4. Paste the URL into the React App

Open `src/utils/googleSheets.js` and replace:

```js
export const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
```

with your real deployed URL.

## 5. Grant Permissions

The first time you deploy, Google will ask you to authorise the script to access
your Spreadsheet. Click **Review permissions → Allow**.
