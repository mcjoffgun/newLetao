/**
 * Created by suning on 2018/1/14.
 */
+function () {
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        success: function (info) {
            console.log(info);
            $('.one').html(template('tpl',info));
            secondRender(info.rows[0].id);
        }
    });
    //给li注册点击事件
    $('.one').on('click', 'li',function () {
        console.log("hehe");
        $(this).addClass('now').siblings().removeClass('now');
        var id = $(this).data('id');
        secondRender(id);
    });
    //渲染二级分类
    function secondRender (id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{
                id:id
            },
            success: function (info) {
                console.log(info);
                $('.cate_r .mui-scroll').html(template('tpl1',info));
                //让右边的区域滚动滚回
                mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,500);
            }
        })
    }
}();
