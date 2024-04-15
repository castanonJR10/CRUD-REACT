import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Jquery from 'jquery';

import { FaUserPlus } from "react-icons/fa6";
export default function AgregarUsuario({reloadList}) {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
     });

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function openModal() {
        Jquery('#Name').val('');
        Jquery('#Email').val('');
        Jquery('#Password').val('');
        document.getElementById("Email").style.backgroundColor = "";
        document.getElementById("Email").style.borderColor = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5002/api/saveUsuario', formData);
            if (response.status === 200) {
                document.getElementById("Email").style.borderColor = "";
                reloadList();
                Swal.fire({
                    icon: response.data.Success,
                    title: response.data.Result,
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    if(response.data.Success){
                        document.getElementById("closeModal").click();
                    } else{
                        document.getElementById("Email").style.borderColor = "red";
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: response.data,
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    document.getElementById("closeModal").click();
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al realizar la solicitud:',
                text: error.message,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <>
        <button className='btn btn-outline-primary px-4' onClick={openModal} data-bs-toggle="modal" data-bs-target="#exampleModal"><FaUserPlus/></button>
        <div className="modal" id='exampleModal' tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar Usuario</h5>
                        <button type="button" id="closeModal" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form autoComplete='off'>
                            <div className="mb-3">
                                <label for="Name" className="form-label">Nombre</label>
                                <input onChange={handleChange} name='nombre' type="text" className="form-control" id="Name"/>
                            </div>
                            <div className="mb-3">
                                <label for="Email" className="form-label">Correo electrónico</label>
                                <input onChange={handleChange} name='email' type="email" className="form-control" id="Email" aria-describedby="emailHelp"/>
                                {/* <div id="emailHelp" className="form-text">Nunca compartiremos su correo electrónico con nadie más.</div> */}
                            </div>
                            <div className="mb-3">
                                <label for="Password" className="form-label">Contraseña</label>
                                <input onChange={handleChange} name='password' type="password" className="form-control" id="Password"/>
                            </div>
                            <div className='mb-3'>
                                <button onClick={(e) => handleSubmit(e)} className="btn btn-primary">Guardar</button>
                            </div>                          
                        </form>
                    </div>
                </div>
            </div>  
        </div>
        </>
    )
}