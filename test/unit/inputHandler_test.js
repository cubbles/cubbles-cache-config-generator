/* globals describe, beforeEach, afterEach, it, expect, Error */
(function () {
  'use strict';
  describe('InputHandler', () => {
    let inputHandler;
    beforeEach(() => {
      const InputHandler = require('../../lib/inputHandler');
      inputHandler = new InputHandler();
    });
    afterEach(() => {
      inputHandler = null;
    });
    describe('#get', () => {
      afterEach(() => {
        inputHandler = null;
      });
      it('should pass the object, if input is a valid JSON', async () => {
        const array = [ { 'webpackageId': 'com.incowia.ajax@0.2.6', 'artifactId': 'ajax-request' } ];
        const json = JSON.stringify(array);
        let result = await inputHandler.get(json);
        expect(result).to.be.not.empty;
        result.should.be.eql(array);
      });
      it('should rejected, if input is a not valid JSON', async () => {
        const array = [ { 'webpackageId': 'com.incowia.ajax@0.2.6', 'artifactId': 'ajax-request' }, 'Bla' ];
        const json = JSON.stringify(array);
        await expect(inputHandler.get(json)).to.be.rejected;
      });

      it('should read from a file if the parameter is a path', async () => {
        const path = 'test/input/artifactArray.json';
        let result = await inputHandler.get(path);
        expect(result).to.be.not.empty;
        result.should.be.eql([
          {
            webpackageId: 'com.incowia.ajax@0.2.6',
            artifactId: 'ajax-request'
          }
        ]);
      });
      it('should be rejected, if the parameter is not a valid path', async () => {
        const path = 'test/input/artifactArray-xxx.json';
        await expect(inputHandler.get(path)).to.be.rejectedWith(Error);
      });
      it('should be rejected, if the parameter is a valid path, but not valid content', async () => {
        const path = 'test/input/artifactArray-error.json';
        await expect(inputHandler.get(path)).to.be.rejectedWith(Error);
      });
    });
    describe('#_checkInputArray', () => {
      it('should get the input value, if this have correct syntax', async () => {
        let input = [
          {
            artifactId: 'my-component',
            webpackageId: 'my-package@1.2.3'
          },
          {
            artifactId: 'other-component',
            webpacakgeId: 'other-package@1.0.0'
          }
        ];
        let result = await inputHandler._checkInputArray(input);
        result.should.be.eql(input);
      });
      it('should throw an exception if ths not have a correct syntax', async () => {
        let input = '';
        await inputHandler._checkInputArray(input).should.be.rejected;
      });
    });
    describe('#_readFile', () => {
      it('should read the file, if the parameter is correct path', async () => {
        const inputPath = 'test/input/artifactArray.json';
        let result = await inputHandler._readFile(inputPath);
        result.should.be.an('array');
      });
      it('should be rejected, if the input not a valid path', async () => {
        const inputPath = 'xxx';
        await inputHandler._readFile(inputPath).should.be.rejected;
      });
    });
  });
}());
