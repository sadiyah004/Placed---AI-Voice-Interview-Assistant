import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { getCurrentUser }from '@/lib/actions/auth.action'
import {  getInterviewByUserId, getLatestInterviews } from '@/lib/actions/general.action'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const user = await getCurrentUser();
  //This is paralllel data fetching happening this both donot depend on each other so they by doing this promise all they will happen in parallel 
  const [userInterviews,latestInterviews] = await Promise.all([
    await getInterviewByUserId(user?.id!),
    await getLatestInterviews({userId:user?.id!})
  ])
  const hasPastInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = latestInterviews?.length > 0
  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Ace Your Interview with AI Practice, Smart Quizzes & Instant Feedback</h2>
          <p className='text-lg'>
            Sharpen your skills with mock interviews and interactive quizzes designed to boost your confidence.
          </p>
          <div className="flex flex-row gap-4 max-sm:flex-col">
      <Button asChild className='btn-primary'>
        <Link href="/interview">Start an Interview</Link>
      </Button>
      <Button asChild className='btn-primary'>
        <Link href="/quiz">View Quizzes</Link>
      </Button>
    </div>
  </div>
  {/* //src="/robot.png" */}
        <Image src="/rkrobot.png" alt="robo-dude"
          width={400}
          height={400}
          className='max-sm:hidden'
        />

      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2>
          Your Interviews
        </h2>
        <div className='interviews-section'>
          {
            hasPastInterviews  ?(
              userInterviews?.map((interview)=>(
                <InterviewCard {...interview} key={interview.id}/>
              ))):(
                 <p>You haven&apos;t taken any interviews</p>
            )}
          
        </div>
      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Take an Interview</h2>
        <div className='interviews-section'>
          {
            hasUpcomingInterviews  ?(
              latestInterviews?.map((interview)=>(
                <InterviewCard {...interview} key={interview.id}/>
              ))):(
                 <p>Their are no new interviews available</p>
            )}
        </div>
      </section>
    </>
  )
}

export default page