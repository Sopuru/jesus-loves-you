// Usage:
//   node make-qr.js                  -> QR that shows the text "JESUS LOVES YOU"
//   node make-qr.js https://your.url -> QR that opens your hosted index.html page
const QRCode = require('qrcode');

const target = process.argv[2] || 'JESUS LOVES YOU';
const name = process.argv[2] ? 'qr-page' : 'qr-text';
const opts = { errorCorrectionLevel: 'H', margin: 2, width: 1000 };

(async () => {
  await QRCode.toFile(`${name}.png`, target, opts);
  await QRCode.toFile(`${name}.svg`, target, { ...opts, type: 'svg' });
  console.log(`Saved ${name}.png and ${name}.svg -> ${target}`);
})();
