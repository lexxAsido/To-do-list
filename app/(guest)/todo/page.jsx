import React from 'react';
import TodoForms from '@/app/components/TodoForms';
const page = () => {
  return (
    <div>
      <h1 className='uppercase text-blue-600 font-bold text-center text-4xl p-8 bg-blue-50'> add to-dos</h1>
      <TodoForms/>
    </div>
  );
}

export default page;
