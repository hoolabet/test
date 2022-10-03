/**
 * 
 */
$("#tg_btn").on("click", function(){
	const tv = $("#tg_input").val();
	location.href = `/test/ready?tv=${tv}`;
	//location.href = `/${tv}/hi?tv=${tv}`;
})