const { access } = require('fs/promises');
const { promisify } = require('util');
const { resolve } = require('path');
const ora = require('ora');
const ncp = require('ncp');

/**
 * 封装loading的网络请求
 * @param fn 回调函数
 * @param message
 * @returns {function(...[*]): Promise<*>}
 */
exports.fetchResp = (fn, message) => async (...args) => {
  const spinner = ora(message).start();
  const result = await fn(...args);
  spinner.succeed();

  return result;
};

/**
 * 判断文件是否存在
 * @param path 文件路径
 * @returns {Promise<boolean>}
 */
exports.exist = async (path) => {
  let isExist = false;
  try {
    await access(path);
    isExist = true;
  } catch {}
  return isExist;
};

/**
 * 复制仓库到当前执行目录下
 * @param originPath 原始路径
 * @param projectName 目标路径
 * @returns {Promise<void>}
 */
exports.copyRepo = async (originPath, projectName) => {
  await promisify(ncp)(originPath, resolve(projectName));
};
