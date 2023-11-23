"use client";
import React, { FormEventHandler } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from './Modal';
import { useState } from 'react';
import { AddTodo } from '../../../api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';


const AddTask = () => {

  const newId = uuidv4()
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [newTaskValue, setNewTaskValue] = useState<string>("")

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await AddTodo({
      id: newId,
      text: newTaskValue
    })
    setNewTaskValue("")
    setModalOpen(false)
    router.refresh()
  }

  return (
    <div>
        <button onClick={() => setModalOpen(true)} className='btn btn-primary w-full'>Add New Task <AiOutlinePlus className="ml-2"size={18}/>
</button>

    <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} >
      <form onSubmit={handleSubmitNewTodo}>
          <h3 className='font-bold text-lg'>Add new task</h3>
          <div className='modal-action'>
            <input 
              type="text" 
              value={newTaskValue}
              onChange={e => setNewTaskValue(e.target.value)}
              placeholder="Type here" 
              className="input input-bordered w-full max-w-full" />
              <button className='btn' type="submit">Submit</button>
          </div>
      </form>
    </Modal>

    </div>
  )
}

export default AddTask