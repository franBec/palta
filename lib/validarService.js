//valida si input está en formato email
export const validarEmail = (input = '') =>{
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return input.match(validRegex)
}

//valida sin input es un string fecha valido para mysql
export const validarFecha = (input = '')=>{
    var validRegex = /^(((\d{4})(-)(0[13578]|10|12)(-)(0[1-9]|[12][0-9]|3[01]))|((\d{4})(-)(0[469]|11)(-)(0[1-9]|[12][0-9]|30))|((\d{4})(-)(02)(-)(0[1-9]|[12][0-9]|2[0-8]))|(([02468][048]00)(-)(02)(-)(29))|(([13579][26]00)(-)(02)(-)(29))|(([0-9][0-9][0][48])(-)(02)(-)(29))|(([0-9][0-9][2468][048])(-)(02)(-)(29))|(([0-9][0-9][13579][26])(-)(02)(-)(29)))(\s)(([0-1][0-9]|2[0-4]):([0-5][0-9]):([0-5][0-9]))$/
    return input.match(validRegex)
}