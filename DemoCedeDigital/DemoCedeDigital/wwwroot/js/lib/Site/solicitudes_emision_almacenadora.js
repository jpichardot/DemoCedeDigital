var auxBotonFiltro = 0;
var minDate, maxDate;

jQuery(document).ready(function ($) {
    $('.btn-secondary').on('click', function () {
        $('#mediumModal').modal('show');
    })

    minDate = new DateTime($('#inputFechaInicio'), {
        format: 'dd-mm-YYYY'
    });
    maxDate = new DateTime($('#inputFechaFin'), {
        format: 'dd-mm-YYYY'
    });

    var table = $('#datatableExample').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.11/i18n/Spanish.json"
        },
    });

    $.fn.dataTableExt.afnFiltering.push(
        function (oSettings, aData, iDataIndex) {
            var iFini = document.getElementById('inputFechaInicio').value;
            var iFfin = document.getElementById('inputFechaFin').value;
            var iStartDateCol = 8;
            var iEndDateCol = 8;

            iFini = iFini.substring(0, 4) + iFini.substring(5, 7) + iFini.substring(8, 10);
            iFfin = iFfin.substring(0, 4) + iFfin.substring(5, 7) + iFfin.substring(8, 10);

            console.log(iFini);

            var datofini = aData[iStartDateCol].substring(6, 10) + aData[iStartDateCol].substring(3, 5) + aData[iStartDateCol].substring(0, 2);
            var datoffin = aData[iEndDateCol].substring(6, 10) + aData[iEndDateCol].substring(3, 5) + aData[iEndDateCol].substring(0, 2);

            if (iFini === "" && iFfin === "") {
                return true;
            }
            else if (iFini <= datofini && iFfin === "") {
                return true;
            }
            else if (iFfin >= datoffin && iFini === "") {
                return true;
            }
            else if (iFini <= datofini && iFfin >= datoffin) {
                return true;
            }
            return false;
        }
    );

    $('#inputAlmacenadora').on('keyup', function () {
        table
            .columns(1)
            .search(this.value)
            .draw();
    });

    $('#inputCliente').on('keyup', function () {
        table
            .columns(2)
            .search(this.value)
            .draw();
    });

    $('#selectEstatus').on('change', function () {
        if (this.value != 0) {
            table
                .columns(7)
                .search(this.value)
                .draw();
        }
        else {
            table
                .columns(7)
                .search('')
                .draw();
        }
    });

    $('#inputFechaInicio').on('change', function () {
        table.draw();
    });

    $('#inputFechaFin').on('change', function () {
        table.draw();
    });
});

function showFiltros() {
    auxBotonFiltro++;
    if (auxBotonFiltro % 2 == 0) {
        document.getElementById('divFiltros').style.display = 'none';
    }
    else {
        document.getElementById('divFiltros').style.display = 'block';
    }
}