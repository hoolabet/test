/**
 * 
 */

$(document).on("contextmenu",function(e){
	e.preventDefault();
	if(e.target.className == "modi_input"){
		$("#modify_input").data("id",e.target.id);
		$("#modify_input").css("top",e.pageY).css("left",e.pageX).css("display","flex");
		$(".reg").css("top","-22px").css("left","100px");
		if($(e.target).data("str") == "on"){
			$("#reg_str").css("background-color","#52afe8");
		}else{
			$("#reg_str").css("background-color","#ebebeb");
		}
		if($(e.target).data("num") == "on"){
			$("#reg_num").css("background-color","#52afe8");
		}else{
			$("#reg_num").css("background-color","#ebebeb");
		}
		if($(e.target).data("spe") == "on"){
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
			<td><input class="modi_input" type="text" name="name" id="name" required></td>
			</tr>
			`;

		break;
	case "sign_mail":
		tr = `
			<tr>
			<td><span class="modi_span" id="mail_span">E-MAIL</span><span class="tr_remove" data-id="${id}">❌</span></td>
			<td>
			<input class="modi_input" type="text" id="fe" required>@
			<input class="modi_input" type="text" id="dir_address" required>
			<select id="address_select">
			<option value="naver.com">naver.com</option>
			<option value="google.com">google.com</option>
			<option value="dir">직접입력</option>
			</select>
			<input type="hidden" name="mail" id="mail">
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
			<input class="modi_input" type="text" id="bp" required>
			<input type="hidden" name="phone" id="phone">
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
	$(".tr_remove").off("click").on("click", function() {
		$(this).parent().parent().remove();
		$(`#${$(this).data("id")}`).toggle();
	})
	$(".modi_span").off("click").on("click", function(e) {
		$("#modify_span").css("left",e.pageX).css("top",e.pageY).toggle();
		$("#ss_modify").data("id",$(this).prop("id"));
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
		if($(`#${target}`).data("str") == "on"){
			$(`#${target}`).data("str","");
		}else{
			$(`#${target}`).data("str","on");
		}
	}else if(regWhat == "reg_num"){
		if($(`#${target}`).data("num") == "on"){
			$(`#${target}`).data("num","");
		}else{
			$(`#${target}`).data("num","on");
		}
	}else if(regWhat == "reg_spe"){
		if($(`#${target}`).data("spe") == "on"){
			$(`#${target}`).data("spe","");
		}else{
			$(`#${target}`).data("spe","on");
		}
	}else if(regWhat == "reg_free"){
		$(`#${target}`).data("str","");
		$(`#${target}`).data("num","");
		$(`#${target}`).data("spe","");
	}
	
})

$("#len").on("click", function() {
	const target = $("#modify_input").data("id");
	const min = prompt("최소 글자 수를 적어주세요.");
	if(isNaN(min) || min <= 0){
		alert("0 보다 큰 숫자만 입력가능합니다.");
		return false;
	}
	const max = prompt("최대 글자 수를 적어주세요.");
	if(isNaN(max) || max < min){
		alert("최소 글자 수 보다 큰 숫자만 입력가능합니다.");
		return false;
	}
	$(`#${target}`).data("lenmin",min);
	$(`#${target}`).data("lenmax",max);
})

$(".modi_input").on("keyup", function() {
	const str = $(this).data("str") == "on" ? `(?=.*[${reg.str}])` : "";
	const num = $(this).data("num") == "on" ? `(?=.*[${reg.num}])` : "";
	const spe = $(this).data("spe") == "on" ? `(?=.*[${reg.spe}])` : "";
	const lenMin = $(this).data("lenmin") == null ? "0" : $(this).data("lenmin");
	const lenMax = $(this).data("lenmax") == null ? "100" : $(this).data("lenmax");
	
	const regExp = new RegExp(`^${str}${num}${spe}.{${lenMin},${lenMax}}$`);
	console.log(regExp);
	console.log($(this).val());
	console.log(regExp.test($(this).val()));
})