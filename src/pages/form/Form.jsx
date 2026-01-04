import React from 'react'

const Form = () => {




  return (
    <div flag ='false' className="min-h-screen bg-[#1f1f1f] flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-[#2a2e3b] rounded-xl shadow-md p-6">
            
            <h2 className="text-2xl font-semibold text-white mb-1">
            Submit a Complaint
            </h2>
            <p className="text-sm text-gray-500 mb-6">
            Please provide accurate details so the issue can be resolved quickly.
            </p>

            <form className="space-y-4">

            {/* Department */}
            <div>
            <label className="block text-sm font-medium text-white mb-1">
                Department
            </label>

            <select
                className="
                w-full
                rounded-md
                px-3
                py-2
                bg-[#1f2937]        /* dark background */
                text-white          /* visible text */
                border border-gray-600
                focus:outline-none
                focus:ring-2
                focus:ring-amber-500
                "
            >
                <option value="" className="text-gray-400">
                Select department
                </option>
                <option value="IT">IT</option>
                <option value="Computer">Computer</option>
                <option value="AIDS">AIDS</option>
                <option value="ECE">ECE</option>
                <option value="BSE">BSE</option>
                <option value="ENTC">ENTC</option>
            </select>
            </div>


            {/* Category */}
            <div>
                <label className="block text-sm font-medium text-white mb-1">
                Complaint Category
                </label>
                <select className="
                w-full
                rounded-md
                px-3
                py-2
                bg-[#1f2937]        /* dark background */
                text-white          /* visible text */
                border border-gray-600
                focus:outline-none
                focus:ring-2
                focus:ring-amber-500
                "
                >
                <option>Select category</option>
                <option>Hardware</option>
                <option>Network</option>
                <option>Software</option>
                </select>
            </div>

            {/* Nature */}
            <div>
                <label className="block text-sm font-medium text-white mb-1  ">
                Nature of Complaint
                </label>
                <textarea
                rows="4"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Describe the issue..."
                />
            </div>

            {/* Room */}
            <div>
                <label className="block text-sm font-medium text-white mb-1">
                Room / Location
                </label>
                <input
                type="text"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="e.g. Lab 203"
                />
            </div>

            {/* Priority */}
            <div>
                <label className="block text-sm font-medium text-white mb-1">
                Priority
                </label>
                <div className="flex gap-4">
                <label className="flex items-center gap-1">
                    <input type="radio" name="priority" /> Low
                </label>
                <label className="flex items-center gap-1">
                    <input type="radio" name="priority" /> Medium
                </label>
                <label className="flex items-center gap-1">
                    <input type="radio" name="priority" /> High
                </label>
                </div>
            </div>

            {/* Attachment */}
            {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Attachment (optional)
                </label>
                <input type="file" />
            </div> */}

            {/* Submit */}
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
                Submit Complaint
            </button>

            </form>
        </div>
</div>

  )
}

export default Form
