const utils = require('../utils');
const {$fs, $path} = utils;

(() => {
  const csPath = utils.from('@common/werewolves/src/services-game/core.service.ts');
  let csContent = $fs.readFileSync(csPath).toString();
  csContent = [
    registerImages,
    registerFonts,
    registerAudios,
  ].reduce((content, fn) => {
    return fn(content);
  }, csContent);
  $fs.writeFileSync(csPath, csContent);
  console.log('# 资源注册成功');
})();

function $deepReader(path, handler, root = path) {
  return $fs.readdirSync(path).reduce((res, dir) => {
    const dirPath = $path.join(path, dir);
    const stat = $fs.statSync(dirPath);
    if (stat.isDirectory()) {
      res = [...res, ...$deepReader(dirPath, handler, root)];
    } else {
      const filePath = dirPath.replace(root, '').replace(/\\/g, '/');
      const r = handler(filePath);
      r && res.push(r);
    }
    return res;
  }, []);
}

function registerImages(content) {
  const images = content.match(/images start\n([\s\S]+)\/\/ images end/g)[0];

  const imageDirs = [
    utils.from('@apps/werewolves/src/assets/imgs'),
  ];

  const resLines = imageDirs.reduce((res, dir) => {
    return [
      ...res,
      ...$deepReader(dir, (filePath) => {
        let fileKey = filePath.split('/').filter(d => !!d).join('_');
        fileKey = $path.basename(fileKey, $path.extname(fileKey));
        return `    ${fileKey}: assets.imgPair('${filePath}')`;
      })
    ];
  }, []);

  return content.replace(images, `images start\n  return {\n${resLines.join(',\n')}\n  };\n  // images end`);
}

function registerFonts(content) {
  const fonts = content.match(/fonts start\n([\s\S]+)\/\/ fonts end/g)[0];

  const fontDirs = [
    utils.from('statics/assets/fonts'),
  ];

  const resLines = fontDirs.reduce((res, dir) => {
    return [
      ...res,
      ...$deepReader(dir, (filePath) => {
        if ($path.extname(filePath) === '.css') {
          const fileKey = $path.basename(filePath, '.css');
          return `    ${fileKey}: {name: '${fileKey}', url: assets.font('${filePath}')}`;
        }
      }),
    ]
  }, []);

  return content.replace(fonts, `fonts start\n  return {\n${resLines.join(',\n')}\n  };\n  // fonts end`);
}

function registerAudios(content) {
  const audios = content.match(/audios start\n([\s\S]+)\/\/ audios end/g)[0];

  const audioDirs = [
    utils.from('@apps/werewolves/src/assets/audios'),
  ];

  const resLines = audioDirs.reduce((res, dir) => {
    return [
      ...res,
      ...$deepReader(dir, (filePath, root) => {
        let fileKey = filePath.split('/').filter(d => !!d).join('_');
        fileKey = $path.basename(fileKey, $path.extname(fileKey));
        return `    ${fileKey}: assets.audio('${filePath}')`;
      }),
    ]
  }, []);

  return content.replace(audios, `audios start\n  return {\n${resLines.join(',\n')}\n  };\n  // audios end`);
}
