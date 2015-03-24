<?php header('Access-Control-Allow-Origin:*');

$username = $_POST['username'];
$password = $_POST['password'];
$dbc = mysqli_connect('localhost','root','shijianwen','eva')
or die('connecting failed');
$query = "SELECT * from users where username = '$username'";
$result = mysqli_query($dbc,$query);
// $data = '404';
// echo $data;
if(mysqli_num_rows($result)==1) {
	$data = {
		"status" : '200'
	};
	echo $data;
}
else {
	$data = {
		"status" : '404'
	};
	echo $data;
	// echo "<script>window.location = 'http://localhost:8080/EVA/index.html'</script>";
}
echo $data;