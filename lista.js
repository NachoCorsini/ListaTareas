let numTarea = 1;
var tareas = [];

function iniciar() {
    let btnAgregar = document.getElementById("btnAgregar");

    btnAgregar.addEventListener("click", agregarTarea);
}

function agregarTarea(event) {
    event.preventDefault();
    let nombre = document.getElementById("txtNombre").value;
    let descripcion = document.getElementById("txtArea").value;
    let tarea = {
        nombre: nombre,
        descripcion: descripcion,
        estado: false,
    };
    tareas.push(tarea); // Agregar tarea al arreglo
    mostrarTabla(); // Actualizar tabla con todas las tareas
    limpiarCampos(); //Limpia los campos del formulario Agregar.
}

function mostrarTabla() {
    let tabla = document.getElementById("tablaTareas");
    tabla.innerHTML = ""; // Limpiar contenido actual de la tabla
    cargarNombresColumnas(); //Carga el nombre de cada columna despues de borrar la tabla.
    for (let i = 0; i < tareas.length; i++) {
        let fila = tabla.insertRow();
        let celdaId = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaDescripcion = fila.insertCell();
        let celdaEstado = fila.insertCell();
        let celdaAcciones = fila.insertCell();

        celdaId.textContent = i + 1;
        celdaNombre.textContent = tareas[i].nombre;
        celdaDescripcion.textContent = tareas[i].descripcion;
        celdaEstado.textContent = tareas[i].estado ? "Completado" : "Pendiente";

        // Crear elemento div para contener los botones
        var divBotones = document.createElement("div");
        divBotones.classList.add("btn-group");

        // Botón "Modificar"
        var btnModificar = document.createElement("button");
        btnModificar.type = "button";
        btnModificar.classList.add("btn", "btn-sm", "btn-primary");
        btnModificar.textContent = "Modificar";

        btnModificar.addEventListener("click", function () {

            console.log("Modificar tarea #" + (i + 1));

            // Obtener la tarea correspondiente al botón "Modificar" 
            var tarea = tareas[i];

            // Mostrar los valores de la tarea en los campos del formulario
            document.getElementById("txtNombre").value = tarea.nombre;
            document.getElementById("txtArea").value = tarea.descripcion;

            // Cambiar el texto y el evento del botón "Agregar"
            var btnAgregar = document.getElementById("btnAgregar");
            btnAgregar.textContent = "Guardar cambios";
            btnAgregar.removeEventListener("click", agregarTarea);
            btnAgregar.addEventListener("click", function modificarTarea() {
                // Guardar los cambios en la tarea original en el arreglo "tareas"
                event.preventDefault();//necesario para que no se envie el formulario y se borrenlos datos de la tabla.
                tarea.nombre = document.getElementById("txtNombre").value;
                tarea.descripcion = document.getElementById("txtArea").value;

                // Actualizar la tabla con la tarea modificada
                mostrarTabla();

                // Restaurar el texto y el evento del botón "Agregar"
                btnAgregar.textContent = "Agregar";

                btnAgregar.removeEventListener("click", modificarTarea); //importante remover el evento.

                btnAgregar.addEventListener("click", agregarTarea);

                // Limpiar los campos del formulario
                limpiarCampos();
            });
        });
        divBotones.appendChild(btnModificar);

        // Botón "Eliminar"
        var btnEliminar = document.createElement("button");
        btnEliminar.type = "button";
        btnEliminar.classList.add("btn", "btn-sm", "btn-danger", "mx-1");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", function () {

            console.log("Eliminar tarea #" + (i + 1));
            eliminarTarea(i);
        });
        divBotones.appendChild(btnEliminar);

        //boton "finalizar"
        var btnFinalizar = document.createElement("button");
        btnFinalizar.type = "button";
        btnFinalizar.classList.add("btn", "btn-sm", "btn-info");
        btnFinalizar.textContent = "Finalizar";
        btnFinalizar.addEventListener("click", function () {
            finalizarTarea(i);
            mostrarTabla();
            console.log("Finalizar  tarea #" + (i + 1));
        });
        if (tareas[i].estado) {
            // Ocultar botón si la tarea está finalizada
            btnFinalizar.style.display = "none";
        }
        divBotones.appendChild(btnFinalizar);

        // Agregar el elemento div con los botones a la celda de acciones
        celdaAcciones.appendChild(divBotones);
    }
}
function cargarNombresColumnas() {
    var tabla = document.getElementById("tablaTareas");
    var fila = tabla.insertRow();
    var celdaId = fila.insertCell();
    var celdaNombre = fila.insertCell();
    var celdaDescripcion = fila.insertCell();
    var celdaEstado = fila.insertCell();
    let celdaAcciones = fila.insertCell();
    celdaId.textContent = "Id";
    celdaNombre.textContent = "Nombre";
    celdaDescripcion.textContent = "Descripcion";
    celdaEstado.textContent = "Estado";
    celdaAcciones.textContent = "Acciones";
}
function limpiarCampos() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtArea").value = "";
}

function eliminarTarea(id) {
    tareas.splice(id, 1); // Eliminar tarea del arreglo
    mostrarTabla(); // Actualizar tabla sin la tarea eliminada
}
function finalizarTarea(id) {
    tareas[id].estado = true; // Marcar tarea como finalizada
    mostrarTabla(); // Actualizar tabla con la tarea finalizada
}

//funciond de tirar estrellitas

document.addEventListener('DOMContentLoaded', function () {
    const confettiIcon = document.querySelector('.confetti-icon');

    confettiIcon.addEventListener('click', function () {
        // Lanza confeti al hacer clic en el icono
        launchConfetti();

        
    });

    function launchConfetti() {
        particlesJS('confetti', {
            particles: {
                number: {
                    value: 100,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#efe93e'
                },
                shape: {
                    type: 'star',

                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 10,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: false,
                    distance: 500,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 2
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'bottom',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            life: {
                duration: {
                    sync: true,
                    value: 3
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: false,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: false,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
        setTimeout(function () {
            stopConfetti();
        }, 2000);
    }
    function stopConfetti() {
        
        var confettiContainer = document.getElementById('confetti');
        if (confettiContainer) {
            confettiContainer.innerHTML = '';
        }
    }


});

//me aseguro que de se ejecute todas las funciones
iniciar();
