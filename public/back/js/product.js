/**
 * Created by suning on 2018/1/14.
 */
;(function () {
    var page = 1;
    var pageSize = 2;
    var imgArr = [];
    var render = function () {
        $.ajax({
            type:'get',
            url:'/product/queryProductDetailList',
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
                    totalPages:Math.ceil(info.total/pageSize),
                    itemTexts: function (type, page ,current) {
                        switch (type) {
                            case 'first':
                                return '首页';
                            case 'prev':
                                return '上一页';
                            case 'next':
                                return '下一页';
                            case 'last':
                                return '尾页';
                            default:
                                return page;
                        }
                    },
                    onPageClicked: function (a,b,c,p) {
                        page = p;
                        render();
                    }
                })
            }
        })
    };
    render();
  //点击按钮 显示模态框
  $('.btn_add').on('click', function () {
    $('#addModal').modal('show');
    //渲染下拉框组件
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      success: function (info) {
        console.log(info);
        $('.dropdown-menu').html(template('tpl1',info));
      }
    })
  });

  //给下拉框选项注册事件
  $('.dropdown-menu').on('click','a', function () {
    //获取到a的内容   设置给dropdown_text
    $('.dropdown-text').text( $(this).text() );
    //获取id。给隐藏域brandId
    $('#brandId').val( $(this).data('id') );
    //手动让这个表单校验通过
  });

  //表单校验
  var $form = $('form');
  $form.bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      //校验成功的图标
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandId:{
        validators:{
          norEmpty:{
            message:'请选择二级分类'
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:'请输入商品的名称'
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:'请输入商品描述'
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:'请输入商品库存'
          },
          regexp:{
            //不能是0开头，必须是数字
            regexp:/^[1-9]\d*$/,
            message:'请输入合法的库存'
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:'请输入商品尺码'
          },
          regexp:{
            //不能是0开头，必须是数字
            regexp:/^\d{2}-\d{2}$/,
            message:"请输入合法的尺码,例如(32-46)"
          }
        }
      },
      oldPrice: {
        validators:{
          notEmpty:{
            message:"请输入商品的原价"
          }
        }
      },
      price: {
        validators:{
          notEmpty:{
            message:"请输入商品的价格"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传3张图片"
          }
        }
      }
    }
  });

  //初始化文件上传插件
  $('#fileupload').fileupload({
    dataType:'json',
    done:function(e,data){
      console.log(data.result);
      if(imgArr.length >=3 ){
        return false;
      }
      //图片显示
      $('.img_box').append('<img src="'+data.result.picAddr+'"width="100" height="100">');
      //把上传的结果存储在数组中
      imgArr.push(data.result);
      console.log(imgArr);
      //3. 判断数组的长度，如果是3，手动让brandLogo 校验成功即可，  如果不是3，校验失败
      if(imgArr.length === 3){
        $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
      }else {
        $form.data("bootstrapValidator").updateStatus("brandLogo", "INVALID");
      }
    }
  });



  //添加商品（给表单注册校验成功事件）
  $form.on('success.form.bv', function (e) {
    e.preventDefault();
    var param = $form.serialize();
    param += '&picName1='+imgArr[0].picName+'&picAddr1='+imgArr[0].picAddr;
    param += '&picName2='+imgArr[1].picName+'&picAddr1='+imgArr[0].picAddr;
    param += '&picName3='+imgArr[2].picName+'&picAddr1='+imgArr[0].picAddr;

    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:param,
      success: function (info) {
        console.log(info);
        $('#addModal').modal('hide');
        page = 1;
        render();
        $form[0].reset();
        $form.data('bootstrapValidator').resetForm();
        $('.dropdown-text').text('请选择二级分类');
        $('#brandId').val('');
      }
    })
  })
})();
