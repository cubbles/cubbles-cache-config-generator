(function () {
  'use strict';
  const OutputHandler = require('./outputHandler');
  const InputHandler = require('./inputHandler');
  const ArtifactsDepsResolver = require('cubx-dependency-resolver');
  const ManifestRequester = require('./manifestRequester');
  class ResponseCacheConfigGenerator {
    async generate (input, output, baseUrl) {
      try {
        this._checkParameter(input, output, baseUrl);
        // check Parameter
        // parse or validate json
        let inputHandler = new InputHandler();
        let inputArray = await inputHandler.get(input);
        // resolve dependencies
        let artifactsDepsResolver = new ArtifactsDepsResolver();
        let wpList = await artifactsDepsResolver.resolveWpList(inputArray, baseUrl);
        // console.log(wpList);

        // get all manifests
        let manifestRequester = new ManifestRequester(baseUrl);
        let manifestList = await manifestRequester.getManifestList(wpList);
        // console.log(manifestList);
        // write a file
        let outputHandler = new OutputHandler();
        await outputHandler.writeFile(output, manifestList);
      } catch (error) {
        console.error(error);
        throw new Error('Generation of manifestCache failed.' + error);
      }
    };
    _checkParameter (input, output, baseUrl) {
      if (!input) {
        throw Error('The input parameter is required');
      }
      if (!output) {
        throw Error('The output parameter is required');
      }
      if (!baseUrl) {
        throw Error('The baseUrl parameter is required');
      }
    }
  }
  module.exports = ResponseCacheConfigGenerator;
}());
