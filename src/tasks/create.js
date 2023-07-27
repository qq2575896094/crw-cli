const ora = require('ora');
const { promisify } = require('util');
const inquirer = require('inquirer');
const axios = require('axios');
const downloadGitRepo = require('download-git-repo');
const ncp = require('ncp');
const path = require('path');
const { access } = require('fs/promises');
const { downloadDir } = require('../constants');

/**
 * 1. 拉取自己github上的仓库, 让用户选择相应的项目
 * 2. 拉取对应项目的tag列表, 让用户选择
 * 3. 根据选择的项目和版本号, 拉取项目
 */

// 封装loading的网络请求
const fetchResp = (fn, message) => async (...args) => {
  const spinner = ora(message).start();
  const result = await fn(...args);
  spinner.succeed();

  return result;
};

// 获取模版仓库
const fetchRepos = async () => {
  const { data } = await axios.get('https://api.github.com/users/qq2575896094/repos');
  return data.filter((repo) => repo.name.endsWith('template')).map((item) => item.name);
};

// 获取模版的版本
const fetchTempTags = async (repo) => {
  const { data } = await axios.get(`https://api.github.com/repos/qq2575896094/${repo}/tags`);
  return data.map((item) => item.name);
};

// 选择模版仓库
const choseTempRepo = async () => {
  // 获取远程模版仓库列表
  const repoNames = await fetchResp(fetchRepos, 'fetching origin template list...')();

  const { repoName } = await inquirer.prompt({
    name: 'repoName',
    type: 'list',
    choices: repoNames,
    message: 'please choice a template to create project',
  });

  return repoName;
};

// 选择模版仓库的版本号
const choseTagRepo = async (repoName) => {
  // 选择模版仓库的tag版本
  const tags = await fetchResp(fetchTempTags, `fetching ${repoName} template tag list...`)(repoName);

  const { tag } = await inquirer.prompt({
    name: 'tag',
    type: 'list',
    choices: tags,
    message: 'please choice a tag to create project',
  });
  return tag;
};

// 下载仓库
const downloadRepo = async (repo, tag = '') => {
  const repoPath = `${downloadDir}/${repo}`;
  let isRewrite = true;

  try {
    await access(repoPath);
    const { isExist } = await inquirer.prompt({
      name: 'isExist',
      type: 'confirm',
      default: true,
      message: `This ${repo} repository is existed on location, overlay this?`,
    });

    isRewrite = isExist;
  } catch (e) { /* empty */ }

  if (!isRewrite) return repoPath;

  const spinner = ora(`download ${repo} ${tag} template`).start();
  const url = tag ? `qq2575896094/${repo}#${tag}` : `qq2575896094/${repo}`;

  await promisify(downloadGitRepo)(url, repoPath);

  spinner.succeed();
  return repoPath;
};

// 复制仓库到当前执行目录下
const copyRepo = async (originPath, projectName) => {
  await promisify(ncp)(originPath, path.resolve(projectName));
};

module.exports = async (projectName) => {
  const repo = await choseTempRepo();
  const tag = await choseTagRepo(repo);

  const repoPath = await downloadRepo(repo, tag);
  await copyRepo(repoPath, projectName);
};
