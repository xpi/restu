
    <table>
      <tr><td> 编号</td><td>餐桌号</td><td>日期</td><td>结账状态</td></tr>
      <% for(i in bills){%>
        <tr><td><%=bills[i].bill_id%></td><td><%=bills[i].table_num%></td><td><%=bills[i].create_date%></td><td><%=bills[i].pay_state%></td><td><a class="button">删除</a></td></tr>
      <%}%>
    </table>
