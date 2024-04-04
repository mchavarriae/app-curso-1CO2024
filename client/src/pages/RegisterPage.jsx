import {useForm} from "react-hook-form";
import { registerRequest } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import {useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';

function RegisterPage(){
    const {register, handleSubmit, formState:{errors}} = useForm();
    const {signup, isAuthenticated, errors:RegisterErrors} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isAuthenticated) navigate("/tasks");
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values)=> {
        signup(values);
    })

    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
            {
                RegisterErrors.map((error, i) =>(
                    <div className="bg-red-500 p-2 text-white" key={i}>{error}</div>
                ))
            }
            <form onSubmit={onSubmit}>
                <input type="text" {...register("username", {required:true})} placeholder="Username" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md m-2"></input>
                {errors.username && (<p className="text-red-500"> Username is required </p>)}
                <input type="email" {...register("email", {required: true})} placeholder="Email" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md m-2"></input>
                {errors.email && (<p className="text-red-500"> Email is required </p>)}
                <input type="password" {...register("password",{required: true})} placeholder="Password" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md m-2"></input>
                {errors.password && (<p className="text-red-500"> Password is required </p>)}
                <button type="submit">Register</button>
            </form>
            <p className="flex gap-x-2 justify-between">
                Already have an account? <Link to="/login" className="text-sky-500">Log In</Link>
            </p>
        </div>
    )
}

export default RegisterPage;