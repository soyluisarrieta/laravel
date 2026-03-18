<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveKnowledgeSourceRequest;
use App\Jobs\ProcessKnowledgeSourceJob;
use App\Models\Chatbot;
use App\Models\KnowledgeSource;
use Illuminate\Support\Facades\Storage;

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

        $knowledgeSource->path = match ($validated['type']) {
            'pdf' => $validated['pdf']->store('pdfs'),
            'website' => $validated['website'],
        };

        $chatbot->knowledgeSources()->save($knowledgeSource);

        ProcessKnowledgeSourceJob::dispatch($knowledgeSource);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Chatbot $chatbot, KnowledgeSource $knowledgeSource)
    {
        if ($knowledgeSource->type === 'pdf') {
            return Storage::response(
                $knowledgeSource->path,
                $knowledgeSource->name,
                [
                    'Content-Type' => 'application/pdf',
                    'Content-Disposition' => 'inline',
                ]
            );
        }

        return redirect($knowledgeSource->path);
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
    public function destroy(Chatbot $chatbot, KnowledgeSource $knowledgeSource)
    {

        $deleted = $knowledgeSource->delete();

        if (! $deleted) {
            return back()->withErrors([
                'banner' => 'Error al eliminar la fuente de conocimiento.',
                'bannerStyle' => 'danger',
            ]);
        }

        if ($knowledgeSource->type === 'pdf') {
            Storage::delete($knowledgeSource->path);
        }

        return back()->with('flash.banner', 'Fuente de conocimiento eliminada correctamente.');
    }
}
