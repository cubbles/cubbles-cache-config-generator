#! /usr/bin/env node

const cliArgs = require('command-line-args');
const cliUsage = require('command-line-usage');
const ResponseCacheConfigGenerator = require('../lib/responseCacheConfigGenerator.js');

const args = [
  {name: 'input', type: String, alias: 'i', description: 'Path to input file or json array of artifacts objects. Requiered'},
  {name: 'output', type: String, alias: 'o', description: 'Path to output file. Optional, deafult is "responseCache.js"'},
  {name: 'base-url', type: String, alias: 'b', camelCase: true, defaultValue: 'https://cubbles.world/sandbox', description: 'The base url for resolve dependencies of artifacts.'},
  {name: 'help', type: Boolean, alias: 'h', description: 'Display this usage guide.'}
];

const options = cliArgs(args);

const usageStrings = [
  {
    header: '<cubx-cache-config-generator> CLI',
    content: 'Generate a file with a "window.cubx.CRCInit.responseCache" variable. The input is a list of root dependencies. [ {"artifactId": "my-artifact", "webpackageId": "my-webpackage@1.0.0"} ]'
  },
  {
    header: 'Options',
    optionList: args
  }
];

if (options.help) {
  let usage = cliUsage(usageStrings);
  console.log(usage);
}

let output = options.output;

let input = options.input;
let baseUrl = options.baseUrl;
let message;

if (!input) {
  message = 'The option --input is required.';
}
if (!baseUrl) {
  if (message.length > 0) {
    message = message + ' ';
  }
  message = message + '\'The option --base-url is required.';
}
if (!input || !baseUrl) {
  let extendUsageStrings = [
    {
      header: 'Error: not enough parameter',
      content: message
    }
  ];
  extendUsageStrings = extendUsageStrings.concat(usageStrings);
  const extendedUsage = cliUsage(extendUsageStrings);
  console.log(extendedUsage);
  process.exit(1);
} else {
  try {
    const generator = new ResponseCacheConfigGenerator();
    generator.generate(input, output, baseUrl);
    process.exit();
  } catch (e) {
    console(e);
    process.exit(1);
  }
}
