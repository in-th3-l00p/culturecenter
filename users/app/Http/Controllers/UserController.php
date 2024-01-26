<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserDataRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller {
    public function getCurrent(Request $request) {
        $this->authorize("authenticated");
        return new UserResource($request->user());
    }

    public function update(UserDataRequest $request) {
        $this->authorize("authenticated");
        $request->user()->update($request->validated());
        return new UserResource($request->user());
    }
}
