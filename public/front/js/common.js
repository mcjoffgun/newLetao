/**
 * Created by suning on 2018/1/14.
 */
mui('.mui-scroll-wrapper').scroll({
    indicators:false
});

mui(".mui-slider").slider({
    interval: 1000
});
var tools = {
    getSearchObj:function(){
    //获取地址栏参数,封装成一个对象  {name:"zs", age:18, desc:"呵呵呵"}
    var search = location.search;
    search = decodeURI(search);
    //去掉问号？
    search = search.slice(1);
    //把search切割成一个数组    ["name=zs", "age=18", "desc=呵呵呵"]
    var arr = search.split('&');
    var obj = {};
    //遍历数组,aa将数据添加到obj中
    arr.forEach(function (v) {
      var key = v.split('=')[0];
      var value = v.split('=')[1];
      obj[key] = value;
    });
    return obj;
  },
    getSearch:function (key){
      return this.getSearchObj()[key];
    }
};
