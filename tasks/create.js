const chalk = require('chalk')
const { init } = require('create-react-web')
// const { fetchResp, exist, copyRepo } = require('../utils')
/**
 * 1. 拉取自己github上的仓库, 让用户选择相应的项目
 * 2. 拉取对应项目的tag列表, 让用户选择
 * 3. 根据选择的项目和版本号, 拉取项目
 * 4. 判断文件是否需要编译
 * 5. 编译文件 or 拷贝文件到当前目录
 */
//
// // 获取模版仓库
// const fetchRepos = async () => {
//     const { data } = await axios.get(`https://api.github.com/users/${repositoryAuthor}/repos`)
//     return data.filter((repo) => repo.name.endsWith('template')).map((item) => item.name)
// }
//
// // 获取模版的版本
// const fetchTempTags = async (repo) => {
//     const { data } = await axios.get(`https://api.github.com/repos/${repositoryAuthor}/${repo}/tags`)
//     return data.map((item) => item.name)
// }
//
// // 选择模版仓库
// const choseTempRepo = async () => {
//     // 获取远程模版仓库列表
//     const repoNames = await fetchResp(fetchRepos, 'fetching origin template list...')()
//
//     const { repoName } = await inquirer.prompt({
//         name: 'repoName',
//         type: 'list',
//         choices: repoNames,
//         message: 'please choice a template to create project',
//     })
//
//     return repoName
// }
//
// // 选择模版仓库的版本号
// const choseTagRepo = async (repoName) => {
//     // 选择模版仓库的tag版本
// eslint-disable-next-line max-len
//     const tags = await fetchResp(fetchTempTags, `fetching ${repoName} template tag list...`)(repoName)
//
//     const { tag } = await inquirer.prompt({
//         name: 'tag',
//         type: 'list',
//         choices: tags,
//         message: 'please choice a tag to create project',
//     })
//     return tag
// }
//
// // 下载仓库
// const downloadRepo = async (repo, tag = '') => {
//     const repoPath = `${downloadDir}/${repo}`
//     const isExist = await exist(repoPath)
//
//     const { isRewrite } = await inquirer.prompt({
//         name: 'isRewrite',
//         type: 'confirm',
//         default: true,
//         message: `This ${repo} repository is existed on location, overlay this?`,
//     })
//
//     if (!isRewrite) return repoPath
//
//     const spinner = ora(`download ${repo} ${tag} template`).start()
//     const url = tag ? `${repositoryAuthor}/${repo}#${tag}` : `${repositoryAuthor}/${repo}`
//
//     await promisify(downloadGitRepo)(url, repoPath)
//
//     spinner.succeed()
//     return repoPath
// }
//
// // 编译模版
// const build = async (repoPath, projectName) => {
//     const ques = require(path.resolve(repoPath, 'ask.json'))
//     const asks = await inquirer.prompt(ques)
//     asks.projectName = projectName
//
//     await new Promise((resolve, reject) => {
//         Metalsmith(__dirname)
//             .source(repoPath)
//             .destination(path.resolve(projectName))
//             .use((files, metal, done) => {
//                 // 删除创建项目中的ask文件
//                 delete files['ask.json']
//                 Reflect.ownKeys(files).forEach(async (file) => {
//                     if (file.endsWith('.js') || file.endsWith('.json')) {
//                         let content = files[file].contents.toString()
//                         if (content.includes('<%=')) {
//                             content = await promisify(render)(content, asks)
//                             files[file].contents = Buffer.from(content)
//                         }
//                     }
//                 })
//                 done()
//             })
//             .build((err) => {
//                 if (err) reject()
//                 resolve()
//             })
//     })
//
const checkNodeSemver = () => {
    const curNodeVersion = process.versions.node
    const semver = curNodeVersion.split('.')

    if (semver[0] < 18) {
        console.error(`You are running Node ${chalk.red(curNodeVersion)}.\nCreate React Web requires Node 14 or higher.\n${chalk.green('Please update Node version.')}`)
        process.exit(1)
    }
}

module.exports = (projectName) => {
    checkNodeSemver()
    init(projectName)
}
