import React, { useState } from "react";
import Label from "./Label";
import Button from "./Button";
import Input from "./Input";

const FormScreen = () => {
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    field3: "",
    option: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-lg sm:text-2xl font-bold mb-6 text-center">
        Calcular Campo Magnético em fio eletrificado
      </h1>
      <form className="w-full max-w-md bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-4">
      <div>
      <Label htmlFor="permeabilidade">Permeabilidade Magnética:</Label>
        <Input type="text" id="permeabilidade"></Input>
      </div>
        
        <div>
            <Label htmlFor="corrente" >Corrente (A):</Label>
            <Input type="text" id="corrente"></Input>
        </div>

        <div>
            <Label htmlFor="raio" >Raio (m):</Label>
            <Input type="text" id="raio"></Input>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">  
          <label className="flex items-center">
            <input
              type="radio"
              name="option"
              value="option1"
              checked={formData.option === "option1"}
              onChange={handleChange}
              className="mr-2"
            />
            Fio "Infinito"
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="option"
              value="option2"
              checked={formData.option === "option2"}
              onChange={handleChange}
              className="mr-2"
            />
            Fio Semi-Infinito
          </label>
        </div>
        <Button type="submit">Calcular</Button>
      </form>

      <section id="result" className="py-10 px-4 h-40">
      <p>Campo magnético resultante</p>
        </section>
       
    </section>

 
  );
};

export default FormScreen;
