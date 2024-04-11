import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import {useNavigate, useParams} from 'react-router-dom';
import { useEffect } from "react";


function TaskFormPage(){
    const {register, handleSubmit, setValue} = useForm();
    const {createTask, getTask, updateTask} = useTasks();
    const navigate = useNavigate();
    const params = useParams();
    const onSubmit = handleSubmit(async(data)=> {
        if(params.id){
           await updateTask(params.id, data);
        }else{
            await createTask(data);
        }
        navigate("/tasks");
    });

    useEffect(()=>{
        async function loadTask(){
            if(params.id){
                const task = await getTask(params.id);
                setValue('title', task.title);
                setValue('description', task.description)
            }
        }
        loadTask();

    }, [])

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <form onSubmit={onSubmit}>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Title" {...register("title")} autoFocus></input>
                <textarea rows="3" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"  placeholder="Description" {...register("description")}></textarea>
                <button>Save</button>
            </form>
        </div>
    )
}
export default TaskFormPage;