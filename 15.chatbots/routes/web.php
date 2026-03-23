<?php

use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\KnowledgeSourceController;
use App\Http\Controllers\MessageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::resource('chatbots', ChatbotController::class);

    Route::resource('chatbots.knowledge-sources', KnowledgeSourceController::class);

    Route::resource('chats', ChatController::class)->only(['store', 'edit', 'update', 'destroy']);
    Route::get('chatbots/{chatbot}/chats', [ChatController::class, 'index'])
        ->name('chats.index');

    Route::resource('chats.messages', MessageController::class)->only(['store']);
});
