<?php
$todo = $_POST['todo'];

if ($todo == "login") {
    $base = 'mysql:dbname=bulpix;host=localhost';
    $root = 'root';
    $password = '';

    try {
        $db = new PDO($base, $root, $password);
        $db->exec("set names utf8");

        $nick = $_POST['login'];
        $password = $_POST['password'];

        $query = "SELECT `password` FROM `login` WHERE `login` = '$nick' ";
        $result = $db->query($query);
        $row = $result->fetch(PDO::FETCH_ASSOC);
        $hash = $row['password'];
        if (password_verify($password, $hash)) {
            echo 'Fine';
        } else {
            echo 'Bad';
        }
    } catch (PDOException $e) {
        echo 'Connection failed: ' . $e->getMessage();
    }
}

if ($todo == "add") {
    $target_dir = "../../Photos/Portfolio/";
    $target_file = $target_dir . basename($_FILES["photo"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    // Check if image file is a actual image or fake image
    if (isset($_POST["submit"])) {
        $check = getimagesize($_FILES["photo"]["tmp_name"]);
        if ($check !== false) {
            echo "Plik to zdjęcie - " . $check["mime"] . ".";
            $uploadOk = 1;
        } else {
            echo "Plik nie jest zdjęciem";
            $uploadOk = 0;
        }
    }
    // Check if file already exists
    if (file_exists($target_file)) { 
        echo "Plik już istnieje w bazie";
        $uploadOk = 0;
    }
    // Check file size
    if ($_FILES["photo"]["size"] > 500000) {
        echo "Plik jest za duży";
        $uploadOk = 0;
    }
    // Allow certain file formats
    if (
        $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif"
    ) {
        echo "Dozwolone rozszerzenia pliku: JPG, JPEG, PNG & GIF";
        $uploadOk = 0;
    }
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        //echo "Niestety zdjęcie nie zostało dodane";
        // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["photo"]["tmp_name"], $target_file)) {
            echo "Plik " . basename($_FILES["photo"]["name"]) . " został wgrany";
        } else {
            echo "Podczas wgrywania pliku wystąpił błąd";
        }
    }
}
