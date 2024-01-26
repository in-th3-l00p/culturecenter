<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserDataRequest extends FormRequest
{
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'name' => ['required', 'string', 'max:255'],
            "language" => ['required', 'string', 'in:' . implode(",", \App\Constants::LANGUAGES)],
            "country" => ['required', 'string', 'in:' . implode(",", \App\Constants::COUNTRIES)],
            "voice" => ['required', 'string', 'in:' . implode(",", \App\Constants::VOICES)],
        ];
    }
}
