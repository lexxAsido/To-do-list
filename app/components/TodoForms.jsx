"use client"
import React, { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase';
import { FaRegTrashAlt, FaEdit, FaSave } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast"
import { BiLoader } from "react-icons/bi";


const TodoForms = () => {

  const { toast } = useToast();

  const [todos, setTodos] = useState([])

  const [processing, setProcessing] = useState(false)

  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    //function to fetch todos
    const fetchTodos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'todos'))
        const todosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setTodos(todosData)
        console.log(todos);

      } catch (error) {
        console.error("Error fetching data: ", error)
      }
    }
    fetchTodos();
  }, []);

  const initVal = {
    title: '',
    task: '',
  };

  const formValidation = Yup.object().shape({
    title: Yup.string()
      .required('Please enter a task')
  })

  const handleSubmit = async (values, { resetForm }) => {

    try { //try bloc runs when the request is successful
      setProcessing(true)
      //  create a document to be stored
      const info = {
        title: values.title,
        createdAt: new Date(),
        completed: false
      }
      // add this document to the database
      const docRef = collection(db, "todos")
      await addDoc(docRef, info)


      setTodos(prevTodos => [...prevTodos, { id: docRef.id, ...info }])

      toast({
        description: "Your task has been added",
      })

      resetForm()
    } catch (error) {
      console.error("error adding task: ", error)
    }

    //finally makes the handleSubmit processing stop loading and a task has been sent to data base
    finally {
      setProcessing(false)
    }
  }


  //updating the check box on refresh and when task is done
  const check = async (infoId, currentStatus) => {
    try {
      //update info in db
      const infoRef = doc(db, 'todos', infoId)
      await updateDoc(infoRef, { completed: !currentStatus })

      //update info locally
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === infoId ? { ...todo, completed: !currentStatus } : todo
        )
      )
    } catch (e) {
      console.error("error updating task: ", e)
    }

  }

  const handleDelete = async (infoId) => {
    if (!confirm("Are you sure you want to delete this task?")) {
      return
    }

    try {
      await deleteDoc(doc(db, "todos", infoId))
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== infoId))

      toast({
        description: "Your task has been deleted",
      })
    } catch {

    }
  }

  // const handleUpdateTask = async (infoId) => {
  //   //update edit on data base
  //   try {
  //     const taskRef = doc(db, 'todos', infoId)
  //     await updateDoc(taskRef, { title: editingTask.title })

  //     //update info locally
  //     setTodos(prevTodos =>
  //       prevTodos.map(todo =>
  //         todo.id === infoId ? { ...todo, title: editingTask.title } : todo
  //       )
  //     )

  //   } catch (error) {
  //     console.error("error updating task: ", error)
  //   }
  // }

  const handleUpdateTask = async (todo) => {
    try {
      const taskRef = doc(db, 'todos', todo.id);
  
      // Update the task in the database
      await updateDoc(taskRef, { title: editingTask.title });
  
      // Update the task locally in the state
      setTodos(prevTodos =>
        prevTodos.map(t => t.id === todo.id ? { ...t, title: editingTask.title } : t)
      );
  
      // Close the input field by resetting the editingTask state
      setEditingTask(null);
  
      // Display a success toast notification
      toast({ description: "Task Updated Successfully" });
    } catch (error) {
      console.error("error updating task: ", error);
      
    }
  };
  

  return (
    <main className='h-dvh bg-blue-50 overflow-y-auto'>
      <Formik
        initialValues={initVal}
        validationSchema={formValidation}
        onSubmit={handleSubmit}
      >
        <Form className='flex justify-center'>
          <div className='w-full p-10 flex items-center gap-10'>
            <div className='w-full flex flex-col h-12'>
              <Field
                name='title'
                placeholder='Enter a task'
                className='w-full border-none outline-none rounded-md px-3 py-2 text-2xl shadow-lg'
              />
              <ErrorMessage
                name='title'
                component={'p'}
                className='text-red-500 text-semibold'
              />
            </div>

            {/* <Field
                name='task'
                placeholder='Enter a task'
                className='w-full border-none outline-none rounded-md px-3 py-2 text-2xl'
                /> */}
            <button
              type='submit'
              disabled={processing}
              className='p-3 rounded-md text-white bg-blue-600 text-2xl hover:bg-blue-900'
            >
              {
                processing ? <BiLoader className='animate-spin' /> : <FaPlus />
              }

            </button>
          </div>
        </Form>
      </Formik>

      <div>
        <ul className='w-full'>
          {
            todos.map((todo) => (
              //to use interpolation with css use {``} back ticks and curly braces
              <li key={todo.id} className={`w-[90%] mx-auto flex justify-between p-3 m-3 border-b border-b-gray-300 capitalize
                      rounded-lg bg-white shadow-lg hover:bg-black hover:font-bold hover:text-white `}>
                <input
                  onChange={() => check(todo.id, todo.completed)}
                  checked={todo.completed}
                  type="checkbox" />


             {/* the question mark checks if the id is there if not do nothing */}
                {
                  editingTask?.id === todo.id ? (
                  <input type='text'
                    value={editingTask.title}
                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                    className='w-full outline-none p-2 text-black items-center rounded-lg'
                  />
                  ) : (
                  <span className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
                    {todo.title}
                  </span>
                  )
                }

              <div className=' flex gap-2 '>
              {editingTask?.id === todo.id ? (
                  <button onClick={() => handleUpdateTask(todo)} className='text-green-600'>
                    <FaSave className='hover:text-2xl w-12' />
                  </button>
                ) : (
                  <button onClick={() => setEditingTask({ id: todo.id, title: todo.title })} >
                    <FaEdit className='text-blue-600 hover:text-2xl w-12'/>
                  </button>
                )}

                <button
                  onClick={() => handleDelete(todo.id)}
                 className='w-12'
                >
                  <FaRegTrashAlt  className='text-red-600 hover:text-2xl flex justify-center w-12'/>
                </button>

                

              
              </div>
              </li>
            ))
          }
        </ul>
      </div>
      <p className='items-center w-full text-center text-sm p-10'>You have {todos.length} tasks</p>
    </main>


  );
}

export default TodoForms;
