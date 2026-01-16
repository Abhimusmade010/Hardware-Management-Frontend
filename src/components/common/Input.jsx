
function Input({ type = "", className = "", ...props }) {
  return (
    <input
      type={type}
      className={`
        w-full
        bg-[#1f2230]
        text-white
        placeholder-gray-400
        border border-[#3a3f55]
        rounded-lg
        px-4 py-3
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        transition
        ${className}
      `}
      {...props}
    />
  );
}

export default Input;
