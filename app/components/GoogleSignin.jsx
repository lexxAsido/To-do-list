"use client"
import React, {useState} from 'react'
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react'
import { BiLoaderCircle } from "react-icons/bi";


const GoogleSignin = () => {
  const [processing, setProcessing] = useState(false)
  const handSignIn = () => {
    signIn('google',{callbackUrl: '/'})
    setProcessing(true)
  }

  return (
    <div>
      <button
       disabled={processing}
       onClick={handSignIn}
        className='rounded-full border py-3 px-2 w-full text-lg flex items-center justify-center hover:bg-black hover:text-white'
      >
        <FcGoogle className='text-3xl' />
        <span className='mx-auto text-2xl'>Continue with Google</span>
        {processing && <BiLoaderCircle className='animate-spin text-2xl'/>}
      </button>
    </div>
  )
}

export default GoogleSignin