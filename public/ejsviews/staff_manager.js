<table>
  <tr><td> 用户名</td><td>密码</td><td>用户类型</td></tr>
  <% for(i in staff){%>
    <tr><td><%=staff[i].admin_user%></td><td><%=staff[i].admin_pwd%></td><td><%=staff[i].admin_type%></td><td><a class="button">删除</a></td></tr>
  <%} %>
</table>
