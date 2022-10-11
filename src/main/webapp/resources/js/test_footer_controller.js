/**
 * 
 */
function dragElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

	$(elmnt).children().first().on("mousedown",function(){
		dragMouseDown();
	})



	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
		$("#side_list").css("opacity","0.3");
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
		$("#side_list").css("opacity","1");
	}

}
const url = $("#tv").val();
$.getJSON("/loadfooter",{url},function(res){
	$("#footer").html(res.content);
	$(".move_divs_handler").css("display","flex");
	$(".add_li").css("display","flex");
	$(".list_div").css("border","1px solid black");
})

$("#save").on("click",function(){
	$(".move_divs_handler").css("display","none");
	$(".add_li").css("display","none");
	$(".list_div").css("border","0");
	$.getJSON("/loadfooter",{url},function(res){
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
	})
	.fail(function() {
		$.ajax({
			type:"post",
			url:"/savefooter",
			data:JSON.stringify({url,content:$("#footer").html()}),
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

$(document).on("contextmenu",function(e){
	e.preventDefault();
	console.log(e.target.className);
	console.log(e.target.id);
	if(e.target.className =="footer" 
		|| e.target.className == "list_div" 
		|| e.target.className == "list_li" 
		|| e.target.id == "entry"
		
	){
		$("#right_a").css("display","none");
		$("#right_container").css("top",e.clientY);
		$("#right_container").css("left",e.clientX);
		$("#right_container").css("display","flex");
		$(".font_color").css("top","0px");
		$(".font_color").css("left","100px");
		$(".background_color").css("top","32px");
		$(".background_color").css("left","100px");
		$(".blank").css("top","128px");
		$(".blank").css("left","100px");
		if(e.target.id == "entry"){
			$("#right_container").data("target","entry");
			$("#font_color").css("display","none");
			$("#size").css("display","none");
			$("#font_size").css("display","none");
			$(".background_color").css("top","0px");
			$(".blank").css("top","32px");
		}else{
			$("#right_container").data("class",e.target.className);
			$("#right_container").data("target",$(e.target).data("target"));
			$("#font_color").css("display","flex");
			$("#size").css("display","flex");
			$("#font_size").css("display","flex");
		}
	}
})

$(document).on("click", function() {
	$("#right_container").css("display","none");
})

$(".font_color").children().each(function(i,c) {
	$(c).css("background-color",$(c).data("color"));
})
$(".background_color").children().each(function(i,c) {
	$(c).css("background-color",$(c).data("color"));
})

$(".color").on("click", function() {
	if($(this).parent().prop("class") == "font_color"){
		if($("#right_container").data("class") == "div_home"){
			$("#home_name").css("color",$(this).data("color"));
		}else{
			$(`#${$("#right_container").data("class")}_${$("#right_container").data("target")}`).css("color",$(this).data("color"));
		}
	}else if($(this).parent().prop("class") == "background_color"){
		if($("#right_container").data("target") == "entry"){
			$("#entry").css("background-color",$(this).data("color"));
		}else{
			$(`#${$("#right_container").data("class")}_${$("#right_container").data("target")}`).css("background-color",$(this).data("color"));
		}
	}
})

$("#size").on("click", function() {
	const wid = prompt("가로 길이",$(`#${$("#right_container").data("class")}_${$("#right_container").data("target")}`).css("width").replace("px",""));
	const hei = prompt("세로 길이",$(`#${$("#right_container").data("class")}_${$("#right_container").data("target")}`).css("height").replace("px",""));
	if(isNaN(wid) || isNaN(hei) || wid <= 0 || hei <= 0){
		alert("0보다 큰 숫자만 입력하세요");
		return false;
	}
	$(`#${$("#right_container").data("class")}_${$("#right_container").data("target")}`).css("width",wid);
	$(`#${$("#right_container").data("class")}_${$("#right_container").data("target")}`).css("height",hei);
})
$("#font_size").on("click", function() {
	const font_size = prompt("글씨 크기",$(`#${$("#right_container").data("class")}_${$("#right_container").data("target")}`).css("font-size").replace("px",""));
	if(isNaN(font_size) || font_size <= 0){
		alert("0보다 큰 숫자만 입력하세요");
		return false;
	}
	$(`#${$("#right_container").data("class")}_${$("#right_container").data("target")}`).css("font-size",font_size+"px");
})

let sideOpen = false;
$("#side_btn").on("click", function(){
	if(sideOpen){
		$(this).parent().css("width","50px");
		$("#add_controller").css("display","none");
		sideOpen = false;
	}else{
		$(this).parent().css("width","300px");
		$("#add_controller").css("display","flex");
		sideOpen = true;
	}
})

$("#add_controller").on("click", function() {
	$("#add_menu").css("top","100px");
	$("#add_menu").css("left","100px");
	$("#add_menu").toggle();
})