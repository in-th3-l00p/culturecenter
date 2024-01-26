<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Redis;

class PublishRegistered
{
    public function __construct() {
    }

    public function handle(Registered $event): void {
        Redis::command("publish", ["registered", json_encode($event->user)]);
    }
}
