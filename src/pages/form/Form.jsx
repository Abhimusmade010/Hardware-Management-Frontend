
import React from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";

//data handling and state management 

// take the data from the user 
// react state handling 
// on submitting the button ,call onclick to submit the form calling backend route for submit the ccomplaint

import { submitComplaint } from "../../api/auth";
import { useState } from "react";


const Form = () => {
  const navigate=useNavigate();
  const[error,setError]=useState("");
  const[loading,setLoading]=useState(false);
  const [submitFormData,setsubmitFormData]=useState({
      assetId:"",
      category:"",
      description:"",
      priority:"",
      //later image add
  })

  const {assetId,category,description,priority} = submitFormData;
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setsubmitFormData((prev)=>(
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
        const res=await submitComplaint(submitFormData);
        console.log("success!",res);
        alert("Complaint Submitted Successfully!!");
        setsubmitFormData({
          assetId: "",
          category: "",
          description: "",
          priority: "",
        });
        // navigate('/');                                        
        //  later add ui pop that compaint register and give button to see the sepecific detials about the coplaint and status tracking room
      }
      
      catch(err){
        // setError(err.message);
        setError(
          err.response?.data?.error ||
          err.response?.data?.message ||
          "complaint Registration failed"
        );
      } 
      finally{
        console.log(" finally nblock of handlesubmit entry happens here")
        setLoading(false);
      }
      console.log("Form Data:",submitFormData);
  
    }


  return (
    <div className="min-h-screen bg-[#1f1f1f] flex items-center justify-center p-4">

      <div className="w-full max-w-xl bg-[#2a2e3b] rounded-xl shadow-lg p-6">
        
        {/* Header */}
        <h2 className="text-2xl font-semibold text-white">
          Submit a Complaint
        </h2>

        <p className="text-sm text-gray-400 mb-6">
          Please provide accurate details so the issue can be resolved quickly.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>

          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}

          {/* Asset ID */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Asset ID
            </label>
            <Input
              type="number"
              name="assetId"
              placeholder="Enter asset ID"
              value={assetId}
              onChange={handleChange}
              className="w-full rounded-md px-3 py-2 bg-[#1f2937] text-white
                         border border-slate-600 focus:outline-none
                         focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Complaint Category
            </label>
            <select 
            name="category"
            value={category}
            onChange={handleChange}
            className="w-full rounded-md px-3 py-2 bg-[#1f2937] text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              
              <option value="">Select category</option>
              <option>Hardware</option>
              <option>Network</option>
              <option>Software</option>
              
            </select>
            
          </div>

          {/* Nature of Complaint */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Nature of Complaint
            </label>
            <textarea
              name="description"                 // 🔑 must match state key
              value={description}                // 🔑 controlled
              onChange={handleChange}             // 🔑 updates state
              rows="4"
              placeholder="Describe the issue..."
              className="w-full rounded-md px-3 py-2 bg-[#1f2937] text-white
                         border border-slate-600 focus:outline-none
                         focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Priority
            </label>
            <select 
            name="priority"
            value={priority}
            onChange={handleChange}
            className="w-full rounded-md px-3 py-2 bg-[#1f2937] text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              
              <option value="">Select Priority</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              
            </select>
            
          </div>

          {/* Image Upload */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Upload Image (Max 1MB) <span className="text-red-500">*</span>
            </label>

            <label
              
              htmlFor="imageUpload"
              className="w-full h-12 px-3 flex items-center rounded-md
                         bg-[#1f2937] text-gray-400 cursor-pointer
                         border border-slate-600 hover:border-indigo-500
                         transition"
            >
              Click to upload image (PNG, JPG up to 1MB)
              <input
                id="imageUpload"
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
              />
            </label>
          </div> */}

          {/* Submit */}
            {/* <Button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-md font-medium transition
              ${loading 
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {loading ? "Submitting..." : "Submit Complaint"}
            </Button> */}
            <button type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-md font-medium transition" 
              
              > 
              {loading ? "Submitting..." : "Submit Complaint"}
            </button>


        </form>


      </div>

    </div>
  );
};

export default Form;
