const childProcess = require('child_process');
const path = require('path');

(() => {
  childProcess.exec(`node ./package/server/index.js`, {
    cwd: process.cwd(),
    env: {
      READ_ENV: 'prod'
    }
  }, (error, stdout) => {
    if(error) {
      console.log(error);
      return;
    }
    console.log(stdout);
  })
})()