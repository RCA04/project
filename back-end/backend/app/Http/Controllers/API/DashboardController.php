<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Task;

class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'projects_count' => Project::where('user_id', auth()->id())->count(),
            'tasks_count' => Task::where('user_id', auth()->id())->count(),
        ]);
    }
}
