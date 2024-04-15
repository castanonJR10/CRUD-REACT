import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { FaUserCheck, FaUserXmark } from "react-icons/fa6";
import { HiStatusOnline, HiOutlineStatusOffline } from "react-icons/hi";

export default function ActivarUsuario({user, reloadList}){

    const editUserStatus = async (e) => {
        e.preventDefault();
        try {   
            var bool = user.activo === true ? false : true;
            var action = user.activo === true ? 'desactiva' : 'activa';
            Swal.fire({
                title: '¡Alerta!',
                text: '¿Estás seguro de quieres '+action+'r al usuario '+ user.nombre +'?',
                html: '<p>¿Estás seguro de quieres '+action+'r al usuario <strong>'+ user.nombre +'</strong>?</p>',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: '¡Sí, '+action+'lo!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await axios.post('http://localhost:5002/api/updateStatusUsuario/'+ user.id + '/' + bool);
                    if (response.status === 200) {
                        reloadList();
                        Swal.fire({
                            icon: 'success',
                            title: response.data,
                            showConfirmButton: false,
                            timer: 1500
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

    return(
        user.activo === true 
        ? 
            <button onClick={editUserStatus} className="btn btn-outline-success" type="submit"><HiStatusOnline/></button>  
        :
            <button onClick={editUserStatus} className="btn btn-outline-danger" type="submit"><HiOutlineStatusOffline/></button>    
    )
}