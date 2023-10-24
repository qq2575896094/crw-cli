const { Command } = require('commander')
const figlet = require('figlet')
const chalk = require('chalk')
const { name, version } = require('./package.json')
const { createApp } = require('./tasks')
const { checkNodeSemver } = require('./packages/crw-utils/checkVersion')

checkNodeSemver()

const program = new Command(name)
    .description(`Develop React Website Application by ${name}.`)
    .usage(`${chalk.green('<command>')} [options]`)
    .version(version)

// create project command
program.command('create <project-name>')
    .description(`Create a new project template by ${name}`)
    .action(createApp)

program.on('--help', () => {
    console.log(
        chalk.green(
            figlet.textSync(name, {
                font: 'Ghost',
                horizontalLayout: 'default',
                verticalLayout: 'default',
                width: 100,
                whitespaceBreak: true,
            }),
        ),
    )
})

program.parse(process.argv)
