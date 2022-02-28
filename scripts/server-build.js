const childProcess = require('child_process');


childProcess.exec('tsc', {
  cwd: process.cwd()
}, (error, stdout, stderr) => {
  if(error) {
    console.log(error);
    return;
  }
  console.log('我成功了！');
  childProcess.exec('rm -rf ./package/pages', {
    cwd: process.cwd()
  }, (error, staout) => {

  })
  console.log(stdout);
});