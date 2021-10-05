var boolSolicitud = true;
var boolProducto = false;
var boolPoliza = false;
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

    $('#inputClienteSoli').val('CLI0000000X, ' + localStorage.getItem('nombre'));
    document.getElementById('direccionPSoli').innerHTML = ' ' + localStorage.getItem('direccion');
    document.getElementById('RFCPSoli').innerHTML = ' XXXX00000000XX';

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
        document.getElementById('btnSiguiente').style.display = 'block';
        document.getElementById('btnAtras').style.display = 'none';
        document.getElementById('btnFinalizar').style.display = 'none';
    });

    $('#aProducto').on('click', function () {
        boolSolicitud = false;
        boolProducto = true;
        boolPoliza = false;
        document.getElementById('btnSiguiente').style.display = 'block';
        document.getElementById('btnAtras').style.display = 'block';
        document.getElementById('btnFinalizar').style.display = 'none';
    });

    $('#aPoliza').on('click', function () {
        boolSolicitud = false;
        boolProducto = false;
        boolPoliza = true;
        document.getElementById('btnSiguiente').style.display = 'none';
        document.getElementById('btnAtras').style.display = 'block';
        document.getElementById('btnFinalizar').style.display = 'block';
    });

    $('#btnFinalizar').on('click', function () {
        swalWithBootstrapButtons.fire({
            title: '¡Éxito!',
            icon: 'success',
            text: 'Los campos fueron agregados con éxito.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            location.href = 'SolicitudesEmisionCli';
        })
    });

    $('#btnAtras').on('click', function () {
        if (boolProducto) {
            boolProducto = false;
            boolSolicitud = true;
            $('#tabSoliEmision a[href="#custom-nav-solicitud"]').tab('show');
            document.getElementById('btnAtras').style.display = 'none';
        }
        else {
            boolProducto = true;
            boolPoliza = false;
            $('#tabSoliEmision a[href="#custom-nav-producto"]').tab('show');
            document.getElementById('btnSiguiente').style.display = 'block';
            document.getElementById('btnFinalizar').style.display = 'none';
        }
    });

    $('#btnSiguiente').on('click', function () {
        if (boolSolicitud) {
            boolSolicitud = false;
            boolProducto = true;
            $('#tabSoliEmision a[href="#custom-nav-producto"]').tab('show');
            document.getElementById('btnAtras').style.display = 'block';
        }
        else {
            boolProducto = false;
            boolPoliza = true;
            $('#tabSoliEmision a[href="#custom-nav-poliza"]').tab('show');
            document.getElementById('btnSiguiente').style.display = 'none';
            document.getElementById('btnFinalizar').style.display = 'block';
        }
    });


});

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