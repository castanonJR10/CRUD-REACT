import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Jquery from 'jquery';

import { FaPencil } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";
export default function EditarUsuario({user, reloadList}) {
    const [formData, setFormData] = useState({
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        password: user.password,
    });

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name] : e.target.value });
    }

    function openEditModal(){
        setFormData({ ...formData, nombre: user.nombre, email: user.email, password: user.password })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({
                title: '¡Alerta!',
                text: '¿Estás seguro de quieres editar al usuario '+ user.nombre +'?',
                html: '<p>¿Estás seguro de quieres editar al usuario <strong>'+ user.nombre +'</strong>?</p>',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: '¡Sí, edítalo!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await axios.post('http://localhost:5002/api/updateUsuario/'+ formData.id, formData);
                    if (response.status === 200) {
                        reloadList();
                        Swal.fire({
                            icon: 'success',
                            title: response.data,
                            showConfirmButton: false,
                            timer: 1500
                        })
                        document.getElementById("closeModal1").click();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: response.data,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            document.getElementById("closeModal1").click();
                        });
                        
                    }
                }
            });           
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al realizar la solicitud:',
                text: error.message,
                showConfirmButton: false,
                timer: 1500
            });
        }
        console.log(formData);
    };

    return (
        <>
        <button className='btn btn-outline-warning' onClick={openEditModal} data-bs-toggle="modal" data-bs-target={`#modal${formData.id}`}><BiEdit/></button>
        <div className="modal" id={`modal${formData.id}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Usuario</h5>
                        <button type="button" id="closeModal1" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form autoComplete='off'>
                            <div className="mb-3">
                                <label for="Name" className="form-label">Nombre</label>
                                <input onChange={handleChange} value={formData.nombre} name='nombre' type="text" className="form-control" id="Name"/>
                            </div>
                            <div className="mb-3">
                                <label for="Email" className="form-label">Correo electrónico</label>
                                <input onChange={handleChange} value={formData.email} name='email' type="email" className="form-control" id="Email" aria-describedby="emailHelp"/>
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