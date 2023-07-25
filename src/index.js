const { Command } = require('commander');
const path = require('path');
const { version } = require('./constants');

new Command()
  .version(version)
  .argument('<project-name>')
  .description('create react app project')
  .action((projectName) => {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    require(path.resolve(__dirname, 'tasks/create'))(projectName);
  })
  .on('--help', () => {
    console.log('Example:');
    console.log('  cra <project-name>');
  })
  .parse(process.argv);
