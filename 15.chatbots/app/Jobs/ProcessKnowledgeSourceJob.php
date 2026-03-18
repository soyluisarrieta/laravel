<?php

namespace App\Jobs;

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
        $extractedContent = match ($this->knowledgeSource->type) {
            'pdf' => 'extracted PDF',
            'website' => 'scraped website',
        };

        $this->knowledgeSource->update([
            'extracted_content' => $extractedContent,
        ]);
    }
}
