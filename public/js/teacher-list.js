/**
 * Created by hasee on 2017/3/20.
 */
define(['jquery','template','bootstrap'],function($,template){
    //实现教师数据列表加载
    $.ajax({
        type:'get',
        url:'/api/teacher',
        dataType:'json',
        success:function(data){
            //解析数据，利用模板引擎渲染页面
            var html=template('teacherTpl',{list:data.result});
            $("#teacherList").html(html);
            //查看讲师功能
            $(".teacherBtns").find('a:eq(0)').click(function(){
                //console.log(1);
                //获取tc_id 弹出对应的讲师信息
                var tc_id=$(this).parent("td").attr("data-tcid");
                //console.log(tc_id);
                $.ajax({
                    type:'get',
                    url:'/api/teacher/view',
                    dataType:'json',
                    data:{tc_id:tc_id},
                    success:function(data){
                        console.log(data);
                        //解析数据
                        //将data.result.tc_hometown中的|去掉
                        data.result.tc_hometown=data.result.tc_hometown.replace(/\|/g," ");
                        //data.result.tc_hometown=data.result.tc_hometown.split("|").join(" ");
                        var html=template("teacherTpl1",data.result);
                        $("#teacherInfo").html(html);
                        $('#teacherModal').modal();
                    }
                });
            });
            //console.log($(".teacherBtns").find("a:eq(2)").parent("td").attr("data-status"));
            //教师启用和禁用功能
            $(".teacherBtns").find("a:eq(2)").click(function(){
               //获取对应的tc_id
                var tc_id=$(this).parent("td").attr("data-tcid");
                //得到对应的状态值
                var tc_status=$(this).parent("td").attr("data-status");
                console.log(tc_status);
                var that=this;
                $.ajax({
                    type:'post',
                    url:'/api/teacher/handle',
                    dataType:'json',
                    data:{
                        tc_id:tc_id,
                        tc_status:tc_status
                    },
                    success:function(data){
                      if(data.result.tc_status==0){
                          $(that).text("启用");
                      }else{
                          $(that).text("禁用");
                      }
                        //重置浏览器端的状态
                      $(that).parent("td").attr("data-status",data.result.tc_status);
                    }

                });
            });
        }
    });
});