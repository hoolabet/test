/**
 * 
 */
$(document).on("contextmenu",function(e){
	e.preventDefault();
	if(e.target.className == "move_divs"){
		$("#right_move_divs").data("target",e.target.className);
		$("#right_move_divs").css("top",e.clientY);
		$("#right_move_divs").css("left",e.clientX);
		$("#right_move_divs").css("display","flex");
		$(".font_color").css("top","0px");
		$(".font_color").css("left","100px");
		$(".font_color").data("target",e.target.className);
		$(".background_color").css("top","30px");
		$(".background_color").css("left","100px");
		$(".background_color").data("target",e.target.className);
	}else if(e.target.className == "editable"){
		$("#right_move_divs").data("target",e.target.className);
		$("#right_move_divs").css("top",e.clientY);
		$("#right_move_divs").css("left",e.clientX);
		$("#right_move_divs").css("display","flex");
		$(".font_color").css("top","0px");
		$(".font_color").css("left","100px");
		$(".font_color").data("target",e.target.className);
		$(".background_color").css("top","30px");
		$(".background_color").css("left","100px");
		$(".background_color").data("target",e.target.className);
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
	if($(this).parent().prop("class") == "font_color"){
		$(`.${$(this).parent().data("target")}`).css("color",$(this).data("color"));
	}else if($(this).parent().prop("class") == "background_color"){
		$(`.${$(this).parent().data("target")}`).css("background-color",$(this).data("color"));
	}
})


let sideOpen = false;
$("#side_btn").on("click", function(){
	if(sideOpen){
		$(this).parent().css("width","50px");
		$("#move_div_maker").css("display","none");
		sideOpen = false;
	}else{
		$(this).parent().css("width","300px");
		$("#move_div_maker").css("display","flex");
		sideOpen = true;
	}
})
let cnt = Date.now();
$("#move_div_maker").on("click", function(){
	const move_divs = `
		<div class="move_divs" id="move_divs_${cnt}">
		<div class="move_divs_handler">Click here</div>
		<div class="insert_div_btn">
		<img src="https://mpng.subpng.com/20180319/hke/kisspng-computer-icons-photography-img-landscape-photo-photography-picture-icon-5ab054dd97c503.7013351615215055016217.jpg">
		</div>
		<div class="delete_div_btn">
		<img src="https://i.pinimg.com/564x/81/e3/17/81e31793e4266d231831a9c2548e7e33.jpg">
		</div>
		</div>
		`;
	$("#move_div_area").append(move_divs);
	$(".move_divs").on("dblclick", function(){
		const editable = `
			<div contenteditable="true" class="editable"></div>
			`;
		$(this).append(editable);
	})
	$(".delete_div_btn").on("click", function(){
		$(this).parent().remove();
	})

	dragElement($(`#move_divs_${cnt}`)[0]);
	cnt = Date.now();
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
						content:$("html").html()
					}),
					contentType: "application/json; charset=utf-8",
					success: function() {
						alert("저장되었습니다.");
						location.href='/test/main';
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
					content:$("html").html()
				}),
				contentType: "application/json; charset=utf-8",
				success: function(){
					alert("저장되었습니다.");
					location.href='/test/main';
				}
			}) 
		})
	}
})

$("#load").on("click", function() {
	const tv = $(this).data("tv");
	$.getJSON("/test/load",{url:tv},function(res){
		$("html").html(res.content);
		alert("불러오기 성공");

		$(".move_divs").on("dblclick", function(){
			const editable = `
				<div contenteditable="true" class="editable"></div>
				`;
			$(this).append(editable);
		})
		$(".delete_div_btn").on("click", function(){
			$(this).parent().remove();
		})
		$(".move_divs").each(function(i,m) {
			dragElement(m);
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
								content:$("html").html()
							}),
							contentType: "application/json; charset=utf-8",
							success: function() {
								alert("저장되었습니다.");
								location.href='/test/main';
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
							content:$("html").html()
						}),
						contentType: "application/json; charset=utf-8",
						success: function(){
							alert("저장되었습니다.");
							location.href='/test/main';
						}
					}) 
				})
			}
		})

		let sideOpen = false;
		$("#side_btn").on("click", function(){
			if(sideOpen){
				$(this).parent().css("width","50px");
				$("#move_div_maker").css("display","none");
				sideOpen = false;
			}else{
				$(this).parent().css("width","300px");
				$("#move_div_maker").css("display","flex");
				sideOpen = true;
			}
		})
		let cnt = Date.now();
		$("#move_div_maker").on("click", function(){
			const move_divs = `
				<div class="move_divs" id="move_divs_${cnt}">
				<div class="move_divs_handler">Click here</div>
				<div class="insert_div_btn">
				<img src="https://mpng.subpng.com/20180319/hke/kisspng-computer-icons-photography-img-landscape-photo-photography-picture-icon-5ab054dd97c503.7013351615215055016217.jpg">
				</div>
				<div class="delete_div_btn">
				<img src="https://i.pinimg.com/564x/81/e3/17/81e31793e4266d231831a9c2548e7e33.jpg">
				</div>
				</div>
				`;
			$("#move_div_area").append(move_divs);
			$(".move_divs").on("dblclick", function(){
				const editable = `
					<div contenteditable="true" class="editable"></div>
					`;
				$(this).append(editable);
			})
			$(".delete_div_btn").on("click", function(){
				$(this).parent().remove();
			})

			dragElement($(`#move_divs_${cnt}`)[0]);
			cnt = Date.now();
		})
	})
	.fail(function() {
		alert("저장된 자료가 없습니다.");
	})

})
