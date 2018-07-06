/* globals describe, beforeEach, afterEach, it */
(function () {
  'use strict';
  const ManifestRequester = require('../../lib/manifestRequester');
  const sinon = require('sinon');
  const axios = require('axios');
  describe('ManifestRequester', () => {
    let manifestRequester;
    describe('baseUrl', () => {
      it('should be initialized', () => {
        const baseUrl = 'http://example/';
        manifestRequester = new ManifestRequester(baseUrl);
        manifestRequester.baseUrl.should.be.equal(baseUrl);
      });
      it('should be initialized with closing slash', () => {
        const baseUrl = 'http://example';
        manifestRequester = new ManifestRequester(baseUrl);
        manifestRequester.baseUrl.should.be.equal(baseUrl + '/');
      });
    });

    describe('#getManifestList', () => {
      let axiosStub;
      beforeEach(() => {
        manifestRequester = new ManifestRequester('http://example');
        axiosStub = sinon.stub(axios, 'get').callsFake(() => {
          return {
            data: 'This data'
          };
        });
      });
      afterEach(() => {
        manifestRequester = null;
        axios.get.restore();
      });
      it('should be call axios for each url in de wpList', async () => {
        let wpList = [
          'my-webpackage@2.3.4',
          'other-webpackage@4.5.6'
        ];
        await manifestRequester.getManifestList(wpList);
        axiosStub.calledTwice; // eslint-disable-line
      });
    });
  });
}());
