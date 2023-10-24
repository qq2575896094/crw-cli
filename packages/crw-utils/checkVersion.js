const chalk = require('chalk')
const ora = require('ora')
const axios = require('axios')
const semver = require('semver')
const { execSync } = require('child_process')

// 检测node 主版本
const checkNodeSemver = () => {
    const curNodeVersion = process.versions.node
    const semverVersion = curNodeVersion.split('.')

    if (semverVersion[0] < 14) {
        console.error(`You are running Node ${chalk.red(curNodeVersion)}.\nCreate React Web requires Node 14 or higher.\n${chalk.green('Please update Node version.')}`)
        process.exit(1)
    }
}

// 检测CRW版本
const checkCrwVersion = async () => {
    let latest = null
    const spinner = ora('正在获取crw-cli的最新版本...').start()
    const res = await axios.get('https://registry.npmjs.org/-/package/crw-cli/dist-tags')
    if (res) {
        latest = res.data.latest
    } else {
        latest = execSync('npm view crw-cli version').toString().trim()
    }
    spinner.succeed()

    return latest
}

// 比较版本
const compareVersion = (latest, version) => latest && semver.lt(version, latest)

module.exports = {
    checkNodeSemver,
    checkCrwVersion,
    compareVersion,
}
