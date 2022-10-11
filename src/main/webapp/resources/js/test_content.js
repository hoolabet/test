const tv = $("#save").data("tv");

$.getJSON("/loadheader",{url:tv},function(res){
	$("#header").html(res.content);
	$("#header").css("background-color", "inherit");
})

$.getJSON("/loadfooter",{url:tv},function(res){
	$("#footer").html(res.content);
})

$(document).on("contextmenu",function(e){
	e.preventDefault();
	if(e.target.className == "move_divs" || e.target.className == "editable" || e.target.className == "div_login" || e.target.className == "div_home"){
		$("#right_move_divs").data("target",$(e.target).data("target"));
		$("#right_move_divs").data("class",e.target.className);
		$("#right_move_divs").css("top",e.clientY);
		$("#right_move_divs").css("left",e.clientX);
		$("#right_move_divs").css("display","flex");
		$(".font_color").css("top","0px");
		$(".font_color").css("left","100px");
		$(".font_color").data("target",$(e.target).data("target"));
		$(".font_color").data("class",e.target.className);
		$(".background_color").css("top","32px");
		$(".background_color").css("left","100px");
		$(".background_color").data("target",$(e.target).data("target"));
		$(".background_color").data("class",e.target.className);
		$("#size").data("target",$(e.target).data("target"));
		$("#size").data("class",e.target.className);
		$("#font_size").data("target",$(e.target).data("target"));
		$("#font_size").data("class",e.target.className);
		$(".loc").css("top","128px");
		$(".loc").css("left","100px");
		$(".loc").data("target",$(e.target).data("target"));
		$(".loc").data("class",e.target.className);
		$("#delete_target").data("target",$(e.target).data("target"));
		$("#delete_target").data("class",e.target.className);
	}
})
$(document).on("click", function() {
	$("#right_move_divs").css("display","none");
})

$(".font_color").children().each(function(i,c) {
	$(c).css("background-color",$(c).data("color"));
})
$(".background_color").children().each(function(i,c) {
	$(c).css("background-color",$(c).data("color"));
})
$(".color").on("click", function() {
	const tClass = $(this).parent().data("class");
	if($(this).parent().prop("class") == "font_color"){
		$(`#${tClass}_${$(this).parent().data("target")}`).css("color",$(this).data("color"));
	}else if($(this).parent().prop("class") == "background_color"){
		$(`#${tClass}_${$(this).parent().data("target")}`).css("background-color",$(this).data("color"));
	}
})
$("#size").on("click", function() {
	const tClass = $(this).data("class");
	const wid = prompt("가로 길이",$(`#${tClass}_${$(this).data("target")}`).css("width").replace("px",""));
	const hei = prompt("세로 길이",$(`#${tClass}_${$(this).data("target")}`).css("height").replace("px",""));
	if(isNaN(wid) || isNaN(hei) || wid <= 0 || hei <= 0){
		alert("0보다 큰 숫자만 입력하세요");
		return false;
	}
	$(`#${tClass}_${$(this).data("target")}`).css("width",wid);
	$(`#${tClass}_${$(this).data("target")}`).css("height",hei);
})
$("#font_size").on("click", function() {
	const tClass = $(this).data("class");
	const font_size = prompt("글씨 크기",$(`#${tClass}_${$(this).data("target")}`).css("font-size").replace("px",""));
	if(isNaN(font_size) || font_size <= 0){
		alert("0보다 큰 숫자만 입력하세요");
		return false;
	}
	$(`#${tClass}_${$(this).data("target")}`).css("font-size",font_size+"px");
})
$(".locs").on("click", function() {
	const tClass = $(this).parent().data("class");
	const locs = $(this).data("locs");
	if(locs == "move"){
		const top = prompt("x 좌표",$(`#${tClass}_${$(this).parent().data("target")}`).css("top").replace("px",""));
		const left = prompt("y 좌표",$(`#${tClass}_${$(this).parent().data("target")}`).css("left").replace("px",""));
		if(isNaN(top) || isNaN(left) || top <= 0 || left <= 0){
			alert("0보다 큰 숫자만 입력하세요");
			return false;
		}
		$(`#${tClass}_${$(this).parent().data("target")}`).css("top",top+"px");
		$(`#${tClass}_${$(this).parent().data("target")}`).css("left",left+"px");
	}else if(locs == "fix"){
		$(`#${tClass}_handler_${$(this).parent().data("target")}`).toggle();
	}
})

$("#delete_target").on("click", function() {
	const tClass = $(this).data("class");
	$(`#${tClass}_${$(this).data("target")}`).remove();
	if(`#${tClass}_${$(this).data("target")}` == "#div_login_login"){
		$("#add_login").toggle();
	}
	if(`#${tClass}_${$(this).data("target")}` == "#div_home_home"){
		$("#add_home").toggle();
	}
})

let sideOpen = false;
$("#side_btn").on("click", function(){
	if(sideOpen){
		$(this).parent().css("width","50px");
		$("#move_div_maker").css("display","none");
		$("#body_controller").css("display","none");
		$("#container_controller").css("display","none");
		sideOpen = false;
	}else{
		$(this).parent().css("width","300px");
		$("#move_div_maker").css("display","flex");
		$("#body_controller").css("display","flex");
		$("#container_controller").css("display","flex");
		sideOpen = true;
	}
})
let cnt = Date.now();
$("#move_div_maker").on("click", function(){
	const move_divs = `
		<div class="move_divs" id="move_divs_${cnt}" data-target="${cnt}">
		<div class="move_divs_handler" id="move_divs_handler_${cnt}">✔</div>
		<div class="insert_div_btn">
		<img src="https://mpng.subpng.com/20180319/hke/kisspng-computer-icons-photography-img-landscape-photo-photography-picture-icon-5ab054dd97c503.7013351615215055016217.jpg">
		</div>
		<div class="delete_div_btn">
		<img src="https://i.pinimg.com/564x/81/e3/17/81e31793e4266d231831a9c2548e7e33.jpg">
		</div>
		</div>
		`;
	$("#move_div_area").append(move_divs);
	$(".move_divs").off("dblclick").on("dblclick", function(){
		const editable = `
			<div contenteditable="true" class="editable" id="editable_${cnt}" data-target="${cnt}"></div>
			`;
		$(this).append(editable);
		$(".editable").off("click").on("click", function() {
			$(this).prop("contenteditable",true);
		})
		$(".editable").off("blur").on("blur", function() {
			$(this).prop("contenteditable",false);
		})
		cnt = Date.now();
	})
	$(".delete_div_btn").on("click", function(){
		$(this).parent().remove();
	})

	dragElement($(`#move_divs_${cnt}`)[0]);
	cnt = Date.now();
})

$("#body_controller").on("click", function(e){
	$("#body_menu").css("top","100px");
	$("#body_menu").css("left","100px");
	$("#body_menu").toggle();
})

$("#add_login").on("click", function(){
	$(this).toggle();
	const login = `
		<div id="div_login_login" class="div_login" data-target="login">
		<div class="move_divs_handler" id="div_login_handler_login">✔</div>
		<form id="form_login">
		<table id="table_login">
		<tr>
		<td><span class="editable_login">아이디</span></td>
		<td><input type="text" name="id" placeholder="id"></td>
		</tr>
		<tr>
		<td><span class="editable_login">비밀번호</span></td>
		<td><input type="password" name="password" placeholder="password"></td>
		</tr>
		<tr>
		<td colspan="2">
		<input type="submit" value="로그인">
		<input type="submit" value="회원가입">
		</td>
		</tr>
		</table>
		</form>
		</div>
		`;
	$("#move_div_area").append(login);
	dragElement($("#div_login_login")[0]);
})

$("#add_home").on("click", function() {
	$(this).toggle();
	const home = `
		<div id="div_home_home" class="div_home" data-target="home">
		<div class="move_divs_handler" id="div_home_handler_home">✔</div>
		<a href="/${tv}/home" id="home_a"><span id="home_name">HOME</span></a>
		<span id="home_value_span">
		<input type="text" id="home_value">
		<input type="button" id="home_value_btn" value="수정">
		</span>
		<span id="home_name_modify">🛠</span>
		</div>
		`;
	$("#move_div_area").append(home);
	$("#home_value").val($("#home_name").html());
	$("#home_name_modify").on("click",function(){
		$("#home_a").toggle();
		$("#home_value_span").toggle();
	})
	$("#home_value_btn").on("click", function() {
		$("#home_name").html($("#home_value").val());
		$("#home_a").toggle();
		$("#home_value_span").toggle();
	})
	dragElement($("#div_home_home")[0]);
})

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

$("#container_controller").on("click", function(e){
	$("#container_menu").css("top","100px");
	$("#container_menu").css("left","100px");
	$("#container_menu").toggle();
})

$("#header_controller").on("click",function(){
	window.open("/test/header_controller")
})
$("#footer_controller").on("click",function(){
	window.open("/test/footer_controller")
})

$('#remove').on('click',function(){
	const tv = $(this).data("tv");
	if(confirm('삭제하시겠습니까?')){
		$.ajax({
			type:'post',
			url:'/test/remove',
			data:tv,
			contentType: "application/json; charset=utf-8",
			success:function(){
				alert('삭제되었습니다.');
				location.href='/test/main';
			}
		})
	}
})
$("#save").on("click",function(){
	const tv = $(this).data("tv");
	if(confirm("저장하시겠습니까?")){
		$.getJSON("/test/load",{url:tv},function(res){
			if(confirm("이미 저장된 자료가 있습니다. 덮어씌우겠습니까?")){
				$.ajax({
					type:"put",
					url:"/test/modify",
					data:JSON.stringify({
						url:tv,
						content:$("body").html()
					}),
					contentType: "application/json; charset=utf-8",
					success: function() {
						alert("저장되었습니다.");
						if(confirm("메인으로 이동하겠습니까?")){
							location.href='/test/main';
						}
					}
				})
			}
		})
		.fail(function() {
			$.ajax({
				type:"post",
				url:"/test/save",
				data:JSON.stringify({
					url:tv,
					content:$("body").html()
				}),
				contentType: "application/json; charset=utf-8",
				success: function(){
					alert("저장되었습니다.");
					if(confirm("메인으로 이동하겠습니까?")){
						location.href='/test/main';
					}
				}
			}) 
		})
	}
})

$("#load").on("click", function() {
	loadFunc();
})
function loadFunc(){



	$.getJSON("/test/load",{url:tv},function(res){
		$("body").html(res.content);
		alert("불러오기 성공");

		$(".move_divs").on("dblclick", function(){
			const editable = `
				<div contenteditable="true" class="editable" id="editable_${cnt}" data-target="${cnt}"></div>
				`;
			$(this).append(editable);
			cnt = Date.now();
		})
		$(".delete_div_btn").on("click", function(){
			$(this).parent().remove();
		})
		$(".move_divs").each(function(i,m) {
			dragElement(m);
		})

		dragElement($("#div_login_login")[0]);
		dragElement($("#div_home_home")[0]);

		$('#remove').on('click',function(){
			const tv = $(this).data("tv");
			if(confirm('삭제하시겠습니까?')){
				$.ajax({
					type:'post',
					url:'/test/remove',
					data:tv,
					contentType: "application/json; charset=utf-8",
					success:function(){
						alert('삭제되었습니다.');
						location.href='/test/main';
					}
				})
			}
		})
		$("#save").on("click",function(){
			const tv = $(this).data("tv");
			if(confirm("저장하시겠습니까?")){
				$.getJSON("/test/load",{url:tv},function(res){
					if(confirm("이미 저장된 자료가 있습니다. 덮어씌우겠습니까?")){
						$.ajax({
							type:"put",
							url:"/test/modify",
							data:JSON.stringify({
								url:tv,
								content:$("body").html()
							}),
							contentType: "application/json; charset=utf-8",
							success: function() {
								alert("저장되었습니다.");
								if(confirm("메인으로 이동하겠습니까?")){
									location.href='/test/main';
								}
							}
						})
					}
				})
				.fail(function() {
					$.ajax({
						type:"post",
						url:"/test/save",
						data:JSON.stringify({
							url:tv,
							content:$("body").html()
						}),
						contentType: "application/json; charset=utf-8",
						success: function(){
							alert("저장되었습니다.");
							if(confirm("메인으로 이동하겠습니까?")){
								location.href='/test/main';
							}
						}
					}) 
				})
			}
		})
		$("#load").on("click", function() {
			loadFunc();
		})
		let sideOpen = false;
		$("#side_btn").on("click", function(){
			if(sideOpen){
				$(this).parent().css("width","50px");
				$("#move_div_maker").css("display","none");
				$("#body_controller").css("display","none");
				$("#container_controller").css("display","none");
				sideOpen = false;
			}else{
				$(this).parent().css("width","300px");
				$("#move_div_maker").css("display","flex");
				$("#body_controller").css("display","flex");
				$("#container_controller").css("display","flex");
				sideOpen = true;
			}
		})
		let cnt = Date.now();
		$("#move_div_maker").on("click", function(){
			const move_divs = `
				<div class="move_divs" id="move_divs_${cnt}" data-target="${cnt}">
				<div class="move_divs_handler" id="move_divs_handler_${cnt}">✔</div>
				<div class="insert_div_btn">
				<img src="https://mpng.subpng.com/20180319/hke/kisspng-computer-icons-photography-img-landscape-photo-photography-picture-icon-5ab054dd97c503.7013351615215055016217.jpg">
				</div>
				<div class="delete_div_btn">
				<img src="https://i.pinimg.com/564x/81/e3/17/81e31793e4266d231831a9c2548e7e33.jpg">
				</div>
				</div>
				`;
			$("#move_div_area").append(move_divs);
			$(".move_divs").off("dblclick").on("dblclick", function(){
				const editable = `
					<div contenteditable="true" class="editable" id="editable_${cnt}" data-target="${cnt}"></div>
					`;
				$(this).append(editable);
				$(".editable").off("click").on("click", function() {
					$(this).prop("contenteditable",true);
				})
				$(".editable").off("blur").on("blur", function() {
					$(this).prop("contenteditable",false);
				})
				cnt = Date.now();
			})
			$(".delete_div_btn").on("click", function(){
				$(this).parent().remove();
			})

			dragElement($(`#move_divs_${cnt}`)[0]);
			cnt = Date.now();
		})
		$(document).on("contextmenu",function(e){
			e.preventDefault();
			if(e.target.className == "move_divs" || e.target.className == "editable" || e.target.className == "div_login" || e.target.className == "div_home"){
				$("#right_move_divs").data("target",$(e.target).data("target"));
				$("#right_move_divs").data("class",e.target.className);
				$("#right_move_divs").css("top",e.clientY);
				$("#right_move_divs").css("left",e.clientX);
				$("#right_move_divs").css("display","flex");
				$(".font_color").css("top","0px");
				$(".font_color").css("left","100px");
				$(".font_color").data("target",$(e.target).data("target"));
				$(".font_color").data("class",e.target.className);
				$(".background_color").css("top","32px");
				$(".background_color").css("left","100px");
				$(".background_color").data("target",$(e.target).data("target"));
				$(".background_color").data("class",e.target.className);
				$("#size").data("target",$(e.target).data("target"));
				$("#size").data("class",e.target.className);
				$("#font_size").data("target",$(e.target).data("target"));
				$("#font_size").data("class",e.target.className);
				$(".loc").css("top","128px");
				$(".loc").css("left","100px");
				$(".loc").data("target",$(e.target).data("target"));
				$(".loc").data("class",e.target.className);
				$("#delete_target").data("target",$(e.target).data("target"));
				$("#delete_target").data("class",e.target.className);
			}
		})
		$(document).on("click", function() {
			$("#right_move_divs").css("display","none");
		})

		$(".font_color").children().each(function(i,c) {
			$(c).css("background-color",$(c).data("color"));
		})
		$(".background_color").children().each(function(i,c) {
			$(c).css("background-color",$(c).data("color"));
		})
		$(".color").on("click", function() {
			const tClass = $(this).parent().data("class");
			if($(this).parent().prop("class") == "font_color"){
				$(`#${tClass}_${$(this).parent().data("target")}`).css("color",$(this).data("color"));
			}else if($(this).parent().prop("class") == "background_color"){
				$(`#${tClass}_${$(this).parent().data("target")}`).css("background-color",$(this).data("color"));
			}
		})
		$("#size").on("click", function() {
			const tClass = $(this).data("class");
			const wid = prompt("가로 길이",$(`#${tClass}_${$(this).data("target")}`).css("width").replace("px",""));
			const hei = prompt("세로 길이",$(`#${tClass}_${$(this).data("target")}`).css("height").replace("px",""));
			if(isNaN(wid) || isNaN(hei) || wid <= 0 || hei <= 0){
				alert("0보다 큰 숫자만 입력하세요");
				return false;
			}
			$(`#${tClass}_${$(this).data("target")}`).css("width",wid);
			$(`#${tClass}_${$(this).data("target")}`).css("height",hei);
		})
		$("#font_size").on("click", function() {
			const tClass = $(this).data("class");
			const font_size = prompt("글씨 크기",$(`#${tClass}_${$(this).data("target")}`).css("font-size").replace("px",""));
			if(isNaN(font_size) || font_size <= 0){
				alert("0보다 큰 숫자만 입력하세요");
				return false;
			}
			$(`#${tClass}_${$(this).data("target")}`).css("font-size",font_size+"px");
		})
		$(".locs").on("click", function() {
			const tClass = $(this).parent().data("class");
			const locs = $(this).data("locs");
			if(locs == "move"){
				const top = prompt("x 좌표",$(`#${tClass}_${$(this).parent().data("target")}`).css("top").replace("px",""));
				const left = prompt("y 좌표",$(`#${tClass}_${$(this).parent().data("target")}`).css("left").replace("px",""));
				if(isNaN(top) || isNaN(left) || top <= 0 || left <= 0){
					alert("0보다 큰 숫자만 입력하세요");
					return false;
				}
				$(`#${tClass}_${$(this).parent().data("target")}`).css("top",top+"px");
				$(`#${tClass}_${$(this).parent().data("target")}`).css("left",left+"px");
			}else if(locs == "fix"){
				$(`#${tClass}_handler_${$(this).parent().data("target")}`).toggle();
			}
		})
		$("#delete_target").on("click", function() {
			const tClass = $(this).data("class");
			$(`#${tClass}_${$(this).data("target")}`).remove();
			if(`#${tClass}_${$(this).data("target")}` == "#div_login_login"){
				$("#add_login").toggle();
			}
			if(`#${tClass}_${$(this).data("target")}` == "#div_home_home"){
				$("#add_home").toggle();
			}
		})
		$("#body_controller").off("click").on("click", function(e){
			$("#body_menu").css("top","100px");
			$("#body_menu").css("left","100px");
			$("#body_menu").toggle();
		})

		$("#add_login").off("click").on("click", function(){
			$(this).toggle();
			const login = `
				<div id="div_login_login" class="div_login" data-target="login">
				<div class="move_divs_handler" id="div_login_handler_login">✔</div>
				<form id="form_login">
				<table id="table_login">
				<tr>
				<td><span class="editable_login">아이디</span></td>
				<td><input type="text" name="id" placeholder="id"></td>
				</tr>
				<tr>
				<td><span class="editable_login">비밀번호</span></td>
				<td><input type="password" name="password" placeholder="password"></td>
				</tr>
				<tr>
				<td colspan="2">
				<input type="submit" value="로그인">
				<input type="submit" value="회원가입">
				</td>
				</tr>
				</table>
				</form>
				</div>
				`;
			$("#move_div_area").append(login);
			dragElement($("#div_login_login")[0]);
		})

		$("#add_home").off("click").on("click", function() {
			$(this).toggle();
			const home = `
				<div id="div_home_home" class="div_home" data-target="home">
				<div class="move_divs_handler" id="div_home_handler_home">✔</div>
				<a href="/${tv}/home" id="home_a"><span id="home_name">HOME</span></a>
				<span id="home_value_span">
				<input type="text" id="home_value">
				<input type="button" id="home_value_btn" value="수정">
				</span>
				<span id="home_name_modify">🛠</span>
				</div>
				`;
			$("#move_div_area").append(home);
			$("#home_value").val($("#home_name").html());
			$("#home_name_modify").off("click").on("click",function(){
				$("#home_a").toggle();
				$("#home_value_span").toggle();
			})
			$("#home_value_btn").on("click", function() {
				$("#home_name").html($("#home_value").val());
				$("#home_a").toggle();
				$("#home_value_span").toggle();
			})
			dragElement($("#div_home_home")[0]);
		})
		
		$("#home_value").val($("#home_name").html());
			$("#home_name_modify").off("click").on("click",function(){
				$("#home_a").toggle();
				$("#home_value_span").toggle();
			})
			$("#home_value_btn").on("click", function() {
				$("#home_name").html($("#home_value").val());
				$("#home_a").toggle();
				$("#home_value_span").toggle();
			})
		
		$("#container_controller").off("click").on("click", function(e){
			$("#container_menu").css("top","100px");
			$("#container_menu").css("left","100px");
			$("#container_menu").toggle();
		})

		$("#header_controller").off("click").on("click",function(){
			window.open("/test/header_controller")
		})
		$("#footer_controller").off("click").on("click",function(){
			window.open("/test/footer_controller")
		})
	})
	.fail(function() {
		alert("저장된 자료가 없습니다.");
	})
}

