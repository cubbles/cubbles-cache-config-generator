(function () {
  'use strict';
  const ResponseCacheConfigGenerator = require('./lib/responseCacheConfigGenerator');

  if (process.argv.length < 5) {
    console.log('Too little arguments. Please call with the arguments input, outputPath and baseUrl.');
    return;
  }
  let input = process.argv[2];
  let output = process.argv[3];
  let baseUrl = process.argv[4];
  try {
    const generator = new ResponseCacheConfigGenerator();
    generator.generate(input, output, baseUrl);
  } catch (error) {
    console.log(error);
  }
}());
