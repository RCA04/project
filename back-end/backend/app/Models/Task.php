<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Model Task
 * Representa uma tarefa no sistema
 */
class Task extends Model
{
    /**
     * Campos que podem ser preenchidos em massa
     *
     * @var array<string>
     */
    protected $fillable = [
        'project_id',
        'title',
        'description',
        'status',
        'due_date',
        'user_id',
    ];

    /**
     * Relacionamento: Uma tarefa pertence a um projeto
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Relacionamento: Uma tarefa pertence a um usuário
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
