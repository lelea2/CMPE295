//Fixing for protractor on node 4.x
'use strict';

const child_process = require('child_process');

(function protractorLoaded(){
  try{
    const protractor = require.resolve('protractor');
    console.log('Downgrade webdriver-manager to 10.2.8');
    child_process.execSync('cd ./node_modules/protractor && npm install webdriver-manager@10.2.8');
  }
  catch(e) {
    console.log('protractor, try again after 500 miliseconds');
    setTimeout(protractorLoaded, 500);
  }
})();
