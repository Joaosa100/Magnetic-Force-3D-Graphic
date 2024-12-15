export function calculateFm(VXNumber, VYNumber, VZNumber, BXNumber, BYNumber, BZNumber, option) {
    let q;
    if (option === "option1") {
        q = 1.6e-19; // Próton
    } else {
        q = -1.6e-19; // Elétron
    }

    // Validar se todos os valores são números
    if ([VXNumber, VYNumber, VZNumber, BXNumber, BYNumber, BZNumber].some(value => isNaN(value))) {
        throw new Error("Todos os valores de entrada devem ser números válidos.");
    }

    // Vetores
    const v = [VXNumber, VYNumber, VZNumber];
    const B = [BXNumber, BYNumber, BZNumber];

    // Cálculo da força magnética
    const Fm = [
        q * (v[1] * B[2] - v[2] * B[1]), // Fm_x
        q * (v[2] * B[0] - v[0] * B[2]), // Fm_y
        q * (v[0] * B[1] - v[1] * B[0])  // Fm_z
    ];

    // Debug no console (sem notação científica)
    console.log("Componentes dos vetores:");
    console.log(`Velocidade (v): i = ${v[0]} m/s, j = ${v[1]} m/s, k = ${v[2]} m/s`);
    console.log(`Campo Magnético (B): i = ${B[0]} T, j = ${B[1]} T, k = ${B[2]} T`);
    console.log(`Força Magnética (Fm): i = ${Fm[0]} N, j = ${Fm[1]} N, k = ${Fm[2]} N`);

    return { Fm };
}
