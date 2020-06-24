const utils = require('../utils');

class GoogleFontLoader {
  constructor(config) {
    this.rootPath = config ? config.rootPath : __dirname;
  }

  strict() {
    this.isStrict = true;
  }

  async loadFonts(fontNames = []) {
    for (let i = 0; i < fontNames.length; i++) {
      const fontName = fontNames[i];
      await this.loadFont(fontName);
    }
  }

  async loadFont(fontName = '', url = '') {
    console.log(fontName, '开始加载');

    const fontDirName = this.convertFontName(fontName, {lower: true});
    const fontDir = utils.$path.join(this.rootPath, fontDirName);
    const cssPath = utils.$path.join(fontDir, `${fontDirName}.css`);

    if (this.isStrict) {
      // 先把多余的内容删掉
      utils.$fs.rmdirSync(fontDir, {recursive: true});
    } else if (utils.$fs.existsSync(cssPath)) {
      console.log(fontName, '已加载，自动略过');
      return;
    }

    // 创建新的
    utils.$fs.mkdirSync(fontDir, {recursive: true});

    let css = await this.loadCSS(fontName, url);
    const urls = css.match(/url\(([\s\S]*?)\)/g).map(url => url.replace('url(', '').replace(')', ''));

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      css = css.replace(url, `./${utils.$path.basename(url)}`);
      const filePath = utils.$path.join(fontDir, utils.$path.basename(url));
      await utils.request(url, {writeIn: filePath});
    }

    // 把css文件存上
    utils.$fs.writeFileSync(cssPath, css);

    console.log(fontName, '加载完毕');
  }

  loadCSS(fontName = '', url = '') {
    if (!url) {
      const flag = this.convertFontName(fontName, {separator: '+'});
      url = `http://fonts.googleapis.com/css2?family=${flag}&display=swap`;
    }
    return utils.request(url, {simulate: true});
  }

  convertFontName(fontName = '', options) {
    let names = fontName.split(' ');
    if (options.lower) {
      names = names.map(n => n.toLowerCase())
    }
    return names.join(options.separator || '_');
  }
}

// 谷歌字体加载器
(async () => {
  const GoogleFonts = [
    // 英文字体
    'Metal Mania',
    'Piedra',
    'Pacifico',
    'Special Elite',
    'Marcellus SC',
    // 中文字体
    'ZCOOL XiaoWei',
    'ZCOOL KuaiLe',
    'Ma Shan Zheng',
    'Noto Sans SC',
    'ZCOOL QingKe HuangYou',
  ];

  const googleFontLoader = new GoogleFontLoader({
    rootPath: utils.$path.join(__dirname, '../../statics/assets/fonts/google/'),
  });

  await googleFontLoader.loadFonts(GoogleFonts);
  await googleFontLoader.loadFont('Material Icons', 'http://fonts.googleapis.com/icon?family=Material+Icons&display=block');
})();
