/**
 * Created by suning on 2018/1/16.
 */
;(function () {
  //用户获取lt_search_history对应的值，并且转换成一个数组，方便操作
  //获取地址栏传递的参数
  function getHistory(){
    //1.1 获取到lt_search_history对应的值，就是一个json字符串
    var history = localStorage.getItem('search_history') || "[]";
    //1.2 应该把获取到的json字符串转换成数组
    var arr = JSON.parse(history);
    return arr;
  }
  //渲染数据
  function render(){
    var arr = getHistory();
    $('.history').html(template('tpl',{arr:arr}))
  }
  //1.页面打开，渲染搜索列表
  render();
  //2.清空搜索列表
  $('.history').on('click','.btn_empty', function () {
    mui.confirm('您是否要清空所有的历史记录','温馨提示',['是','否'], function (e) {
      if(e.index == 0){
        localStorage.removeItem('search_history');
        render();
      }
    })
  });
  //3. 删除搜索列表
  //3.1 注册点击事件
  //3.2 获取到点击的对应的index
  //3.3 获取历史记录 得到数组
  //3.4 删除数组对应下标的值
  //3.5 重新设置到缓存里面
  //3.6 重新渲染
  $('.history').on('click','.btn_delete', function () {
    var that = $(this);
    mui.confirm('您确定要删除吗？','温馨提示',['是','否'], function (e) {
      if(e.index === 0){
        var arr = getHistory();
        var index = that.data('index');
        console.log(index);
        arr.splice(index,1);
        localStorage.setItem('search_history',JSON.stringify(arr));
        render();
      }
    })
  });
  //4. 添加搜索列表
  //4.1 注册点击事件
  //4.2 获取到输入的关键字
  //4.3 获取到历史记录，得到数组
  //4.4 把关键字添加到数组最前面
  //4.5 重新设置到缓存里面
  //4.6 重新渲染
  $('.search-btn').on('click', function () {
    var key = $('.search-text').val().trim();
    if(key == ''){
      mui.toast('请输入搜索关键字');
      return false;
    }
    var arr = getHistory();
    //如果有重复的，删除掉
    var index = arr.indexOf(key);
    if(index != -1){
      arr.splice(index,1);
    }
    //如果数组长度超过了10，需要删除最老的一项
    if(arr.length >=10){
      arr.pop();
    }
    arr.unshift(key);
    localStorage.setItem('search_history',JSON.stringify(arr));
    render();
    location.href = 'searchList.html?key='+key;
  })
})();