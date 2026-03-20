<?php

namespace App\Actions;

use Illuminate\Support\Facades\Storage;
use Smalot\PdfParser\Parser;
use Throwable;

class ExtractTextFromPdfAction
{
    public function execute(string $pdfPath): string
    {
        if (! Storage::exists($pdfPath)) {
            return '';
        }

        $fullPath = Storage::path($pdfPath);

        try {
            $parser = new Parser;
            $pdf = $parser->parseFile($fullPath);

            $text = '';

            foreach ($pdf->getPages() as $page) {
                $text .= $page->getText()."\n";
            }

            $text = trim($text);

            // Si no se extrajo texto, probablemente el PDF debe ser escaneado (imagen)
            if ($text === '') {
                // fallback: OCR / LLM
            }

            return $text;

        } catch (Throwable $e) {
            report($e);

            return '';
        }
    }
}
