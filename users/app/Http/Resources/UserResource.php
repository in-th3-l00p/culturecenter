<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource {
    public static $wrap = null;

    public function toArray(Request $request): array {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "email" => $this->email,
            "createdAt" => $this->created_at,
            "country" => $this->country,
            "language" => $this->language,
            "voice" => $this->voice
        ];
    }
}
