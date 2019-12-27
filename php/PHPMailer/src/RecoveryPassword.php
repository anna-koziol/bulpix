<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if (isset($_POST['name'], $_POST['email'])) {
    //email poprawny;
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['pass'];
    $hash = password_hash($password, PASSWORD_DEFAULT);

    $servername = "localhost";
    $username = "root";
    $pass = "";
    $dbname = "accuweather";
   
                        // Create connection
    $conn = new mysqli($servername, $username, $pass, $dbname);
                        // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } else {
        $conn->set_charset("utf8");
        $sql = "SELECT COUNT(email) FROM loginData WHERE `email` = '" . $email . "' AND name = '" . $name . "'";
        $result = $conn->query($sql);
        $result = $result->fetch_assoc();
        //echo ((int)json_encode($result["COUNT(email)"])[1]);
        if ((int)json_encode($result["COUNT(email)"])[1] == 0) {
            echo ("mistake");
        } else {
            error_reporting(E_ALL ^ E_WARNING);
                                //zgodność danych
            $sql = "UPDATE `loginData` SET `password`='$hash' WHERE `email` = '$email' AND name = '$name'";
            $result = $conn->query($sql);
            if ($result == 1) {
                require 'Exception.php';
                require 'PHPMailer.php';
                require 'SMTP.php';
                $mail = new PHPMailer();
                $mail->CharSet = "UTF-8";
                $mail->PluginDir = "phpmailer/";
                $mail->From = "raspberryweatherapp@gmail.com";
                $mail->FromName = "Weather App";
                $mail->Host = "smtp.gmail.com";
                $mail->Mailer = "smtp";
                $mail->Username = "raspberryweatherapp@gmail.com";
                $mail->Password = "zaq1@WSX";
                $mail->SMTPAuth = true;
                $mail->Port = 587;
                $mail->SetLanguage("pl", "phpmailer/language/");
                $mail->Subject = "Zmiana hasła w serwisie pogodowym";
                $mail->Body = '
                Wiadomość skierowana jest do ' . $name . '.
                Operacja zmianny hasła została zakończona powodzeniem, Twoje nowe hasło to: ' . $password . ' 
                Zaloguj się w serwisie i zmień hasło w zakładce Ustawienia Konta.   
                ';
                $mail->AddAddress($email, "Paweł Malina");
                if ($mail->Send()) {
                    echo 'yup';
                } else {
                    echo ("wrong");
                }
                $mail->ClearAddresses();
                $mail->ClearAttachments();

            } else {
                echo ("no");
            }
        }
    }
}
?>