import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

interface QuizCardProps {
  title: string;
  description: string;
  slug: string;
  icon?: string; // Optional icon path
}

const QuizCard = ({ title, description, slug, icon }: QuizCardProps) => {
  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-72">
      <div className="card-interview justify-between">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
            <p className="badge-text">Quiz</p>
          </div>

          <div className="flex items-center gap-3 mt-2">
            {/* {icon && (
              <Image
                src={icon}
                alt={`${title} icon`}
                width={40}
                height={40}
                className="object-contain"
              />
            )} */}
            <h3 className="capitalize">{title}</h3>
          </div>

          <p className="line-clamp-3 mt-4 text-light-100 text-sm">
            {description}
          </p>
        </div>

        <Button className="btn-primary mt-4">
          <Link href={`/quizzes/${slug}`}>Start Quiz</Link>
        </Button>
      </div>
    </div>
  );
};

export default QuizCard;
