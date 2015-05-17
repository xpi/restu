<form action='/food/add/' method="post"  enctype="multipart/form-data">
<div class="row">
  <div class="small-2  columns">
  <input type="text" placeholder="编号" name="food_id">
  </div>
  <div class="small-2  columns">
  <input type="text" placeholder="名称" name="food_name">
  </div>
  <div class="small-2  columns end">
  <input type="text" placeholder="价格" name="food_price">
  </div>  
  <div class="small-2  columns end">
  <input type="file" placeholder="图片" name="food_photo">
  </div>
  <input type="submit" class="button success small" value="添加" ></div>
</div>
</form>
<table>
  <tr><td> 编号</td><td>名称</td><td>价格</td></tr>
  <% for(i in foods){%>
    <tr><td class="fid"><%=foods[i].food_id%></td><td class="fname"><%=foods[i].food_name%></td><td class="fprice"><%=foods[i].food_price%></td><td><a  onclick="deleteFood(<%=foods[i].food_id%>,this)">删除</a><a class="update">编辑</a><a class="save" hidden>保存</a></td></tr> 
  <%} %>
</table>

<script>
  $(".save").click(function(){
      var fid =  $(this).parent().parent().find(".fid input").val();
      var fname=  $(this).parent().parent().find(".fname input").val();
      var fprice =  $(this).parent().parent().find(".fprice input").val();
      var fidtd =  $(this).parent().parent().find(".fid");
      var fnametd=  $(this).parent().parent().find(".fname");
      var fpricetd =  $(this).parent().parent().find(".fprice");
      var obj =this;
      var isf = confirm("确认");
      if(!isf){

        return;
      }
      $.post("/food/update",{food_id:fid,food_name:fname,food_price:fprice},function(data){
         fid =  $(obj).parent().parent().find(".fid input").val();
         fname=  $(obj).parent().parent().find(".fname input").val();
         fprice =  $(obj).parent().parent().find(".fprice input").val();
        fidtd.html(fid);
        fnametd.html(fname);
        fpricetd.html(fprice);
      $(obj).hide();
         $(obj).parent().find(".update").show();

      });
  });


  $(".update").click(function(){
      var fidtd =  $(this).parent().parent().find(".fid");
      var fnametd=  $(this).parent().parent().find(".fname");
      var fpricetd =  $(this).parent().parent().find(".fprice");
      fidtd.html("<input type='text' value='"+fidtd.text()+"'>");
      fnametd.html("<input type='text' value='"+fnametd.text()+"'>");
      fpricetd.html("<input type='text' value='"+fpricetd.text()+"'>");
       $(this).hide();
        $(this).parent().find(".save").show();
  })




</script>