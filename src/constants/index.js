const { version } = require('../../package.json');

// 存储模版的位置
const downloadDir = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.temp`;

module.exports = {
  version,
  downloadDir,
};
