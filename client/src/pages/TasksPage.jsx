import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/TaskCard";


function TasksPage(){
    const {getTasks, tasks} = useTasks();
    useEffect(()=>{
        getTasks();
    }, [])

    return (
        <div className="grid grid-cols-3 gap-2">
            {
                tasks.map(task => (
                   <TaskCard task={task} key={task._id}></TaskCard>
                ))
            }
        </div>
    )
}
export default TasksPage;