    const URL = 'http://localhost:8080';
    const token = localStorage.getItem('token');

    let employeeList = {};
    let employee = {};
    let roleList = [];
    


    const findAllEmployees = async() => {
        console.log(token);
        await fetch(`${URL}/api/employee`, {
            method: 'GET',
            headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json",
            "Accept": "application/json"
            
        }
            
        }).then(response => response.json()).then(response => {
            console.log(response);
            employeeList = response.data;
        }).catch(console.log);
    }

    const loadTable = async () =>{
        await findAllEmployees();
        let tbody = document.getElementById('tbody');
        let content = '';
        employeeList.forEach((item, index) => {
            content += `<tr>
                            <th scope="row">${index+1}</th>
                            <td>${item.name}</td>
                            <td>${item.surname}</td>
                            <td>${item.lastname ==null? "null": item.lastname}</td>
                            <td>${item.email}</td>
                            <td>${item.status ? "Ocupado":"Libre"}</td>
                            <td class="text-center">
                                <button class="btn btn-outline-warning" onclick = "loadEmployee(${item.id_Employee})" data-bs-target="#updateModal" data-bs-toggle="modal"><i class="bi bi-pencil-square"></i></button>
                                <button class="btn btn-outline-danger" onclick = "findEmployeeById(${item.id_Employee})" data-bs-target="#deleteModal" data-bs-toggle="modal"><i class="bi bi-trash-fill"></i></button>
                            </td>
                        </tr>`
        });
        tbody.innerHTML = content;
    }

    (async () =>{
        await loadTable();
    })()


    /*const findEmployeeById = async id =>{
        await fetch(`${URL}/api/employee/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
            
        }).then(response => response.json()).then(response => {
            console.log(response);
            employee = response.data;
        }).catch(console.log);   
    }


    const findAllRoles = async  () => {
        await fetch(`${URL}/api/rol`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
            
        }).then(response => response.json()).then(response => {
            console.log(response);
            roleList = response.data;
        }).catch(console.log);
    }

    const loadData = async () => {
        await findAllRoles();
        let roleSelect = document.getElementById("roleList");
        let content = '';
        roleSelect.innerHTML = '';
    
        if(roleList.length === 0){
            content += `<option>No hay roles disponibles</option>`;
        } else {
            roleList
                .filter(item => item.name !== "ROLE_MASTER") 
                .forEach(item => {
                    const displayName = item.name.replace("ROLE_", "");
                    content += `<option value="${item.id}">${displayName}</option>`;
                });
        }
        roleSelect.innerHTML = content;
    }
    

    const saveEmployee = async () => {
        let form = document.getElementById("saveForm")
        employee = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            name: document.getElementById('name').value,
            surname: document.getElementById('surname').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            rol:{
                id: parseInt(document.getElementById('roleList').value)
            }
        };

        await fetch(`${URL}/api/employee`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(employee)
        }).then(response => response.json()).then(async response=>{
            console.log(response);
            employee = {};
            await loadTable();
            form.reset();
        }).catch(console.log);   
    }


    const loadEmployee = async id =>{
        await findEmployeeById(id);
        document.getElementById('id').value=id;
        document.getElementById('u_name').value=employee.name;
        document.getElementById('u_surname').value= employee.surname;
        document.getElementById('u_lastname').value= employee.lastname;
        document.getElementById('u_email').value=employee.email;
    }


    const updateEmployee = async () => {
        let form = document.getElementById("updateForm");
        await loadData();

        let updated = {
            id_Employee:document.getElementById('id').value,
            name: document.getElementById('u_name').value,
            surname: document.getElementById('u_surname').value,
            lastname: document.getElementById('u_lastname').value,
            email: document.getElementById('u_email').value
        };
    
        await fetch(`${URL}/api/employee`,{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            //el objeto de java lo pasa a un string
            body: JSON.stringify(updated)
        }).then(response => response.json()).then(async response=>{
            console.log(response);
            employee = {};
            await loadTable();
            form.reset();
        }).catch(console.log);  
    }


    const deleteEmployee = async () => {
        console.log(employee)
        await fetch(`${URL}/api/employee/${employee.id_Employee}`,{
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
    
        }).then(response => response.json()).then(async response=>{
            console.log(response);
            employee = {};
            await loadTable();
        }).catch(console.log);  
    
    }*/