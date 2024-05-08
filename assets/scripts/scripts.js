// VARIABLES GLOBALES

let id;
let idDeporte;

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

    let sql = "Select * FROM deportes ORDER BY dte_nombre ASC";
    const URL = "assets/php/servidor.php?peticion=EjecutarSelect&sql=" + sql;

    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        console.log("DEPORTES", data);

        let html =`<table>`;
        html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th>NOMBRE</th>`;
                html+=`<th>FECHA ALTA</th>`;
                html+=`<th>FECHA BAJA</th>`;
                html+=`<th>ACCIONES ADMIN</th>`;
            html+=`</tr>`;
        html+=`</thead>`;
        html+=`<tbody>`;

        data.datos.forEach(item => {

        html+=`<tr>`;
        html+=`<td>${item.dte_nombre}</td>`;
        html+=`<td>${item.dte_fecha_alta}</td>`;

        if (item.dte_fecha_baja == null) {
        html+=`<td> -- </td>`;
        } else {
        html+=`<td>${item.dte_fecha_baja}</td>`;
        }
        html += `<td><span onclick="fBorrarDeporte('${item.dte_id}')"><i class="fas fa-trash" title="Borrar ${item.dte_nombre}"></i></span></td>`
        html += `<td><span onclick="fMostrarFormulario('#modificar_deporte')"><i class="fas fa-edit" title="Modificar ${item.dte_nombre}"></i></span></td>`
        html+=`</tr>`

        });

        html+=`</tbody>`;
        html+= `</table>`;

        document.querySelector("#deportes").innerHTML = html;

    })


    .finally(()=>{
      fMostrarModal('#modal_deportes');
    })

    
}

// MOSTRAR DEPORTISTAS

function fMostrarDeportes(){

    let sql = "call SelectDeportistas()";
    const URL = "assets/php/servidor.php?peticion=EjecutarSelect&sql=" + sql;

    fetch(URL)
    .then((response) => response.json())
    .then((data) => {

        console.log("DEPORTISTAS", data);

        let html = "";
        html += `  <tbody>`
        html += `   <tr>`
        html += `    <th>DEPORTISTAS</th>`
        html += `    <th>CONTRASEÑA</th>`
        html += `    <th>TELEFONO</th>`
        html += `    <th>FECHA ALTA</th>`
        html += `    <th>FECHA BAJA</th>`
        html += `    <th>ACCIONES ADMIN</th>`
        html += `   </tr>`

        data.datos.forEach(item => {

           html += `   <tr>`
           html += `      <td>${item.dta_nombre}</td>`
           html += `      <td>${item.dta_password}</td>` 
           html += `      <td>${item.dta_telefono}</td>`
           html += `      <td>${item.dta_fecha_alta}</td>` 

            if (item.dte_fecha_baja == null) {
            html += `      <td>  -  -  </td>` 
            } else {
            html += `      <td>${item.dta_fecha_baja}</td>` 
            }
           html += `       <td class="acciones_admin"><span><i class="fas fa-trash"></i>&nbsp;&nbsp;<i class="fas fa-edit"></i></span></td>`
           html += `   </tr>`
          

        });

        html += `  </tbody>`
        console.log(html)
        document.querySelector("#tabla_deportistas").innerHTML = html;

    })

    .finally(()=>{
        fMostrarModal('#modal_deportistas');
      })
}

function fPrepararFormDeportistas(accion_formulario, dta_id, dta_nombre, dta_password, dta_telefono, dta_fcha_baja, dta_fcha_alta) {
    
    // GUARDAMOS EL ID EN EL INPUT OCULTO EN EL CASO DE QUE QUERAMOS UTILIZARLO
    document.querySelector("#dta_id").value = dta_id;

    // SI HUBIERA DADO ERROR VACIAMOS EL MENSJAE DE ERROR ANTERIOR
    document.querySelector("#dta_error").innerHTML = " ";


    //RELLENAMOS LOS CAMPOS CON LOS VALORES
    document.querySelector("#dta_nombre").value = dta_nombre;
    document.querySelector("#dta_password").value = dta_password;
    document.querySelector("#dta_telefono").value = dta_telefono;
    document.querySelector("#dta_fcha_alta").value = dta_fcha_alta;
    document.querySelector("#dta_fcha_baja").value = dta_fcha_alta;
    //Analizar el para_que

    if (para_que == 'insertar') {
        document.querySelector("#dta_add").style.display = "block";
        document.querySelector("#dta_mod").style.display = "none";
        document.querySelector("#dta_del").style.display = "none";
    }

    if (para_que == 'modificar') {
        document.querySelector("#dta_add").style.display = "none";
        document.querySelector("#dta_mod").style.display = "none";
        document.querySelector("#dta_del").style.display = "none";
    }
    if (para_que == 'eliminar') {
        document.querySelector("#curso_añadir").style.display = "none";
        document.querySelector("#curso_modificar").style.display = "none";
        document.querySelector("#curso_borrar").style.display = "block";
    }
    fMostrarFormularios("#div_cursos");
}