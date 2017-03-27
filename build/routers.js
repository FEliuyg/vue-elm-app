var express = require('express')
var apiRouter = express.Router()
// mock数据
var data = require('../data.json')
// 商品路由
apiRouter.get('/goods', function (req, res) {
  res.json({
    data: data.goods,
    success: true
  })
})
// 商家路由
apiRouter.get('/seller', function (req, res) {
  res.json({
    data: data.seller,
    success: true
  })
})
// 评论路由
apiRouter.get('/ratings', function (req, res) {
  res.json({
    data: data.ratings,
    success: true
  })
})

module.exports = apiRouter;
