<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveMessageRequest;
use App\Models\Chat;
use App\Models\Message;
use Prism\Prism\Enums\Provider;
use Prism\Prism\Facades\Prism;

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
        $chat->messages()->create([
            'role' => 'user',
            'user_id' => $request->user()->id,
            'content' => $request->message,
        ]);

        $chatbot = $chat->chatbot;

        $systemPrompt = $chatbot->system_prompt;
        $systemPrompt .= "\n\n";
        $systemPrompt .= $chatbot->knowledgeSources
            ->pluck('extracted_content')
            ->join('\n\n');

        $response = Prism::text()
            ->using(Provider::Mistral, $chatbot->model)
            ->withSystemPrompt($chatbot->system_prompt)
            ->usingTemperature($chatbot->temperature)
            ->withPrompt($request->message)
            ->asText();

        $chat->messages()->create([
            'role' => 'assistant',
            'content' => $response->text,
        ]);

        return back();
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
