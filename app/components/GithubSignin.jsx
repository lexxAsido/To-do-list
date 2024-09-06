"use client"
import React, {useState} from 'react'
import { FaGithub } from 'react-icons/fa'
import { signIn } from 'next-auth/react'
import { BiLoaderCircle } from "react-icons/bi";

const GithubSignin = () => {

  const [processing, setProcessing] = useState(false)
  const handleSignIn = () => {
    signIn('github', {callbackUrl: '/'})
    setProcessing(true)
  }

  return (
    <button
      disabled={processing}
      onClick={handleSignIn}
      className='rounded-full border py-3 px-3 w-full text-lg flex items-center justify-center hover:bg-black hover:text-white'
    >
      <FaGithub className='text-3xl' />
      <span className='mx-auto text-2xl'>Continue with Github</span>

      {processing && <BiLoaderCircle className='animate-spin text-2xl'/>}
    </button>
  )
}

export default GithubSignin