const tv = $("#tv").val();
const userID = $("#userID").val();

console.log(tv);
console.log(userID);

loadFunc();
$.getJSON("/loadheader",{url:tv},function(res){
	$("#header").html(res.content);
	$("#header").css("background-color", "inherit");
	$.getJSON("/loadfooter",{url:tv},function(res){
		$("#footer").html(res.content);
	})
})
.done(function() {
	const top = $("#margin_top").data("margin");
	const right = $("#margin_right").data("margin");
	const bottom = $("#margin_bottom").data("margin");
	const left = $("#margin_left").data("margin");
	$("body").css("margin-top",`${top}px`);
	$("body").css("margin-right",`${right}px`);
	$("body").css("margin-bottom",`${bottom}px`);
	$("body").css("margin-left",`${left}px`);
	
	const position = $("#position").data("position");
	const pTop = $("#position").data("top");
	const pLeft = $("#position").data("left");
	$("#header").css("position",position).css("top",pTop).css("left",pLeft);
})


$(document).on("contextmenu",function(e){
	e.preventDefault();
	if(e.target.className == "move_divs" || e.target.className == "editable" || e.target.className == "div_login" || e.target.className == "div_home" || e.target.id == "move_div_area"){
		$("#right_move_divs").data("target",$(e.target).data("target"));
		$("#right_move_divs").data("class",e.target.className);
		$("#right_move_divs").css("top",e.pageY).css("left",e.pageX).css("display","flex");
		$(".font_color").css("top","0px").css("left","100px");
		$(".background_color").css("top","32px").css("left","100px");
		$(".loc").css("top","128px").css("left","100px");
	}
	console.log(`${$("#right_move_divs").data("class")}_${$("#right_move_divs").data("target")}`);
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
	let id = `${$("#right_move_divs").data("class")}_${$("#right_move_divs").data("target")}`;
	if($("#right_move_divs").data("class") == ""){
		id = "move_div_area";
	}
	if($(this).parent().prop("class") == "font_color"){
		$(`#${id}`).css("color",$(this).data("color"));
	}else if($(this).parent().prop("class") == "background_color"){
		$(`#${id}`).css("background-color",$(this).data("color"));
	}
})
$("#size").on("click", function() {
	let id = `${$("#right_move_divs").data("class")}_${$("#right_move_divs").data("target")}`;
	if($("#right_move_divs").data("class") == ""){
		id = "move_div_area";
		const hei = prompt("?????? ??????",$(`#${id}`).css("height").replace("px",""));
		if(isNaN(hei) || hei <= 0){
			alert("0?????? ??? ????????? ???????????????");
			return false;
		}
		$(`#${id}`).css("height",hei);
	}else{
		const wid = prompt("?????? ??????",$(`#${id}`).css("width").replace("px",""));
		const hei = prompt("?????? ??????",$(`#${id}`).css("height").replace("px",""));
		if(isNaN(wid) || isNaN(hei) || wid <= 0 || hei <= 0){
			alert("0?????? ??? ????????? ???????????????");
			return false;
		}
		$(`#${id}`).css("width",wid);
		$(`#${id}`).css("height",hei);
	}
})
$("#font_size").on("click", function() {
	let id = `${$("#right_move_divs").data("class")}_${$("#right_move_divs").data("target")}`;
	if($("#right_move_divs").data("class") == ""){
		id = "move_div_area";
	}
	const font_size = prompt("?????? ??????",$(`#${id}`).css("font-size").replace("px",""));
	if(isNaN(font_size) || font_size <= 0){
		alert("0?????? ??? ????????? ???????????????");
		return false;
	}
	$(`#${id}`).css("font-size",font_size+"px");
})
$(".locs").on("click", function() {
	if($("#right_move_divs").data("class") == ""){
		alert("?????? ????????? ??? ??? ?????? ???????????????.");
		return false;
	}
	const id = `${$("#right_move_divs").data("class")}_${$("#right_move_divs").data("target")}`;
	const locs = $(this).data("locs");
	if(locs == "move"){
		const top = prompt("x ??????",$(`#${id}`).css("top").replace("px",""));
		const left = prompt("y ??????",$(`#${id}`).css("left").replace("px",""));
		if(isNaN(top) || isNaN(left) || top <= 0 || left <= 0){
			alert("0?????? ??? ????????? ???????????????");
			return false;
		}
		$(`#${id}`).css("top",top+"px");
		$(`#${id}`).css("left",left+"px");
	}else if(locs == "fix"){
		$(`#${$("#right_move_divs").data("class")}_handler_${$("#right_move_divs").data("target")}`).toggle();
	}else if(locs == "center"){
		if(id == "move_div_area"){
			alert("????????? ????????? ??? ??? ????????????.")
		}else{
			const leftVal = 960 - $(`#${id}`).css("width").replace("px","")/2;
			$(`#${id}`).css("left",leftVal);
		}
	}
})

$("#delete_target").on("click", function() {
	if($("#right_move_divs").data("class") == ""){
		alert("????????? ??? ?????? ???????????????.");
		return false;
	}
	const id = `${$("#right_move_divs").data("class")}_${$("#right_move_divs").data("target")}`;
	$(`#${id}`).remove();
	if(`#${id}` == "#div_login_login"){
		$("#add_login").toggle();
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
		<div class="move_divs_handler" id="move_divs_handler_${cnt}">???</div>
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

function logOut() {
	$.getJSON("/logout",{id:$("#userID").val()},function(){
		$("input[name='id']").val("");
		$("input[name='password']").val("");
		$("#table_login").css("display","flex");
		$("#table_after_login").css("display","none");
	})
}

function logIn(){
	$.getJSON("/login",{id:$("input[name='id']").val(),password:$("input[name='password']").val()},function(res){
		$("#userID").val(res.id);
		$("#userID_span").html(res.id);
		$("#table_login").css("display","none");
		$("#table_after_login").css("display","flex");
	})
}

$("#add_login").on("click", function(){
	$(this).toggle();
	const login = `
		<div id="div_login_login" class="div_login" data-target="login">
		<div class="move_divs_handler" id="div_login_handler_login">???</div>
		<input type="hidden" value="${tv}" name="tv">
		<table id="table_login" class="table_login">
		<tr>
		<td><span class="editable_login">?????????</span></td>
		<td><input type="text" name="id" placeholder="id"></td>
		</tr>
		<tr>
		<td><span class="editable_login">????????????</span></td>
		<td><input type="password" name="password" placeholder="password"></td>
		</tr>
		<tr>
		<td colspan="2">
		<input type="button" value="?????????" id="log_in">
		<input type="button" value="????????????" id="sign_up">
		</td>
		</tr>
		</table>
		<table id="table_after_login" class="table_login">
		<tr>
		<td><span id="userID_span"></span></td>
		</tr>
		<tr>
		<td><input type="button" value="????????????" id="log_out"></td>
		</tr>
		</table>
		</div>
		`;
	$("#move_div_area").append(login);
	$("#sign_up").on("click", function(e) {
		e.preventDefault();
		location.href = `/${tv}/signup`;
	})
	$("#log_in").on("click", function() {
		logIn();
	})
	$("#log_out").on("click", function() {
		logOut();
	})
	dragElement($("#div_login_login")[0]);
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
	if(prompt(`?????????????????????????
	?????? ???????????? "????????????/${tv}" ??? ???????????????.`) == "????????????/"+tv){
		$.ajax({
			type:'post',
			url:'/test/remove',
			data:tv,
			contentType: "application/json; charset=utf-8",
			success:function(){
				alert('?????????????????????.');
				location.href='/test/main';
			}
		})
	}
})
$("#save").on("click",function(){
	const tv = $(this).data("tv");
	if(confirm("?????????????????????????")){
		$.getJSON("/test/load",{url:tv},function(res){
			if(confirm("?????? ????????? ????????? ????????????. ?????????????????????????")){
				$.ajax({
					type:"put",
					url:"/test/modify",
					data:JSON.stringify({
						url:tv,
						content:$("body").html()
					}),
					contentType: "application/json; charset=utf-8",
					success: function() {
						alert("?????????????????????.");
						if(confirm("???????????? ??????????????????????")){
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
					alert("?????????????????????.");
					if(confirm("???????????? ??????????????????????")){
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
		alert("???????????? ??????");
		if(userID != ""){
			$("#table_login").css("display","none");
			$("#table_after_login").css("display","flex");
		}
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
			if(prompt(`?????????????????????????
			?????? ???????????? "????????????/${tv}" ??? ???????????????.`) == "????????????/"+tv){
				$.ajax({
					type:'post',
					url:'/test/remove',
					data:tv,
					contentType: "application/json; charset=utf-8",
					success:function(){
						alert('?????????????????????.');
						location.href='/test/main';
					}
				})
			}
		})
		$("#save").on("click",function(){
			const tv = $(this).data("tv");
			if(confirm("?????????????????????????")){
				$.getJSON("/test/load",{url:tv},function(res){
					if(confirm("?????? ????????? ????????? ????????????. ?????????????????????????")){
						$.ajax({
							type:"put",
							url:"/test/modify",
							data:JSON.stringify({
								url:tv,
								content:$("body").html()
							}),
							contentType: "application/json; charset=utf-8",
							success: function() {
								alert("?????????????????????.");
								if(confirm("???????????? ??????????????????????")){
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
							alert("?????????????????????.");
							if(confirm("???????????? ??????????????????????")){
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
				<div class="move_divs_handler" id="move_divs_handler_${cnt}">???</div>
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
		$(document).off("contextmenu").on("contextmenu",function(e){
			e.preventDefault();
			if(e.target.className == "move_divs" || e.target.className == "editable" || e.target.className == "div_login" || e.target.className == "div_home"){
				$("#right_move_divs").data("target",$(e.target).data("target"));
				$("#right_move_divs").data("class",e.target.className);
				$("#right_move_divs").css("top",e.pageY).css("left",e.pageX).css("display","flex");
				$(".font_color").css("top","0px").css("left","100px");
				$(".background_color").css("top","32px").css("left","100px");
				$(".loc").css("top","128px").css("left","100px");
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
			let id = `${$("#right_move_divs").data("class")}_${$("#right_move_divs").data("target")}`;
			if($("#right_move_divs").data("class") == ""){
				id = "move_div_area";
			}
			if($(this).parent().prop("class") == "font_color"){
				$(`#${id}`).css("color",$(this).data("color"));
			}else if($(this).parent().prop("class") == "background_color"){
				$(`#${id}`).css("background-color",$(this).data("color"));
			}
		})
		$("#size").on("click", function() {
			let id = `${$("#right_move_divs").data("class")}_${$("#right_move_divs").data("target")}`;
			if($("#right_move_divs").data("class") == ""){
				id = "move_div_area";
				const hei = prompt("?????? ??????",$(`#${id}`).css("height").replace("px",""));
				if(isNaN(hei) || hei <= 0){
					alert("0?????? ??? ????????? ???????????????");
					return false;
				}
				$(`#${id}`).css("height",hei);
			}else{
				const wid = prompt("?????? ??????",$(`#${id}`).css("width").replace("px",""));
				const hei = prompt("?????? ??????",$(`#${id}`).css("height").replace("px",""));
				if(isNaN(wid) || isNaN(hei) || wid <= 0 || hei <= 0){
					alert("0?????? ??? ????????? ???????????????");
					return false;
				}
				$(`#${id}`).css("width",wid);
				$(`#${id}`).css("height",hei);
			}
		})
		$("#font_size").on("click", function() {
			let id = `${$("#right_move_divs").data("class")}_${$("#right_move_divs").data("target")}`;
			if($("#right_move_divs").data("class") == ""){
				id = "move_div_area";
			}
			const font_size = prompt("?????? ??????",$(`#${id}`).css("font-size").replace("px",""));
			if(isNaN(font_size) || font_size <= 0){
				alert("0?????? ??? ????????? ???????????????");
				return false;
			}
			$(`#${id}`).css("font-size",font_size+"px");
		})
		$(".locs").on("click", function() {
			if($("#right_move_divs").data("class") == ""){
				alert("?????? ????????? ??? ??? ?????? ???????????????.");
				return false;
			}
			const id = `${$("#right_move_divs").data("class")}_${$("#right_move_divs").data("target")}`;
			const locs = $(this).data("locs");
			if(locs == "move"){
				const top = prompt("x ??????",$(`#${id}`).css("top").replace("px",""));
				const left = prompt("y ??????",$(`#${id}`).css("left").replace("px",""));
				if(isNaN(top) || isNaN(left) || top <= 0 || left <= 0){
					alert("0?????? ??? ????????? ???????????????");
					return false;
				}
				$(`#${id}`).css("top",top+"px");
				$(`#${id}`).css("left",left+"px");
			}else if(locs == "fix"){
				$(`#${$("#right_move_divs").data("class")}_handler_${$("#right_move_divs").data("target")}`).toggle();
			}else if(locs == "center"){
				if(id == "move_div_area"){
					alert("????????? ????????? ??? ??? ????????????.")
				}else{
					const leftVal = 960 - $(`#${id}`).css("width").replace("px","")/2;
					$(`#${id}`).css("left",leftVal);
				}
			}
		})
		$("#delete_target").on("click", function() {
			if($("#right_move_divs").data("class") == ""){
				alert("????????? ??? ?????? ???????????????.");
				return false;
			}
			const id = `${$("#right_move_divs").data("class")}_${$("#right_move_divs").data("target")}`;
			$(`#${id}`).remove();
			if(`#${id}` == "#div_login_login"){
				$("#add_login").toggle();
			}

		})
		$("#body_controller").off("click").on("click", function(e){
			$("#body_menu").css("top","100px");
			$("#body_menu").css("left","100px");
			$("#body_menu").toggle();
		})
		$("#sign_up").on("click", function(e) {
			e.preventDefault();
			location.href = `/${tv}/signup`;
		})
		$("#log_in").on("click", function() {
			logIn();
		})
		$("#log_out").on("click", function() {
			logOut();
		})
		$("#add_login").off("click").on("click", function(){
			$(this).toggle();
			const login = `
				<div id="div_login_login" class="div_login" data-target="login">
				<div class="move_divs_handler" id="div_login_handler_login">???</div>
				<input type="hidden" value="${tv}" name="tv">
				<table id="table_login" class="table_login">
				<tr>
				<td><span class="editable_login">?????????</span></td>
				<td><input type="text" name="id" placeholder="id"></td>
				</tr>
				<tr>
				<td><span class="editable_login">????????????</span></td>
				<td><input type="password" name="password" placeholder="password"></td>
				</tr>
				<tr>
				<td colspan="2">
				<input type="button" value="?????????" id="log_in">
				<input type="button" value="????????????" id="sign_up">
				</td>
				</tr>
				</table>
				<table id="table_after_login" class="table_login">
				<tr>
				<td><span id="userID_span"></span></td>
				</tr>
				<tr>
				<td><input type="button" value="????????????" id="log_out"></td>
				</tr>
				</table>
				</div>
				`;
			$("#move_div_area").append(login);
			$("#sign_up").off("click").on("click", function(e) {
				e.preventDefault();
				location.href = `/${tv}/signup`;
			})
			$("#log_in").on("click", function() {
				logIn();
			})
			$("#log_out").on("click", function() {
				logOut();
			})
			dragElement($("#div_login_login")[0]);
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
		alert("????????? ????????? ????????????.");
	})
}

