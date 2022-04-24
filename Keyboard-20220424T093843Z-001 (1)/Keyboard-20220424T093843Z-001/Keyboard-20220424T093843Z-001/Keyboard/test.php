// PHP code to establish connection
// with the localserver
<?php

// Username
$user = 'vxt5074';
$password = 'Wumbo125';

// Database name
$database = 'flights';

$conn = mysqli_conenct("localhost", "vxt5074", "Wumbo125", "flights");

// Checking for connections
if ($mysqli->connect_error) {
	die('Connect Error (' .
	$mysqli->connect_errno . ') '.
	$mysqli->connect_error);
}

// SQL query to select data from database
$sql = "SELECT * FROM flights ORDER BY score DESC ";
$result = $mysqli->query($sql);
$mysqli->close();
?>
// HTML code to display data in tabular format
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>Flights</title>
	<!-- CSS FOR STYLING THE PAGE -->
	<style>
		table {
			margin: 0 auto;
			font-size: large;
			border: 1px solid black;
		}

		h1 {
			text-align: center;
			color: #006600;
			font-size: xx-large;
			font-family: 'Gill Sans', 'Gill Sans MT',
			' Calibri', 'Trebuchet MS', 'sans-serif';
		}

		td {
			background-color: #E4F5D4;
			border: 1px solid black;
		}

		th,
		td {
			font-weight: bold;
			border: 1px solid black;
			padding: 10px;
			text-align: center;
		}

		td {
			font-weight: lighter;
		}
	</style>
</head>

<body>
	<section>
		<h1>Flights</h1>
		<!-- TABLE CONSTRUCTION-->
		<table>
			<tr>
				<th>Callsign</th>
				<th>Departure</th>
				<th>Arrival</th>
				<th>Altitude</th>
			</tr>
			<!-- PHP CODE TO FETCH DATA FROM ROWS-->
			<?php // LOOP TILL END OF DATA
				while($rows=$result->fetch_assoc())
				{
			?>
			<tr>
				<!--FETCHING DATA FROM EACH
					ROW OF EVERY COLUMN-->
				<td><?php echo $rows['callsign'];?></td>
				<td><?php echo $rows['departure'];?></td>
				<td><?php echo $rows['arrival'];?></td>
				<td><?php echo $rows['altitude'];?></td>
			</tr>
			<?php
				}
			?>
		</table>
	</section>
</body>

</html>
