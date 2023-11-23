"use client"
import React, { useState, FormEventHandler } from 'react'
import { ITask } from '../../../types/tasks'
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { Modal } from './Modal';
import { useRouter } from 'next/navigation';
import { deleteTodo, editTodo } from '../../../api';



interface TaskProps {
  task: ITask
}

const Task: React.FC<TaskProps> = ( { task }) => {

  const router = useRouter()
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text)
  const [taskToDelete, setTaskToDelete] = useState<string>(task.id)

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await editTodo({
      id: task.id,
      text: taskToEdit
    })
    setTaskToEdit("")
    setOpenModalEdit(false)
    router.refresh()
  }

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDelete(false);
    router.refresh()
  }

  
  return (
    <tr key={task.id}>
      <td className='w-full border'>{task.text}</td>
      <td className='flex gap-5'>
        <FiEdit 
          className="text-blue-500 cursor-pointer" 
          size={25} 
          onClick={() => setOpenModalEdit(true)}
          />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit} >
      <form onSubmit={handleSubmitEditTodo}>
          <h3 className='font-bold text-lg'>Edit task</h3>
          <div className='modal-action'>
            <input 
              type="text" 
              value={taskToEdit}
              onChange={e => setTaskToEdit(e.target.value)}
              placeholder="Type here" 
              className="input input-bordered w-full max-w-full" />
              <button className='btn' type="submit">Submit</button>
          </div>
      </form>
    </Modal>



        <FiTrash2 
          className="text-red-500  cursor-pointer" 
          size={25}
          onClick={() => setOpenModalDelete(true)}
          />
           <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete} >
          <h3 className='font-bold text-lg'>Are you sure you want to delete this task?</h3>
          <div className='modal-action'>
              <button 
              className='btn' 
              type="submit" 
              onClick={() => handleDeleteTodo(task.id)}>Yes</button>
          </div>
    </Modal>
      </td>
    </tr>
  )
}

export default Task