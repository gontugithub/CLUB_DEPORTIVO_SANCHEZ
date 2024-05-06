// VARIABLES GLOBALES

let id;

// PARA MOSTRAR LOS MODALES

function fMostrarModal(nombre_modal_con_almohadilla) {

    console.log(nombre_modal_con_almohadilla);


    // OCULTAMOS TODOS LOS DIV (ESTOS VAN A SER TODOS MODALES) -> LOS GUARDAMOS EN UNA LISTA

    let lista_modales = document.querySelectorAll("section > div");


    lista_modales.forEach(item => {
        item.style.display = "none";
        console.log(item)
    });

    document.querySelector(nombre_modal_con_almohadilla).style.display = "flex";

}

// PARA MOSTRAR LOS FORMULARIOS

function fMostrarFormularios(nombre_formulario_con_almohadilla){

    
    console.log(nombre_formulario_con_almohadilla);

    let lista_formularios = document.querySelectorAll("#formularios > div");


    lista_formularios.forEach(item => {
        item.style.display = "none";
        console.log(item)
    });

    document.querySelector(nombre_formulario_con_almohadilla).style.display = "flex";

    // Mostramos la modal
    
    document.querySelector("#formularios").style.display = "flex";

}

// PARA EL LOGIN

function fLogin() {

    let alias = document.querySelector("#alias_login").value;
    let password = document.querySelector("#password_login").value;

    let sql = `SELECT * FROM deportistas WHERE dta_nombre = '${alias}' AND dta_password = md5('${password}')`;
    const URL = "assets/php/servidor.php?peticion=EjecutarSelect&sql=" + sql;


    // Se lo pedimos a servidor

    fetch(URL)
        .then((response) => response.json())
        .then((data) => {

        //Para comprobar que funciona
        console.log(data);

    // En el caso de que este logueado

    if (data.datos.length > 0) {

        // Ocultamos el login 
        document.querySelector("#modal_login").style.display = 'none';

        // Guardamos la variable del ID del usuario
        id = data.datos[0].dta_id;


    } else {

        // En el caso de que no este logueado
        document.querySelector("#div_error_login").style.display = 'flex';
        document.querySelector("#div_error_login").innerHTML = "Username o contraseña incorrecta. Acceso denegado."
    }

        })

        .finally(() => {
            document.querySelector('#alias_login').value = "";
            document.querySelector('#password_login').value = "";

            // Redirigimos al perfil del usuario
            fMostrarModal("#modal_home");

        })

}

// MOSTRAR DEPORTES

function fMostrarDeportes(){


    
}