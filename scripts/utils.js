exports.$fs = require('fs');
exports.$path = require('path');
exports.$child_process = require('child_process');
exports.$http = require('http');
exports.$http2 = require('http2');
exports.$stream = require('stream');

exports.request = function (url, options) {
  return new Promise((resolve, reject) => {
    options = options || {};

    if (options.simulate) {
      options.headers = options.headers || {};
      options.headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4128.3 Safari/537.36';
    }

    if (options.writeIn) {
      options.writer = new this.$fs.createWriteStream(options.writeIn);
    }

    this.$http.get(url, options, resp => {
      const chunks = [];
      resp.on("data", chunk => {
        chunks.push(chunk);
        if (options.writer) options.writer.write(chunk);
      });
      resp.on("end", () => {
        resolve(chunks.join(''));
        if (options.writer) options.writer.close();
      });
      resp.on("error", err => {
        reject(err);
      });
    });
  })
}

exports.getProcessArg = function(name) {
  if (typeof name == "number") {
    return process.argv[name + 2];
  } else {
    for (let i = 2; i < process.argv.length; i++) {
      const arg = process.argv[i];
      if (arg.startsWith(`--${name}=`)) {
        return arg.replace(`--${name}=`, '');
      }

      if (arg.startsWith(`--${name}`)) {
        return process.argv[i + 1];
      }
    }
  }
}

exports.isExt = function(path, ext) {
  return this.$path.extname(path).endsWith(ext);
}

exports.changeExt = function(path, newExt) {
  return this.$path.join(this.$path.dirname(path), `${this.$path.basename(path, this.$path.extname(path))}.${newExt.replace('.', '')}`)
}

exports.run = function (cmd) {
  return this.$child_process.spawn(cmd, {
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: true,
  });
}

exports.from = function (path) {
  return this.$path.join(__dirname, '..', path);
}
