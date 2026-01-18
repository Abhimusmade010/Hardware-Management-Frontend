
import React from "react";
import Input from "../../components/common/Input";

const Form = () => {
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

        <form className="space-y-5">

          {/* Asset ID */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Asset ID
            </label>
            <Input
              type="text"
              name="asset_id"
              placeholder="Enter asset ID"
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
              className="w-full rounded-md px-3 py-2 bg-[#1f2937] text-white
                         border border-slate-600 focus:outline-none
                         focus:ring-2 focus:ring-indigo-500"
            >
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
              rows="4"
              placeholder="Describe the issue..."
              className="w-full rounded-md px-3 py-2 bg-[#1f2937] text-white
                         border border-slate-600 focus:outline-none
                         focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Priority
            </label>
            <div className="flex gap-6 text-gray-300">
              {["Low", "Medium", "High"].map((level) => (
                <label
                  key={level}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="priority"
                    className="accent-indigo-500"
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
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
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700
                       text-white py-2.5 rounded-md font-medium transition"
          >
            Submit Complaint
          </button>

        </form>


      </div>

    </div>
  );
};

export default Form;
