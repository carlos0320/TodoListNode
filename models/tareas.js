
/**
 * _listado:
    { 'uuid-1233545-454545-4545' : { id: 12, desc: sdsdasa, completadoEn: 4343438} },
    { 'uuid-1233545-454545-4545' : { id: 12, desc: sdsdasa, completadoEn: 4343438} },
    { 'uuid-1233545-454545-4545' : { id: 12, desc: sdsdasa, completadoEn: 4343438} },
 *   */
const Tarea = require("./tarea");
require('colors')
 


class Tareas {
    
    _listado = {};

    get listadoArr(){

        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[ key ];
            listado.push( tarea );
        })
        return listado;
    }

    constructor(){
        this._listado = {};
    }
    
    borrarTarea( id = '') {

        if( this._listado[ id] ) {
            
            delete this._listado[ id ];
            
        }
    }

    cargarTareasFromArray( tareas = [] ) {
        
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });

    }

    crearTarea( desc = '' ) {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea

    }

    listadoCompleto() {

        // 1 en verde
        // Completadaverde
        // pendiente rojo
        // 1. descripcion :: completado? pendiente
        
        this.listadoArr.forEach( (tarea, id) => {
            
            const idx = `${id + 1}`.green;
            const { desc, completadoEn } = tarea
            
            const estado = ( completadoEn ) 
                                ? 'Completado'.green
                                : 'Pendiente'.red

            console.log(`   ${idx}  ${desc}  ::  ${estado}`);
        });
    }

    listarPendientesCompletadas( completadas = true) {
        
        console.log();
        let contador = 0;


        this.listadoArr.forEach( ( tarea, id ) => {

            
            const { desc, completadoEn } = tarea
            
            const estado = ( completadoEn )
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            
            if( completadas ){
                
                //mostramos las completadas
                if( completadoEn ) {

                    contador += 1;
                    console.log(`   ${ (contador + '.' ).green }  ${ desc }  ::  ${ completadoEn.green } `)
                }

            } else {
                
                // Pendientes
                if( !completadoEn){

                    contador += 1;
                    console.log(`   ${ (contador + '.' ).green }  ${ desc }  ::  ${ estado } `)

                }

            }           
            
        });

    }

    toggleCompletadas( ids = [] ){

        ids.forEach( id => {

            const tarea = this._listado[ id ];
            if( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }
        });
        
        this.listadoArr.forEach( tarea => {
            
            if ( !ids.includes(tarea.id ) ) {

                this._listado[ tarea.id ].completadoEn = null;
                // tarea.completadoEn = null;
            }

        })

    }
}


module.exports = Tareas;