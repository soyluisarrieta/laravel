<?php

namespace App\Enums;

enum Mistral: string
{
    case SMALL = 'mistral-small-latest';
    case MEDIUM = 'mistral-medium-latest';
    case LARGE = 'mistral-large-latest';

    public function label(): string
    {
        return match ($this) {
            self::SMALL => 'Mistral Small',
            self::MEDIUM => 'Mistral Medium',
            self::LARGE => 'Mistral Large',
        };
    }

    public static function options(): array
    {
        return array_values(array_map(fn ($case) => [
            'value' => $case->value,
            'label' => $case->label(),
        ], self::cases()));
    }
}
