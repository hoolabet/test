/**
 * 
 */
const tv = $("#save").data("tv");

$(document).on("contextmenu",function(e){
	e.preventDefault();
	if(e.target.className == "modi_input"){
		$("#modify_input").data("id",e.target.id);
		$("#modify_input").css("top",e.pageY).css("left",e.pageX).css("display","flex");
		$(".reg").css("top","-22px").css("left","100px");
		if($(e.target).attr("data-str") == "on"){
			$("#reg_str").css("background-color","#52afe8");
		}else{
			$("#reg_str").css("background-color","#ebebeb");
		}
		if($(e.target).attr("data-num") == "on"){
			$("#reg_num").css("background-color","#52afe8");
		}else{
			$("#reg_num").css("background-color","#ebebeb");
		}
		if($(e.target).attr("data-spe") == "on"){
			$("#reg_spe").css("background-color","#52afe8");
		}else{
			$("#reg_spe").css("background-color","#ebebeb");
		}
	}
})

$("#sign_img").on("click", function(e) {
	$("#sign_element").css("left",e.pageX).css("top",e.pageY).toggle();
})

$(document).on("click", function(e) {
	if(e.target.id != "sign_img"){
		$("#sign_element").css("display","none");
	}
	if(e.target.className != "modi_span"){
		$("#modify_span").css("display","none");
	}
	$("#modify_input").css("display","none");
})

$(".sign_element").on("click", function() {
	const id = $(this).prop("id");
	let tr = "";
	switch (id) {
	case "sign_name":
		tr = `
			<tr>
			<td><span class="modi_span" id="name_span">NAME</span><span class="tr_remove" data-id="${id}">❌</span></td>
			<td><input class="modi_input" type="text" name="name" id="name" required data-able='f'><span class='name check_span'></span></td>
			</tr>
			`;

		break;
	case "sign_mail":
		tr = `
			<tr>
			<td><span class="modi_span" id="mail_span">E-MAIL</span><span class="tr_remove" data-id="${id}">❌</span></td>
			<td>
			<input class="modi_input" type="text" id="fe" required>@
			<input class="modi_input" type="text" id="dir_address" required readonly>
			<select id="address_select">
			<option></option>
			<option value="naver.com">naver.com</option>
			<option value="google.com">google.com</option>
			<option value="dir">직접입력</option>
			</select>
			<span class='fe check_span'></span>
			<input type="hidden" name="mail" id="mail" data-able='f'>
			</td>
			</tr>
			`;

		break;
	case "sign_phone":
		tr = `
			<tr>
			<td><span class="modi_span" id="phone_span">PHONE</span><span class="tr_remove" data-id="${id}">❌</span></td>
			<td>
			<select id="fp">
			<option value="010">010</option>
			<option value="011">011</option>
			<option value="016">016</option>
			<option value="017">017</option>
			<option value="018">018</option>
			<option value="019">019</option>
			</select>
			<input class="modi_input" type="text" id="bp" required data-lenmin="7" data-lenmax="8" data-num="on">
			<span class='bp check_span'></span>
			<input type="hidden" name="phone" id="phone" data-able='f'>
			</td>
			</tr>
			`;

		break;
	case "sign_birth":
		tr = `
			<tr>
			<td><span class="modi_span" id="birth_span">BIRTH</span><span class="tr_remove" data-id="${id}">❌</span></td>
			<td><input class="modi_input" type="date" name="birth" id="birth" value="2000-01-01"></td>
			</tr>
			`;

		break;
	default:
		break;
	}
	$("#before").before(tr);
	$(`#${id}`).toggle();
	$("#address_select").off("change").on("change", function() {
		$("#dir_address").val($(this).val());
		if($("#dir_address").val() == "dir"){
			$("#dir_address").prop("readonly",false);
			$("#dir_address").val("");
		}else{
			$("#dir_address").prop("readonly",true);
		}
		$("#mail").val($("#fe").val()+"@"+$("#dir_address").val());
	})
	$("#dir_address").on("change",function(){
		$("#mail").val($("#fe").val()+"@"+$("#dir_address").val());
	})
	$("#fe").on("blur",function(){
		$("#mail").val($("#fe").val()+"@"+$("#dir_address").val());
	})
	$("#fp").on("change",function(){
		$("#phone").val($("#fp").val()+""+$("#bp").val());
	})
	$("#bp").on("blur",function(){
		$("#phone").val($("#fp").val()+""+$("#bp").val());
	})
	$(".tr_remove").off("click").on("click", function() {
		$(this).parent().parent().remove();
		$(`#${$(this).data("id")}`).toggle();
	})
	$(".modi_span").off("click").on("click", function(e) {
		$("#modify_span").css("left",e.pageX).css("top",e.pageY).toggle();
		$("#ss_modify").data("id",$(this).prop("id"));
	})
	$(".modi_input").off("keyup").on("keyup",function(e){
		createRegExp(e);
	})
})

$(".modi_span").on("click", function(e) {
	$("#modify_span").css("left",e.pageX).css("top",e.pageY).toggle();
	console.log($(this).prop("id"));
	$("#ss_modify").data("id",$(this).prop("id"));
})

$("#ss_modify").on("click",function(){
	const prom = prompt("변경할 내용을 적으세요.");
	$(`#${$(this).data("id")}`).html(prom);
})
const reg = {
	str:"a-zA-Z가-힣",
	num:"0-9",
	spe:`!@#$%^*()\\-_=+\\\\\\|\\[\\]{};:\\'",.<>\\/?`
};
$(".reg").on("click", function() {
	const target = $("#modify_input").data("id");
	const regWhat = $(this).prop("id");

	if(regWhat == "reg_str"){
		if($(`#${target}`).attr("data-str") == "on"){
			$(`#${target}`).removeAttr("data-str");
		}else{
			$(`#${target}`).attr("data-str","on");
		}
	}else if(regWhat == "reg_num"){
		if($(`#${target}`).attr("data-num") == "on"){
			$(`#${target}`).removeAttr("data-num");
		}else{
			$(`#${target}`).attr("data-num","on");
		}
	}else if(regWhat == "reg_spe"){
		if($(`#${target}`).attr("data-spe") == "on"){
			$(`#${target}`).removeAttr("data-spe");
		}else{
			$(`#${target}`).attr("data-spe","on");
		}
	}else if(regWhat == "reg_free"){
		$(`#${target}`).removeAttr("data-str");
		$(`#${target}`).removeAttr("data-num");
		$(`#${target}`).removeAttr("data-spe");
	}

})

$("#len").on("click", function() {
	const target = $("#modify_input").data("id");
	const min = prompt("최소 글자 수를 적어주세요.");
	if(isNaN(min) || Number(min) <= 0 || Number(min) != Math.ceil(min)){
		alert("0 보다 큰 정수만 입력가능합니다.");
		return false;
	}
	const max = prompt("최대 글자 수를 적어주세요.");
	if(isNaN(max) || Number(max) < Number(min) || Number(max) != Math.ceil(max)){
		alert("최소 글자 수 보다 큰 정수만 입력가능합니다.");
		return false;
	}
	$(`#${target}`).attr("data-lenmin",min);
	$(`#${target}`).attr("data-lenmax",max);
})

$(".modi_input").off("keyup").on("keyup",function(e){
	createRegExp(e);
})

$("#sign_submit").on("click", function(e) {
	e.preventDefault();
	$("input[data-able]").each(function(i,a) {
		if($(a).attr("data-able") == "f"){
			console.log(a);
		}
	})
})

function createRegExp(e) {
	const str = $(e.target).attr("data-str") == "on" ? `(?=.*[${reg.str}])` : "";
	const num = $(e.target).attr("data-num") == "on" ? `(?=.*[${reg.num}])` : "";
	const spe = $(e.target).attr("data-spe") == "on" ? `(?=.*[${reg.spe}])` : "";
	const lenMin = $(e.target).attr("data-lenmin") == null ? "0" : $(e.target).attr("data-lenmin");
	const lenMax = $(e.target).attr("data-lenmax") == null ? "100" : $(e.target).attr("data-lenmax");

	const regExp = new RegExp(`^${str}${num}${spe}.{${lenMin},${lenMax}}$`);
	console.log(regExp);
	console.log($(e.target).val());
	console.log(regExp.test($(e.target).val()));
	if(regExp.test($(e.target).val())){
		$(`.${$(e.target).prop("id")}`).html("사용가능").css("color","green");
	}else{
		$(`.${$(e.target).prop("id")}`).html("사용불가").css("color","red");
	}
}
$("#save").on("click",function(){
	
	$.getJSON("/loadsignup",{url:tv},function(res){
		if(confirm("이미 저장된 자료가 있습니다. 덮어씌우시겠습니까?")){
			$.ajax({
				type:"put",
				url:"/modifysignup",
				data:JSON.stringify({url:tv,content:$("#sign_div").html()}),
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
			url:"/savesignup",
			data:JSON.stringify({url:tv,content:$("#sign_div").html()}),
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

$("#load").on("click", function() {
	$.getJSON("/loadsignup",{url:tv},function(res){
		alert("불러오기 성공");
		$("#sign_div").html(res.content);
		$(".check_span").html("");
		$(".modi_input").val("");
		$(".modi_input").off("keyup").on("keyup",function(e){
			createRegExp(e);
		})
	})
})
