// Import modules
import React, {useContext} from 'react';
import {auth} from '../../firebase';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import {ReactComponent as DownIcon} from '../../assets/down.svg';
import {ReactComponent as PlusIcon} from '../../assets/plus.svg';
import {ReactComponent as EditIcon} from '../../assets/edit.svg';

// Import context 
import Global from '../../contexts/Global/Global';

// Import styles
import './styles/Navigation.css';

const Navigation = ()=>{

    const globalContext = useContext(Global);

    const handleSignout = async()=>{
        try{
            globalContext.updateIsLoading();
            await auth.signOut();
        }
        catch(error){
            toast(error.code, {type:'error'});
        }
    }

    return(
        <nav>
            <Link to='/dashboard' className='logo'>
                <h2>Gestion de Pedidos</h2>
                <span>Inversiones Davisa S.A.S</span>
            </Link>
            <ul className='menuNavigation'>
                <li>
                    <button>
                        Nuevo
                        <PlusIcon />
                        <ul className='subMenu'>
                            <li>
                                <button>
                                    Pedido
                                </button>
                            </li>
                            <li>
                                <button>
                                    Reporte
                                </button>
                            </li>
                            <li>
                                <button>
                                    Cliente
                                </button>
                            </li>
                            <li>
                                <button>
                                    Usuario
                                </button>
                            </li>
                            <li>
                                <button>
                                    Cotización
                                </button>
                            </li>
                        </ul>
                    </button>
                </li>

                <li>
                    <button>
                        Editar
                        <EditIcon />
                         <ul className='subMenu'>
                            <li>
                                <Link to='/pedidos'>
                                    Pedidos
                                </Link>
                            </li>
                            <li>
                                <Link to='/reportes'>
                                    Reportes
                                </Link>
                            </li>
                            <li>
                                <Link to='/clientes'>
                                    Clientes
                                </Link>
                            </li>
                            <li>
                                <Link to='/usuarios'>
                                    Usuarios
                                </Link>
                            </li>
                            <li>
                                <Link to='/cotizaciones'>
                                    Cotizaciones
                                </Link>
                            </li>
                        </ul>
                    </button>
                </li>
            </ul>
            <div className='userMenu'>
                <button className='userMenuButton'>
                    <div className='userNameMenu'>
                        <span className='name'>
                            {
                            globalContext.user.displayName
                                ? globalContext.user.displayName
                                : 'Anonimo'
                            }
                        </span>
                        <span className='role'>
                            {
                                globalContext.user.role
                                    ? globalContext.user.role
                                    : 'Administrador'
                            }
                        </span>
                    </div>
                    <DownIcon />
                    <ul className='subMenu'>
                        <li>
                            <Link>
                                Editar Perfil
                            </Link>
                        </li>
                        <li>
                            <button onClick={handleSignout}>
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                    </button>
                <ul></ul>
            </div>
        </nav>
    );
}

export default Navigation;