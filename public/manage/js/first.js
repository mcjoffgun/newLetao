/**
 * Created by HUCC on 2017/11/22.
 */

$(function () {

  //去后台获取一级分类的数据
  var currentPage = 1;
  var pageSize = 5;

  function render(){
    //发送ajax请求，获取数据
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (info){
        console.log(info);

        $("tbody").html( template("tpl", info) );

    //分页渲染
    $("#paginator").bootstrapPaginator({
      bootstrapMajorVersion: 3,
      currentPage: currentPage,

      //type属性：
      // 如果是首页---> first
      // 上一页-->prev
      // 下一页-->next
      // 尾页-->last
      // 具体的页码-->page
      totalPages: Math.ceil(info.total / pageSize),
      itemTexts: function (type, page, current) {
        switch (type) {
          case "first":
            return "首页";
          case "prev":
            return "上一页";
          case "next":
            return "下一页";
          case "last":
            return "尾页";
          //如果是page，说明就是数字，只需要返回对应的数字即可
          default:
            return page;
        }
      },
      tooltipTitles: function (type, page, current) {
        switch (type) {
          case "first":
            return "首页";
          case "prev":
            return "上一页";
          case "next":
            return "下一页";
          case "last":
            return "尾页";
          //如果是page，说明就是数字，只需要返回对应的数字即可
          default:
            return "跳转到" + page;
        }
      },
      useBootstrapTooltip: true,
      onPageClicked: function (a, b, c, page) {
        currentPage = page;
        render();
      }

    });

      }
    });
  }
  render();

  //一级分类添加功能
  $(".btn_add").on("click", function () {

    //显示添加模态框
    $("#addModal").modal("show");

  });


  //表单校验功能
  var $form = $("#form");
  $form.bootstrapValidator({
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields:{
      categoryName:{

        validators:{
          notEmpty:{
            message:"请输入一级分类的名称"
          }
        }

      }
    }
  });




  //注册表单校验成功事件
  $form.on("success.form.bv", function (e) {

    //var categoryName = $("[name='categoryName']").val();

    e.preventDefault();
    console.log("呵呵");
    //发送ajax请求，
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$form.serialize(),
      success:function (info) {
        if(info.success){

          //关闭模态框
          $("#addModal").modal("hide");

          //重新渲染第一页
          currentPage = 1;
          render();


          //把模态框中的数据重置
          $form.data("bootstrapValidator").resetForm();
          //$form是一个jquery对象，没有reset方法
          //但是dom对象有reset方法，所以需要把form这个对象取出来，才能调用reset方法
          $form[0].reset();

        }
      }
    });
  });
});