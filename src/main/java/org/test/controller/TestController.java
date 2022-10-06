package org.test.controller;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.test.model.ContentVO;
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
		File jsp = new File(uploadFolder+"\\"+tv+"\\hi.jsp");
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
						"<title>hi "+tv+"</title>\r\n" + 
						"<link rel='stylesheet' href='../resources/css/test_content.css'> "+
						"</head>\r\n" + 
						"<body>\r\n" +
						"	<div id=\"side_list\">\n" + 
						"        <div id=\"side_btn\">\n" + 
						"            <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAASFBMVEUAAAD////6+voXFxfv7+8ODg6dnZ0ICAi6urqXl5djY2MtLS0aGhrn5+egoKBDQ0NycnJ7e3vExMSKior19fXq6upKSkrg4OBTz6uIAAACa0lEQVR4nO3d7W6qQBRG4dmUHmD4BpX7v9ODbU1HkXPawHaHyXr+NeHHu2JURFKdLKR54csqc8eSVaUv8nSZ4x7+rpvWeusmbVP/s3DqrBfuoJtWC5PeetxO+uR54WA9bEfDs8LRetWuxmWht960M/9YeLFetLvLfWFsj+CVDwvjeg7ejN+FMb2KhoZbYWK9RE3yVRjLG/1S/1k4We9QNH0UxnAuuqa7FtbWK1TVc2FjPUJVMxce+/Pg/7TiUusNylKXW09QlrvCeoKywsV4zh3yrrSeoKx0lfUEZZU72nXR34q9DwAAAAAAAACwxSl57hx+QfBHVo7a5vSSwvDmzVD6dleo4jW3/lBIIYUUUkghhRRSSCGFFFJIIYUUUkghhfs4p89NYWFxWjlqm/NLCqu3FeFB76tHbRL7XekAAAAAAAAAjuV9TXhQtnrUNi8pjP+ad/zfW1BIIYUUUkghhRRSSCGFFFJIIYUUUkghhfuI/3pp/Ne8AQAAAAAAAOBn4v+fCvFf847/ewsKKaSQQgoppJBCCimkkEIKKaSQQgoppHAf8f/uGgAAAAAAAADgmDLrAcoyF/uv0VWutJ6grHTeeoIy7wrrCcoKl1tPUJa71HqCstRJa71BVStOGusRqpq5sLYeoaqeC6WzXqGok2vhZD1D0fRRKL31DjW9fBa+5iYVC8lXoQzWS5QMciuU0XqLilG+CyXG828vYaFcrPfs7iL3hdE9il4eCyN7Lo6yLIzqFXWQZ4WSxPLW34e3wIaF8wlcDOeo3XTXdF8oUjfH/rzYNvVD0WPhLM0LX1ZHu46aVaUv8nSZ8xdXzzyNb8hrGQAAAABJRU5ErkJggg==\">\n" + 
						"        </div>\n" + 
						"        <div id=\"move_div_maker\">\n" + 
						"            <img src=\"https://icons-for-free.com/download-icon-circle+more+plus+icon-1320183136549593898_512.png\">\n" + 
						"        </div>\n" + 
						"    </div>\n" + 
						"    <div id=\"move_div_area\">\n" + 
						"    </div>"+
						"<div id='btns'>"+
						"	<input type='button' value='저장' id='save' data-tv='"+tv+"'>\r\n"+
						"	<input type='button' value='삭제' id='remove' data-tv='"+tv+"'>\r\n"+
						"	<input type='button' value='불러오기' id='load' data-tv='"+tv+"'>\r\n"+
						"</div>\r\n"+
						"<div id='right_move_divs'>\r\n"+
						"	<div id='font_color'>\r\n"+
						"		글자 색\r\n"+
						"	<div class='font_color'>\r\n"+
						"		<div class='color' data-color='red'></div>\r\n"+
						"		<div class='color' data-color='orange'></div>\r\n"+
						"		<div class='color' data-color='yellow'></div>\r\n"+
						"		<div class='color' data-color='green'></div>\r\n"+
						"		<div class='color' data-color='blue'></div>\r\n"+
						"		<div class='color' data-color='navy'></div>\r\n"+
						"		<div class='color' data-color='purple'></div>\r\n"+
						"	</div>\r\n"+
						"	</div>\r\n"+
						"	<div id='background_color'>\r\n"+
						"		배경 색\r\n"+
						"	<div class='background_color'>\r\n"+
						"		<div class='color' data-color='red'></div>\r\n"+
						"		<div class='color' data-color='orange'></div>\r\n"+
						"		<div class='color' data-color='yellow'></div>\r\n"+
						"		<div class='color' data-color='green'></div>\r\n"+
						"		<div class='color' data-color='blue'></div>\r\n"+
						"		<div class='color' data-color='navy'></div>\r\n"+
						"		<div class='color' data-color='purple'></div>\r\n"+
						"	</div>\r\n"+
						"	</div>\r\n"+
						"	<div id='z'>\r\n"+
						"		ㅋ\r\n"+
						"	</div>\r\n"+
						"</div>\r\n"+
						"<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js\"></script>\r\n"+
						"<script src=\"../resources/js/test_content.js\">"+
						
					"</script>\r\n"+
					"</body>\r\n" + 
						"</html>");
				bw.close();
			}else {
				System.out.println("jsp File already exists");
			}

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
	
}
