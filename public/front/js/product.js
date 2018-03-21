/**
 * Created by suning on 2018/1/16.
 */
;(function () {
  //1. 先去地址栏获取到productId
  //2. 发送一个ajax请求，获取到商品的详细信息
  //3. 结合模版引擎渲染
  var productId = tools.getSearch('productId');
  $.ajax({
    type:'get',
    url:'/product/queryProductDetail',
    data:{
      id:productId
    },
    success: function (info) {
      console.log(info);
      $('.mui-scroll').html(template('tpl',info));
      //初始化轮播图
      mui(".mui-slider").slider({
        interval: 1000
      });
      //初始化numbox
      mui('.mui-numbox').numbox();
    }
  })
})();