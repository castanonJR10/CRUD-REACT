import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { FaUserPen } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";

export default function CambiarContraseña({user}){
    const [formData, setFormData] = useState({
        id: user.id,
        name: user.name,
        password: '',
    });

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name] : e.target.value });
    }

    function openEditPasswordModal(){
        setFormData({ ...formData, password: '' })
    }

    const editUserPassword = async (e) => {
        e.preventDefault();
        try {   
            //console.log(formData.nombre);
            Swal.fire({
                title: '¡Alerta!',
                text: '¿Estás seguro de que quieres cambiar la contraseña del usuario'+ user.nombre +'?',
                html: '<p>¿Estás seguro de que quieres cambiar la contraseña del usuario <strong>'+ user.nombre +'</strong>?</p>',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: '¡Sí, cámbiala'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await axios.post('http://localhost:5002/api/updatePasswordUsuario/'+ formData.id + '/' + formData.password);
                    if (response.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: response.data,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        console.log("Listo");
                        document.getElementById("closeModal2").click();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: response.data,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        document.getElementById("closeModal2").click();
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
            document.getElementById("closeModal2").click();
        }
    };

    return(
        <>
        <button className="btn btn-outline-secondary" onClick={openEditPasswordModal} data-bs-toggle="modal" data-bs-target={`#modalPassword${formData.id}`}><RiLockPasswordFill/></button>    
        <div className="modal" id={`modalPassword${formData.id}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Cambiar Contraseña</h5>
                        <button type="button" id="closeModal2" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form autoComplete='off'>
                            <div className="mb-3">
                                <label for="password" className="form-label">Nueva Contraseña</label>
                                <input onChange={handleChange} value={formData.password} name='password' type="password" className="form-control" id="Password"/>
                            </div>
                            <div className='mb-3'>
                                <button onClick={(e) => editUserPassword(e)} className="btn btn-primary">Cambiar</button>
                            </div>                          
                        </form>
                    </div>
                </div>
            </div>  
        </div>
        </>
    )
}