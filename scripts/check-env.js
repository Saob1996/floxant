const fs = require('fs');
const path = require('path');
const logPath = path.resolve(__dirname, 'env_check.log');
fs.writeFileSync(logPath, `CWD: ${process.cwd()}\nDIRNAME: ${__dirname}\nNODE_VERSION: ${process.version}\n`);
console.log('Env check complete');
