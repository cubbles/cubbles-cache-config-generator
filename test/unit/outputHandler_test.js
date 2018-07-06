/* globals describe, before, after, beforeEach, afterEach, it */
(function () {
  'use strict';
  const fs = require('fs-extra');
  const path = require('path');
  const OutputHandler = require('../../lib/outputHandler');

  describe('OutputHandler', () => {
    let outputPath;
    let outputHandler;
    before(() => {
      outputPath = 'test/tmp/';
    });
    after((done) => {
      // erzeugte files löschen
      fs.emptyDir(outputPath).then(() => {
        fs.rmdir(outputPath, (err) => {
          if (err) {
            console.error(err);
          }
          outputPath = null;
          done();
        });
      }).catch((err) => {
        console.error(err);
        outputPath = null;
        done();
      });
    });
    beforeEach(() => {
      outputHandler = new OutputHandler();
    });
    afterEach(() => {
      outputHandler = null;
    });
    describe('#writeFile', () => {
      it('should write a js file', async () => {
        const filePath = path.join(outputPath, 'test.js');
        await outputHandler.writeFile(filePath, [{webpackageId: 'example@1.2'}, {webpacakgeId: 'second@2.3'}]);
        const exists = await fs.pathExists(filePath);
        exists.should.be.true;
      });
    });
  });
}());
