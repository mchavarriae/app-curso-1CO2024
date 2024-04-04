import {useForm} from "react-hook-form";
import {useAuth} from "../context/AuthContext";
import {useEffect} from "react";
import {useNavigate, Link} from 'react-router-dom';

function LoginPage() {
    const {signin,isAuthenticated, errors:LoginErrors} = useAuth();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    useEffect(()=> {
        if(isAuthenticated) navigate("/tasks");
    }, [isAuthenticated])

    const onSubmit = handleSubmit((values) => {
        // console.log(values);
        signin(values);
    })

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            {
                LoginErrors.map((error, i) =>(
                    <div className="bg-red-500 p-2 text-white" key={i}>{error}</div>
                ))
            }
            <form onSubmit={onSubmit}>
                <input type="email" {...register("email", {required: true})} placeholder="Email" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md m-2"></input>
                {errors.email && (<p className="text-red-500"> Email is required </p>)}
                <input type="password" {...register("password",{required: true})} placeholder="Password" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md m-2"></input>
                {errors.password && (<p className="text-red-500"> Password is required </p>)}
                <button type="submit">Login</button>
            </form>
            <p className="flex gap-x-2 justify-between">
                Don't have an account? <Link to="/register" className="text-sky-500">Sign Up</Link>
            </p>
            </div>

        </div>
    )
}

export default LoginPage;