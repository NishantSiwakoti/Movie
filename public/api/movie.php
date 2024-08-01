<?php
include 'api-key.php';
$page = isset($_GET['page']) ? $_GET['page'] : 1;
$url = "https://api.themoviedb.org/3/movie/popular?api_key=$api_key&page=$page";
$response = file_get_contents($url);
echo $response;
?>