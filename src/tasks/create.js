const ora = require('ora');
const inquirer = require('inquirer');
const axios = require('axios');

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
  const { data } = await axios.get(` https://api.github.com/repos/qq2575896094/${repo}/tags`);
  return data.map((item) => item.name);
};

module.exports = async (projectName) => {
  const repoNames = await fetchResp(fetchRepos, 'fetching template...')();
  const { repoName } = await inquirer.prompt({
    name: 'repoName',
    type: 'list',
    choices: repoNames,
    message: 'please choice a template to create project',
  });

  const tags = await fetchResp(fetchTempTags, 'fetching template tags...')(repoName);
  const { tag } = await inquirer.prompt({
    name: 'tag',
    type: 'list',
    choices: tags,
    message: 'please choice a tag to create project',
  });
  console.log(projectName, repoName, tag);
};
