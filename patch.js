const fs = require('fs');
const path = '.open-next/server-functions/default/handler.mjs';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/await import\("C:[^"]+\.wasm"\)/g, '""');
fs.writeFileSync(path, content);
console.log('Patched handler.mjs');
