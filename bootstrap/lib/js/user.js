$(function(){

	$("#leftUl .panel-heading a").click(function(){
		if($(this).hasClass("collapsed")){
			$("#leftUl .panel-heading a i:odd").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
			$(this).children().last().removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
		}
		else{
			$(this).children().last().removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
		}
	});
	listAjax(1);
	console.log($("#userList .pagination li a"))
	$("#userList .pagination li a").click(function(){
		listAjax(parseInt($(this).text()));
	});
	
});

function listAjax(p){
//	var table = $("#userList table");$("#userList .pagination");
	var g = "";
	$.ajax({
		type:"get",
		url:"http://192.168.15.2/gz0820web/users",
		data:{page:p},
		dataType:"json",
		success:function(responseData){
//			console.log(responseData);
			$("#userList .pagination").html("");
			for(var j =0; j < responseData.per_page; j++){
				var x = j+1;
				var pageLi = $("#userList .pagination").append("<li><a href='javascript:listAjax("+ x +")'></a></li>");
				$("#userList .pagination li a").eq(j).text(j+1);
			}
			pageLi.children().removeClass("active");
			pageLi.children().eq(p-1).addClass("active");
			var tr = $("#userList table tbody").html("");
			for(var i =0; i < responseData.per_page; i++){
				var tr = $("#userList table tbody").append("<tr>");
				$("<td>").text(responseData.data[i].username).appendTo(tr.children().last());
				$("<td>").text(responseData.data[i].password).appendTo(tr.children().last());
				$("<td>").text(responseData.data[i].age).appendTo(tr.children().last());
				if(responseData.data[i].gender == 1){
					g = "男";
				}
				else if(responseData.data[i].gender == 2){
					g = "女";
				}
				$("<td>").text(g).appendTo(tr.children().last());
			}	
		}
	});
}
