(function () {
  const Ajv = require('ajv');
  const fs = require('fs-extra');
  const path = require('path');
  class InputHandler {
    async get (input) {
      if (!input) {
        throw new Error('No input parameter.');
      }
      if (typeof input === 'string') {
        if (input.startsWith('[')) {
          input = JSON.parse(input);
        } else {
          input = await this._readFile(input);
        }
      }
      if (typeof input === 'object') {
        return this._checkInputArray(input);
      } else {
        throw new SyntaxError('The input correspond not to a artifact array. Please get an object like this: [{"artifactId": "my-artifact", "webpacakgeId": "my-webpackage@1.0"}]');
      }
    }
    async _readFile (inputPath) {
      try {
        return fs.readJson(inputPath);
      } catch (error) {
        throw new Error('Can not read the file ' + inputPath + '.');
      }
    };

    async _checkInputArray (input) {
      let schemaPath = path.join(__dirname, 'schema', 'artifactArray.schema.json');
      let schema = await fs.readJson(schemaPath);
      let ajv = new Ajv();
      let valid = ajv.validate(schema, input);
      if (!valid) {
        throw new SyntaxError('Not valid input parameter. ' + ajv.errorsText());
      }
      return input;
    };
  }

  module.exports = InputHandler;
}());
