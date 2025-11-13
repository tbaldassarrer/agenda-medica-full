// ============================
// CONFIG
// ============================

// URL base del backend (.NET)
const API_BASE_URL = "http://localhost:5203"; // cambia el puerto si tu dotnet run usa otro

// Aquí guardaremos las citas que vienen del backend
let citas = [];

// ============================
// CARGA DE DATOS DESDE LA API
// ============================

function cargarCitasDesdeApi() {
  const url = `${API_BASE_URL}/api/citas`;

  $.getJSON(url)
    .done(function (data) {
      console.log("Datos recibidos de la API:", data);

      citas = data; // guardamos directamente

      // Pintamos tabla por primera vez
      renderTabla();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Error al llamar a la API:", textStatus, errorThrown);
      alert("Error al cargar las citas desde el servidor");
    });
}


function renderTabla() {
  const medicoSeleccionado = $("#filtroMedico").val();       // verde / azul / rojo / todos
  const filtroPendientes = $("#filtroPendientes").val();     // pendientes / todos

  const $tbody = $("#tablaCitas"); 
  $tbody.empty();

  const citasFiltradas = citas.filter(cita => {
    const medico = cita.medico;
    const pendiente = cita.pendiente;

    if (medicoSeleccionado !== "todos" && medico !== medicoSeleccionado) {
      return false;
    }
    if (filtroPendientes === "pendientes" && !pendiente) {
      return false;
    }
    return true;
  });

  citasFiltradas.forEach(cita => {
    const rowClass = `medico-${cita.medico}`; 

    const fila = `
      <tr class="${rowClass}">
        <td class="col-pendiente">
          <input
            type="checkbox"
            class="form-check-input chk-pendiente"
            data-id="${cita.id}"
            ${cita.pendiente ? "checked" : ""}
          />
        </td>
        <td class="col-e"></td>
        <td>${cita.fecha}</td>
        <td>${cita.hora}</td>
        <!-- Código clicable -->
        <td>
          <button type="button"
                  class="btn btn-link p-0 btn-detalle"
                  data-id="${cita.id}">
            ${cita.codigo}
          </button>
        </td>
        <!-- Paciente clicable -->
        <td>
          <button type="button"
                  class="btn btn-link p-0 btn-detalle"
                  data-id="${cita.id}">
            ${cita.paciente}
          </button>
        </td>
        <td>${cita.observaciones || ""}</td>
      </tr>
    `;

    $tbody.append(fila);
  });
}



$(document).ready(function () {

  const modalDetalle = new bootstrap.Modal(document.getElementById('detalleCitaModal'));
  cargarCitasDesdeApi();//cargamos datos desde el backend

  $("#filtroMedico, #filtroPendientes").on("change", function () {
    renderTabla();
  });

  $("#tablaAgenda").on("change", ".chk-pendiente", function () {
    const id = parseInt($(this).data("id"), 10);

    const cita = citas.find(c => c.id === id);
    if (cita) {
      cita.pendiente = $(this).is(":checked");
    }

    if ($("#filtroPendientes").val() === "pendientes") {
      renderTabla();
    }
  });

  
  $("#tablaAgenda").on("click", ".btn-detalle", function () {
    const id = parseInt($(this).data("id"), 10);
    const cita = citas.find(c => c.id === id);
    if (!cita) return;

    $("#modalFecha").text(cita.fecha);
    $("#modalHora").text(cita.hora);
    $("#modalCodigo").text(cita.codigo);
    $("#modalPaciente").text(cita.paciente);
    $("#modalObservaciones").text(cita.observaciones || "");
    $("#modalMedico").text(cita.medico);

    modalDetalle.show();
  });
});
