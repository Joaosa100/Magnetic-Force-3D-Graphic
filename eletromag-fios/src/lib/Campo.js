export function calculateCampo(permeabilidade, corrente, raio, option){
    let B;
    if(option === "option1"){
        B = (permeabilidade * corrente) / (2*Math.PI*raio);
    }else{
        B = (permeabilidade * corrente) / (4*Math.PI*raio);
    }
    return B;
}