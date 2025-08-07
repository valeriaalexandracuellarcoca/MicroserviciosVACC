document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3000/api/agenda';

    const contactForm = document.getElementById('contactForm');
    const contactIdInput = document.getElementById('contactId');
    const nombresInput = document.getElementById('nombres');
    const apellidosInput = document.getElementById('apellidos');
    const fechaNacimientoInput = document.getElementById('fecha_nacimiento');
    const direccionInput = document.getElementById('direccion');
    const celularInput = document.getElementById('celular');
    const correoInput = document.getElementById('correo');
    const submitBtn = document.getElementById('submitBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const contactTableBody = document.querySelector('#contactTable tbody');

    let editingContactId = null; // Para saber si estamos editando o creando

    // Función para cargar los contactos en la tabla
    const loadContacts = async () => {
        try {
            const response = await fetch(API_URL);
            const contacts = await response.json();
            contactTableBody.innerHTML = ''; // Limpiar tabla
            contacts.forEach(contact => {
                const row = contactTableBody.insertRow();
                row.innerHTML = `
                    <td>${contact.nombres}</td>
                    <td>${contact.apellidos}</td>
                    <td>${contact.fecha_nacimiento ? new Date(contact.fecha_nacimiento).toLocaleDateString() : ''}</td>
                    <td>${contact.direccion || ''}</td>
                    <td>${contact.celular || ''}</td>
                    <td>${contact.correo || ''}</td>
                    <td class="action-buttons">
                        <button class="edit-btn" data-id="${contact.id}">Editar</button>
                        <button class="delete-btn" data-id="${contact.id}">Eliminar</button>
                    </td>
                `;
            });
        } catch (error) {
            console.error('Error al cargar contactos:', error);
            alert('Error al cargar contactos. Asegúrate de que el servidor backend esté funcionando.');
        }
    };

    // Función para limpiar el formulario
    const clearForm = () => {
        contactIdInput.value = '';
        nombresInput.value = '';
        apellidosInput.value = '';
        fechaNacimientoInput.value = '';
        direccionInput.value = '';
        celularInput.value = '';
        correoInput.value = '';
        submitBtn.textContent = 'Guardar Contacto';
        editingContactId = null;
    };

    // Manejar el envío del formulario (Crear/Actualizar)
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const contactData = {
            nombres: nombresInput.value,
            apellidos: apellidosInput.value,
            fecha_nacimiento: fechaNacimientoInput.value || null, // Enviar null si está vacío
            direccion: direccionInput.value || null,
            celular: celularInput.value || null,
            correo: correoInput.value || null
        };

        try {
            let response;
            if (editingContactId) {
                // Actualizar contacto existente
                response = await fetch(`${API_URL}/${editingContactId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(contactData)
                });
            } else {
                // Crear nuevo contacto
                response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(contactData)
                });
            }

            if (response.ok) {
                alert(`Contacto ${editingContactId ? 'actualizado' : 'creado'} exitosamente!`);
                clearForm();
                loadContacts(); // Recargar la lista de contactos
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Algo salió mal'}`);
            }
        } catch (error) {
            console.error('Error al guardar contacto:', error);
            alert('Error al conectar con el servidor. Asegúrate de que el backend esté funcionando.');
        }
    });

    // Manejar clics en la tabla (Editar/Eliminar)
    contactTableBody.addEventListener('click', async (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const id = e.target.dataset.id;
            try {
                const response = await fetch(`${API_URL}/${id}`);
                const contact = await response.json();
                if (contact) {
                    editingContactId = id;
                    contactIdInput.value = contact.id;
                    nombresInput.value = contact.nombres;
                    apellidosInput.value = contact.apellidos;
                    // Formatear la fecha para el input type="date"
                    fechaNacimientoInput.value = contact.fecha_nacimiento ? new Date(contact.fecha_nacimiento).toISOString().split('T')[0] : '';
                    direccionInput.value = contact.direccion;
                    celularInput.value = contact.celular;
                    correoInput.value = contact.correo;
                    submitBtn.textContent = 'Actualizar Contacto';
                }
            } catch (error) {
                console.error('Error al cargar contacto para edición:', error);
                alert('Error al cargar contacto para edición.');
            }
        } else if (e.target.classList.contains('delete-btn')) {
            const id = e.target.dataset.id;
            if (confirm('¿Estás seguro de que quieres eliminar este contacto?')) {
                try {
                    const response = await fetch(`${API_URL}/${id}`, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        alert('Contacto eliminado exitosamente!');
                        loadContacts(); // Recargar la lista
                    } else {
                        const errorData = await response.json();
                        alert(`Error al eliminar: ${errorData.message || 'Algo salió mal'}`);
                    }
                } catch (error) {
                    console.error('Error al eliminar contacto:', error);
                    alert('Error al conectar con el servidor para eliminar.');
                }
            }
        }
    });

    // Manejar el botón de cancelar
    cancelBtn.addEventListener('click', clearForm);

    // Cargar contactos al iniciar la página
    loadContacts();
});
