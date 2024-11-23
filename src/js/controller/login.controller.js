let form = document.getElementById('loginForm');
let formButton = document.getElementById('formButton');

formButton.addEventListener('click', async (event) => {
    if (!form.checkValidity()) {
        event.preventDefault();
    } else {
        event.preventDefault(); // Prevenir la acción predeterminada del botón
        await login();
    }
    form.classList.add('was-validated');
});

const login = async () => {
    let dto = {
        password: document.getElementById('password').value,
        user: document.getElementById('username').value
    };

    try {
        // Configuración de la petición fetch
        const response = await fetch('http://localhost:8080/auth', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dto)
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Credenciales incorrectas. Verifica tu usuario y contraseña.');
            } else {
                throw new Error('Error en la autenticación. Intenta nuevamente.');
            }
        }

        // Transformación a JSON y manipulación de datos
        const data = await response.json();
        localStorage.setItem('token', data.data); // Almacena el token en el almacenamiento local
        console.log(data.data);
        //window.location.replace('http://127.0.0.1:5500/src/view/RAPE/verProyecto.html'); // Redirigir si es exitoso

    } catch (error) {
        // Manejo de errores
        console.error(error.message);
        alert(error.message); // Muestra un mensaje al usuario
    }
};
