function funcIniciarSesion() {
    let strEmail = document.getElementById("inputEmailId").value;
    localStorage.setItem('correo', strEmail);
}