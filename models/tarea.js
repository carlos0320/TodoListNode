// Lógica de negocio

const { v4: uuidv4 } = require ( 'uuid' );



class Tarea{
    
    id = ''; // npm uuid
    desc = '';
    completadoEn = null;

    constructor( desc ){
        
        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null;
    }




}


module.exports = Tarea;