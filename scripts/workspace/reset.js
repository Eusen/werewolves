const fs = require('fs');
const path = require('path');

(() => {
  function success(flag) {
    console.log('[reset]', flag, 'success.');
  }

  function node_modules(targetPath) {
    return {
      name: targetPath,
      path: path.join(__dirname, '../../node_modules', targetPath),
    };
  }

  function recursiveRead(targetDir = process.cwd(), callback = (path, name, ext) => {}, config = {match: /\w*/g}) {
    if (fs.statSync(targetDir).isDirectory()) {
      fs.readdirSync(targetDir).forEach(dir => {
        const subPath = path.join(targetDir, dir);
        recursiveRead(subPath, callback, config);
      });
    } else {
      if (!config.match.test(targetDir)) return;

      const ext = path.extname(targetDir);
      callback(targetDir, path.basename(targetDir, ext), ext);
    }
  }

  function resetLibrarySchematics() {
    const targetFile = node_modules('@schematics/angular/library/index.js');

    let targetFileContent = fs.readFileSync(targetFile.path).toString();

    targetFileContent = targetFileContent.replace(`scopeName = scope.replace(/^@/, '')`, `scopeName = scope`);

    fs.writeFileSync(targetFile.path, targetFileContent);

    success(targetFile.name);
  }

  resetLibrarySchematics();

  function removeFoolishPromise() {
    const targetFile = node_modules('sequelize/types/lib');

    recursiveRead(targetFile.path, (path, name, ext) => {
      let content = fs.readFileSync(path).toString();
      const promiseIndex = content.indexOf('import { Promise }');
      if (promiseIndex >= 0) {
        const endTokenIndex = content.indexOf(';', promiseIndex) + 1;
        content = content.replace(content.substring(promiseIndex, endTokenIndex), '');

        fs.writeFileSync(path, content);
      }
    }, {
      match: /\.d\.ts$/
    });

    success(targetFile.name + '/**/*.d.ts');
  }

  // removeFoolishPromise();
})();
