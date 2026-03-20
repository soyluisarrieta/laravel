<?php

namespace App\Actions;

use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;
use Throwable;

class ExtractTextFromWebsiteAction
{
    public function execute(string $websiteUrl): string
    {
        try {
            if (! filter_var($websiteUrl, FILTER_VALIDATE_URL)) {
                return '';
            }

            $response = Http::timeout(10)->get($websiteUrl);

            if (! $response->successful()) {
                return '';
            }

            $html = $response->body();

            $crawler = new Crawler($html);

            // Si no hay <p>, evitar excepción
            if ($crawler->filter('p')->count() === 0) {
                return '';
            }

            $arrayText = $crawler->filter('p')->each(function (Crawler $node) {
                return trim($node->text());
            });

            // eliminar vacíos
            $arrayText = array_filter($arrayText);

            return implode(' ', $arrayText);

        } catch (Throwable $e) {
            report($e);

            return '';
        }
    }
}
