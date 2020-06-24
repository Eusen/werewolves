require('ts-node').register({
  project: require('path').join(__dirname, '../tsconfig.lib.json')
});
require('../src/main');
