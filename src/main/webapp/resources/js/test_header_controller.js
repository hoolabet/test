/**
 * 
 */
const url = $("#tv").val();

$("#load").on("click",function(){
	$.getJSON("/loadheader",{url},function(res){
		$("#header").html(res.content);
	})
})

$("#save").on("click",function(){
	$.getJSON("/loadheader",{url},function(res){
		if(confirm("이미 저장된 자료가 있습니다. 덮어씌우시겠습니까?")){
			$.ajax({
				type:"put",
				url:"/modifyheader",
				data:JSON.stringify({url,content:$("#header").html()}),
				contentType: "application/json; charset=utf-8",
				success: function() {
					alert("저장되었습니다.");
				}
			})
		}
	})
	.fail(function() {
		$.ajax({
			type:"post",
			url:"/saveheader",
			data:JSON.stringify({url,content:$("#header").html()}),
			contentType: "application/json; charset=utf-8",
			success: function() {
				alert("저장되었습니다.");
			},
			error:function(){
				alert("메인페이지부터 저장해주십시오.");
			}
		})
	})
})