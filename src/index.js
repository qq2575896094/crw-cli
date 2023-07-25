const { Command } = require('commander');
const { version } = require('./constants');
const create = require('./tasks/create');

new Command()
  .version(version)
  .argument('<project-name>')
  .description('create react app project')
  .action((projectName) => {
    create(projectName);
  })
  .parse(process.argv);
