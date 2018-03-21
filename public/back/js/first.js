/**
 * Created by suning on 2018/1/13.
 */
;(function () {
    var page = 1;
    var pageSize = 3;
    var render = function () {
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success: function (info) {
                console.log(info);
                $('tbody').html(template('tpl',info));
                //分页渲染
                $("#paginator").bootstrapPaginator({
                    //指定bootstrap的版本
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, p) {
                        //修改当前页，重新渲染
                        page = p;
                        render();
                    }
                });
            }
        })
    };
    render();
    $('.btn_add').on('click', function () {
        $('#addModal').modal('show');
    });
    //表单校验功能
    var $form = $('form');
    $form.bootstrapValidator({
        //配置校验显示图标
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //配置校验规则
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:'一级分类名称不能为空'
                    }
                }
            }
        }
    })
    //表单验证成功事件
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$form.serialize(),
            success: function (info) {
                if(info.success){
                    $('#addModal').modal('hide');
                    page = 1;
                    render();
                    $form.data('bootstrapValidator').resetForm(true);
                }
            }
        })
    })
})();