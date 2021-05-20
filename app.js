require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
// const { mostrarMenu, pausa } = require('./helpers/mensajes');
const { inquirerMenu,
        pausa,
        leerInput, 
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheckList} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();


const main = async () => {
    
    let opcion='';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if ( tareasDB ){
        //Establecer las tareas

        tareas.cargarTareasFromArray ( tareasDB );

    }

    await pausa();

    do{
        console.clear();
       
        //Imprimir el menu
        opcion = await inquirerMenu();


        switch (opcion) {
            case '1':
                // Crear Opcion
                const desc = await leerInput( 'Descripción: ' );
                tareas.crearTarea( desc );
                console.log( desc );
            break;
            
            case '2' :
                // Listar opciones
                // console.log( tareas.listadoArr );
                console.log('\n');
                tareas.listadoCompleto();
            break;

            
            case '3' :  //Listar completadas
                tareas.listarPendientesCompletadas(true);
            break;

            case '4' :  // Listar pendientes
                tareas.listarPendientesCompletadas(false);
            break;

            case '5' : //completar tarea
                const ids = await mostrarListadoCheckList( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                // console.log(ids)
            break;

            case '6' :  // Borrar
                const id = await listadoTareasBorrar( tareas.listadoArr );

                if ( id !== '0' ){

                    const ok = await confirmar('Esta seguro?');
    
                    if( ok ){
                        tareas.borrarTarea ( id );
                        console.log('\n');
                        console.log('Tarea borrada correctamente')
                    }
                }
                // console.log( { ok } );
                //TODO preguntar si esta seguro
            break;
            
        }

        guardarDB( tareas.listadoArr) ;      

        
        await pausa();

        
    }while( opcion !== '0' )
    
    
    
    // await ausa();
}
main();
    
    






