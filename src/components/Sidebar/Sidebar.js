// import modules
import React from 'react';
import {Link} from 'react-router-dom'

// Import styles
import './styles/Sidebar.css'

const Sidebar = ()=>{
    return(
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
                    <button to='/Usuarios'>
                        Usuarios
                    </button>
                    <ul className='subMenuSidebar'>
                        <li>
                            <Link to='/usuarios'>
                                    Todos los Usuarios
                            </Link>
                        </li>
                        <li>Añadir Usuario</li>
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
                        <li>Añadir Bodega</li>
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
                        <li>Añadir Centro de Operación</li>
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
                        <li>Añadir Condicion de Venta</li>
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
}

export default Sidebar;