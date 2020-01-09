<?php
$todo = $_POST['todo'];
$base = 'mysql:dbname=bulpix;host=localhost';
$root = 'root';
$password = '';
$video  = false;
$photo  = false;

if ($todo == "login") {
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

if ($todo == "show_elem") {
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

if ($todo == "add") {
    $target_dirP = "../../Photos/Portfolio/";
    $target_fileP = $target_dirP . basename($_FILES["photo"]["name"]);
    $imageFileTypeP = strtolower(pathinfo($target_fileP, PATHINFO_EXTENSION));;
    if (
        $imageFileTypeP != "jpg" && $imageFileTypeP != "png" && $imageFileTypeP != "jpeg"
        && $imageFileTypeP != "gif"
    ) {
        echo "Dozwolone rozszerzenia pliku: JPG, JPEG, PNG & GIF ";
    } else {
        upload($target_fileP, $_FILES["photo"], "zdjeciem");
    }

    $target_dirV = "../../Photos/Video/";
    $target_fileV = $target_dirV . basename($_FILES["video"]["name"]);
    $imageFileTypeV = strtolower(pathinfo($target_fileV, PATHINFO_EXTENSION));
    if (
        $imageFileTypeV != "mp4" && $imageFileTypeV != "ogg" && $imageFileTypeV != "MPEG"
        && $imageFileTypeV != "WebM"
    ) {
        echo "Dozwolone rozszerzenia pliku: MP4, OGG, MPEG & WebM ";
    } else {
        upload($target_fileV, $_FILES["video"], "filmem");
    }

    //Jesli  wgrało się video i photo - append do bazy danych
    if ($video && $photo) {
        try {
            $db = new PDO($base, $root, $password);
            $db->exec("set names utf8");

            $name = $_POST['name'];
            $desc = $_POST['desc'];

            $query = "INSERT into `portfolio` values ('','$name','$desc','$target_fileP','$target_fileV')";
            $result = $db->query($query);
        } catch (PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
        }
    }
}

if ($todo == "edit") {
   //EDIT !!!!!!!!!!
}

if ($todo == "fill") {
    $id = $_POST['id'];
    try {
        $db = new PDO($base, $root, $password);
        $db->exec("set names utf8");
        $done = array();
        $query = "SELECT * FROM `portfolio` WHERE id = '$id'";
        $result = $db->query($query);
 
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            array_push($done, $row);
        }

        echo (json_encode($done));
    } catch (PDOException $e) {
        echo 'Connection failed: ' . $e->getMessage();
    }
 }

function upload($target_file, $elem, $type)
{
    $uploadOk = 1;
    global $video, $photo;
    if (isset($_POST["submit"])) {
        $check = getimagesize($elem["tmp_name"]);
        if ($check !== false) {
            echo "Plik " . basename($elem["name"]) . " jest " . $type . " - " . $check["mime"] . ". ";
            $uploadOk = 1;
        } else {
            echo "Plik " . basename($elem["name"]) . " nie jest" . $type . "  ";
            $uploadOk = 0;
        }
    }
    if (file_exists($target_file)) {
        echo "Plik  " . basename($elem["name"]) . " już istnieje w bazie. ";
        $uploadOk = 0;
    }

    if ($uploadOk == 1) {
        if (move_uploaded_file($elem["tmp_name"], $target_file)) {
            echo "Plik " . basename($elem["name"]) . " został wgrany. ";
            if ($elem == $_FILES["video"]) {
                $video = true;
            } else {
                $photo = true;
            }
        } else {
            echo "Podczas wgrywania pliku " . basename($elem["name"]) . " wystąpił błąd. ";
        }
    } else {
        echo " Spróbuj jeszcze raz ";
    }
}
