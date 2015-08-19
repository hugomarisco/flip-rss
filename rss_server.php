<?php

$client_ip = $_SERVER['REMOTE_ADDR'];
$rss_url = $_GET['rss_url']

$url = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q={$rss_url}&userip={$client_ip}";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_REFERER, "http://github.com");
$body = curl_exec($ch);
curl_close($ch);

print($body);
