<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveMessageRequest;
use App\Models\Chat;
use App\Models\Message;
use Prism\Prism\Enums\Provider;
use Prism\Prism\Facades\Prism;
use Prism\Prism\Streaming\Events\TextDeltaEvent;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Chat $chat, SaveMessageRequest $request)
    {
        $chat->load('chatbot');

        $chat->messages()->create([
            'role' => 'user',
            'user_id' => $request->user()->id,
            'content' => $request->message,
        ]);

        return Prism::text()
            ->using(Provider::Mistral, $chat->chatbot->model)
            ->withSystemPrompt($chat->chatbot->buildSystemPrompt())
            ->usingTemperature($chat->chatbot->temperature)
            ->withMessages($chat->getPrismMessages())
            ->asEventStreamResponse(function ($_, $events) use ($chat) {
                $fullText = $events
                    ->filter(fn ($event) => $event instanceof TextDeltaEvent)
                    ->map(fn (TextDeltaEvent $event) => $event->delta)
                    ->join('');

                $chat->messages()->create([
                    'role' => 'assistant',
                    'content' => $fullText,
                ]);
            });
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SaveMessageRequest $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
