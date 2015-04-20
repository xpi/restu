  	<table>
  		<tr><td>餐桌编号</td><td>当前订单</td><td>操作</td></tr>
  		<% for(i in tables){%>
  			<tr><td><%=tables[i].table_num%></td><td><%=tables[i].bill_id%></td><td><a class="button" onclick="deleteTable(<%=tables[i].table_num%>,this)">删除</a></td></tr>
  		<%}%>
  	</table>
  </div>
