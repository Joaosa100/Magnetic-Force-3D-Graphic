// function SelectFio({...props}){
//     const [formData, setFormData] = useState({
//         field1: "",
//         field2: "",
//         field3: "",
//         option: "",
//       });
    
//       const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//       };
    
    
    
//     return(
//         <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">  
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="option"
//               value="option1"
//               checked={formData.option === "option1"}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             Fio "Infinito"
//           </label>
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="option"
//               value="option2"
//               checked={formData.option === "option2"}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             Fio Semi-Infinito
//           </label>
//         </div>
        
//     )
// }
// export default Input