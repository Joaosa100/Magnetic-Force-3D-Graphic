import { useState } from 'react'
import Button from './components/Button'
import Label from './components/Label'
import Input from './components/Input'
import { calculateCampo } from './lib/Campo';

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

  function handleSubmit(e){
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    console.log(data)

    const {permeabilidade, corrente, raio, option} = data

    if(!corrente || !raio || !option){
      alert("Você precisa preencher todos os campos")
      return
    }

    const parseNumber = (value) => parseFloat(value.replace(",","."));
    const correnteNumber = parseNumber(corrente);
    const raioNumber = parseNumber(raio);
    const permeabilidadeNumber = permeabilidade
      ? parseNumber(permeabilidade)
      : 4 * Math.PI * Math.pow(10, -7);


    if(isNaN(permeabilidadeNumber) || isNaN(correnteNumber) || isNaN(raioNumber)){
      alert("Preencha os campos com números válidos");
      return;
    }

    if(permeabilidadeNumber<0 || correnteNumber<0 || raioNumber<0){
      alert("Você precisa colocar valores não negativos");
      return;
    }

    const B = calculateCampo(permeabilidadeNumber, correnteNumber, raioNumber, option)
    console.log(B)

    setResult({
      CampoResultante: B,
    })

  }

  return (
    <>
      <section className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-lg sm:text-2xl font-bold mb-6 text-center">
        Calcular Campo Magnético em fio eletrificado
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-4">
      <div>
      <Label htmlFor="permeabilidade">Permeabilidade Magnética (N / A^2):</Label>
        <Input name="permeabilidade" type="text" id="permeabilidade"></Input>
        <p className="text-sm text-red-600 mt-2">
  OBS: Deixe vazio para usar a permeabilidade magnética no vácuo (4π×10⁻⁷)
</p>

      </div>
        
        <div>
            <Label htmlFor="corrente" >Corrente (A):</Label>
            <Input name="corrente" type="text" id="corrente"></Input>
        </div>

        <div>
            <Label htmlFor="raio" >Raio (m):</Label>
            <Input name="raio" type="text" id="raio"></Input>
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

      <section id="result" className="py-10 px-4 h-40 flex flex-col items-center justify-center">
          {resultData ? (
            <div className="text-center mt-4">
              <p>O campo magnético resultante é:</p>
              <p className="font-bold text-lg mt-2 text-green-600">{resultData.CampoResultante.toFixed(9)} T</p>
            </div>
            ) : (
              <p>Campo magnético resultante</p>
            )}
      </section>

    </section>
    </>
  )
}

export default App
