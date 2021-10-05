var boolSolicitud = true;
var boolProducto = false;
var boolPoliza = false;
var boolAutorizacion = false;
var filasTablaVolumn = 0;
var total_cantidades = 0;

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
})

jQuery(document).ready(function ($) {

    $("#popoverExampleTwo").popover({
        html: true,
        placement: 'bottom',
        sanitize: false,
        title: function () {
            return $('#popoverExampleTwoHiddenTitle').html();
        },
        content: function () {
            return $('#popoverExampleTwoHiddenContent').html();
        }
    });

    $(document).on("click", ".popover .close", function () {
        $(this).parents(".popover").popover('hide');
    });

    $('#inputClienteSoli').val('CLI0000000X, Sofía Hernández');
    document.getElementById('direccionPSoli').innerHTML = ' AV. MIGUEL HIDALGO COL. CENTRO';
    document.getElementById('RFCPSoli').innerHTML = ' HESD150475DI4';

    if (localStorage.getItem('correo') == 'correo_almacenadora@ejemplo.com') {
        document.getElementById('aAutorizacion').style.display = 'block';
        document.getElementById('custom-nav-autorizacion').style.display = 'none';
    }

    $(document).on('click', '#borrarFilaTabla', function (event) {
        event.preventDefault();
        $(this).closest('tr').remove();
        filasTablaVolumn--;
        sumarCantidades();
    });

    $('#aSolicitud').on('click', function () {
        boolSolicitud = true;
        boolProducto = false;
        boolPoliza = false;
        boolAutorizacion = false;
        document.getElementById('btnSiguiente').style.display = 'block';
        document.getElementById('btnAtras').style.display = 'none';
        if (localStorage.getItem('correo') == 'correo_almacenadora@ejemplo.com') {
            document.getElementById('btnAutorizar').style.display = 'none';
            document.getElementById('btnRechazar').style.display = 'none';
            document.getElementById('custom-nav-autorizacion').style.display = 'none';
        }
    });

    $('#aProducto').on('click', function () {
        boolSolicitud = false;
        boolProducto = true;
        boolPoliza = false;
        boolAutorizacion = false;
        document.getElementById('btnSiguiente').style.display = 'block';
        document.getElementById('btnAtras').style.display = 'block';
        if (localStorage.getItem('correo') == 'correo_almacenadora@ejemplo.com') {
            document.getElementById('btnAutorizar').style.display = 'none';
            document.getElementById('btnRechazar').style.display = 'none';
            document.getElementById('custom-nav-autorizacion').style.display = 'none';
        }
    });

    $('#aPoliza').on('click', function () {
        boolSolicitud = false;
        boolProducto = false;
        boolPoliza = true;
        boolAutorizacion = false;
        document.getElementById('btnAtras').style.display = 'block';
        if (localStorage.getItem('correo') == 'correo_almacenadora@ejemplo.com') {
            document.getElementById('btnAutorizar').style.display = 'none';
            document.getElementById('btnRechazar').style.display = 'none';
            document.getElementById('btnSiguiente').style.display = 'block';
            document.getElementById('custom-nav-autorizacion').style.display = 'none';
        }
        else {
            document.getElementById('btnSiguiente').style.display = 'none';
        }
    });

    $('#aAutorizacion').on('click', function () {
        boolSolicitud = false;
        boolProducto = false;
        boolPoliza = false;
        boolAutorizacion = true;
        document.getElementById('btnSiguiente').style.display = 'none';
        document.getElementById('btnAtras').style.display = 'block';
        if (localStorage.getItem('correo') == 'correo_almacenadora@ejemplo.com') {
            document.getElementById('btnAutorizar').style.display = 'block';
            document.getElementById('btnRechazar').style.display = 'block';
            document.getElementById('custom-nav-autorizacion').style.display = 'block';
        }
    });

    $('#btnFinalizar').on('click', function () {
        if (localStorage.getItem('correo') == 'correo_cliente@ejemplo.com') {
            location.href = 'SolicitudesEmisionCli';
        }
        else {
            location.href = 'SolicitudesEmisionAlm';
        }
    });

    $('#btnAutorizar').on('click', function () {
        swalWithBootstrapButtons.fire({
            title: '¡Éxito!',
            icon: 'success',
            text: 'La solicitud de emisión fue autorizada.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            location.href = 'SolicitudesEmisionAlm';
        })
    });

    $('#btnRechazar').on('click', function () {
        $('#mediumModal').modal('show');
    });

    $('#btnMotivoRechazar').on('click', function () {
        swalWithBootstrapButtons.fire({
            title: '¡Éxito!',
            icon: 'success',
            text: 'La solicitud de emisión fue rechazada.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            location.href = 'SolicitudesEmisionAlm';
        })
    });

    $('#btnAtras').on('click', function () {
        if (boolProducto) {
            boolProducto = false;
            boolSolicitud = true;
            $('#tabSoliEmision a[href="#custom-nav-solicitud"]').tab('show');
            document.getElementById('btnAtras').style.display = 'none';
        }
        else if (boolPoliza) {
            boolProducto = true;
            boolPoliza = false;
            $('#tabSoliEmision a[href="#custom-nav-producto"]').tab('show');
            if (localStorage.getItem('correo') == 'correo_cliente@ejemplo.com')
                document.getElementById('btnSiguiente').style.display = 'block';
        }
        else {
            boolPoliza = true;
            boolAutorizacion = false;
            $('#tabSoliEmision a[href="#custom-nav-poliza"]').tab('show');
            document.getElementById('btnSiguiente').style.display = 'block';
            if (localStorage.getItem('correo') == 'correo_almacenadora@ejemplo.com') {
                document.getElementById('btnAutorizar').style.display = 'none';
                document.getElementById('btnRechazar').style.display = 'none';
                document.getElementById('custom-nav-autorizacion').style.display = 'none';
            }
        }
    });

    $('#btnSiguiente').on('click', function () {
        if (boolSolicitud) {
            boolSolicitud = false;
            boolProducto = true;
            $('#tabSoliEmision a[href="#custom-nav-producto"]').tab('show');
            document.getElementById('btnAtras').style.display = 'block';
        }
        else if (boolProducto) {
            boolProducto = false;
            boolPoliza = true;
            $('#tabSoliEmision a[href="#custom-nav-poliza"]').tab('show');
            if (localStorage.getItem('correo') == 'correo_cliente@ejemplo.com')
                document.getElementById('btnSiguiente').style.display = 'none';
        }
        else {
            if (localStorage.getItem('correo') == 'correo_almacenadora@ejemplo.com') {
                boolPoliza = false;
                boolAutorizacion = true;
                $('#tabSoliEmision a[href="#custom-nav-autorizacion"]').tab('show');
                document.getElementById('btnSiguiente').style.display = 'none';
                document.getElementById('btnAutorizar').style.display = 'block';
                document.getElementById('btnRechazar').style.display = 'block';
                document.getElementById('custom-nav-autorizacion').style.display = 'block';
            }
        }
    });


});

function verDatoGeneral() {
    location.href = '/Files/PDFs/SolicitudesEmision/Solicitud_emisión_banorte.pdf';
}

function sumarCantidades() {
    total_cantidades = 0;
    jQuery('#tablaBodyVolumenCert').find('tr').each(function (i, el) {
        total_cantidades += parseFloat(jQuery(this).find('td').eq(0).text());
    });
}

function addTabla() {
    const tableRef = document.getElementById('tablaBodyVolumenCert');
    let inputDivCEDEPro = document.getElementById('inputDivCEDEPro');
    let inputVolPro = document.getElementById('inputVolPro');
    let inputNoCEDEPro = document.getElementById('inputNoCEDEPro');
    let selectUnidadesPro = document.getElementById('selectUnidadesPro');

    if (inputVolPro.value == "") {
        swalWithBootstrapButtons.fire({
            title: '¡Información!',
            icon: 'info',
            text: 'Debe llenar el campo "Volumen a certificar".',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    if (selectUnidadesPro.value < 1) {
        swalWithBootstrapButtons.fire({
            title: '¡Información!',
            icon: 'info',
            text: 'Debe seleccionar una opción del campo "Unidades".',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    if (inputNoCEDEPro.value == "") {
        swalWithBootstrapButtons.fire({
            title: '¡Información!',
            icon: 'info',
            text: 'Debe llenar el campo "Número de certificados a emitir".',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    if (inputDivCEDEPro.value == "") {
        swalWithBootstrapButtons.fire({
            title: '¡Información!',
            icon: 'info',
            text: 'Debe llenar el campo "Divididos en".',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    if (inputDivCEDEPro.value > inputVolPro.value) {
        swalWithBootstrapButtons.fire({
            title: '¡Información!',
            icon: 'info',
            text: 'El campo "divididos en" no puede ser mayor a "volumen a certificar".',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    if (inputNoCEDEPro.value == filasTablaVolumn) {
        swalWithBootstrapButtons.fire({
            title: '¡Información!',
            icon: 'info',
            text: 'Debe aumentar el valor de "Número de certificados a emitir" para agregar un nuevo valor.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    if ((parseFloat(total_cantidades) + parseFloat(inputDivCEDEPro.value)) > parseFloat(inputVolPro.value)) {
        swalWithBootstrapButtons.fire({
            title: '¡Información!',
            icon: 'info',
            text: 'La suma de las cantidades a agregar no debe superar el volumen a certificar.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    let newRow = tableRef.insertRow(0);
    let Cell1 = newRow.insertCell(0);
    let Cell2 = newRow.insertCell(1);
    let Cell3 = newRow.insertCell(2);

    let newText = document.createTextNode(inputDivCEDEPro.value);
    Cell1.appendChild(newText);

    newText = document.createTextNode(selectUnidadesPro.value);
    Cell2.appendChild(newText);

    Cell3.innerHTML = '<button id="borrarFilaTabla" type="button" class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Dar de baja"><i class="fa fa-trash"></i></button>';
    sumarCantidades();
    filasTablaVolumn++;
}

function enableRadioPol() {
    if (document.getElementById('radioOfiImprePol').checked) {
        document.getElementById('selectOfiImprePol').disabled = false;
        document.getElementById('inputDomPol').disabled = true;
        document.getElementById('divOfiEmiPol').hidden = false;
    }
    else {
        document.getElementById('selectOfiImprePol').disabled = true;
        document.getElementById('divOfiEmiPol').hidden = true;
        document.getElementById('inputDomPol').disabled = false;
    }
}

function enableRadioPro() {
    if (document.getElementById('radioFechaVenPro').checked) {
        document.getElementById('inputFechaVenPro').disabled = false;
        document.getElementById('inputDiaPro').disabled = true;
    }
    else {
        document.getElementById('inputFechaVenPro').disabled = true;
        document.getElementById('inputDiaPro').disabled = false;
    }
}

function showPaisesCombo() {
    if (document.getElementById('selectImpPro').value == 1) {
        document.getElementById('divNoImportado').hidden = true;
        document.getElementById('divImportado').style.display = 'block';
    }
    else {
        document.getElementById('divImportado').style.display = 'none';
        document.getElementById('divNoImportado').hidden = false;
    }
}

function showCedeSust() {
    let divCedeSust = document.getElementById('divCedeSust');

    if (document.getElementById('selectTpSolicitud').value == 2) {
        divCedeSust.style.display = 'block';
    }
    else {
        divCedeSust.style.display = 'none';
    }
}