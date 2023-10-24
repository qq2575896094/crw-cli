# rcode-cli
create react project cli

## start
详见 [package.json](./package.json) 文件的 ```scripts```

```shell
# 开发环境 DEV
npm run dev

# 打包 build
npm run build
```

## git commit rules

```格式: <type>(scope): <subject>```

- type: 修改类型
  - feat: 新特性
  - fix: 修改问题
  - refactor: 代码重构
  - docs: 文档修改
  - style: 代码格式修改, **不是css修改**
  - chore: 其他修改, 例如构建流程、依赖管理.
  - revert: 用于撤销以前的commit
- scope: 影响范围. 一般为自己代码的模块名.
- subject: 概述. 建议符合 [50/72](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html) 格式
