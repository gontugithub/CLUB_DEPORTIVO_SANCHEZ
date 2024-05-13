// VARIABLES GLOBALES

let id;
let idDeporte;
let dta_id_crud;
let dte_id_crud;


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
        html += `    <th>DEPORTES</th>`
        html += `    <th>FECHA ALTA</th>`
        html += `    <th>FECHA BAJA</th>`
        html += `    <th>ACCIONES ADMIN</th>`
        html += `   </tr>`

        data.datos.forEach(item => {

            html += `   <tr>`
            html += `   <td>${item.dte_nombre}</td>`


            if (item.dte_fecha_baja == null && item.dte_fecha_alta == null) {

                html += `      <td>  -  -  </td>` 
                html += `      <td>  -  -  </td>` 

                html += `       <td class="acciones_admin">
           <span onclick="fPrepararFormDeportes('eliminar', '${item.dte_id}','${item.dte_nombre}','','')">
           <i class="fas fa-trash"></i></span>&nbsp;&nbsp;
           <span onclick="fPrepararFormDeportes('modificar', '${item.dte_id}','${item.dte_nombre}','','')">
           <i class="fas fa-edit"></i></span></td>`

            } else if (item.dte_fecha_baja == null){

                html += `      <td>${item.dte_fecha_alta}</td>`
                html += `      <td>  -  -  </td>` 

                html += `       <td class="acciones_admin">
                <span onclick="fPrepararFormDeportes('eliminar', '${item.dte_id}','${item.dte_nombre}','','${item.dte_fecha_alta}')">
                <i class="fas fa-trash"></i></span>&nbsp;&nbsp;
                <span onclick="fPrepararFormDeportes('modificar', '${item.dte_id}','${item.dte_nombre}','','${item.dte_fecha_alta}')">
                <i class="fas fa-edit"></i></span></td>`
            

            } else if (item.dte_fecha_alta == null){

                html += `      <td>  -  -  </td>` 
                html += `      <td>${item.dte_fecha_baja}</td>`

                html += `       <td class="acciones_admin">
                <span onclick="fPrepararFormDeportes('eliminar', '${item.dte_id}','${item.dte_nombre}','${item.dte_fecha_baja}','')">
                <i class="fas fa-trash"></i></span>&nbsp;&nbsp;
                <span onclick="fPrepararFormDeportes('modificar', '${item.dte_id}','${item.dte_nombre}','${item.dte_fecha_baja}','')">
                <i class="fas fa-edit"></i></span></td>`

            } else{

                html += `      <td>${item.dte_fecha_alta}</td>`
                html += `      <td>${item.dte_fecha_baja}</td>`

                html += `       <td class="acciones_admin">
                <span onclick="fPrepararFormDeportes('eliminar', '${item.dte_id}','${item.dte_nombre}','${item.dte_fecha_baja}','${item.dte_fecha_alta}')">
                <i class="fas fa-trash"></i></span>&nbsp;&nbsp;
                <span onclick="fPrepararFormDeportes('modificar', '${item.dte_id}','${item.dte_nombre}','${item.dte_fecha_baja}','${item.dte_fecha_alta}')">
                <i class="fas fa-edit"></i></span></td>`
            }
           
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

           if(item.dta_fecha_baja == null){
            html += `      <td>  -  -  </td>` 
           } else{
            html += `      <td>${item.dta_fecha_baja}</td>`
           }

            if (item.dta_fecha_baja == null && item.dta_fecha_alta == null) {
            
            html += `       <td class="acciones_admin">
           <span onclick="fPrepararFormDeportistas('eliminar', '${item.dta_id}','${item.dta_nombre}','${item.dta_password}','${item.dta_telefono}', '', '')">
           <i class="fas fa-trash"></i></span>&nbsp;&nbsp;
           <span onclick="fPrepararFormDeportistas('modificar', '${item.dta_id}','${item.dta_nombre}','${item.dta_password}','${item.dta_telefono}', '', '')">
           <i class="fas fa-edit"></i></span></td>`

            } else if (item.dta_fecha_baja == null){

                html += `       <td class="acciones_admin">
           <span onclick="fPrepararFormDeportistas('eliminar', '${item.dta_id}','${item.dta_nombre}','${item.dta_password}','${item.dta_telefono}', '', '${item.dta_fecha_alta}')">
           <i class="fas fa-trash"></i></span>&nbsp;&nbsp;
           <span onclick="fPrepararFormDeportistas('modificar', '${item.dta_id}','${item.dta_nombre}','${item.dta_password}','${item.dta_telefono}', '', '${item.dta_fecha_alta}')">
           <i class="fas fa-edit"></i></span></td>`
            

            } else if (item.dta_fecha_alta == null){

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

    // GUARDAMOS EL ID EN LA VARIABLE

    dta_id_crud = dta_id;

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


function fPrepararFormDeportes(accion_formulario, dte_id, dte_nombre, dte_fcha_baja, dte_fcha_alta) {

    console.log(dte_fcha_baja)
    console.log(dte_fcha_alta)

    let lista_label = document.querySelectorAll("#formulario_deportes > label");
    let lista_input = document.querySelectorAll("#formulario_deportes > input");

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
    document.querySelector("#l_dte_id").style.display = "none";
    document.querySelector("#dte_id").style.display = "none";
    document.querySelector("#dte_id").value = dte_id;

    dte_id_crud = dte_id;


    // SI HUBIERA DADO ERROR VACIAMOS EL MENSJAE DE ERROR ANTERIOR
    document.querySelector("#dte_error").innerHTML = " ";


    //RELLENAMOS LOS CAMPOS CON LOS VALORES
    document.querySelector("#dte_nombre").value = dte_nombre;
    document.querySelector("#dte_fcha_baja").value = dte_fcha_baja;
    document.querySelector("#dte_fcha_alta").value = dte_fcha_alta;
   
    //Analizar el para_que

    if (accion_formulario == 'insertar') {
        document.querySelector("#dte_add").style.display = "block";
        document.querySelector("#dte_mod").style.display = "none";
        document.querySelector("#dte_del").style.display = "none";
        document.querySelector("#l_dte_fcha_alta").style.display = "none";
        document.querySelector("#dte_fcha_alta").style.display = "none";
    }

    if (accion_formulario == 'modificar') {
        document.querySelector("#dte_add").style.display = "none";
        document.querySelector("#dte_mod").style.display = "block";
        document.querySelector("#dte_del").style.display = "none";

    }
    if (accion_formulario == 'eliminar') {

        lista_label.forEach(item => {

            item.style.display = "none"
            
        });
    
        // MUESTRA TODOS LOS INPUTS
    
        lista_input.forEach(item => {
    
            item.style.display = "none"
            
        });

        document.querySelector("#dte_id").style.display = "block";
        document.querySelector("#dte_nombre").style.display = "block";
        document.querySelector("#l_dte_nombre").style.display = "block";
        document.querySelector("#l_dte_id").style.display = "block";
        document.querySelector("#dte_add").style.display = "none";
        document.querySelector("#dte_mod").style.display = "none";
        document.querySelector("#dte_del").style.display = "block";
      

        
    }
    fMostrarFormularios("#formulario_deportes");
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

/////////////// DEPORTISTAS ///////////////

// BORRAR DEPORTISTAS

function fBorrarDeportistas(){
    console.log("ID PARA BORRAR:", dta_id_crud);

    let sql = `call Borrar_Deportistas('${dta_id_crud}')`;
    const URL = "assets/php/servidor.php?peticion=EjecutarUpdateDelete&sql=" + sql;

    //Debemos de pedirsela al servidor
            
        fetch(URL)
        .then((response) => response.json())
        .then((data) => {
  
          
      })
      
      .finally(()=>{
  
        fMostrarDeportistas();
      })
}

// MODIFICAR DEPORTISTAS


function fModificarDeportistas(){

    console.log("ID PARA MODIFICAR:", dta_id_crud);


    // RECOGEMOS LOS DATOS

    let nombre = document.querySelector('#dta_nombre').value;
    let password = document.querySelector('#dta_password').value;
    let telefono = document.querySelector('#dta_telefono').value;
    let fecha_alta = document.querySelector('#dta_fcha_alta').value;
    let fecha_baja = document.querySelector('#dta_fcha_baja').value;

    
    let sql = `call Modificar_Deportistas('${dta_id_crud}','${nombre}','${password}','${telefono}','${fecha_alta}','${fecha_baja}')`;
    const URL = "assets/php/servidor.php?peticion=EjecutarUpdateDelete&sql=" + sql;

    //Debemos de pedirsela al servidor
            
        fetch(URL)
        .then((response) => response.json())
        .then((data) => {
  
      })
      
      .finally(()=>{

        fMostrarDeportistas();
      })


}

// INSERTAR DEPORTISTAS

function fInsertarDeportistas(){

    // RECOGEMOS EL TITULAR Y EL NIF

    let nombre_insert = document.querySelector('#dta_nombre').value;
    let password_insert = document.querySelector('#dta_password').value;
    let telefono_insert = document.querySelector('#dta_telefono').value;
    let fecha_baja_insert = document.querySelector('#dta_fcha_baja').value;

    
    let sql = `call Insertar_Deportistas('${nombre_insert}','${password_insert}','${telefono_insert}','${fecha_baja_insert}')`;
    const URL = "assets/php/servidor.php?peticion=EjecutarInsert&sql=" + sql;

    //Debemos de pedirsela al servidor
            
        fetch(URL)
        .then((response) => response.json())
        .then((data) => {
  
          
      })
      
      .finally(()=>{
       document.querySelector('#dta_nombre').value="";
       document.querySelector('#dta_password').value="";
       document.querySelector('#dta_telefono').value="";
       document.querySelector('#dta_fcha_baja').value="";

       fMostrarDeportistas();

      })


}

/////////////// DEPORTES ///////////////


// BORRAR DEPORTES

function fBorrarDeportes(){
    console.log("ID DEPORTES PARA BORRAR:", dte_id_crud);

    let sql = `call Borrar_Deportes('${dte_id_crud}')`;
    const URL = "assets/php/servidor.php?peticion=EjecutarUpdateDelete&sql=" + sql;

    //Debemos de pedirsela al servidor
            
        fetch(URL)
        .then((response) => response.json())
        .then((data) => {
  
          
      })
      
      .finally(()=>{
  
        fMostrarDeportes();
      })
}

// MODIFICAR DEPORTES


function fModificarDeportes(){

    console.log("ID DEPORTES PARA MODIFICAR:", dte_id_crud);


    // RECOGEMOS LOS DATOS

    let nombre = document.querySelector('#dte_nombre').value;
    let fecha_alta_D = document.querySelector('#dte_fcha_alta').value;
    let fecha_baja_D = document.querySelector('#dte_fcha_baja').value;

    
    let sql = `call Modificar_Deportes('${dte_id_crud}','${nombre}','${fecha_alta_D}','${fecha_baja_D}')`;
    const URL = "assets/php/servidor.php?peticion=EjecutarUpdateDelete&sql=" + sql;

    //Debemos de pedirsela al servidor
            
        fetch(URL)
        .then((response) => response.json())
        .then((data) => {
  
      })
      
      .finally(()=>{

        fMostrarDeportes();

      })


}

// INSERTAR DEPORTES

function fInsertarDeportes(){

    let nombre = document.querySelector('#dte_nombre').value;
    let fecha_baja = document.querySelector('#dte_fcha_baja').value;

    
    let sql = `call Insertar_Deportes('${nombre}','${fecha_baja}')`;
    const URL = "assets/php/servidor.php?peticion=EjecutarInsert&sql=" + sql;

    //Debemos de pedirsela al servidor
            
        fetch(URL)
        .then((response) => response.json())
        .then((data) => {
  
          
      })
      
      .finally(()=>{

        document.querySelector('#dte_nombre').value="";
        document.querySelector('#dte_fcha_baja').value="";


       fMostrarDeportes();

      })


}

/////////////// ANUNCIOS ///////////////

// BORRAR ANUNCIOS

function fBorrarDeportes(){
    console.log("ID ANUNCIOS PARA BORRAR:", anun_id_crud);

    let sql = `call Borrar_Anuncios('${anun_id_crud}')`;
    const URL = "assets/php/servidor.php?peticion=EjecutarUpdateDelete&sql=" + sql;

    //Debemos de pedirsela al servidor
            
        fetch(URL)
        .then((response) => response.json())
        .then((data) => {
  
          
      })
      
      .finally(()=>{
  
        fMostrarAnuncios();
      })
}

// MODIFICAR ANUNCIOS


function fModificarAnuncios(){

    console.log("ID ANUNCIOS PARA MODIFICAR:", anun_id_crud);


    // RECOGEMOS LOS DATOS

    let texto = document.querySelector('#anun_texto').value;
    let fecha_alta = document.querySelector('#anun_fcha_alta').value;
    let fecha_baja = document.querySelector('#anun_fcha_baja').value;

    
    let sql = `call Modificar_Anuncios('${anun_id_crud}','${texto}','${fecha_alta}','${fecha_baja}')`;
    const URL = "assets/php/servidor.php?peticion=EjecutarUpdateDelete&sql=" + sql;

    //Debemos de pedirsela al servidor
            
        fetch(URL)
        .then((response) => response.json())
        .then((data) => {
  
      })
      
      .finally(()=>{

        fMostrarAnuncios();

      })


}

// INSERTAR ANUNCIOS

function fInsertarAnuncios(){

    let texto = document.querySelector('#anun_texto').value;
    let fecha_baja = document.querySelector('#anun_fecha_baja').value;

    
    let sql = `call Insertar_Anuncios('${texto}','${fecha_baja}')`;
    const URL = "assets/php/servidor.php?peticion=EjecutarInsert&sql=" + sql;

    //Debemos de pedirsela al servidor
            
        fetch(URL)
        .then((response) => response.json())
        .then((data) => {
  
          
      })
      
      .finally(()=>{

        document.querySelector('#anun_texto').value="";
        document.querySelector('#anun_fcha_baja').value="";

       fMostrarAnuncios();

      })


}