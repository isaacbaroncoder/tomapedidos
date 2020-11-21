// Import Modules
import React from 'react';
import {Link} from 'react-router-dom';

// Import styles
import './styles/Restore.css';

const Restore = ()=>{
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
                    <input type="email" placeholder='Correo Electronico'/>
                    <button>
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