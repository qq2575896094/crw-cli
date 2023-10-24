const { version } = require('../package.json');

// 存储模版的位置
const downloadDir = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.temp`;

const repositoryAuthor = 'qq2575896094';

module.exports = {
  version,
  downloadDir,
  repositoryAuthor,
};
