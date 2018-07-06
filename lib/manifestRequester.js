(function () {
  'use strict';
  const axios = require('axios');
  // const Promise = require('promise');
  class ManifestRequester {
    constructor (baseUrl) {
      this.baseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    }
    async getManifestList (wpList) {
      let urls = [];
      wpList.forEach(wp => {
        urls.push(this.baseUrl + wp);
      });

      let promises = urls.map(async (url) => {
        let response = await axios.get(url);
        return response.data;
      });
      return Promise.all(promises);
    }
  }
  module.exports = ManifestRequester;
}());
