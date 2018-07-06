# cubx-response-cache-config-generator

[![npm][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

Generate the cubbles responseCache config in a separate file for cubx.core.rte outgoing from root artifact list.

## install
### global

    npm install -g cubbles-cache-config-generator
    
### npm package

    npm install cubbles-cache-config-generator --save-dev
    
## usage

### in code

    const ResponseConfigCacheGenerator = require('cubbles-response-cache-config-generator);
    let responseConfigCacheGenerator = new ResponseConfigCacheGenerator() ;
    ...
    responseConfigCacheGenerator.generate(input, output, baseUrl);

**parameter**

* **input**: path to a json file, which contains an artifact list or artifact list like this
 
 
    [{
      artifactId: "my-artifact", 
      webpackageId: "my-webpackage@1.0"
    }] 
* **output**: path to an output file
* **baseUrl**: cubbles base store url 

*Note: See ``cubbles-response-cache-config-generator/lib/schema/artifactArray.schema.json``* for artifact list format.

### cli

    cubx-response-cache-config-generator -i "[{\"artifactId\": \"my-artifact\", \"webpackageId\": \"my-webpackage@1.0\"} ]" - o responseCache.js -b http://cubbles-world/my-store
    
oder    
    
    cubx-response-cache-config-generator -i input.json -o responseCache.js -b http://cubbles-world/my-store
    
**options**

* -i/--input: artifact lists as a json or path to a json file contains an artifact list
* -o/--output: path of the output file
* -b/--base-url: cubbles base store url
* --help


[travis-image]: https://travis-ci.org/cubbles/cubx-response-cache-config-generator.svg?branch=master
[travis-url]: https://travis-ci.org/cubbles/cubx-response-cache-config-generator
[npm-image]: https://img.shields.io/npm/v/cubx-response-cache-config-generator.svg?style=flat
[npm-url]: https://npmjs.org/package/cubx-response-cache-config-generator
                                      
