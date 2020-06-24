const utils = require('../utils');

(() => {
  const input = utils.getProcessArg('input') || utils.getProcessArg(0);
  const output = utils.getProcessArg('output') || utils.$path.join(input, '/png');

  if (!utils.$fs.existsSync(input)) {
    throw new Error('文件/文件夹不存在');
  }

  const stat = utils.$fs.statSync(input);

  if (stat.isDirectory()) {
    utils.$fs.mkdirSync(output, {recursive: true});

    utils.$fs.readdirSync(input).forEach(webp => {
      if (utils.isExt(webp, '.webp')) {
        const webpDir = utils.$path.join(input, webp);
        const pngDir = utils.$path.join(output, webp);
        // console.log(`dwebp "${webpDir}" -o "${utils.changeExt(pngDir, 'png')}"`);
        utils.run(`dwebp "${webpDir}" -o "${utils.changeExt(pngDir, 'png')}"`);
      }
    });
  } else {
    utils.run(`dwebp "${input}" -o "${utils.changeExt(input, 'png')}"`);
  }
})();
