
function agregarFila(event) {
    event.preventDefault(); // Previene la recarga de la página

    const gustosInput = document.getElementById("gustos");
    const grillaBody = document.querySelector("#grilla tbody");

    const nuevoGusto = gustosInput.value;

    if (nuevoGusto) {
        const newRow = grillaBody.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);

        cell1.innerHTML = nuevoGusto;
        cell2.innerHTML = '<input type="int" name="porcentaje" value="" size="5" maxlength="5" disabled />';
        cell3.innerHTML = '<button onclick="editarFila(this)">Editar</button>';

        gustosInput.value = " ";
    }
}

function editarFila(btn) {
    const row = btn.parentElement.parentElement;
    const nombre = row.cells[0];
    const porcentaje = row.cells[1].querySelector('input');

    const oldNombre = nombre.innerHTML;
    const oldPorcentaje = porcentaje.value;

    nombre.innerHTML = `<input type="text" value="${oldNombre}" />`;
    porcentaje.removeAttribute('disabled');
    porcentaje.value = oldPorcentaje; // Asigna el valor del porcentaje al input

    btn.parentElement.innerHTML = 'En edición.';

    mostrarMensajeConBotones(oldNombre, oldPorcentaje, row.rowIndex);
}

function mostrarMensajeConBotones(oldNombre, oldPorcentaje, index) {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.innerHTML = `
        Pulse Aceptar para guardar los cambios, pulse Cancelar para anularlos.
        <button type="button" onclick="guardarCambios()">Aceptar</button>
        <button type="button" onclick="cancelarCambios()">Cancelar</button>
    `;
    mensajeDiv.style.display = 'block';
}

function mostrarMensaje(mensaje) {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = mensaje;
    mensajeDiv.style.display = 'block';
}

function ocultarMensaje() {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.style.display = 'none';
}

function restaurarBotonesEditar() {
    const botonesEditar = document.querySelectorAll('button[onclick^="editarFila"]');
    botonesEditar.forEach(btn => {
        btn.parentElement.innerHTML = '<button type="button" onclick="editarFila(this)">Editar</button>';
    });
}

function guardarCambios() {
    // Recupera los valores del formulario
    const nuevoNombre = document.getElementById("name").value;
    const nuevoEmail = document.getElementById("email").value;
    const nuevoTelefono = document.getElementById("numero").value;
    const nuevoGusto = document.querySelector("#grilla input[type='text']").value;

    // Captura el valor del porcentaje
    const nuevoPorcentaje = document.querySelector("#grilla input[type='int']").value;

    // Crea un objeto JSON con los datos, incluido el porcentaje
    const datosJSON = {
        nombre: nuevoNombre,
        correo: nuevoEmail,
        telefono: nuevoTelefono,
        gusto: nuevoGusto,
        porcentaje: nuevoPorcentaje, // Asegúrate de incluir el porcentaje
    };

    // Redirige a la página "recibido.html" y pasa los datos en formato JSON como parámetro
    const url = `recibido.html?datos=${encodeURIComponent(JSON.stringify(datosJSON))}`;
    window.location.href = url;
}

function cancelarCambios() {
    const table = document.getElementById('grilla');
    while (table.rows.length > 0) {
        table.deleteRow(1);
    }

    ocultarMensaje();
}

document.getElementById("agregarFila").addEventListener("click", agregarFila);

