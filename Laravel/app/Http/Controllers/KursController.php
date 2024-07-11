<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class KursController extends Controller
{
    public function kursEura(Request $request)
    {
        $url = 'https://kurs.resenje.org/api/v1/currencies/EUR/rates/today';
        $client = new \GuzzleHttp\Client();

        $response = $client->request('GET', $url);

        $data = json_decode($response->getBody()->getContents(), true);

        return response()->json($data);
    }
}
