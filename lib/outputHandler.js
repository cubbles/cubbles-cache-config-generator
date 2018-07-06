(function () {
  const fs = require('fs-extra');
  const path = require('path');

  class OutputHandler {
    constructor () {
      this.defaultOutputFile = 'responseCahe.js';
    }

    async writeFile (outputPath, manifestList) {
      if (!outputPath) {
        outputPath = this.defaultOutputFile;
      }
      async function writeFile (outputPath, data) {
        let dir = path.dirname(outputPath);
        if (dir !== '.') {
          fs.ensureDir(dir);
        }
        return new Promise(function (resolve, reject) {
          fs.writeFile(outputPath, data, 'UTF-8', function (err) {
            if (err) reject(err);
            else resolve(data);
          });
        });
      }

      let data = JSON.stringify(manifestList, null, 2);
      data = data.replace(/'/g, '\\\'');
      data = data.replace(/"/g, '\'');
      data = 'window.cubx.CRCInit.responseCache = ' + data + ';\n';
      await writeFile(outputPath, data);
    }
  }
  module.exports = OutputHandler;
}());
