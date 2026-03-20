<?php

namespace App\Jobs;

use App\Actions\ExtractTextFromPdfAction;
use App\Actions\ExtractTextFromWebsiteAction;
use App\Models\KnowledgeSource;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ProcessKnowledgeSourceJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public KnowledgeSource $knowledgeSource) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $path = $this->knowledgeSource->path;
        $extractedContent = match ($this->knowledgeSource->type) {
            'pdf' => (new ExtractTextFromPdfAction)->execute($path),
            'website' => (new ExtractTextFromWebsiteAction)->execute($path),
        };

        $this->knowledgeSource->update([
            'extracted_content' => $extractedContent,
        ]);
    }
}
