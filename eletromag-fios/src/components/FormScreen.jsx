import React, { useState } from "react";

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
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-lg sm:text-2xl font-bold mb-6 text-center">
        Calcular Campo Magnético em fio eletrificado
      </h1>
      <form className="w-full max-w-md bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-4">
        <input
          type="text"
          name="field1"
          value={formData.field1}
          onChange={handleChange}
          placeholder="Permeabilidade Magnética"
          className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="field2"
          value={formData.field2}
          onChange={handleChange}
          placeholder="Corrente (A)"
          className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="field3"
          value={formData.field3}
          onChange={handleChange}
          placeholder="Raio (m)"
          className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        />
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Calcular
        </button>
      </form>
    </div>
  );
};

export default FormScreen;
