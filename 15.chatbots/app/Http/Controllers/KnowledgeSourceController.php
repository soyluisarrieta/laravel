<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveKnowledgeSourceRequest;
use App\Models\Chatbot;
use App\Models\KnowledgeSource;

class KnowledgeSourceController extends Controller
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
    public function store(Chatbot $chatbot, SaveKnowledgeSourceRequest $request)
    {
        $validated = $request->validated();

        $knowledgeSource = new KnowledgeSource([
            'name' => $validated['name'],
            'type' => $validated['type'],
        ]);

        $knowledgeSource->path = $validated['type'] === 'pdf'
            ? $validated['pdf']->store('pdfs')
            : $validated['website'];

        $chatbot->knowledgeSources()->save($knowledgeSource);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(KnowledgeSource $knowledgeSource)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(KnowledgeSource $knowledgeSource)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SaveKnowledgeSourceRequest $request, KnowledgeSource $knowledgeSource)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KnowledgeSource $knowledgeSource)
    {
        //
    }
}
