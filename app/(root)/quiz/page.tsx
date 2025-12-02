import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import QuizCard from '@/components/QuizCard';

const quizzes = [
  {
    title: 'Quantitative',
    description: 'Test your numerical ability with data interpretation, ratios, algebra & more.',
    slug: 'quantitative',
    icon: '/icons/quant.svg',
  },
  {
    title: 'Logical Reasoning',
    description: 'Strengthen your logical skills with puzzles, sequences, and deductions.',
    slug: 'logical',
    icon: '/icons/logical.svg',
  },
  {
    title: 'Verbal Ability',
    description: 'Boost your grammar, comprehension, and vocabulary skills.',
    slug: 'verbal',
    icon: '/icons/verbal.svg',
  },
  {
    title: 'Arithmetic',
    description: 'Practice time, speed, percentages, and other basic math concepts.',
    slug: 'arithmetic',
    icon: '/icons/arithmetic.svg',
  },
];

export default function Page() {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Crack Aptitude with AI-Backed Quizzes</h2>
          <p className="text-lg">
            Boost your skills in Quant, Logical, Verbal & more — all in one place.
          </p>
          <div className="flex flex-row gap-4 max-sm:flex-col">
            <Button asChild className="btn-primary">
              <Link href="/quizzes">Start Quiz</Link>
            </Button>
          </div>
        </div>
        <Image
          src="/rkrobot_math.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Choose a Quiz Category</h2>
        <div className="interviews-section">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.slug} {...quiz} />
          ))}
        </div>
      </section>
    </>
  );
}
