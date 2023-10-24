const path = require('path')

const ROOT_PATH = path.resolve(__dirname, './')
const APP_PATH = path.resolve(ROOT_PATH, 'src')

// entry and output path
const ENTRY_PATH = path.join(APP_PATH, 'index.jsx')
const DIST_PATH = path.join(ROOT_PATH, 'dist')
const TMP_PATH = path.join(ROOT_PATH, 'tmp')

// 文档路径
const DOC_FROM_PATH = path.join(ROOT_PATH, 'doc')
const DOC_TO_PATH = path.join(DIST_PATH, 'doc')
const IMAGE_FROM_PATH = path.join(APP_PATH, 'images')
const IMAGE_TO_PATH = path.join(DIST_PATH, 'images')

const FRAMEWORK_PATH = path.join(APP_PATH, 'framework')
const PAGE_BASE_PATH = path.join(APP_PATH, 'pages')
const COMPONENT_PATH = path.join(APP_PATH, 'components')
const FONT_PATH = path.join(APP_PATH, 'css/fonts')

module.exports = {
    ROOT_PATH,
    APP_PATH,
    ENTRY_PATH,
    DIST_PATH,
    DOC_FROM_PATH,
    DOC_TO_PATH,
    IMAGE_FROM_PATH,
    IMAGE_TO_PATH,
    TMP_PATH,
    PAGE_BASE_PATH,
    COMPONENT_PATH,
    FONT_PATH,
    FRAMEWORK_PATH
}
