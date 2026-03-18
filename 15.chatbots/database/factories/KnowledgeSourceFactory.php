<?php

namespace Database\Factories;

use App\Models\KnowledgeSource;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<KnowledgeSource>
 */
class KnowledgeSourceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'type' => $type = fake()->randomElement(['pdf', 'website']),
            'path' => match ($type) {
                'pdf' => fake()->filePath(),
                'website' => fake()->url(),
            },
            'extracted_content' => fake()->paragraph(3, true),
        ];
    }
}
