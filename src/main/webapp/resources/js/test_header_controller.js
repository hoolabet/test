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
		pos3 = e.pageX;
		pos4 = e.pageY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
		$("#side_list").css("opacity","0.3");
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.pageX;
		pos2 = pos4 - e.pageY;
		pos3 = e.pageX;
		pos4 = e.pageY;
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

$("#load").on("click",function(){
	$.getJSON("/loadheader",{url},function(res){
		$("#header").html(res.content);
		$(".move_divs_handler").css("display","flex");
		$("#home_name_modify").css("display","flex");
		$(".add_li").css("display","flex");
		$("#div_home_home").css("border","1px solid black");
		$(".list_div").css("border","1px solid black");
	})
})

$("#save").on("click",function(){
	$(".move_divs_handler").css("display","none");
	$("#home_name_modify").css("display","none");
	$(".add_li").css("display","none");
	$("#div_home_home").css("border","0");
	$(".list_div").css("border","0");
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


$(document).on("contextmenu",function(e){
	e.preventDefault();
	console.log(e.target.className);
	console.log(e.target.id);
	if(e.target.className =="header" 
		|| e.target.className == "list_div" 
		|| e.target.className == "list_li" 
		|| e.target.id == "entry"
		|| e.target.className == "div_home"
		
	){
		$("#right_a").css("display","none");
		$("#right_container").css("top",e.pageY).css("left",e.pageX).css("display","flex");
		$(".font_color").css("top","0px").css("left","100px");
		$(".background_color").css("top","32px").css("left","100px");
		$(".blank").css("top","128px").css("left","100px");
		$(".loc").css("top","160px").css("left","100px");
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
	}else if(e.target.className == "list_li_a"){
		$("#right_container").css("display","none");
		$("#right_container").data("class",e.target.className);
		$("#right_container").data("target",$(e.target).data("target"));
		$("#right_a").css("top",e.pageY).css("left",e.pageX).css("display","flex");
		$(".font_color").css("top","0px").css("left","100px");
	}

})

$(document).on("click", function() {
	$("#right_container").css("display","none");
	$("#right_a").css("display","none");
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
$("#add_list").on("click",function(){
	let cnt = Date.now();
	const ce = `
		<div id="list_div_${cnt}" class="list_div" data-target="${cnt}">
		<div class="move_divs_handler" id="list_div_handler_${cnt}">✔</div>
		<img class="add_li" data-target="${cnt}" src="https://icons-for-free.com/download-icon-circle+more+plus+icon-1320183136549593898_512.png">
		<ul id="list_ul_${cnt}" class="list_ul" data-target="${cnt}"></ul>
		</div>
		`;
	$("#header_1").append(ce);
	dragElement($(`#list_div_${cnt}`)[0]);

	$(".add_li").off("click").on("click", function() {
		let cnt = Date.now();
		const cli = `
			<li id="list_li_${cnt}" class="list_li" data-target="${cnt}">
			<a href="#" id="list_li_a_${cnt}" class="list_li_a" data-target="${cnt}">-목록-</a> 
			</li>
			`;
		$(`#list_ul_${$(this).data("target")}`).append(cli);

	})
})

$("#a_change").on("click", function() {
	const cont = prompt("변경할 제목을 적어주세요. (2자 이상 20자 이하)");
	if(cont.length < 2 || cont.length > 20){
		alert("2자 이상 20자 이하로 작성하세요.");
		return false;
	}
	const hr = prompt("변경할 링크를 적어주세요.");
	const cnt = $("#right_container").data("target");
	console.log(cnt);
	$(`#list_li_a_${cnt}`).html(cont);
	$(`#list_li_a_${cnt}`).prop("href",hr);
	alert(`변경되었습니다.
			제목 : ${$(`#list_li_a_${cnt}`).html()}
			주소 : ${$(`#list_li_a_${cnt}`).prop("href")}
	`);	
})

$(".blanks").on("click", function(){
	const blank = $(this).data("blank");
	if($("#right_container").data("target") == "1"){
		const val = $("body").css(`margin-${blank}`);
		const prom = prompt(`공백 값을 적어주세요. 현재 ${this.innerText} 값 : ${val}`);
		if(isNaN(prom)){
			alert("숫자만 입력하세요.");
			return false;
		}

		$("body").css(`margin-${blank}`,prom+"px");
		console.log($(`#margin_${blank}`));
		if($(`#margin_${blank}`).length != 0){
			$(`#margin_${blank}`).remove();
			console.log(`#margin_${blank} 삭제`);
		}
		const margin = `<input type="hidden" id="margin_${blank}" data-margin=${prom}>`;
		$("#header").append(margin);
		console.log(`#margin_${blank} 생성`);
		console.log($(`#margin_${blank}`));
	}else{
		const val = $(`#${$("#right_container").data("class")}_${$("#right_container").data("target")}`).css(`margin-${blank}`);
		const prom = prompt(`공백 값을 적어주세요. 현재 ${this.innerText} 값 : ${val}`);
		if(isNaN(prom)){
			alert("숫자만 입력하세요.");
			return false;
		}
		$(`#${$("#right_container").data("class")}_${$("#right_container").data("target")}`).css(`margin-${blank}`,prom+"px");
	}
})

$("#add_home").on("click", function() {
	$(this).toggle();
	const home = `
		<div id="div_home_home" class="div_home" data-target="home">
		<div class="move_divs_handler" id="div_home_handler_home">✔</div>
		<a href="/${url}/home" id="home_a"><div id="home_name">HOME</div></a>
		<div id="home_value_div">
		<input type="text" id="home_value">
		<input type="button" id="home_value_btn" value="수정">
		</div>
		<span id="home_name_modify">🛠</span>
		</div>
		`;
	$("#header").append(home);
	$("#home_value").val($("#home_name").html());
	$("#home_name_modify").on("click",function(){
		$("#home_a").toggle();
		$("#home_value_div").toggle();
	})
	$("#home_value_btn").on("click", function() {
		$("#home_name").html($("#home_value").val());
		$("#home_a").toggle();
		$("#home_value_div").toggle();
	})
	dragElement($("#div_home_home")[0]);
})

$("#delete_target").on("click", function() {
	if($("#right_container").data("target")=="entry" || $("#right_container").data("target") == "1"){
		alert("이 영역은 삭제할 수 없습니다.");
	}else{
		$(`#${$("#right_container").data("class")}_${$("#right_container").data("target")}`).remove();
		if(`#${$("#right_container").data("class")}_${$("#right_container").data("target")}` == "#div_home_home"){
			$("#add_home").toggle();
		}
	}
})

$(".locs").on("click", function() {
	const id = `${$("#right_container").data("class")}_${$("#right_container").data("target")}`;
	const locs = $(this).data("locs");
	if(locs == "move"){
		const top = prompt("x 좌표",$(`#${$("#right_container").data("class")}_${$("#right_container").data("target")}`).css("top").replace("px",""));
		const left = prompt("y 좌표",$(`#${$("#right_container").data("class")}_${$("#right_container").data("target")}`).css("left").replace("px",""));
		if(isNaN(top) || isNaN(left) || top <= 0 || left <= 0){
			alert("0보다 큰 숫자만 입력하세요");
			return false;
		}
		$(`#${id}`).css("top",top+"px");
		$(`#${id}`).css("left",left+"px");
	}else if(locs == "fix"){
		$(`#${$("#right_container").data("class")}_handler_${$("#right_container").data("target")}`).toggle();
	}else if(locs == "center"){
		if(id == "header_1"){
			alert("가운데 정렬을 할 수 없습니다.")
		}else{
			const leftVal = 960 - $(`#${id}`).css("width").replace("px","")/2;
			$(`#${id}`).css("left",leftVal);
		}
	}
})
