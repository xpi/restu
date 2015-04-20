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
    <tr><td><%=foods[i].food_id%></td><td><%=foods[i].food_name%></td><td><%=foods[i].food_price%></td><td><a class="button" onclick="deleteFood(<%=foods[i].food_id%>,this)">删除</a></td></tr> 
  <%} %>
</table>
