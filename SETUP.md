# Collecting survey answers in Google Sheets (≈3 minutes, one time)

1. Go to https://sheets.new and name the sheet **Church Survey Responses**.
2. In the sheet: **Extensions → Apps Script**.
3. Delete what's there, paste everything from `apps-script/Code.gs`, and click 💾 Save.
4. Click **Deploy → New deployment** → gear icon ⚙️ → **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, then **Authorize access** and allow it. (If Google shows
   "unverified app", click *Advanced → Go to … (unsafe)*. It's your own script.)
6. Copy the **Web app URL**. It ends in `/exec`.
7. In `index.html`, paste it into `const SUBMIT_URL = "";`, then push to GitHub.

Each response appears as a new row in the **Responses** tab. Only people you
share the sheet with can see the answers; the web page can only *add* rows.
