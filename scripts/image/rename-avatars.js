const utils = require('../utils');

(() => {
  const targetDir = utils.from('statics/assets/imgs/avatar');
  const {$fs, $path} = utils;

  const subPaths = $fs.readdirSync(targetDir).map(subDir => {
    const fullSubDir = $path.join(targetDir, subDir);
    const stat = $fs.statSync(fullSubDir);
    return stat.isDirectory() ? fullSubDir : null;
  }).filter(p => !!p);

  const avatarRes = subPaths.map((subPath, index) => {
    const avatarDirs = $fs.readdirSync(subPath);

    const avatarFiles = avatarDirs.map(avatarDir => {
      const fullSubDir = $path.join(subPath, avatarDir);
      const stat = $fs.statSync(fullSubDir);
      return stat.isFile() ? fullSubDir : null;
    }).filter(p => !!p).sort((a, b) => {
      a = parseInt($path.basename(a, $path.extname(a)));
      b = parseInt($path.basename(b, $path.extname(b)));
      if (isNaN(a)) {
        if (isNaN(b)) {
          return 0;
        } else {
          return 1;
        }
      } else {
        if (isNaN(b)) {
          return -1;
        } else {
          return a - b;
        }
      }
    });

    console.log(avatarFiles);

    const newFilePaths = avatarFiles.map((file, index) => {
      const newPath = $path.join($path.dirname(file), `${index}${$path.extname(file)}`);
      console.log(file, newPath);
      $fs.renameSync(file, newPath);
      return newPath;
    });

    return {
      name: '',
      index,
      files: newFilePaths.map(p => p.replace(utils.from('statics'), '').replace(/\\/g, '/')),
    };
  });

  $fs.writeFileSync($path.join(targetDir, 'r.json'), JSON.stringify(avatarRes));
})();
