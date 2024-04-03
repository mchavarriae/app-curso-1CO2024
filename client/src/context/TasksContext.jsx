import { createContext, useContext, useState } from "react";
import { createTaskRequest, deleteTaskRequest, getTaskRequest, getTasksRequest, updateTaskRequest } from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
}

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    const createTask = async (task) => {
        try {
            const res = await createTaskRequest(task);
            console.log(res.data);
        }
        catch (error) {
            console.error(err);
        }
    }

    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            console.log(res);
            setTasks(res.data);
        } catch (error) {
            console.log(error);
        }
    }

   const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id);
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    const updateTask = async (id, task) => {
        try {
            await updateTaskRequest(id, task);
            
        } catch (error) {
            console.error(error);
        }
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id);
            if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.err(error);
        }
    }

    return (
        <TaskContext.Provider value={{
            tasks,
            createTask,
            getTasks,
            deleteTask,
            getTask,
            updateTask
        }}>
            {children}
        </TaskContext.Provider>
    );
}