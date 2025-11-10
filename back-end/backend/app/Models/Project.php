<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Model Project
 * Representa um projeto no sistema
 */
class Project extends Model
{
    /**
     * Campos que podem ser preenchidos em massa
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'description',
        'due_date',
        'user_id',
    ];

    /**
     * Relacionamento: Um projeto possui muitas tarefas
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    /**
     * Relacionamento: Um projeto pertence a um usuário
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
