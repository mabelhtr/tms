// Replace YOUR_SCRIPT_ID with the ID from your deployed Apps Script Web App.
export const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'

export async function postToGoogleSheets(data) {
  const response = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (response.type !== 'opaque' && !response.ok) {
    throw new Error(`Server error: ${response.status}`)
  }
}
