const fs = require('fs');
const path = require('path');

function resetLog(flag) {
  console.log(flag, 'reset success.')
}

function resetLibrarySchematics() {
  const targetFile = path.join(__dirname, '../../node_modules/@schematics/angular/library/index.js');

  let targetFileContent = fs.readFileSync(targetFile).toString();

  targetFileContent = targetFileContent.replace(`scopeName = scope.replace(/^@/, '')`, `scopeName = scope`);

  fs.writeFileSync(targetFile, targetFileContent);

  resetLog('@schematics/angular/library/index.js');
}

resetLibrarySchematics();
