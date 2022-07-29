//transforma un string a primer letra mayuscula, resto minuscula. Ejemplo: hoLA => Hola
export const capitalizarString = (input = '')=>{
    return input
        .toLowerCase()
        .replace(/\w/, firstLetter => firstLetter.toUpperCase());
}