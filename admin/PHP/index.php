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

if ($todo == "show_elem" || $todo == "show_elem_del") {
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

if ($todo == "remove") {
    $id = $_POST['id'];
    $name = $_POST['name'];
    try {
        $db = new PDO($base, $root, $password);
        $db->exec("set names utf8");
        $done = array();
        $query = "DELETE FROM `portfolio` WHERE `id` = '$id'";
        $result = $db->query($query);
        echo ('Usunięto '.$name);
    } catch (PDOException $e) {
        echo 'Connection failed: ' . $e->getMessage();
    }
}

if ($todo == "add") {
    $target_dirP = "../../Photos/Portfolio/";
    $target_dirP2 = "./Photos/Portfolio/";
    $target_fileP = $target_dirP . basename($_FILES["photo"]["name"]);
    $target_fileP2 = $target_dirP2 . basename($_FILES["photo"]["name"]);
    $imageFileTypeP = strtolower(pathinfo($target_fileP, PATHINFO_EXTENSION));;
    if (
        $imageFileTypeP != "jpg" && $imageFileTypeP != "png" && $imageFileTypeP != "jpeg"
        && $imageFileTypeP != "gif"
    ) {
        echo "Dozwolone rozszerzenia pliku: JPG, JPEG, PNG & GIF ";
    } else {
        upload($target_fileP, $_FILES["photo"], "zdjeciem");
    }

    //Jesli  wgrało się video i photo - append do bazy danych
    if ($photo) {
        try {
            $db = new PDO($base, $root, $password);
            $db->exec("set names utf8");

            $name = $_POST['name'];
            $desc = $_POST['desc'];
            $target_fileV2 = $_POST['video'];


            $query = "INSERT into `portfolio` values ('','$name','$desc','$target_fileP2','$target_fileV2')";
            $result = $db->query($query);
        } catch (PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
        }
    }
}

if ($todo == "edit") {
    global $video, $photo;
    $name = $_POST['name'];
    $desc = $_POST['desc'];
    $videoEdit = $_POST['video'];

    $id = $_POST['id'];
    $photoBOOL = $_POST['photoBOOL'];
    $videoBOOL = $_POST['videoBOOL'];
    
    if ((!$videoBOOL) && (!$photoBOOL)) {
        try {
            $db = new PDO($base, $root, $password);
            $db->exec("set names utf8");
            $query = "UPDATE `portfolio` SET `project_name` = '$name', `project_des` = '$desc' WHERE `portfolio`.`id` = $id;";

            $result = $db->query($query);
            echo 'Aktualizowano ' . $name;
        } catch (PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
        }
    } else if ((!$videoBOOL) && $photoBOOL) {
        $target_dirPE = "../../Photos/Portfolio/";
        $target_dirPE2 = "./Photos/Portfolio/";
        $target_filePE = $target_dirPE . basename($_FILES["photo"]["name"]);
        $target_filePE2 = $target_dirPE2 . basename($_FILES["photo"]["name"]);
        $imageFileTypePE = strtolower(pathinfo($target_filePE, PATHINFO_EXTENSION));;
        if (
            $imageFileTypePE != "jpg" && $imageFileTypePE != "png" && $imageFileTypePE != "jpeg"
            && $imageFileTypePE != "gif"
        ) {
            echo "Dozwolone rozszerzenia pliku: JPG, JPEG, PNG & GIF ";
        } else {
            upload($target_filePE, $_FILES["photo"], "zdjeciem");
        }

        if ($photo) {
            try {
                $db = new PDO($base, $root, $password);
                $db->exec("set names utf8");
                $query = "UPDATE `portfolio` SET `project_name` = '$name', `project_des` = '$desc', `photo_link` = '$target_filePE2' WHERE `portfolio`.`id` = $id;";
                $result = $db->query($query);
                echo 'Aktualizowano ' . $name;
            } catch (PDOException $e) {
                echo 'Connection failed: ' . $e->getMessage();
            }
        }
    } else if ($videoBOOL && (!$photoBOOL)) {
            try {
                $db = new PDO($base, $root, $password);
                $db->exec("set names utf8");
                $query = "UPDATE `portfolio` SET `project_name` = '$name', `project_des` = '$desc', `video_link` = '$videoEdit' WHERE `portfolio`.`id` = $id;";

                $result = $db->query($query);
                echo 'Aktualizowano ' . $name;
            } catch (PDOException $e) {
                echo 'Connection failed: ' . $e->getMessage();
            }
    } else {
        $target_dirPE = "../../Photos/Portfolio/";
        $target_dirPE2 = "./Photos/Portfolio/";
        $target_filePE = $target_dirPE . basename($_FILES["photo"]["name"]);
        $target_filePE2 = $target_dirPE2 . basename($_FILES["photo"]["name"]);
        $imageFileTypePE = strtolower(pathinfo($target_filePE, PATHINFO_EXTENSION));;
        if (
            $imageFileTypePE != "jpg" && $imageFileTypePE != "png" && $imageFileTypePE != "jpeg"
            && $imageFileTypePE != "gif"
        ) {
            echo "Dozwolone rozszerzenia pliku: JPG, JPEG, PNG & GIF ";
        } else {
            upload($target_filePE, $_FILES["photo"], "zdjeciem");
        }

        if ($photo) {
            try {
                $db = new PDO($base, $root, $password);
                $db->exec("set names utf8");
                $query = "UPDATE `portfolio` SET `project_name` = '$name', `project_des` = '$desc', `photo_link` = '$target_filePE2', `video_link` = '$videoEdit' WHERE `portfolio`.`id` = $id;";

                $result = $db->query($query);
                echo 'Aktualizowano ' . $name;
            } catch (PDOException $e) {
                echo 'Connection failed: ' . $e->getMessage();
            }
        }
    }    
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
            if ($type == "filmem") {
                $video = true;
            } else {
                $photo = false;
            }
        } else {
            echo "Plik " . basename($elem["name"]) . " nie jest" . $type . "  ";
            $uploadOk = 0;
            if ($type == "filmem") {
                $video = false;
            } else {
                $photo = false;
            }
        }
    }
    if (file_exists($target_file)) {
        echo "Plik  " . basename($elem["name"]) . " już istnieje w bazie. ";
        $uploadOk = 0;
        if ($type == "filmem") {
            $video = false;
        } else {
            $photo = false;
        }
    }

    if ($uploadOk == 1) {
        if (move_uploaded_file($elem["tmp_name"], $target_file)) {
            echo "Plik " . basename($elem["name"]) . " został wgrany. ";
            if ($type == "filmem") {
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


?>