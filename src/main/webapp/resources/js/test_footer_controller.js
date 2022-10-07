/**
 * 
 */
const url = $("#tv").val();
$.getJSON("/loadfooter",{url},function(res){
	$("#footer").html(res.content);
})

$("#save").on("click",function(){
	$.getJSON("/loadfooter",{url},function(res){
		if(res.content == ""){
			$.ajax({
				type:"post",
				url:"/savefooter",
				data:JSON.stringify({url,content:$("#footer").html()}),
				contentType: "application/json; charset=utf-8",
				success: function() {
					alert("저장되었습니다.");
				}
			})
		}else{
			if(confirm("이미 저장된 자료가 있습니다. 덮어씌우시겠습니까?")){
				$.ajax({
					type:"put",
					url:"/modifyfooter",
					data:JSON.stringify({url,content:$("#footer").html()}),
					contentType: "application/json; charset=utf-8",
					success: function() {
						alert("저장되었습니다.");
					}
				})
			}
		}
	})
})