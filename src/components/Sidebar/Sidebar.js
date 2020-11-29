// import modules
import React, {useContext} from 'react';
import {Link} from 'react-router-dom'
import {ReactComponent as DownIcon} from '../../assets/down.svg';


// Import context 
import Global from '../../contexts/Global/Global';

// Import styles
import './styles/Sidebar.css'

const Sidebar = ()=>{

    const handleToggle = (e)=>{
        e.preventDefault();
        let sidebar = document.querySelector('.sidebarContainer')

        if(sidebar.className === 'sidebarContainer'){
            sidebar.className = 'sidebarContainer hiddenSidebar';
        }else{
            sidebar.className = 'sidebarContainer'
        }

    }

    const globalContext = useContext(Global);

    const showForm = (route, e)=>{
        globalContext.updateForm({
            editable: globalContext.form.editable,
            section: globalContext.form.section,
            action: false,
            form: globalContext.form.form,
            sidebar: globalContext.form.sidebar
        });

        let form = document.querySelector('.FormContainer');
        form.className = 'FormContainer showForm';

    }

    const sidebarAdmin = (
        <div className='sidebarContainer'>
            <button className='toggleSidebar' onClick={handleToggle}>
                <DownIcon />
            </button>
        <ul>
            <li className='itemSidebar'>
                <button>
                    Pedidos
                </button>
                <ul className='subMenuSidebar'>
                    <li>
                        <Link to='/pedidos'>
                            Todos los Pedidos
                        </Link>
                    </li>
                    <li>Añadir Pedido</li>
                </ul>
            </li>
            <li className='itemSidebar'>
                <button>
                    Reportes
                </button>
                <ul className='subMenuSidebar'>
                    <li>
                        <Link to='/reportes'>
                                Todos los Reportes
                        </Link>
                    </li>
                    <li>Añadir Reporte</li>
                </ul>
            </li>
            <li className='itemSidebar'>
                <button>
                    Clientes
                </button>
                <ul className='subMenuSidebar'>
                    <li>
                        <Link to='/clientes'>
                                Todos los Clientes
                        </Link>
                    </li>
                </ul>
            </li>
            <li className='itemSidebar'>
                <button to='/Usuarios'>
                    Usuarios
                </button>
                <ul className='subMenuSidebar'>
                    <li>
                        <Link to='/usuarios'>
                                Todos los Usuarios
                        </Link>
                    </li>
                    <li>
                        <Link to='/usuarios' onClick={(e)=> showForm('/usuarios', e)}>
                            Añadir Usuario
                        </Link>
                    </li>
                </ul>
            </li>
            <li className='itemSidebar'>
                <button to='/cotizaciones'>
                    Cotizaciones
                </button>
                <ul className='subMenuSidebar'>
                    <li>
                        <Link to='/cotizaciones'>
                                Todas las Cotizaciones
                        </Link>
                    </li>
                    <li>Añadir Cotizaciones</li>
                </ul>
            </li>
            <li className='itemSidebar'>
                <button to='/bodegas'>
                    Bodegas
                </button>
                <ul className='subMenuSidebar'>
                    <li>
                        <Link to='/bodegas'>
                                Todas las Bodegas
                        </Link>
                    </li>
                </ul>
            </li>
            <li className='itemSidebar'>
                <button to='/centros-de-operaciones'>
                    Centros de Operaciones
                </button>
                <ul className='subMenuSidebar'>
                    <li>
                        <Link to='/centros-de-operaciones'>
                                Todos los Centros de operaciones
                        </Link>
                    </li>
                </ul>
            </li>
            <li className='itemSidebar'>
                <button to='/condiciones-de-ventas'>
                    Condiciones de Ventas
                </button>
                <ul className='subMenuSidebar'>
                    <li>
                        <Link to='/condiciones-de-ventas'>
                                Todas las Condiciones de Ventas
                        </Link>
                    </li>
                </ul>
            </li>
            <li className='itemSidebar'>
                <button to='/presupuestos'>
                    Presupuestos
                </button>
                <ul className='subMenuSidebar'>
                    <li>
                        <Link to='/presupuestos'>
                                Todos los Presupuestos
                        </Link>
                    </li>
                    <li>Añadir Presupuestos</li>
                </ul>
            </li>
            <li className='itemSidebar'>
                <Link to='/seguridad'>
                    Seguridad
                </Link>
            </li>
        </ul>
    </div>
    );

    const sidebarSeller = (
        <div className='sidebarContainer'>
        <ul>
            <li className='itemSidebar'>
                <button>
                    Pedidos
                </button>
                <ul className='subMenuSidebar'>
                    <li>
                        <Link to='/pedidos'>
                            Todos los Pedidos
                        </Link>
                    </li>
                    <li>Añadir Pedido</li>
                </ul>
            </li>
            <li className='itemSidebar'>
                <button>
                    Reportes
                </button>
                <ul className='subMenuSidebar'>
                    <li>
                        <Link to='/reportes'>
                                Todos los Reportes
                        </Link>
                    </li>
                    <li>Añadir Reporte</li>
                </ul>
            </li>
            <li className='itemSidebar'>
                <button>
                    Clientes
                </button>
                <ul className='subMenuSidebar'>
                    <li>
                        <Link to='/clientes'>
                                Todos los Clientes
                        </Link>
                    </li>
                    <li>Añadir Cliente</li>
                </ul>
            </li>

            <li className='itemSidebar'>
                <button to='/cotizaciones'>
                    Cotizaciones
                </button>
                <ul className='subMenuSidebar'>
                    <li>
                        <Link to='/cotizaciones'>
                                Todas las Cotizaciones
                        </Link>
                    </li>
                    <li>Añadir Cotizaciones</li>
                </ul>
            </li>
           
            <li className='itemSidebar'>
                <button to='/presupuestos'>
                    Presupuestos
                </button>
                <ul className='subMenuSidebar'>
                    <li>
                        <Link to='/presupuestos'>
                                Todos los Presupuestos
                        </Link>
                    </li>
                    <li>Añadir Presupuestos</li>
                </ul>
            </li>
            
        </ul>
    </div>
    );

    return(
        <>
        {
            (globalContext.user.customClaims['role'] === 'admin') ? sidebarAdmin : sidebarSeller
        }
        </>
    );
}

export default Sidebar;