window.onload = function () {
    let correo = localStorage.getItem('correo');
    let lista = document.getElementById('liidLista');
    let nombreUsuario = document.getElementById('stroNombre');
    let catUsuario = document.getElementById('stroCategoriaUser');
    let imgUsuario = document.getElementById('imgUsuario');
    if (correo == "correo_cliente@ejemplo.com") {
        nombreUsuario.innerHTML = "Leonardo Hernández Gómez";
        imgUsuario.src = 'images/admin.jpg';
        localStorage.setItem('nombre', "Leonardo Hernández Gómez");
        localStorage.setItem('direccion', "AV. 20 DE NOVIEMBRE NO. 1320 COL. CENTRO");
        catUsuario.innerHTML = "Cliente";
        lista.innerHTML = '<a href="ActasInspeccionCli"><i class="menu-icon fa fa-puzzle-piece"></i>Actas de inspección</a>' +
            '<a href="SolicitudesEmisionCli"><i class="menu-icon fa fa-id-badge"></i>Solicitudes de emisión</a>' +
            '<a href="ui-buttons.cshtml"><i class="menu-icon fa fa-bars"></i>Solicitudes de disposición de crédito</a>' +
            '<a href="ui-buttons.cshtml"><i class="menu-icon fa fa-id-card-o"></i>Pagares</a>' +
            '<a href="ui-buttons.cshtml"><i class="menu-icon fa fa-exclamation-triangle"></i>Bonos de prenda</a>' +
            '<a href="ui-buttons.cshtml"><i class="menu-icon fa fa-spinner"></i>Pagos</a>' +
            '<a href="ui-buttons.cshtml"><i class="menu-icon fa fa-fire"></i>Solicitudes de liberación</a>';
    }
    if (correo == "correo_almacenadora@ejemplo.com") {
        nombreUsuario.innerHTML = "Camila Fernández Méndez";
        imgUsuario.src = 'images/avatar/5.jpg';
        localStorage.setItem('nombre', "Camila Fernández Méndez");
        localStorage.setItem('direccion', "CALLE OCAMPO NO. 254	COL.CENTRO");
        catUsuario.innerHTML = "Almacenadora";
        lista.innerHTML = '<a href="Clientes"><i class="menu-icon fa fa-table"></i>Clientes</a>' +
            '<a href="ActasInspeccionAlm"><i class="menu-icon fa fa-table"></i>Actas de inspección</a>' +
            '<a href="SolicitudesEmisionAlm"><i class="menu-icon fa fa-table"></i>Solicitudes de emisión</a>' +
            '<a href="tables-data.cshtml"><i class="menu-icon fa fa-table"></i>Certificados de depósito</a>' +
            '<a href="tables-data.cshtml"><i class="menu-icon fa fa-table"></i>Pagos</a>' +
            '<a href="tables-data.cshtml"><i class="menu-icon fa fa-table"></i>Solicitudes de liberación</a>';
    }
    if (correo == "correo_banco@ejemplo.com") {
        nombreUsuario.innerHTML = "José Maria Morales Pérez";
        imgUsuario.src = 'images/avatar/64-1.jpg';
        localStorage.setItem('nombre', "José Maria Morales Pérez");
        localStorage.setItem('direccion', "PROL.5 DE MAYO NO.786 COL.5 DE MAYO");
        catUsuario.innerHTML = "Banco";
        lista.innerHTML = '<a href="Clientes"><i class="menu-icon fa fa-th"></i>Clientes</a>' +
            '<a href="forms-advanced.cshtml"><i class="menu-icon fa fa-th"></i>Solicitudes de disposición de crédito</a>' +
            '<a href="forms-advanced.cshtml"><i class="menu-icon fa fa-th"></i>Pagares</a>' +
            '<a href="forms-advanced.cshtml"><i class="menu-icon fa fa-th"></i>Bonos de prenda</a>' +
            '<a href="forms-advanced.cshtml"><i class="menu-icon fa fa-th"></i>Contratos prendarios</a>' +
            '<a href="forms-advanced.cshtml"><i class="menu-icon fa fa-th"></i>Pagos</a>';
    }

}