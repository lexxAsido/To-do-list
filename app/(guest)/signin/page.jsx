import GithubSignin from '@/app/components/GithubSignin';
import GoogleSignin from '@/app/components/GoogleSignin';
import SigninIcons from '@/app/components/SigninIcons';
import Apple from '@/app/components/AppleSignin';
import React from 'react';

async function SignIn() {

  return (
    <div className='min-h-dvh flex items-center justify-center'>
      <div className='bg-slate-50 px-5 md:w-[30rem] max-sm:w-full md:h-[40rem] max-sm:m-5 rounded-md shadow-lg'>
        <h2 className='text-center text-3xl max-sm:text-2xl py-6 mt-5'>
          Sign In to <span className='text-blue-800 italic font-bold'>to-do</span>
        </h2>

        <div className='flex flex-col gap-8 mt-10'>

          <GoogleSignin />

          <Apple/>

          <GithubSignin />


        </div>

        <SigninIcons />
      </div>
    </div>
  );
}

export default SignIn;