

const BASE_URL = 'http://gank.io/api'

/**
 * appId = gankApp
 * 用于切换是正常显示还是咋整
 */
const PUSH_URL = 'http://1256app.com:8080/biz/getAppConfig?appid='

/**
 * 搜索 API
http://gank.io/api/search/query/listview/category/Android/count/10/page/1 
注：
category 后面可接受参数 all | Android | iOS | 休息视频 | 福利 | 拓展资源 | 前端 | 瞎推荐 | App
count 最大 50
 */
const SEARCH_URL = `${BASE_URL}/search/query`

/**
 * 分类
 * http://gank.io/api/data/all/20/2
 */
const CATEGORY_URL = `${BASE_URL}/data`

/**
 * api 来源
 * https://gank.io/api
 */
module.exports = {
    CATEGORY_URL,
    SEARCH_URL,   
}