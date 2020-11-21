// Import modules
import React, {useState, useContext} from 'react';
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom';
import {auth} from '../../firebase';
import Slider from './Slider';

// Import styles
import './styles/Login.css';

// Import context 
import Global from '../../contexts/Global/Global';

const Login = ()=>{

    const globalContext = useContext(Global);

    const initializeLoginForm = {
        email: false,
        password: false
    };

    const [loginForm, setLoginForm] = useState(initializeLoginForm);

    const handleOnChange = (e)=>{
        const value = e.target.value;
        const name = e.target.name;
        
        setLoginForm((prevState)=>{
            return{
                ...prevState,
                [name]: value
            }
        });

    };

    const handleLogin = async(e)=>{

        e.preventDefault();

        const email = loginForm.email;
        const password = loginForm.password;

        if(!loginForm.email){
           return toast('Coloque su correo electronico', {
                type:'error',
                autoClose: 3000,
            });
        }

        if(!loginForm.password){
           return toast('Coloque su contraseña', {
                type:'error',
                autoClose: 5000,
            });
        }

        try{
            await auth.signInWithEmailAndPassword(email, password);
            globalContext.updateIsLoading();
        }
        catch(error){
            if(error.code === 'auth/invalid-email'){
                return toast('El correo electróico tiene un formato inconrrecto', {type: 'error'});
            }

            if(error.code === 'auth/user-not-found'){
                return toast('Este correo electrónico no esta asignado a ningun usuario registrado', {type: 'error'});
            }
            
            if(error.code === 'auth/wrong-password'){
                return toast('Contraseña incorrecta', {type: 'error'});
            }

        }

    };

    return(
        <div className='loginContainer'>
            <Link to='/'>
                <div className='loginHeading'>
                    <h2>Gestor de <span>Pedidos</span></h2>
                    <h4>Inversiones Vadisa S.A.S</h4>
                </div>
            </Link>
            <div className='moduleLoginContainer'>
                <div className='sliderContainer'>
                    <Slider /> 
                </div>
                <div className='formContainer'>
                    <form>
                        <h3>Ingresar a su cuenta</h3>
                        <input type="email" placeholder='Correo Electronico' onChange={handleOnChange} name='email'/>
                        <input type="password" placeholder='Contraseña' onChange={handleOnChange} name='password'/>
                        <button type='submit' onClick={handleLogin}>
                            Ingresar
                        </button>
                        <p>
                            ¿Olvido su contraseña?
                            <Link to='/restablecer'>
                                Restablecer
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default Login;