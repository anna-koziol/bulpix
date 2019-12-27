<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$email = $_POST['mail'];
$text = $_POST['text'];

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

$mail = new PHPMailer();
$mail->CharSet = "UTF-8";
$mail->PluginDir = "phpmailer/";
$mail->From = "kaka201210@vp.pl"; //od kogo leci wiadomość
$mail->FromName = "Paweł Malina"; // imie, nazwisko od kogo
$mail->Host = "smtp.poczta.onet.pl"; // smtp poczty 
$mail->Mailer = "smtp";
$mail->Username = "kaka201210@vp.pl"; //login do poczty
$mail->Password = "kaka10"; //hasło do poczty 
$mail->SMTPAuth = true;
$mail->Port = 587; //port
$mail->SetLanguage("pl", "phpmailer/language/");
$mail->Subject = "Bulpix media message"; //temat
$mail->Body = '
Email kontaktowy: ' . $email . ',
Treść wiadomości: ' . $text . ',
'; //widomość
$mail->AddAddress("aniakoz99@gmail.com", "Anna Kozioł"); //do kogo leci wiadomość
if ($mail->Send()) //odpowiedź
    echo ('{"data": true}');
else
    echo $mail->ErrorInfo;
$mail->ClearAddresses();
$mail->ClearAttachments();
