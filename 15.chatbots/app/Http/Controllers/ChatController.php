<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveChatRequest;
use App\Models\Chat;
use App\Models\Chatbot;
use Inertia\Inertia;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Chatbot $chatbot)
    {
        return Inertia::render('Chats/Index', [
            'chatbot' => $chatbot,
            'chats' => $chatbot->chats,
        ]);
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
    public function store(SaveChatRequest $request)
    {
        $chat = $request->user()->chats()->create([
            'name' => 'New Chat',
            'chatbot_id' => $request->chatbot_id,
        ]);

        return to_route('chats.edit', $chat);
    }

    /**
     * Display the specified resource.
     */
    public function show(Chat $chat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chat $chat)
    {
        return Inertia::render('Chats/Edit', [
            'chat' => $chat,
            'messages' => $chat->messages()->oldest()->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SaveChatRequest $request, Chat $chat)
    {
        $request->validate(['name' => ['required']]);

        $chat->update(['name' => $request->name]);

        return to_route('chats.edit', $chat);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chat $chat)
    {
        $chat->delete();

        return back();
    }
}
