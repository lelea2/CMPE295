exports.config = {
  framework: 'mocha',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  // specs: ['spec.js'],
  suites: {
    one: 'suite/spec.js', // all tests in single file
    spread: ['suite/spec-1.js', 'suite/spec-2.js'] // individual tests in separate files
  },
  suite: 'one', // default suite to run
  mochaOpts: {
    ui: 'bdd',
    reporter: 'spec',
    slow: 5000
  },
  capabilities: {
    browserName: 'chrome',
    directConnect: true,
    shardTestFiles: true,
    maxInstances: 2
  }
}
