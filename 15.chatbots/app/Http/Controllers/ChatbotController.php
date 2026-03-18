<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreChatbotRequest;
use App\Http\Requests\UpdateChatbotRequest;
use App\Models\Chatbot;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatbotController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Chatbots/Index', [
            'chatbots' => $request->user()->chatbots,
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
    public function store(StoreChatbotRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Chatbot $chatbot)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chatbot $chatbot)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChatbotRequest $request, Chatbot $chatbot)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chatbot $chatbot)
    {
        //
    }
}
