import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <main className='h-dvh bg-[url(/bg.png)] bg-cover bg-center'>
      <div className='h-dvh bg-black/70'>
        <div className='flex flex-col gap-[3rem] items-center justify-center text-white h-dvh w-[50rem] max-lg:w-full mx-auto max-lg:p-5'>
          <p className='text-3xl text-center'>
             The To-Do App is a simple, intuitive task manager designed to boost productivity. 
              Organize tasks, set priorities, and never miss a deadline with due dates and reminders.
              With a clean interface and cross-platform sync, it’s perfect for staying organized, whether at home, work, or on the go.
          </p>
          <div className='flex gap-[8rem] max-lg:gap-5 max-lg:flex-col '>
            <button
              className='border p-3 max-lg:p-2 text-3xl max-lg:text-lg rounded-lg font-bold hover:text-white hover:bg-blue-700 transition-all max-lg:w-full'
            >
              <Link href={'#'}>Learn More</Link>
            </button>
            <button
             className='border p-3 max-lg:p-2 text-3xl max-lg:text-lg rounded-lg font-bold hover:text-white hover:bg-blue-700 transition-all max-lg:w-full'
            >
              <Link href={'/signin'}>Get Started</Link>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default page