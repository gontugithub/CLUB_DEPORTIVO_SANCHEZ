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

function fMostrarFormularios(formulario){

    
    console.log(formulario);

    let lista_formularios = document.querySelectorAll("#modal_formularios > div");


    lista_formularios.forEach(item => {
        item.style.display = "none";
        console.log(item)
    });

    document.querySelector(formulario).style.display = "block";

    // Mostramos la modal
    
    fMostrarModal("#modal_formularios");


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

    if (data.datos.length > 0 && data.datos[0].dta_admin == 1) {

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

    document.querySelector('#filtro_deportes').value = "";

    let sql = "Select * FROM deportes ORDER BY dte_nombre ASC";
    const URL = "assets/php/servidor.php?peticion=EjecutarSelect&sql=" + sql;

    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        console.log("DEPORTES", data);

 
        let html = "";
        html += `  <tbody>`
        html += `   <tr>`
        html += `    <th>NOMBRE</th>`
        html += `    <th>FECHA ALTA</th>`
        html += `    <th>FECHA BAJA</th>`
        html += `    <th>ACCIONES ADMIN</th>`
        html += `   </tr>`

        data.datos.forEach(item => {

           html += `   <tr>`
           html += `      <td>${item.dte_nombre}</td>`
           if (item.dte_fecha_alta == null) {
            html += `      <td>  -  -  </td>` 
            } else {
           html += `      <td>${item.dte_fecha_alta}</td>`
            }
            if (item.dte_fecha_baja == null) {
            html += `      <td>  -  -  </td>` 
            } else {
           html += `      <td>${item.dte_fecha_baja}</td>`
            }
           html += `       <td class="acciones_admin"><span><i class="fas fa-trash"></i>&nbsp;&nbsp;<i class="fas fa-edit"></i></span></td>`
           html += `   </tr>`
          

        });

        html += `  </tbody>`
        console.log(html)
        document.querySelector("#tabla_deportes").innerHTML = html;
    })


    .finally(()=>{
      fMostrarModal("#modal_deportes");
    })

    
}

// MOSTRAR DEPORTISTAS

function fMostrarDeportistas(){

    document.querySelector('#filtro_deportistas').value = "";

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

           if(item.dte_fecha_baja == null){
            html += `      <td>  -  -  </td>` 
           } else{
            html += `      <td>${item.dta_fecha_baja}</td>`
           }

            if (item.dte_fecha_baja == null && item.dta_fecha_alta == null) {
            
            html += `       <td class="acciones_admin">
           <span onclick="fPrepararFormDeportistas('eliminar', '${item.dta_id}','${item.dta_nombre}','${item.dta_password}','${item.dta_telefono}', '', '')">
           <i class="fas fa-trash"></i></span>&nbsp;&nbsp;
           <span onclick="fPrepararFormDeportistas('modificar', '${item.dta_id}','${item.dta_nombre}','${item.dta_password}','${item.dta_telefono}', '', '')">
           <i class="fas fa-edit"></i></span></td>`

            } else if (item.dte_fecha_baja == null){

                html += `       <td class="acciones_admin">
           <span onclick="fPrepararFormDeportistas('eliminar', '${item.dta_id}','${item.dta_nombre}','${item.dta_password}','${item.dta_telefono}', '', '${item.dta_fecha_alta}')">
           <i class="fas fa-trash"></i></span>&nbsp;&nbsp;
           <span onclick="fPrepararFormDeportistas('modificar', '${item.dta_id}','${item.dta_nombre}','${item.dta_password}','${item.dta_telefono}', '', '${item.dta_fecha_alta}')">
           <i class="fas fa-edit"></i></span></td>`
            

            } else if (item.dte_fecha_alta == null){

                html += `       <td class="acciones_admin">
           <span onclick="fPrepararFormDeportistas('eliminar', '${item.dta_id}','${item.dta_nombre}','${item.dta_password}','${item.dta_telefono}', '${item.dta_fecha_baja}', '')">
           <i class="fas fa-trash"></i></span>&nbsp;&nbsp;
           <span onclick="fPrepararFormDeportistas('modificar', '${item.dta_id}','${item.dta_nombre}','${item.dta_password}','${item.dta_telefono}', '${item.dta_fecha_baja}', '')">
           <i class="fas fa-edit"></i></span></td>`


            } else{
                html += `       <td class="acciones_admin">
           <span onclick="fPrepararFormDeportistas('eliminar', '${item.dta_id}','${item.dta_nombre}','${item.dta_password}','${item.dta_telefono}', '${item.dta_fecha_baja}', '${item.dta_fecha_alta}')">
           <i class="fas fa-trash"></i></span>&nbsp;&nbsp;
           <span onclick="fPrepararFormDeportistas('modificar', '${item.dta_id}','${item.dta_nombre}','${item.dta_password}','${item.dta_telefono}', '${item.dta_fecha_baja}', '${item.dta_fecha_alta}')">
           <i class="fas fa-edit"></i></span></td>`
            }
           
           html += `   </tr>`

          

        })

        html += `  </tbody>`
        console.log(html)
        document.querySelector("#tabla_deportistas").innerHTML = html;

    })

    .finally(()=>{
        fMostrarModal('#modal_deportistas');
      })
}

function fPrepararFormDeportistas(accion_formulario, dta_id, dta_nombre, dta_password, dta_telefono, dta_fcha_baja, dta_fcha_alta) {

    console.log(dta_fcha_baja)
    console.log(dta_fcha_alta)

    let lista_label = document.querySelectorAll("#formulario_deportistas > label");
    let lista_input = document.querySelectorAll("#formulario_deportistas > input");

    console.log(lista_input)
    console.log(lista_label)

    // MUESTRA TODOS LOS LABEL

    lista_label.forEach(item => {

        item.style.display = "block"
        
    });

    // MUESTRA TODOS LOS INPUTS

    lista_input.forEach(item => {

        item.style.display = "block"
        
    });


    // GUARDAMOS EL ID EN EL INPUT OCULTO EN EL CASO DE QUE QUERAMOS UTILIZARLO
    document.querySelector("#l_dta_id").style.display = "none";
    document.querySelector("#dta_id").style.display = "none";
    document.querySelector("#dta_id").value = dta_id;

    // SI HUBIERA DADO ERROR VACIAMOS EL MENSJAE DE ERROR ANTERIOR
    document.querySelector("#dta_error").innerHTML = " ";


    //RELLENAMOS LOS CAMPOS CON LOS VALORES
    document.querySelector("#dta_nombre").value = dta_nombre;
    document.querySelector("#dta_password").value = dta_password;
    document.querySelector("#dta_telefono").value = dta_telefono;
    document.querySelector("#dta_fcha_baja").value = dta_fcha_baja;
    document.querySelector("#dta_fcha_alta").value = dta_fcha_alta;
   
    //Analizar el para_que

    if (accion_formulario == 'insertar') {
        document.querySelector("#dta_add").style.display = "block";
        document.querySelector("#dta_mod").style.display = "none";
        document.querySelector("#dta_del").style.display = "none";
        document.querySelector("#l_dta_fcha_alta").style.display = "none";
        document.querySelector("#dta_fcha_alta").style.display = "none";
    }

    if (accion_formulario == 'modificar') {
        document.querySelector("#dta_add").style.display = "none";
        document.querySelector("#dta_mod").style.display = "block";
        document.querySelector("#dta_del").style.display = "none";

    }
    if (accion_formulario == 'eliminar') {

        lista_label.forEach(item => {

            item.style.display = "none"
            
        });
    
        // MUESTRA TODOS LOS INPUTS
    
        lista_input.forEach(item => {
    
            item.style.display = "none"
            
        });

        document.querySelector("#dta_id").style.display = "block";
        document.querySelector("#l_dta_nombre").style.display = "block";
        document.querySelector("#dta_nombre").style.display = "block";
        document.querySelector("#dta_del").style.display = "block";
        document.querySelector("#l_dta_id").style.display = "block";
        document.querySelector("#dta_add").style.display = "none";
        document.querySelector("#dta_mod").style.display = "none";
        document.querySelector("#dta_del").style.display = "block";
      

        
    }
    fMostrarFormularios("#formulario_deportistas");
}

// MOSTRAR ANUNCIOS

function fMostrarAnuncios(){

    document.querySelector('#filtro_anuncios').value = "";

    let sql = "call Ver_Anuncios()";
    const URL = "assets/php/servidor.php?peticion=EjecutarSelect&sql=" + sql;

    fetch(URL)
    .then((response) => response.json())
    .then((data) => {

        console.log("ANUNCIOS", data);

        let html = "";
        html += `  <tbody>`
        html += `   <tr>`
        html += `    <th>TEXTO</th>`
        html += `    <th>FECHA ALTA</th>`
        html += `    <th>FECHA BAJA</th>`
        html += `    <th>ACCIONES ADMIN</th>`
        html += `   </tr>`

        data.datos.forEach(item => {

           html += `   <tr>`
           html += `      <td>${item.anun_texto}</td>`

            if (item.anun_fecha_alta == null) {
            html += `      <td>  -  -  </td>` 
            } else {
            html += `      <td>${item.anun_fecha_alta}</td>` 
            }
            if (item.anun_fecha_baja == null) {
                html += `      <td>  -  -  </td>` 
                } else {
                html += `      <td>${item.anun_fecha_baja}</td>` 
                }
           html += `       <td class="acciones_admin"><span><i class="fas fa-trash"></i>&nbsp;&nbsp;<i class="fas fa-edit"></i></span></td>`
           html += `   </tr>`
          

        });

        html += `  </tbody>`
        console.log(html)
        document.querySelector("#tabla_anuncios").innerHTML = html;

    })

    .finally(()=>{
        fMostrarModal('#modal_anuncios');
      })
}

// FILTRO DEPORTES

function fMostrarDeportesFiltro(){

    filtro = document.querySelector('#filtro_deportes').value;

    let sql = `call SelectDeportes_Filtro('${filtro}')`;
    const URL = "assets/php/servidor.php?peticion=EjecutarSelect&sql=" + sql;

    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        console.log("DEPORTES", data);

 
        let html = "";
        html += `  <tbody>`
        html += `   <tr>`
        html += `    <th>NOMBRE</th>`
        html += `    <th>FECHA ALTA</th>`
        html += `    <th>FECHA BAJA</th>`
        html += `    <th>ACCIONES ADMIN</th>`
        html += `   </tr>`

        data.datos.forEach(item => {

           html += `   <tr>`
           html += `      <td>${item.dte_nombre}</td>`
           if (item.dte_fecha_alta == null) {
            html += `      <td>  -  -  </td>` 
            } else {
           html += `      <td>${item.dte_fecha_alta}</td>`
            }
            if (item.dte_fecha_baja == null) {
            html += `      <td>  -  -  </td>` 
            } else {
           html += `      <td>${item.dte_fecha_baja}</td>`
            }
           html += `       <td class="acciones_admin"><span><i class="fas fa-trash"></i>&nbsp;&nbsp;<i class="fas fa-edit"></i></span></td>`
           html += `   </tr>`
          

        });

        html += `  </tbody>`
        console.log(html)
        document.querySelector("#tabla_deportes").innerHTML = html;
    })


    .finally(()=>{
      fMostrarModal('#modal_deportes');
    })
}

// FILTRO DEPORTISTAS

function fMostrarDeportistasFiltro(){

    filtro = document.querySelector('#filtro_deportistas').value;

    let sql = `call SelectDeportistas_Filtro('${filtro}')`;
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

// FILTRO ANUNCIOS

function fMostrarAnunciosFiltro(){

    filtro = document.querySelector('#filtro_anuncios').value;

    let sql = `call SelectAnuncios_Filtro('${filtro}')`;
    const URL = "assets/php/servidor.php?peticion=EjecutarSelect&sql=" + sql;

    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        console.log("ANUNCIOS", data);

        let html = "";
        html += `  <tbody>`
        html += `   <tr>`
        html += `    <th>TEXTO</th>`
        html += `    <th>FECHA ALTA</th>`
        html += `    <th>FECHA BAJA</th>`
        html += `    <th>ACCIONES ADMIN</th>`
        html += `   </tr>`

        data.datos.forEach(item => {

           html += `   <tr>`
           html += `      <td>${item.anun_texto}</td>`

            if (item.anun_fecha_alta == null) {
            html += `      <td>  -  -  </td>` 
            } else {
            html += `      <td>${item.anun_fecha_alta}</td>` 
            }
            if (item.anun_fecha_baja == null) {
                html += `      <td>  -  -  </td>` 
                } else {
                html += `      <td>${item.anun_fecha_baja}</td>` 
                }
           html += `       <td class="acciones_admin"><span><i class="fas fa-trash"></i>&nbsp;&nbsp;<i class="fas fa-edit"></i></span></td>`
           html += `   </tr>`
          

        });

        html += `  </tbody>`
        console.log(html)
        document.querySelector("#tabla_anuncios").innerHTML = html;

    })

    .finally(()=>{
        fMostrarModal('#modal_anuncios');
      })
}
