// Import Modules
import React from 'react';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import {auth} from '../../firebase'

// Import styles
import './styles/Restore.css';

const Restore = ()=>{

    const handleResetPassword = async(e)=>{
        e.preventDefault();
        let email = document.querySelector('#emailReset').value;

        if(!email){
            return toast('El Correo electronico es requerido', {type:'error'});
        }

        try{
            await auth.sendPasswordResetEmail(email);
            toast('Mensaje para restablecer contraseña enviado', {type:'success'});
        }
        catch(error){
            if(error.code === 'auth/invalid-email'){
                return toast('El correo electronico tiene un formato invalido')
            }
            if(error.code === 'auth/user-not-found'){
                return toast('No existe usuario con este correo electronico asignado')
            }
        }
    }

    return(
        <div className='restoreContainer'>
            <Link to='/'>
                <div className='loginHeading'>
                    <h2>Gestor de <span>Pedidos</span></h2>
                    <h4>Inversiones Vadisa S.A.S</h4>
                </div>
            </Link>
            <div className='restoreModule'>
                <form>
                    <h3>Restablecer contraseña</h3>
                    <p>Ingresa el correo electronico de la cuenta a recuperar, sera enviando un correo para verificar que eres el propietario de la cuenta</p>
                    <input type="email" placeholder='Correo Electronico' id='emailReset'/>
                    <button onClick={handleResetPassword}>
                        Enviar Correo
                    </button>
                    <p>
                        ¿Ya tienes una cuenta?
                        <Link to='/'>
                            Ingrese
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Restore;