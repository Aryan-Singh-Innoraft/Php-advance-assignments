<?php 
require 'vendor/autoload.php';
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
$client = new Client();
try {
  $response = $client->request('GET', 'https://www.innoraft.ai/jsonapi/node/service');
  $statusCode = $response->getStatusCode(); 
  $body = $response->getBody();
  $data = json_decode($body, true); 
  $url = $data['data'][0]['relationships']['field_section']['links']['related']['href']; 
  $response = $client->request('GET', $url);
  $data = json_decode($response->getBody(), true);
  $data = $data['data'][1]['attributes']['field_html_content']['value'];
  $result = [
    "success"=>FALSE,
    "data"=>""
  ];
  $result['success'] = TRUE;
  $result["data"] = $data;
  echo json_encode($result);
} 
catch (RequestException $e) {
  $result['success'] = FALSE;
  $result["data"] = $e->getMessage();
  echo json_encode($result);
}
?>
