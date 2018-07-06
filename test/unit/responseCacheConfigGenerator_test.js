/* globals describe, beforeEach, afterEach, it, expect, sinon */
(function () {
  'use strict';
  const ResponseCacheConfigGenerator = require('../../lib/responseCacheConfigGenerator');
  const OutputHandler = require('../../lib/outputHandler');
  const InputHandler = require('../../lib/inputHandler');
  const ArtifactsDepsResolver = require('cubx-dependency-resolver');
  const ManifestRequester = require('../../lib/manifestRequester');
  describe('', function () {
    let responseCacheConfigGenerator;
    beforeEach(() => {
      responseCacheConfigGenerator = new ResponseCacheConfigGenerator();
    });
    afterEach(() => {
      responseCacheConfigGenerator = null;
    });

    describe('#_checkParameter', () => {
      it('should throw an Error if at least one of the parameter missed or null', () => {
        expect(() => {
          responseCacheConfigGenerator._checkParameter();
        }).throw(Error);
        expect(() => {
          responseCacheConfigGenerator._checkParameter('input');
        }).throw(Error);
        expect(() => {
          responseCacheConfigGenerator._checkParameter(null, 'test.js', 'http://example');
        }).throw(Error);
        expect(() => {
          responseCacheConfigGenerator._checkParameter('xxx', null, 'http://example');
        }).throw(Error);
        expect(() => {
          responseCacheConfigGenerator._checkParameter('xxx', 'zzz');
        }).throw(Error);
        expect(() => {
          responseCacheConfigGenerator._checkParameter('xxx', 'zzz', null);
        }).throw(Error);
        expect(() => {
        });
      });
    });
    describe('#generate', () => {
      let inputHandlerStub;
      let artifactsDepsResolverStub;
      let outputHandlerStub;
      let manifestRequesterStub;
      beforeEach(() => {
        inputHandlerStub = sinon.stub(InputHandler.prototype, 'get').callsFake(() => {
          return [
            {
              'webpackageId': 'com.incowia.ajax@0.2.6',
              'artifactId': 'ajax-request'
            }
          ];
        });
        artifactsDepsResolverStub = sinon.stub(ArtifactsDepsResolver.prototype, 'resolveWpList').callsFake(() => {
          return [
            'lodash-3.10.1@1.0.1',
            'polymer-1.2.3@1.0.2',
            'cubx.core.rte@2.4.0',
            'com.incowia.ajax@0.2.6'
          ];
        });
        manifestRequesterStub = sinon.stub(ManifestRequester.prototype, 'getManifestList').callsFake(() => {
          return [
            {
              webpacakgeId: 'lodash-3.10.1@1.0.1'
            },
            {
              webpacakgeId: 'polymer-1.2.3@1.0.2'
            },
            {
              webpacakgeId: 'cubx.core.rte@2.4.0'
            },
            {
              webpacakgeId: 'com.incowia.ajax@0.2.6'
            }
          ];
        });
        outputHandlerStub = sinon.stub(OutputHandler.prototype, 'writeFile').callsFake(() => {});
      });
      afterEach(() => {
        InputHandler.prototype.get.restore();
        ArtifactsDepsResolver.prototype.resolveWpList.restore();
        ManifestRequester.prototype.getManifestList.restore();
        OutputHandler.prototype.writeFile.restore();
      });

      it('should be call InputHandler#get, ArtifactsDepsResolver#resolveWpList ManifestRequester#getManifestList OutputHandler#writeFile', async () => {
        await responseCacheConfigGenerator.generate([{artifactId: 'example-artifact', webpacakgeId: 'example@1.2'}], 'responseCahe.js', 'http//example');
        inputHandlerStub.should.be.calledOnce;
        artifactsDepsResolverStub.should.be.calledOnce;
        manifestRequesterStub.should.be.calledOnce;
        outputHandlerStub.should.be.calledOnce;
      });
    });
  });
}());
