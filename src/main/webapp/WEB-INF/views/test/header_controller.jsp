<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${tv}_header_controller</title>
</head>
<body>
	<input type="hidden" value="${tv}" id="tv">
	<input type="button" value="저장" id="save">
	<input type="button" value="불러오기" id="load">
	<div id="header">
		<div id="header_1" style="width:100%; height:200px; background-color:yellow;">
		</div>
	</div>
	<script	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<script src="../resources/js/test_header_controller.js"></script>
</body>
</html>