// Import modules
import React, {useContext} from 'react';
import {auth} from '../../firebase';
import {Link, Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';
import {ReactComponent as DownIcon} from '../../assets/down.svg';
import {ReactComponent as PlusIcon} from '../../assets/plus.svg';
import {ReactComponent as EditIcon} from '../../assets/edit.svg';
import axios from 'axios';

// Import context 
import Global from '../../contexts/Global/Global';


// Import styles
import './styles/Navigation.css';

// Enviroment Variables
const {
    REACT_APP_AUTH_API_URI
  } = process.env;

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


    const editProfile = async(e)=>{
        e.preventDefault();
        try{

            const URL = `${REACT_APP_AUTH_API_URI}getUser/${globalContext.user.uid}`
            const request = await axios({
                method: 'get',
                url: URL,
                params: {
                id: globalContext.user.uid
                }
            });

            const content = request.data;

            if(globalContext.form.section === 'users'){
                globalContext.updateForm({
                    section: 'users',
                    action: 'edit',
                    id: globalContext.user.uid,
                    form: {
                        name: content.displayName,
                        email: content.email,
                        isVerification: content.emailVerified,
                        codeSeller: content.customClaims['codeSeller'],
                        password: '',
                        confirmPassword: ''
                    },
                    sidebar: {
                        role: content.customClaims['role'],
                        changeBodegas: content.customClaims['changeBodegas'],
                        changeCentroOperaciones: content.customClaims['changeCentroOperaciones'],
                    }
                });
            }
        }
        catch(error){
            toast('error', {type:'error'})
        }

        let form = document.querySelector('.FormContainer');
        form.className = 'FormContainer showForm';

    }


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

    const isEmailVerificated = (e)=>{
        e.preventDefault();
        auth.currentUser.sendEmailVerification();
        toast('Mensaje de confirmación de correo enviado', {type:'success'});
        e.target.parentNode.remove();
    }


    return(
        <>
            {
                !globalContext.user.emailVerified && (
                    <div className='alertConfirmEmail'>
                        <p><span>!</span>Confirma el correo Electronico</p>
                        <button onClick={isEmailVerificated}>
                            enviar mensaje de confirmación
                        </button>
                    </div>
                )
            }
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
                                <Link to='/usuarios' onClick={(e)=> showForm('/usuarios', e)}>
                                    Usuario
                                </Link>
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
                                globalContext.user.customClaims
                                    ? (globalContext.user.customClaims['role'] === 'admin') ? 'Administrador' : 'Vendedor'
                                    : 'Sin Rol'
                            }
                        </span>
                    </div>
                    <DownIcon />
                    <ul className='subMenu'>
                        <li>
                            <Link to='/' onClick={(e)=> editProfile(e)}>
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
        </>
    );
}

export default Navigation;