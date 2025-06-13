document.addEventListener('DOMContentLoaded', function() {
    
    const sidebarToggle = document.getElementById('sidebarToggle');
    const wrapper = document.getElementById('wrapper');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            wrapper.classList.toggle('toggled');
        });
    }
    
    // Manejar la selección de archivo
    const fileDropZone = document.getElementById('fileDropZone');
    const fileInput = document.getElementById('archivo');
    const fileDropZoneIcon = document.getElementById('fileDropZoneIcon');
    const fileDropZoneText = document.getElementById('fileDropZoneText');
    const fileDropZoneHint = document.getElementById('fileDropZoneHint');
    const changeFileBtn = document.getElementById('changeFileBtn');
    const fileError = document.getElementById('fileError');
    
    if (fileDropZone) {
        fileDropZone.addEventListener('click', function() {
            fileInput.click();
        });

        fileDropZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = '#0d6efd'; // Color primario de Bootstrap
            this.style.backgroundColor = '#e7f1ff'; // Fondo primario claro
        });
        
        fileDropZone.addEventListener('dragleave', function() {
            this.style.borderColor = '#dee2e6'; // Borde por defecto de Bootstrap
            this.style.backgroundColor = '#f8f9fa'; // Fondo claro de Bootstrap
        });
        
        fileDropZone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#dee2e6';
            this.style.backgroundColor = '#f8f9fa'; // Restablecer estilos
            
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                const event = new Event('change', { bubbles: true });
                fileInput.dispatchEvent(event);
            }
        });
    }
    
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            if (this.files.length > 0) {
                const file = this.files[0];
                const fileName = file.name;
                
                // Validar tamaño (máximo 50MB)
                if (file.size > 50 * 1024 * 1024) {
                    fileError.textContent = 'El archivo excede el límite de 50MB.';
                    fileError.style.display = 'block';
                    this.value = ''; // Limpiar la selección de archivo inválida
                    // Restablecer la interfaz de usuario al estado inicial
                    fileDropZoneIcon.textContent = 'cloud_upload';
                    fileDropZoneIcon.classList.remove('text-success');
                    fileDropZoneText.textContent = 'Haga clic para seleccionar un archivo PDF';
                    fileDropZoneHint.textContent = 'PDF (máx. 50MB)';
                    fileDropZoneHint.classList.remove('text-success', 'text-danger');
                    changeFileBtn.style.display = 'none'; // Ocultar botón de cambiar
                    return;
                }
                // Actualizar la interfaz de usuario para el archivo seleccionado
                fileDropZoneIcon.textContent = 'description'; 
                fileDropZoneIcon.classList.add('text-success');
                fileDropZoneText.textContent = fileName;
                fileDropZoneHint.textContent = 'Archivo seleccionado';
                fileDropZoneHint.classList.add('text-success');
                fileDropZoneHint.classList.remove('text-danger');
                changeFileBtn.style.display = 'inline-block'; // Mostrar el botón
                fileError.style.display = 'none'; // Ocultar mensaje de error
            } else {
                
                fileDropZoneIcon.textContent = 'cloud_upload';
                fileDropZoneIcon.classList.remove('text-success');
                fileDropZoneText.textContent = 'Haga clic para seleccionar un archivo PDF';
                fileDropZoneHint.textContent = 'PDF (máx. 50MB)';
                fileDropZoneHint.classList.remove('text-success', 'text-danger');
                changeFileBtn.style.display = 'none';
                fileError.style.display = 'none'; // Limpiar cualquier mensaje de error previo
            }
        });
    }

    if (changeFileBtn) {
        changeFileBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevenir el clic en fileDropZone si también está escuchando
            if(fileInput) fileInput.click();
        });
    }
    
    // Validación de formulario
    const form = document.getElementById('uploadForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isFileValid = true;
            if (fileInput && !fileInput.files.length) {
                fileError.textContent = 'Por favor, seleccione un archivo PDF.';
                fileError.style.display = 'block';
                fileDropZoneHint.classList.add('text-danger'); // Indicar visualmente el error en la pista
                isFileValid = false;
            } else if (fileInput && fileInput.files.length > 0 && fileInput.files[0].size > 50 * 1024 * 1024) {
                fileError.textContent = 'El archivo excede el límite de 50MB.';
                fileError.style.display = 'block';
                fileDropZoneHint.classList.add('text-danger'); // Indicar visualmente el error
                isFileValid = false;
            } else {
                fileError.style.display = 'none';
                fileDropZoneHint.classList.remove('text-danger');
            }

            if (!form.checkValidity() || !isFileValid) {
                e.stopPropagation();
                form.classList.add('was-validated');
            } else {
                // Simular envío exitoso
                alert('¡Tesis enviada correctamente!');
                form.reset(); // Esto limpia todos los campos del formulario, incluido el input de archivo
                form.classList.remove('was-validated');
                
                
                if (fileInput) {
                    const changeEvent = new Event('change', { bubbles: true });
                    fileInput.dispatchEvent(changeEvent);
                }
                // Asegurarse de que el error de archivo esté oculto y la pista no esté en rojo
                fileError.style.display = 'none';
                fileDropZoneHint.classList.remove('text-danger');
            }
        });
    }
    
    // Cerrar sesión
    const logoutBtns = document.querySelectorAll('#logoutBtn, #logoutBtnTop');
    
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('¿Está seguro que desea cerrar sesión?')) {
                alert('Sesión cerrada correctamente');
                
                window.location.href = '#';
            }
        });
    });
});