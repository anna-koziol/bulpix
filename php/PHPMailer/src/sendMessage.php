<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$names = $_POST['names'];
$email = $_POST['mail'];
$text = $_POST['text'];

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

$mail = new PHPMailer();
$mail->CharSet = "UTF-8";
$mail->PluginDir = "phpmailer/";
$mail->From = "noreply@bulpix.pl"; //od kogo leci wiadomość
$mail->FromName = "Bulpix Media"; // imie, nazwisko od kogo
$mail->Host = "smtp.gmail.com"; // smtp poczty 
$mail->Mailer = "smtp";
$mail->Username = "pjqw777@gmail.com"; //login do poczty
$mail->Password = "HZEy3fPxaY"; //hasło do poczty 
$mail->SMTPAuth = true;
$mail->Port = 587; //port
$mail->SetLanguage("pl", "phpmailer/language/");
$mail->Subject = "Nowa wiadomość ze strony Bulpix Media"; //temat
$mail->Body = 'Pan/Pani: ' . $names . ', o mailu : ' . $email . '  przesłał Ci właśnie wiadomość ze strony Bulpix Media o treści: ' . $text . ' '; //wiadomość
$mail->AddAddress("aniakoz99@gmail.com", "Bulpix Media"); //do kogo leci wiadomość
if ($mail->Send()) //odpowiedź
    echo ('{"data": true}');
else
    echo $mail->ErrorInfo;
$mail->ClearAddresses();
$mail->ClearAttachments();
