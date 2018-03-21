/**
 * Created by suning on 2018/1/13.
 */
;(function () {
    var page = 1;
    var pageSize = 5;
    function render () {
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:page,
                pageSize:pageSize
            },
            success: function (info) {
                console.log(info);
                $('tbody').html(template('tpl',info));
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(info.total/info.size),
                    numberOfPages:5,
                    onPageClicked: function (a,b,c,data) {
                        //console.log(data);
                        page = data;
                        render();
                    }
                })
            }
        })
    };
    render();
    //禁用/启用功能
    $('tbody').on('click','.btn', function () {
        $('#confirmModal').modal('show');
        var  id = $(this).parent().data('id');
        var isDelete = $(this).hasClass('btn-success')?1:0;
        console.log(id);
        $('.btn_confirm').off().on('click', function (e) {
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success: function (info) {
                    if(info.success){
                        $('#confirmModal').modal('hide');
                        render();
                    }
                }
            })
        });

    })

})();