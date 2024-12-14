function Label({children, htmlFor}){
    return(
        <label className="block" htmlFor={htmlFor} >
            {children}
            </label>
    )}
export default Label