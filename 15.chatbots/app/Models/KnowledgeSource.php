<?php

namespace App\Models;

use Database\Factories\KnowledgeSourceFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class KnowledgeSource extends Model
{
    /** @use HasFactory<KnowledgeSourceFactory> */
    use HasFactory;

    use HasUuids;

    public function chatbot(): BelongsTo
    {
        return $this->belongsTo(Chatbot::class);
    }
}
