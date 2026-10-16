// Receives survey answers from the Jesus Loves You page and adds one row per response.
// Paste into Extensions → Apps Script of your responses Google Sheet (see SETUP.md).

const SHEET_NAME = "Responses";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // Header row: created on first response, extended if new fields appear later.
    let headers = sheet.getLastColumn() ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
    if (!headers.length) headers = ["received_at"];
    Object.keys(data).forEach(k => { if (!headers.includes(k)) headers.push(k); });
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
    sheet.setFrozenRows(1);

    const row = headers.map(h => h === "received_at" ? new Date() : String(data[h] ?? "").slice(0, 2000));
    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
