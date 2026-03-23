<?php

namespace App\Http\Requests;

use App\Enums\Mistral;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SaveChatbotRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'system_prompt' => ['required', 'string', 'max:1000'],
            'model' => ['required', 'string', Rule::enum(Mistral::class)],
            'temperature' => ['required', 'numeric', 'between:0,1'],
        ];
    }
}
