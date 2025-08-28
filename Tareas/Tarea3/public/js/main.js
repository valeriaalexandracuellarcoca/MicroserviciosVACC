document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = '/api/agenda';
    const contactForm = document.getElementById('contact-form');
    const contactsList = document.getElementById('contacts-list');
    const contactIdInput = document.getElementById('contact-id');

    // Función para obtener y mostrar los contactos
    const fetchContacts = async () => {
        try {
            const response = await fetch(apiUrl);
            const contacts = await response.json();
            contactsList.innerHTML = ''; // Limpiar lista
            contacts.forEach(contact => {
                const contactCard = document.createElement('div');
                contactCard.className = 'contact-card';
                contactCard.innerHTML = `
                    <p><strong>Nombre:</strong> ${contact.nombres} ${contact.apellidos}</p>
                    <p><strong>Nacimiento:</strong> ${contact.fecha_nacimiento || 'N/A'}</p>
                    <p><strong>Dirección:</strong> ${contact.direccion || 'N/A'}</p>
                    <p><strong>Celular:</strong> ${contact.celular || 'N/A'}</p>
                    <p><strong>Correo:</strong> ${contact.correo || 'N/A'}</p>
                    <div class="contact-actions">
                        <button class="edit-btn" data-id="${contact._id}">Editar</button>
                        <button class="delete-btn" data-id="${contact._id}">Eliminar</button>
                    </div>
                `;
                contactsList.appendChild(contactCard);
            });
        } catch (error) {
            console.error('Error al obtener contactos:', error);
        }
    };

    // Manejar envío del formulario (Crear y Actualizar)
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = contactIdInput.value;
        const contactData = {
            nombres: document.getElementById('nombres').value,
            apellidos: document.getElementById('apellidos').value,
            fecha_nacimiento: document.getElementById('fecha_nacimiento').value,
            direccion: document.getElementById('direccion').value,
            celular: document.getElementById('celular').value,
            correo: document.getElementById('correo').value,
        };

        const method = id ? 'PUT' : 'POST';
        const url = id ? `${apiUrl}/${id}` : apiUrl;

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactData)
            });

            if (response.ok) {
                contactForm.reset();
                contactIdInput.value = '';
                fetchContacts();
            } else {
                const errorData = await response.json();
                console.error('Error al guardar contacto:', errorData.message);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    });

    // Manejar botones de Editar y Eliminar
    contactsList.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        if (e.target.classList.contains('delete-btn')) {
            if (confirm('¿Estás seguro de que quieres eliminar este contacto?')) {
                try {
                    const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
                    if (response.ok) {
                        fetchContacts();
                    } else {
                        console.error('Error al eliminar contacto');
                    }
                } catch (error) {
                    console.error('Error de red:', error);
                }
            }
        } else if (e.target.classList.contains('edit-btn')) {
            try {
                const response = await fetch(`${apiUrl}/${id}`);
                const contact = await response.json();
                document.getElementById('contact-id').value = contact._id;
                document.getElementById('nombres').value = contact.nombres;
                document.getElementById('apellidos').value = contact.apellidos;
                document.getElementById('fecha_nacimiento').value = contact.fecha_nacimiento;
                document.getElementById('direccion').value = contact.direccion;
                document.getElementById('celular').value = contact.celular;
                document.getElementById('correo').value = contact.correo;
                window.scrollTo(0, 0);
            } catch (error) {
                console.error('Error al cargar datos para editar:', error);
            }
        }
    });

    // Carga inicial de contactos
    fetchContacts();
});
