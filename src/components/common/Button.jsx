


// function Button({ text }) {
//   return <button>{text}</button>;
// }

// export default Button;
function Button({ text, className, ...props }) {
  return (
    <button
      className={className}
      {...props}
    >
      {text}
    </button>
  );
}

export default Button;
