export const Calculate = (a:number, b:number, c:number): number | string | { x1:number; x2: number } => {
  if(isNaN(a) || isNaN(b) || isNaN(c)){
    return 0;
  }

  // -b +- sqrt(b^2 - 4ac)
  // ---------------------
  //          2a
  const discriminante = Math.pow(b, 2) - 4 * a * c;

  if(a == 0){
    return 'No es una ecuacion de segundo grado.';
  }else if(discriminante < 0){
    const realPart = -b / (2 * a);
    const imagPart = Math.sqrt(4 * a * c - b * b) / (2 * a); // sqrt(4ac - b²) / 2a
    
    const x1 = `-${realPart} + ${imagPart} i`;
    const x2 = `-${realPart} - ${imagPart} i`;

    return {x1, x2};
  }

  const raiz = Math.sqrt(discriminante)
  const x1 = (-b + raiz) / (2 * a); 
  const x2 = (-b - raiz) / (2 * a); 

  return {x1, x2};
}
