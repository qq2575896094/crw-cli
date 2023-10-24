# 工程字体图标

为方便图标管理及后续可维护性, 目前采用是 ```@ant-design/icons``` 提供的方法, 进行统一处理

## usage
1. 推荐使用
   - 下载字体图标, 将JS文件拷贝到当前目录(```src/css/fonts```) 下
   - 在公共组件[CustomIcon](../../components/custom-icon/index.jsx)中引入


2. 针对使用三方字体的方式
   - 将字体文件拷贝到当前目录(```src/css/fonts```) 下
   - 在[index.scss](../index.scss)中添加字体文件的引用

## Future
将来考虑使用将字体生成包, 上传到NPM上, 以包的形式使用
