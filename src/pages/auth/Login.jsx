import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { logUser } from '../../api/auth'
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

//useState
const Login = () => {
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();

    const [loginData,setLoginData]=useState({
        Email:"",
        Password:""
    })
    const{Email,Password}=loginData;

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setLoginData((prev)=>(
        {
            ...prev,
            [name]:value
        }
    ));
    console.log("CHANGE:", e.target.name, e.target.value);
  };
    const handleSubmit=async (e)=>{

        console.log("handlesubmit entry happens here")
        e.preventDefault();
        setError("");
        setLoading(true);

        try{
            console.log("try block of handlesubmit entry happens here")
            const res=await logUser(loginData);
            console.log("success!",res);
            alert("Login Successfully")                 //later replaced by good popup UI
            navigate('/');
        }
        catch(err){
            // setError(err.message);
            console.log("inside catch block of handleSubmit");
            setError(
            err.response?.data?.error ||
            err.response?.data?.message ||
            "Login failed"
            );

        } 
        finally{
            console.log(" finally nblock of handlesubmit entry happens here");
            setLoading(false);
        }

        console.log("Form Data:",loginData);
  
    }

    //usestate add later adfter ui desgin
    return (
    <div className="min-h-screen flex items-center justify-center bg-[#1f1f1f] px-4">
        <div className="w-full max-w-sm bg-[#2a2e3b] rounded-xl shadow-xl p-8">

            <h2 className="text-2xl font-semibold text-center text-white mb-6">
            Login
            </h2>

            {error && (
                <p className="text-red-400 text-sm text-center mb-4">
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
                type="email"
                name="Email"
                placeholder="Email"
                value={Email}
                onChange={handleChange}
            />

            <Input
                type="password"
                name="Password"
                placeholder="Password"
                value={Password}
                onChange={handleChange} 
            />

            <Button
            type="submit"
            text={loading ? "Logging..." : "Login"}
            disabled={loading}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-blue-500/40"
            //onclick do later

            />
            </form>

            <p className="text-sm text-center text-gray-400 mt-6">
                Didn't have account?{" "}
                <Link
                    to="/signup"
                    className="text-blue-400 cursor-pointer hover:underline"
                    >
                    Create
                </Link>
            </p>

        </div>
    </div>
  )
}

export default Login
