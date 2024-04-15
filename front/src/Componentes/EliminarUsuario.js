import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Jquery from 'jquery';
import { FaTrashCan } from "react-icons/fa6";

export default function EliminarUsuario({userId}) {
    
    const deleteUser = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({
                title: '¿Estás seguro de eliminar a este usuario?',
                text: 'Esta acción es irreversible',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: '¡Sí, elimínalo!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await axios.delete('http://localhost:5002/api/deleteUsuario/'+userId);
                    if (response.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: response.data,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            Jquery('#'+userId).remove();
                        });   
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: response.data,
                            showConfirmButton: false,
                            timer: 1500
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
    };

    return (
        <>
        <button className='btn btn-outline-danger' onClick={deleteUser}><FaTrashCan/></button>
        </>
    )
}