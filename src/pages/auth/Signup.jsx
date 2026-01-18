import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { signupUser } from '../../api/auth';

const Signup = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  
  const [signupData,setsignupData]=useState({
    Name:"",
    Email:"",
    Password:"",
    CabinNo:"",
    Department:"",
  })

  const {Name, Email, Password, CabinNo, Department} = signupData;

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setsignupData((prev)=>(
      {
        ...prev,
        [name]:value
      }
    ));
    console.log("CHANGE:", e.target.name, e.target.value);
  };

  const handleSubmit=async (e)=>{
    // console.log("handlesubmit entry happens here")
    e.preventDefault();
    setError("");
    setLoading(true);
    try{
      // console.log("try block of handlesubmit entry happens here")
      const res=await signupUser(signupData);
      console.log("success!",res);
      alert("Account Created Successfully!!");
      navigate('/login');
    }
    catch(err){
      // setError(err.message);
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Signup failed"
      );
    } 
    finally{
      // console.log(" finally nblock of handlesubmit entry happens here")
      setLoading(false);
    }
    console.log("Form Data:",signupData);

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1f1f1f] px-4">
      <div className="w-full max-w-sm bg-[#2a2e3b] rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Create Account
        </h2>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">
            {error}
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="Name"
            placeholder="Name"
            value={Name}
            onChange={handleChange}
          />

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

          <Input
            type="text"
            name="CabinNo"
            placeholder="Cabin No"
            value={CabinNo}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="Department"
            placeholder="Department"
            value={Department}
            onChange={handleChange}
          />

          <Button
            type="submit"
            text={loading ? "Signing up..." : "SIGN UP"}
            disabled={loading}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-blue-500/40"
          />
        </form>

        <p className="text-sm text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
