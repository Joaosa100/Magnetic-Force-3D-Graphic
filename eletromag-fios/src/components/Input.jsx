function Input({...props}){
    return(
        <input
          className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        {...props}
        />
    )
}
export default Input