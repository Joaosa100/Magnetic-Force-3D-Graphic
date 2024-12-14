function Button({children}){
    return(
        <button
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
        >
          {children}
        </button>
    )
}
export default Button