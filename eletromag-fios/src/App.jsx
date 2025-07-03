import { useState } from 'react'
import Button from './components/Button'
import Label from './components/Label'
import Input from './components/Input'
import {calculateFm} from './lib/Campo'

function App() {
  const [resultData, setResult] = useState(null)

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

  function handleSubmit(e) {
    e.preventDefault();
  
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
  
    const { VX, VY, VZ, BX, BY, BZ, option } = data;
  
    if (!VX || !VY || !VZ || !BX || !BY || !BZ || !option) {
      alert("Você precisa preencher todos os campos");
      return;
    }
  
    const parseNumber = (value) => parseFloat(value.replace(",", "."));
    const VXNumber = parseNumber(VX);
    const VYNumber = parseNumber(VY);
    const VZNumber = parseNumber(VZ);
    const BXNumber = parseNumber(BX);
    const BYNumber = parseNumber(BY);
    const BZNumber = parseNumber(BZ);
  
    if (
      isNaN(VXNumber) ||
      isNaN(VYNumber) ||
      isNaN(VZNumber) ||
      isNaN(BXNumber) ||
      isNaN(BYNumber) ||
      isNaN(BZNumber)
    ) {
      alert("Preencha os campos com números válidos");
      return;
    }
  
    const { Fm } = calculateFm(VXNumber, VYNumber, VZNumber, BXNumber, BYNumber, BZNumber, option);

  
    setResult({
      Fm, // Armazena o array diretamente
    });

 fetch("example", { //endereço fornecido pelo comando no backend uvicorn main:app --reload
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Fm }),
  })
    .then((res) => res.text())
    .then((html) => {
      const w = window.open();
      if (w) {
        w.document.write(html);
        w.document.close();
      } else {
        alert("Permita pop-ups para visualizar o gráfico.");
      }
    })
    .catch(() => alert("Erro ao gerar o gráfico. Verifique o backend."));

  }
  

  return (
    <>
      <section className="flex flex-col items-center p-4 bg-gray-100 min-h-screen font-montserrat tracking-wider">
      <h1 className="text-lg sm:text-2xl font-bold mb-6 text-center ">
  Calcular Vetor Força Magnética Em Uma Partícula Com Carga
</h1>
<form
  onSubmit={handleSubmit}
  className="w-full max-w-md bg-white p-4 sm:p-6 rounded-lg shadow-md" //recebe espaçamento de todos, pensando em criar uma section para cada um dos 3 agrupamentos, assim eu posso mexer entre eles
>
  <div className="flex flex-col space-y-2">
    <p className="font-bold">Vetor Velocidade da Partícula (V):</p>
    <div className="flex flex-row justify-evenly space-x-4">
      <div>
        <Label htmlFor="VX">Vx:</Label>
        <Input name="VX" type="text" id="VX" />
      </div>
      <div>
        <Label htmlFor="VY">Vy:</Label>
        <Input name="VY" type="text" id="VY" />
      </div>
      <div>
        <Label htmlFor="VZ">Vz:</Label>
        <Input name="VZ" type="text" id="VZ" />
      </div>
    </div>
  </div>

  <div className="flex flex-col mt-6">
    <p className="font-bold">Vetor Campo Magnético (B):</p>
    <div className="flex flex-row justify-evenly space-x-4 mt-2">
      <div>
        <Label htmlFor="BX">Bx:</Label>
        <Input name="BX" type="text" id="BX" />
      </div>
      <div>
        <Label htmlFor="BY">By:</Label>
        <Input name="BY" type="text" id="BY" />
      </div>
      <div>
        <Label htmlFor="BZ">Bz:</Label>
        <Input name="BZ" type="text" id="BZ" />
      </div>
    </div>
  </div>


  <p className='mt-6 font-bold'>Carga da Partícula:</p>
    <div className="flex flex-col sm:flex-row sm:space-x-8 mb-6 mt-2">  
      <label className="flex items-center">
        <input
          type="radio"
          name="option"
          value="option1"
          checked={formData.option === "option1"}
          onChange={handleChange}
          className="mr-2"
        />
        Próton (+)
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
        Elétron (-)
      </label>
    </div>
    <Button type="submit">Calcular</Button>
</form>

      <section id="result" className="py-10 px-4 h-40 flex flex-col items-center justify-center">
  {resultData ? (
    <div className="text-center mt-4">
      <p>O Vetor Força Magnética resultante é:</p>
      {resultData.Fm.map((component, index) => (
        <p
          key={index}
          className="font-bold text-lg mt-2 text-green-600"
        >
          Fm<sub>{['x', 'y', 'z'][index]}</sub>: {component.toExponential(3)} N
        </p>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500">Preencha os campos e calcule a força magnética.</p>
  )}
</section>

    </section>
    </>
  )
}

export default App
