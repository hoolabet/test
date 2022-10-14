package org.test.controller;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.test.model.ContentVO;
import org.test.model.MemberVO;
import org.test.service.TestService;


@Controller
public class TestController {
	@Autowired
	TestService ts;

	@RequestMapping(value = "/test/main", method = RequestMethod.GET)
	public void main(HttpSession session) {
		session.invalidate();
	}

	@RequestMapping(value = "/test/ready", method = RequestMethod.GET)
	public void ready(String tv, HttpSession session) {
		session.setAttribute("tv", tv);
		//String uploadFolder = "C:\\Users\\master\\Desktop\\sp\\test\\src\\main\\webapp\\WEB-INF\\views";
		String uploadFolder = "D:\\01-STUDY\\e\\git\\test\\src\\main\\webapp\\WEB-INF\\views";
		File uploadPath = new File(uploadFolder, tv);
		if(!uploadPath.exists()) {
			System.out.println("jsp Folder created");
			uploadPath.mkdirs();
		}else {
			System.out.println("jsp Folder already exists");
		}
		File jsp = new File(uploadFolder+"\\"+tv+"\\home.jsp");
		File signUpJsp = new File(uploadFolder+"\\"+tv+"\\signup.jsp");
		File header = new File(uploadFolder+"\\"+tv+"\\header.jsp");
		File footer = new File(uploadFolder+"\\"+tv+"\\footer.jsp");
		try {
			if(jsp.createNewFile()) {
				System.out.println("jsp File created");
				FileWriter fw = new FileWriter(jsp);
				BufferedWriter bw = new BufferedWriter(fw);
				bw.write("<%@ page language=\"java\" contentType=\"text/html; charset=UTF-8\"\r\n" + 
						"    pageEncoding=\"UTF-8\"%>\r\n" + 
						"<%@ taglib uri=\"http://java.sun.com/jsp/jstl/core\" prefix=\"c\" %>      \r\n" + 
						"<!DOCTYPE html>\r\n" + 
						"<html>\r\n" + 
						"<head>\r\n" + 
						"<meta charset=\"UTF-8\">\r\n" + 
						"<title>home ${tv} <c:if test='${user.id ne null}'>login ${user.id}</c:if></title>\r\n" + 
						"<link rel='stylesheet' href='../resources/css/test_content.css'> \r\n"+
						"<link rel='stylesheet' href='../resources/css/test_header_controller.css'> \r\n"+
						"<link rel='stylesheet' href='../resources/css/test_footer_controller.css'> \r\n"+
						"</head>\r\n" + 
						"<body>\r\n" +
						"<input type='hidden' value='${tv}' id='tv'>\r\n"+
						"<input type='hidden' id='userID'>\r\n"+
						"<div id='btns'>"+
						"	<input type='button' value='저장' id='save' data-tv='"+tv+"'>\r\n"+
						"	<input type='button' value='삭제' id='remove' data-tv='"+tv+"'>\r\n"+
						"	<input type='button' value='불러오기' id='load' data-tv='"+tv+"'>\r\n"+
						"</div>\r\n"+
						"<%@ include file=\"header.jsp\"%>"+
						"	<div id=\"side_list\">\n" + 
						"        <div id=\"side_btn\">\n" + 
						"            <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAASFBMVEUAAAD////6+voXFxfv7+8ODg6dnZ0ICAi6urqXl5djY2MtLS0aGhrn5+egoKBDQ0NycnJ7e3vExMSKior19fXq6upKSkrg4OBTz6uIAAACa0lEQVR4nO3d7W6qQBRG4dmUHmD4BpX7v9ODbU1HkXPawHaHyXr+NeHHu2JURFKdLKR54csqc8eSVaUv8nSZ4x7+rpvWeusmbVP/s3DqrBfuoJtWC5PeetxO+uR54WA9bEfDs8LRetWuxmWht960M/9YeLFetLvLfWFsj+CVDwvjeg7ejN+FMb2KhoZbYWK9RE3yVRjLG/1S/1k4We9QNH0UxnAuuqa7FtbWK1TVc2FjPUJVMxce+/Pg/7TiUusNylKXW09QlrvCeoKywsV4zh3yrrSeoKx0lfUEZZU72nXR34q9DwAAAAAAAACwxSl57hx+QfBHVo7a5vSSwvDmzVD6dleo4jW3/lBIIYUUUkghhRRSSCGFFFJIIYUUUkghhfs4p89NYWFxWjlqm/NLCqu3FeFB76tHbRL7XekAAAAAAAAAjuV9TXhQtnrUNi8pjP+ad/zfW1BIIYUUUkghhRRSSCGFFFJIIYUUUkghhfuI/3pp/Ne8AQAAAAAAAOBn4v+fCvFf847/ewsKKaSQQgoppJBCCimkkEIKKaSQQgoppHAf8f/uGgAAAAAAAADgmDLrAcoyF/uv0VWutJ6grHTeeoIy7wrrCcoKl1tPUJa71HqCstRJa71BVStOGusRqpq5sLYeoaqeC6WzXqGok2vhZD1D0fRRKL31DjW9fBa+5iYVC8lXoQzWS5QMciuU0XqLilG+CyXG828vYaFcrPfs7iL3hdE9il4eCyN7Lo6yLIzqFXWQZ4WSxPLW34e3wIaF8wlcDOeo3XTXdF8oUjfH/rzYNvVD0WPhLM0LX1ZHu46aVaUv8nSZ8xdXzzyNb8hrGQAAAABJRU5ErkJggg==\">\n" + 
						"        </div>\n" + 
						"        <div id=\"move_div_maker\">\n" + 
						"            <img src=\"https://icons-for-free.com/download-icon-circle+more+plus+icon-1320183136549593898_512.png\">\n" + 
						"        </div>\n" +
						"		<div id=\"body_controller\">\n" + 
						"            <div id=\"body_menu\">\n" + 
						"                <div id=\"add_login\">로그인</div>\n" + 
						"            </div>\n" + 
						"        </div>\n"+
						"		<div id='container_controller'>\r\n"+
						"			<div id='container_menu'>\r\n"+
						"				<div id='header_controller'>HEADER</div>\r\n"+
						"				<div id='main_controller'>MAIN</div>\r\n"+
						"				<div id='footer_controller'>FOOTER</div>\r\n"+
						"			</div>\r\n"+
						"		</div>\r\n"+
						"    </div>\n" + 
						"    <div id=\"move_div_area\">\n" + 
						"    </div>"+
						"<div id='right_move_divs'>\r\n"+
						"	<div id='font_color'>\r\n"+
						"		글자 색\r\n"+
						"		<div class='font_color'>\r\n"+
						"			<div class='color' data-color='white'></div>\r\n"+
						"			<div class='color' data-color='red'></div>\r\n"+
						"			<div class='color' data-color='orange'></div>\r\n"+
						"			<div class='color' data-color='yellow'></div>\r\n"+
						"			<div class='color' data-color='green'></div>\r\n"+
						"			<div class='color' data-color='blue'></div>\r\n"+
						"			<div class='color' data-color='navy'></div>\r\n"+
						"			<div class='color' data-color='purple'></div>\r\n"+
						"			<div class='color' data-color='gray'></div>\r\n"+
						"			<div class='color' data-color='black'></div>\r\n"+
						"		</div>\r\n"+
						"		</div>\r\n"+
						"	<div id='background_color'>\r\n"+
						"		배경 색\r\n"+
						"		<div class='background_color'>\r\n"+
						"			<div class='color' data-color='white'></div>\r\n"+
						"			<div class='color' data-color='red'></div>\r\n"+
						"			<div class='color' data-color='orange'></div>\r\n"+
						"			<div class='color' data-color='yellow'></div>\r\n"+
						"			<div class='color' data-color='green'></div>\r\n"+
						"			<div class='color' data-color='blue'></div>\r\n"+
						"			<div class='color' data-color='navy'></div>\r\n"+
						"			<div class='color' data-color='purple'></div>\r\n"+
						"			<div class='color' data-color='gray'></div>\r\n"+
						"			<div class='color' data-color='black'></div>\r\n"+
						"		</div>\r\n"+
						"		</div>\r\n"+
						"	<div id='size'>\r\n"+
						"		박스크기\r\n"+
						"	</div>\r\n"+
						"	<div id='font_size'>\r\n"+
						"		글씨크기\r\n"+
						"	</div>\r\n"+
						"	<div id='loc'>\r\n"+
						"		위치\r\n"+
						"		<div class='loc'>\r\n"+
						"			<div class='locs' data-locs='move'>이동</div>\r\n"+
						"			<div class='locs' data-locs='center'>가운데 정렬</div>\r\n"+
						"			<div class='locs' data-locs='fix'>고정</div>\r\n"+
						"		</div>\r\n"+
						"	</div>\r\n"+
						"	<div id='delete_target'>\r\n"+
						"		삭제\r\n"+
						"	</div>\r\n"+
						"</div>\r\n"+
						"<%@ include file=\"footer.jsp\"%>"+
						"<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js\"></script>\r\n"+
						"<script src=\"../resources/js/test_content.js\">"+

					"</script>\r\n"+
					"</body>\r\n" + 
						"</html>");
				bw.close();
			}else {
				System.out.println("jsp File already exists");
			}
			if(header.createNewFile()) {
				System.out.println("header File created");
				FileWriter fw = new FileWriter(header);
				BufferedWriter bw = new BufferedWriter(fw);
				bw.write("<%@ page language=\"java\" contentType=\"text/html; charset=UTF-8\"\r\n" + 
						"    pageEncoding=\"UTF-8\"%>\r\n" + 
						"<%@ taglib uri=\"http://java.sun.com/jsp/jstl/core\" prefix=\"c\" %>      \r\n" +
						"<div id='header'>\r\n"+
						"\r\n"+
						"</div>\r\n"+
						""
						);
				bw.close();
			}else {
				System.out.println("header File already exists");
			}
			if(footer.createNewFile()) {
				System.out.println("footer File created");
				FileWriter fw = new FileWriter(footer);
				BufferedWriter bw = new BufferedWriter(fw);
				bw.write("<%@ page language=\"java\" contentType=\"text/html; charset=UTF-8\"\r\n" + 
						"    pageEncoding=\"UTF-8\"%>\r\n" + 
						"<%@ taglib uri=\"http://java.sun.com/jsp/jstl/core\" prefix=\"c\" %>      \r\n" +
						"<div id='footer'>\r\n"+
						"\r\n"+
						"</div>\r\n"+
						""
						);
				bw.close();
			}else {
				System.out.println("footer File already exists");
			}

			if(signUpJsp.createNewFile()) {
				System.out.println("signup File created");
				FileWriter fw = new FileWriter(signUpJsp);
				BufferedWriter bw = new BufferedWriter(fw);
				bw.write("<%@ page language=\"java\" contentType=\"text/html; charset=UTF-8\"\r\n" + 
						"    pageEncoding=\"UTF-8\"%>\r\n" + 
						"<%@ taglib uri=\"http://java.sun.com/jsp/jstl/core\" prefix=\"c\" %>      \r\n" + 
						"<!DOCTYPE html>\r\n" + 
						"<html>\r\n" + 
						"<head>\r\n" + 
						"<meta charset=\"UTF-8\">\r\n" + 
						"<title>sign up "+tv+"</title>\r\n" + 
						"<link rel='stylesheet' href='../resources/css/test_header_controller.css'> \r\n"+
						"<link rel='stylesheet' href='../resources/css/test_footer_controller.css'> \r\n"+
						"<link rel='stylesheet' href='../resources/css/test_signup.css'> \r\n"+
						"</head>\r\n" + 
						"<body>\r\n" +
						"<div id='btns'>"+
						"	<input type='button' value='저장' id='save' data-tv='"+tv+"'>\r\n"+
						"	<input type='button' value='삭제' id='remove' data-tv='"+tv+"'>\r\n"+
						"	<input type='button' value='불러오기' id='load' data-tv='"+tv+"'>\r\n"+
						"</div>\r\n"+
						"<%@ include file=\"header.jsp\"%>\r\n"+
						"<div id='entry'>\r\n"+
						"	<div id='sign_div'>\r\n"+
						"		<form id='sign_form'>\r\n"+
						"			<table id='sign_table'>\r\n"+
						"				<tr>\r\n"+
						"					<td style='width:150px;'><span class='modi_span' id='id_span'>ID</span></td>\r\n"+
						"					<td style='width:650px;'><input class='modi_input' type='text' name='id' id='id' required data-able='f'><input type='button' value='중복확인' id='dup_check'><span class='id check_span'></span></td>\r\n"+
						"				</tr>\r\n"+
						"				<tr>\r\n"+
						"					<td><span class='modi_span' id='pw_span'>PASSWORD</span></td>\r\n"+
						"					<td><input class='modi_input' type='password' name='password' id='pw' required data-able='f'><span class='pw check_span'></span></td>\r\n"+
						"				</tr>\r\n"+
						"				<tr>\r\n"+
						"					<td><span class='modi_span' id='pwc_span'>PASSWORD CHECK</span></td>\r\n"+
						"					<td><input class='modi_input' type='password' id='pw_check' required><span class='pw_check check_span'></span></td>\r\n"+
						"				</tr>\r\n"+
						"				<tr id='before'>\r\n"+
						"					<td><img id='sign_img' src='https://icons-for-free.com/download-icon-circle+more+plus+icon-1320183136549593898_512.png'></td>\r\n"+
						"					<td><input type='submit' value='가입하기' id='sign_submit'></td>\r\n"+
						"				</tr>\r\n"+
						"			</table>\r\n"+
						"		</form>\r\n"+
						"	</div>\r\n"+
						"	<div id='sign_element'>\r\n"+
						"		<div class='sign_element' id='sign_name'>이름</div>\r\n"+
						"		<div class='sign_element' id='sign_mail'>이메일</div>\r\n"+
						"		<div class='sign_element' id='sign_phone'>전화번호</div>\r\n"+
						"		<div class='sign_element' id='sign_birth'>생년월일</div>\r\n"+
						"	</div>\r\n"+
						"	<div id='modify_span'>\r\n"+
						"		<div class='modify_span' id='ss_modify'>수정</div>\r\n"+
						"	</div>\r\n"+
						"	<div id='modify_input'>\r\n"+
						"		<div class='modify_input' id='reg'>정규식 설정\r\n"+
						"			<div class='reg' id='reg_free'>모두 허용</div>\r\n"+
						"			<div class='reg' id='reg_str'>문자</div>\r\n"+
						"			<div class='reg' id='reg_num'>숫자</div>\r\n"+
						"			<div class='reg' id='reg_spe'>특수문자</div>\r\n"+
						"		</div>\r\n"+
						"		<div class='modify_input' id='len'>글자 수 설정</div>\r\n"+
						"	</div>\r\n"+
						"</div>\r\n"+
						"<%@ include file=\"footer.jsp\"%>\r\n"+
						"<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js\"></script>\r\n"+
						"<script src=\"../resources/js/test_signup.js\">\r\n"+
						
					"</script>\r\n"+
					"</body>\r\n" + 
					"</html>"
						);
				bw.close();
			}else {
				System.out.println("signup File already exists");
			}
			String create_table = "create table member_"+tv+" ("
					+ "id varchar(100) primary key, "
					+ "password varchar(100) not null,"
					+ "name varchar(100),"
					+ "email varchar(100),"
					+ "phone varchar(100),"
					+ "birth varchar(100),"
					+ "sign_date datetime default now()"
					+ ")";
			ts.createMemTable(create_table);
			MemberVO mvo = new MemberVO();
			mvo.setId(tv);
			mvo.setPassword(tv);
			ts.createFirstAccount(mvo);
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

	}

	@RequestMapping(value = "/{tv}/home", method = RequestMethod.GET)
	public void home() {

	}

	@RequestMapping(value = "/{tv}/signup", method = RequestMethod.GET)
	public void signUp() {

	}

	@RequestMapping(value = "/test/remove", method = RequestMethod.POST)
	public ResponseEntity<String> remove(HttpSession session) {
		String tv = (String)session.getAttribute("tv");
		int result = 1;
		//String uploadFolder = "C:\\Users\\master\\Desktop\\sp\\test\\src\\main\\webapp\\WEB-INF\\views";
		String uploadFolder = "D:\\01-STUDY\\e\\git\\test\\src\\main\\webapp\\WEB-INF\\views";
		File file = new File(uploadFolder+"\\"+tv);
		if( file.exists() ){ 

			if(file.isDirectory()){ 

				File[] files = file.listFiles();

				for( int i=0; i<files.length; i++){
					if( files[i].delete() ){
						System.out.println(files[i].getName()+" jsp삭제성공");
					}else{
						System.out.println(files[i].getName()+" jsp삭제실패");
					}
				}

			}
			if(file.delete()){
				System.out.println("jsp파일삭제 성공");
				result += ts.remove(tv);
			}else{
				System.out.println("jsp파일삭제 실패");
			}

		}else{
			System.out.println("jsp파일이 존재하지 않습니다.");
		}
		try {
			String target = "member_"+tv;
			ts.dropTable(target);
		} catch (Exception e) {
			// TODO: handle exception
		}

		return result>=1? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@RequestMapping(value = "/test/modify", method = RequestMethod.PUT)
	public ResponseEntity<String> modify(@RequestBody ContentVO cvo) {
		int result = ts.modify(cvo);
		return result==1? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@RequestMapping(value = "/test/save", method = RequestMethod.POST)
	public ResponseEntity<String> save(@RequestBody ContentVO cvo) {
		int result = ts.save(cvo);
		return result==1? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@RequestMapping(value = "/test/load", method = RequestMethod.GET)
	public ResponseEntity<ContentVO> load(ContentVO cvo) {

		return new ResponseEntity<>(ts.load(cvo),HttpStatus.OK);
	}

	@RequestMapping(value = "/test/header_controller", method = RequestMethod.GET)
	public void headerController() {

	}

	@RequestMapping(value = "/loadheader", method = RequestMethod.GET)
	public ResponseEntity<ContentVO> loadHeader(ContentVO cvo) {

		return new ResponseEntity<>(ts.loadHeader(cvo),HttpStatus.OK);
	}

	@RequestMapping(value = "/saveheader", method = RequestMethod.POST)
	public ResponseEntity<String> saveHeader(@RequestBody ContentVO cvo) {
		int result = ts.saveHeader(cvo);
		return result==1? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@RequestMapping(value = "/modifyheader", method = RequestMethod.PUT)
	public ResponseEntity<String> modifyHeader(@RequestBody ContentVO cvo) {
		int result = ts.modifyHeader(cvo);
		return result==1? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@RequestMapping(value = "/test/footer_controller", method = RequestMethod.GET)
	public void footerController() {

	}

	@RequestMapping(value = "/loadfooter", method = RequestMethod.GET)
	public ResponseEntity<ContentVO> loadFooter(ContentVO cvo) {

		return new ResponseEntity<>(ts.loadFooter(cvo),HttpStatus.OK);
	}

	@RequestMapping(value = "/savefooter", method = RequestMethod.POST)
	public ResponseEntity<String> saveFooter(@RequestBody ContentVO cvo) {
		int result = ts.saveFooter(cvo);
		return result==1? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@RequestMapping(value = "/modifyfooter", method = RequestMethod.PUT)
	public ResponseEntity<String> modifyFooter(@RequestBody ContentVO cvo) {
		int result = ts.modifyFooter(cvo);
		return result==1? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@RequestMapping(value = "/loadsignup", method = RequestMethod.GET)
	public ResponseEntity<ContentVO> loadSignUp(ContentVO cvo) {

		return new ResponseEntity<>(ts.loadSignUp(cvo),HttpStatus.OK);
	}

	@RequestMapping(value = "/savesignup", method = RequestMethod.POST)
	public ResponseEntity<String> saveSignUp(@RequestBody ContentVO cvo) {

		int result = ts.saveSignUp(cvo);
		return result==1? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@RequestMapping(value = "/modifysignup", method = RequestMethod.PUT)
	public ResponseEntity<String> modifySignUp(@RequestBody ContentVO cvo) {
		int result = ts.modifySignUp(cvo);
		return result==1? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public ResponseEntity<MemberVO> login(MemberVO mvo, HttpSession session) {
		String tv = (String)session.getAttribute("tv");
		mvo.setSign_date(tv);
		session.setAttribute("user", ts.login(mvo));
		return new ResponseEntity<>(ts.login(mvo),HttpStatus.OK);
	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public ResponseEntity<MemberVO> logOut(MemberVO mvo, HttpSession session) {
		MemberVO m = new MemberVO();
		session.setAttribute("user", m);
		String tv = (String)session.getAttribute("tv");
		mvo.setSign_date(tv);
		return new ResponseEntity<>(ts.logOut(mvo),HttpStatus.OK);
	}
	
	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public ResponseEntity<String> signUp(@RequestBody MemberVO mvo, HttpSession session) {
		String tv = (String)session.getAttribute("tv");
		mvo.setSign_date(tv);
		
		int result = ts.signUp(mvo);
		return result==1? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@RequestMapping(value = "/dupcheck", method = RequestMethod.GET)
	public ResponseEntity<MemberVO> dupCheck(MemberVO mvo, HttpSession session) {
		String tv = (String)session.getAttribute("tv");
		mvo.setSign_date(tv);
		return new ResponseEntity<>(ts.dupCheck(mvo),HttpStatus.OK);
	}
	
}
