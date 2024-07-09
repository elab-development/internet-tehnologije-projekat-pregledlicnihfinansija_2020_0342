<?php

namespace App\Models;

use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Notifications\ResetPasswordNotification;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        //'name',
        'email',
        'password',
        'username',
        'email_verified_at',
        'budget',
        'incomes_sum',
        'expenses_sum',
        'role'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];


    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function incomes()
    {
        return $this->hasMany(Income::class);
    }

    public function challenges()
    {
        return $this->hasMany(Challenge::class, 'userID');
    }

    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }

    /**
 * Send a password reset notification to the user.
 *
 * @param  string  $token
 */
public function sendPasswordResetNotification($token): void
{
    $url = 'localhost:8081/reset-password?token='.$token;

    $this->notify(new ResetPasswordNotification($url));
}

    public function recalculate()
    {
        $incomes = $this->incomes()->sum('incomeValue');
        $expenses = $this->expenses()->sum('expenseValue');
        $this->incomes_sum = $incomes;
        $this->expenses_sum = $expenses;
        $this->budget = $incomes - $expenses;
        $this->save();
    }
}
