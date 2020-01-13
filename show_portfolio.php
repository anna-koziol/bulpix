<?php
$todo = $_POST['todo'];
$base = 'mysql:dbname=bulpix;host=localhost';
$root = 'root';
$password = '';

if ($todo == "show_portfolio") {
    try {
        $db = new PDO($base, $root, $password);
        $db->exec("set names utf8");
        $done = array();
        $query = "SELECT * FROM `portfolio` ";
        $result = $db->query($query);

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            array_push($done, $row);
        }

        echo (json_encode($done));
    } catch (PDOException $e) {
        echo 'Connection failed: ' . $e->getMessage();
    }
}

?>