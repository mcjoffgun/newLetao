/**
 * Created by suning on 2018/1/16.
 */
;(function () {
  //1. 获取地址栏中的key对应的值，设置到文本框search_input中
  var  key = tools.getSearch('key');
  //console.log(key);
  $('.search-text').val(key);
  render();
  // 2.点击搜索按钮 ，渲染一次
  $('.search-btn').on('click', function () {
    //console.log('heeh');
    $('.sort a').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
    render();
  });
  //3.点击排序
  $('.sort [data-type]').on('click', function () {
    var $this = $(this);
    if($this.hasClass('now')){
      $this.find('span').toggleClass('fa-angle-up').toggleClass('fa-angle-down');
    }else {
      $this.addClass('now').siblings().removeClass('now');
      $('.sort').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
    }
    render();
  });



  function render(){
    var param = {};
    param.page = 1;
    param.pageSize = 100;
    param.proName = $('.search-text').val().trim();
    var $now = $('.sort a.now');
    if($now.length > 0){
      var type = $now.data('type');
      var value = $now.find('span').hasClass('fa-angle-down')?2:1;
      param[type] = value;
    }

    $.ajax({
      type:'get',
      url:'/product/queryProduct',
      data:param,
      success: function (info) {
        //console.log(info);
        $('.product').html(template('tpl',info))
      }
    })
  }
})();

