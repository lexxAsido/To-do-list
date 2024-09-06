import React from 'react';
import { FaApple } from "react-icons/fa";

const Apple = () => {
  return (

<div>
<button
  className='rounded-full border py-3 px-2 w-full text-lg flex items-center justify-center hover:bg-black hover:text-white'>
<FaApple className='text-3xl'/>
<span className='text-2xl mx-auto'>
            Continue with Apple
         </span>
</button>
</div>
  );
}

export default Apple;
