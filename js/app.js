window.onload = function() {
    BotonRegistrar = document.getElementById("BotonRegistrar");
    ingreso = document.getElementById("ingreso");
    registro= document.getElementById("registro");
    txtCorreo= document.getElementById("correoR");
    txtNombre= document.getElementById("nombreR");
    txtContrasena= document.getElementById("contrasenaR");
    txtConfirmacion= document.getElementById("confirmacionR");
    txtFecha= document.getElementById("fechaR");
    botonRegistrar= document.getElementById("botonRegistrar");
    botonIngresar= document.getElementById("botonIngresar");
    txtCorreoI= document.getElementById("correo");
    txtContrasenaI= document.getElementById("contrasena");
    nombreP = document.getElementById("nombreP");
    correoUsuario = document.getElementById("correoUsuario");
    enviarM = document.getElementById("enviarM");
    txtCorreoM= document.getElementById("correoM");
    txtMensajeM= document.getElementById("mensajeM");
    redactar= document.getElementById("redactar");
    camera= document.getElementById("camera");
    photo= document.getElementById("photo");
    mapa= document.getElementById("mapa");
   
   if (localStorage.getItem("login")!=="1") {
       ingreso.style.display="block";
       principal.style.display="none";
       redactar.style.display="none";
       document.getElementById("camara").style.display="none";

   }
   else{
    ingreso.style.display="none";
    principal.style.display="block";
    redactar.style.display="block";
    nombre = localStorage.getItem("nombre");
    correo = localStorage.getItem("correo");
    document.getElementById("nombreP").innerHTML = nombre;
    leerM()
   }
}

botonRegistrar.addEventListener("click",function(){
    ingreso.style.display ="none";
    registro.style.display ="block";
});

BotonRegistrar.addEventListener("click",function(){
    if (txtCorreo.value == ""){
        alert("Debe escribir el correo");
        txtCorreo.classList.add("errorCampo")//Agregar mediante codigo (estilo) de clase en css
        return false;
    }
        else{
        txtCorreo.classList.remove("errorCampo");
        }

    if (txtNombre.value == ""){
            alert("Debe escribir el nombre");
            txtNombre.classList.add("errorCampo")
            return false;
    }
        else{
            txtNombre.classList.remove("errorCampo");
        }
    if (txtContrasena.value == ""){
            alert("Debe escribir contraseña");
            txtContrasena.classList.add("errorCampo")
            return false;
    }
        else{
            txtContrasena.classList.remove("errorCampo");
        }
    
    if (txtConfirmacion.value == ""){
            alert("Debe escribir contraseña");
            txtConfirmacion.classList.add("errorCampo")
            return false;
    }
        else{
            txtConfirmacion.classList.remove("errorCampo");
        }

    if (txtContrasena.value !== txtConfirmacion.value){
                alert("La contraseña y confirmacion no coinciden");
                txtCorreo.classList.add("errorCampo")
                return false;
    }
        else{
                txtConfirmacion.classList.remove("errorCampo")
        }
    
    if (txtFecha.value == ""){
                alert("Debe escribir la fecha");
                txtFecha.classList.add("errorCampo")
                return false;
                    }
        else{
                txtFecha.classList.remove("errorCampo")
        }   

    let datos = new FormData();
    datos.append("correoR", txtCorreo.value);
    datos.append("nombreR", txtNombre.value);
    datos.append("contrasenaR", txtContrasena.value);
    datos.append("fechaR", txtFecha.value);

    fetch("http://tpanrjd.orgfree.com/registro.php", {
        method: 'POST', //*GET, POST,PUT, DELETE, ETC.
        body: datos
    })
    .then (function(response){
        if(response.ok){
            alert("Usuario registrado");
            ingreso.style.display ="block";
            registro.style.display ="none";
        }
        else{
            alert("Ocurrio error al registrar");
            console.log(response);
        }
    })
    .catch(function(err){
            alert("Ocurrio un error --> " + err);
    });
});
botonIngresar.addEventListener("click",function(){
    if (txtCorreoI.value == ""){
        alert("Debe escribir el correo");
        txtCorreoI.classList.add("errorCampo")//Agregar mediante codigo (estilo) de clase en css
        return false;
    }
        else{
        txtCorreoI.classList.remove("errorCampo");
        }

    if (txtContrasenaI.value == ""){
            alert("Debe escribir contraseña");
            txtContrasenaI.classList.add("errorCampo")
            return false;
    }
        else{
            txtContrasenaI.classList.remove("errorCampo");
        }
    let datosI= new FormData();
    datosI. append('correo',txtCorreoI.value);
    datosI. append('contrasena',txtContrasenaI.value);

    fetch("http://tpanrjd.orgfree.com/ingreso.php", {
        method: 'POST', //*GET, POST,PUT, DELETE, ETC.
        body: datosI
    })
    .then(function(response){
        return response.json();
    })
    .then (function(data){
        if(data.fallo == "contrasena"){
            alert("Debe escribir la contraseña correcta");   
        }
        if(data.fallo == "usuario"){
            alert("El correo no esta registrado");
        }
        else{
            nombre = data.nombre;
            correo = data.correo;
            ingreso.style.display = "none";
            principal. style.display= "block";
            nombreP.innerHTML = nombre;
            localStorage.setItem("login", 1);//Es para guardar datos individuales en el mismo dispositivo
            localStorage.setItem("nombre", nombre);
            localStorage.setItem("correo", correo);
            leerM();
        }
    })
    .catch(function(err){
        alert("Ocurrio un error inesperado ");
        console.log(err);
     });
});
function abrirBarra(){
    document.getElementById("barraMenu").style.width="250px";
}
function cerrarBarra(){
    document.getElementById("barraMenu").style.width="0";
}

enviarM.addEventListener("click",function(){
    if (txtCorreoM.value == ""){
        alert("Debe escribir el correo");
        txtCorreoM.classList.add("errorCampo")//Agregar mediante codigo (estilo) de clase en css
        return false;
    }
        else{
        txtCorreoM.classList.remove("errorCampo");
        }

    if (txtMensajeM.value == ""){
            alert("Debe escribir el Mensaje");
            txtMensajeM.classList.add("errorCampo")
            return false;
    }
        else{
            txtMensajeM.classList.remove("errorCampo");
        }
    
    let datos = new FormData();
    datos.append("correoM", txtCorreoM.value);
    datos.append("mensajeM", txtMensajeM.value);
    

    fetch("http://tpanrjd.orgfree.com/guardarMensaje.php", {
        method: 'POST', //*GET, POST,PUT, DELETE, ETC.
        body: datos
    })
    .then (function(response){
        if(response.ok){
            alert("Mensaje registrado");
        }
        else{
            alert("Ocurrio error al registrar");
            console.log(response);
        }
    })
    .catch(function(err){
            alert("Ocurrio un error --> " + err);
    });
});

function leerM(){
    let datosLM = new FormData();
    datosLM.append("correoUsuario", correo);
    
    fetch("http://tpanrjd.orgfree.com/leerMensajes.php", {
        method: 'POST', //*GET, POST,PUT, DELETE, ETC.
        body: datosLM
    })
    .then (function(response){
        return response.json();
        })
    .then (function(dataLM){
       for (let x=0; x< dataLM.length; x++){
           document.getElementById("mensajes").innerHTML =
           document.getElementById("mensajes").innerHTML + dataLM[x].mensaje + "<br>"+
           dataLM[x].fechahora + "<br>";
       } 
    });
}
function mensajes() {
    redactar.style.display = "block";
    document.getElementById("mensajes").style.display = "block";
    document.getElementById("camara").style.display = "none";
    cerrarBarra();
}
function tomarFoto(){
    redactar.style.display = "none";
    document.getElementById("mensajes").style.display = "none";
    document.getElementById("camara").style.display = "block";
    cerrarBarra();
}

document.getElementById("Botonopen").addEventListener("click",function(){
     camera.click();
});
camera.addEventListener("change",function(e){
ruta = URL.createObjectURL(e.target.files[0]);
obtenerLugar()
photo.src= ruta;
if  (obtenerSO() == "iOS"){
    let link = document.createElement('a');//Le agregas un componente adicional
    link.download = "test.png";
    link.href = ruta;
    link.click();
    alert("Foto capturada")
}
});

function obtenerSO() {
    let so = null;
    let platform = window.navigator.platform,
        iosPlatforms = ['iPhone','iPad','iPod'];
    if(iosPlatforms.includes(platform)){
       so ='iOS';
    }
    return so;
}
function obtenerLugar(){
    coordenadas = {lat:0, log:0}
    navigator.geolocation.getCurrentPosition (function(position) {
        coordenadas = {lat: position.coords.latitude, lon: position.coords.longitude}
    fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat="+ coordenadas.lat + "&lon=" + coordenadas.lon)
    .then(response => response.json())
    .then(data =>{ 
    document.getElementById("lugar").value = data.address.country + " " + data.address.state;
    })
    .catch(error =>{
    console.log(error);
    coordenadas = {lat: 0, lon: 0};
    });
  });
}
mapa.addEventListener('click', function(){
    window.open("http://www.openstreetmap.org/?mlat=" + coordenadas.lat + "&mlon=" + coordenadas.lon + "&zoom=20");
});

if('serviceWorker' in navigator){
    window.addEventListener('load',() => {
        navigator.serviceWorker.register('../sw.js').then( () => {
console.log('Service Worker Registered')
        });
    });
}

function cerrarSesion(){
    cerrarBarra();
    localStorage.removeItem("nombre");
    localStorage.removeItem("correo");
    localStorage.removeItem("login", 0);

    redactar.style.display = "none";
    document.getElementById("principal").style.display ="none";
    document.getElementById("mensajes").style.display ="none";
    document.getElementById("camara").style.display ="none";
    document.getElementById("ingreso").style.display ="block";
}