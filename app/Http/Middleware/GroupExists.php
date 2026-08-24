<?php

namespace App\Http\Middleware;

use App\Models\Group;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class GroupExists
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $groupUuid = $request->route('group');

        $group = Group::where('group_uuid', $groupUuid)->first();

        if (is_null($group)) {
            return redirect()->to(route('select-group'));
        }

        return $next($request);
    }
}
