package org.test.controller;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
public class TestController {
	@RequestMapping(value = "/test/main", method = RequestMethod.GET)
	public void main(HttpSession session) {
		session.invalidate();
	}

	@RequestMapping(value = "/test/ready", method = RequestMethod.GET)
	public void ready(String tv, HttpSession session) {
		session.setAttribute("tv", tv);
		String uploadFolder = "C:\\Users\\master\\Desktop\\sp\\test\\src\\main\\webapp\\WEB-INF\\views";
		File uploadPath = new File(uploadFolder, tv);
		if(!uploadPath.exists()) {
			System.out.println("jsp Folder created");
			uploadPath.mkdirs();
		}else {
			System.out.println("jsp Folder already exists");
		}
		File jsp = new File(uploadFolder+"\\"+tv+"\\hi.jsp");
		try {
			if(jsp.createNewFile()) {
				System.out.println("jsp File created");
			}else {
				System.out.println("jsp File already exists");
			}

			FileWriter fw = new FileWriter(jsp);
			BufferedWriter bw = new BufferedWriter(fw);
			bw.write("<%@ page language=\"java\" contentType=\"text/html; charset=UTF-8\"\r\n" + 
					"    pageEncoding=\"UTF-8\"%>\r\n" + 
					"<%@ taglib uri=\"http://java.sun.com/jsp/jstl/core\" prefix=\"c\" %>      \r\n" + 
					"<!DOCTYPE html>\r\n" + 
					"<html>\r\n" + 
					"<head>\r\n" + 
					"<meta charset=\"UTF-8\">\r\n" + 
					"<title>hi "+tv+"</title>\r\n" + 
					"</head>\r\n" + 
					"<body>\r\n" +
					"hi 안녕"+tv+
					"<input type='button' value='삭제' id='remove' data-tv='"+tv+"'>\r\n"+
					"<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js\"></script>\r\n"+
					"<script src=\"../resources/js/"+tv+"/"+tv+".js\">"+
					
					"</script>\r\n"+
					"</body>\r\n" + 
					"</html>");
			bw.close();
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		String uploadJS = "C:\\Users\\master\\Desktop\\sp\\test\\src\\main\\webapp\\resources\\js";
		File uploadJSPath = new File(uploadJS, tv);
		if(!uploadJSPath.exists()) {
			System.out.println("js Folder created");
			uploadJSPath.mkdirs();
		}else {
			System.out.println("js Folder already exists");
		}
		File JS = new File(uploadJS+"\\"+tv+"\\"+tv+".js");
		try {
			if(JS.createNewFile()) {
				System.out.println("js File created");
			}else {
				System.out.println("js File already exists");
			}

			FileWriter fw = new FileWriter(JS);
			BufferedWriter bw = new BufferedWriter(fw);
			bw.write(
					"const tv = $('#remove').data('tv');\r\n"+
					"console.log(tv);\r\n"+
					"$('#remove').on('click',function(){\r\n"+
						"if(confirm('삭제하시겠습니까?')){\r\n"+
							"$.ajax({\r\n"+
								"type:'post',\r\n"+
								"url:'/test/remove',\r\n"+
								"data:tv,\r\n"+
								"contentType: \"application/json; charset=utf-8\",\r\n"+
								"success:function(){\r\n"+
									"alert('삭제되었습니다.')\r\n"+
									"location.href='/test/main';\r\n"+
						"}})\r\n"+
					"}})\r\n"
					);
			bw.close();
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/{tv}/hi", method = RequestMethod.GET)
	public void hi() {

	}

	@RequestMapping(value = "/test/remove", method = RequestMethod.POST)
	public ResponseEntity<String> remove(HttpSession session) {
		String tv = (String)session.getAttribute("tv");
		int result = 0;
		String uploadFolder = "C:\\Users\\master\\Desktop\\sp\\test\\src\\main\\webapp\\WEB-INF\\views";
		File file = new File(uploadFolder+"\\"+tv);
		if( file.exists() ){ 

			if(file.isDirectory()){ 

				File[] files = file.listFiles();

				for( int i=0; i<files.length; i++){
					if( files[i].delete() ){
						System.out.println(files[i].getName()+" 삭제성공");
					}else{
						System.out.println(files[i].getName()+" 삭제실패");
					}
				}

			}
			if(file.delete()){
				System.out.println("파일삭제 성공");
				result++;
			}else{
				System.out.println("파일삭제 실패");
			}

		}else{
			System.out.println("파일이 존재하지 않습니다.");
		}
		
		String uploadJS = "C:\\Users\\master\\Desktop\\sp\\test\\src\\main\\webapp\\resources\\js";
		File jsFile = new File(uploadJS+"\\"+tv);
		if( jsFile.exists() ){ 

			if(jsFile.isDirectory()){ 

				File[] files = jsFile.listFiles();

				for( int i=0; i<files.length; i++){
					if( files[i].delete() ){
						System.out.println(files[i].getName()+" 삭제성공");
					}else{
						System.out.println(files[i].getName()+" 삭제실패");
					}
				}

			}
			if(jsFile.delete()){
				System.out.println("파일삭제 성공");
				result++;
			}else{
				System.out.println("파일삭제 실패");
			}

		}else{
			System.out.println("파일이 존재하지 않습니다.");
		}
		return result==2? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
