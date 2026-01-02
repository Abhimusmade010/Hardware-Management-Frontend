import React from 'react'

import { Link } from 'react-router-dom';

import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

//useState
const Login = () => {

    // const [email,setEmail]=useState("");
    // const [password,setPassword]=useState("");
    //usestate add later adfter ui desgin
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1f1f1f] px-4">
        <div className="w-full max-w-sm bg-[#2a2e3b] rounded-xl shadow-xl p-8">
            
            <h2 className="text-2xl font-semibold text-center text-white mb-6">
            Login
            </h2>

            <form className="flex flex-col gap-4">
            <Input
                // type="email"
                placeholder="Email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                
            />

            <Input
                // type="password"
                placeholder="Password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                
            />
            <Button
            text="SIGN IN"
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-blue-500/40"
            // onclick do later
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
