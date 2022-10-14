<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${tv}_header_controller</title>
<link rel="stylesheet"
	href="../resources/css/test_header_controller.css">
</head>
<body>
	<div id="entry">
		<input type="hidden" value="${tv}" id="tv">
		<div id='btn'>
			<input type="button" value="저장" id="save"> <input
				type="button" value="불러오기" id="load">
		</div>
		<div id="side_list">
			<div id="side_btn">
				<img
					src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAASFBMVEUAAAD////6+voXFxfv7+8ODg6dnZ0ICAi6urqXl5djY2MtLS0aGhrn5+egoKBDQ0NycnJ7e3vExMSKior19fXq6upKSkrg4OBTz6uIAAACa0lEQVR4nO3d7W6qQBRG4dmUHmD4BpX7v9ODbU1HkXPawHaHyXr+NeHHu2JURFKdLKR54csqc8eSVaUv8nSZ4x7+rpvWeusmbVP/s3DqrBfuoJtWC5PeetxO+uR54WA9bEfDs8LRetWuxmWht960M/9YeLFetLvLfWFsj+CVDwvjeg7ejN+FMb2KhoZbYWK9RE3yVRjLG/1S/1k4We9QNH0UxnAuuqa7FtbWK1TVc2FjPUJVMxce+/Pg/7TiUusNylKXW09QlrvCeoKywsV4zh3yrrSeoKx0lfUEZZU72nXR34q9DwAAAAAAAACwxSl57hx+QfBHVo7a5vSSwvDmzVD6dleo4jW3/lBIIYUUUkghhRRSSCGFFFJIIYUUUkghhfs4p89NYWFxWjlqm/NLCqu3FeFB76tHbRL7XekAAAAAAAAAjuV9TXhQtnrUNi8pjP+ad/zfW1BIIYUUUkghhRRSSCGFFFJIIYUUUkghhfuI/3pp/Ne8AQAAAAAAAOBn4v+fCvFf847/ewsKKaSQQgoppJBCCimkkEIKKaSQQgoppHAf8f/uGgAAAAAAAADgmDLrAcoyF/uv0VWutJ6grHTeeoIy7wrrCcoKl1tPUJa71HqCstRJa71BVStOGusRqpq5sLYeoaqeC6WzXqGok2vhZD1D0fRRKL31DjW9fBa+5iYVC8lXoQzWS5QMciuU0XqLilG+CyXG828vYaFcrPfs7iL3hdE9il4eCyN7Lo6yLIzqFXWQZ4WSxPLW34e3wIaF8wlcDOeo3XTXdF8oUjfH/rzYNvVD0WPhLM0LX1ZHu46aVaUv8nSZ8xdXzzyNb8hrGQAAAABJRU5ErkJggg==">
			</div>
			<div id="add_controller">
				<img
					src="https://icons-for-free.com/download-icon-circle+more+plus+icon-1320183136549593898_512.png">
				<div id="add_menu">
					<div id="add_list">목록 추가</div>
					<div id="add_home">홈</div>
				</div>
			</div>
		</div>
		<div id="header">
			<div id="header_1" class="header" data-target="1"
				style="width: 100%; height: 200px; background-color: #e3e3e3; margin: auto"></div>
		</div>
		<div id="right_container" data-target="right_container">
			<div id='font_color'>
				글자 색
				<div class='font_color'>
					<div class='color' data-color='white'></div>
					<div class='color' data-color='red'></div>
					<div class='color' data-color='orange'></div>
					<div class='color' data-color='yellow'></div>
					<div class='color' data-color='green'></div>
					<div class='color' data-color='blue'></div>
					<div class='color' data-color='navy'></div>
					<div class='color' data-color='purple'></div>
					<div class='color' data-color='gray'></div>
					<div class='color' data-color='black'></div>
				</div>
			</div>
			<div id='background_color'>
				배경 색
				<div class='background_color'>
					<div class='color' data-color='white'></div>
					<div class='color' data-color='red'></div>
					<div class='color' data-color='orange'></div>
					<div class='color' data-color='yellow'></div>
					<div class='color' data-color='green'></div>
					<div class='color' data-color='blue'></div>
					<div class='color' data-color='navy'></div>
					<div class='color' data-color='purple'></div>
					<div class='color' data-color='gray'></div>
					<div class='color' data-color='black'></div>
				</div>
			</div>
			<div id='size'>박스크기</div>
			<div id='font_size'>글씨크기</div>
			<div id='blank'>
				공백
				<div class='blank'>
					<div class="blanks" data-blank="top">상</div>
					<div class="blanks" data-blank="bottom">하</div>
					<div class="blanks" data-blank="left">좌</div>
					<div class="blanks" data-blank="right">우</div>
				</div>
			</div>
			<div id='loc'>
				위치
				<div class='loc'>
					<div class='locs' data-locs='move'>이동</div>
					<div class='locs' data-locs='center'>가운데 정렬</div>
					<div class='locs' data-locs='fix'>고정</div>
				</div>
			</div>
			<div id='delete_target'>삭제</div>
		</div>
		<div id="right_a">
			<div id='font_color'>
				글자 색
				<div class='font_color'>
					<div class='color' data-color='white'></div>
					<div class='color' data-color='red'></div>
					<div class='color' data-color='orange'></div>
					<div class='color' data-color='yellow'></div>
					<div class='color' data-color='green'></div>
					<div class='color' data-color='blue'></div>
					<div class='color' data-color='navy'></div>
					<div class='color' data-color='purple'></div>
					<div class='color' data-color='gray'></div>
					<div class='color' data-color='black'></div>
				</div>
			</div>
			<div id="a_change">내용변경</div>
		</div>
		<div id="right_entry">
			<div id="fixed" class="right_entry">fixed</div>
			<div id="sticky" class="right_entry">sticky</div>
			<div id="static" class="right_entry">static</div>
		</div>
	</div>
	<script
		src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<script src="../resources/js/test_header_controller.js"></script>
</body>
</html>