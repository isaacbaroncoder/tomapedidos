// Import modules
import React, {useState, useEffect, useContext} from 'react';
import Table from '../Table/Table';
import Loading from '../Loading/Loading'
import axios from 'axios';
import Footer from '../Footer/Footer'

// Import styles
import './styles/Users.css';

// Import Contexts
import Global from '../../contexts/Global/Global';

// Enviroment Variables
const {
    REACT_APP_AUTH_API_URI
  } = process.env;

const Users = (props)=>{

    const globalContext = useContext(Global);

    const getUsers = async()=>{

        try{

            let URI = `${REACT_APP_AUTH_API_URI}getAllUsers/`;
            let response = await axios.get(URI);
            let collectionUsers = response.data;
            let users = [];
            collectionUsers.forEach((user, index)=>{
                
                users.push({
                    id: user.uid,
                    name: user.displayName ? user.displayName : 'Anonimo',
                    email: user.email,
                    role: user.customClaims 
                          ? (user.customClaims['role'] === 'admin') ? 'Administrador' : 'Vendedor'
                          : 'Sin Role'
                });
            });


            setAllUsers({
                collection: users,
            });

            globalContext.updateForm({
                editable: true,
                section: 'users',
                action: false,
                form: {
                    name:'',
                    email: '',
                    isVerification: false,
                    codeSeller: '',
                    password: '',
                    confirmPassword: '',
                    newpPassword: '',
                    confirmNewPassword: ''
                },
                sidebar: {
                    role:'seller',
                    changeBodegas: false,
                    changeCentroOperaciones: false,
                }
            });

            setLoading({
                isLoading: false,
            });
        }
        catch(error){
            console.log(error);
            setLoading({
                isLoading: false,
            });  
        }
    }

    const [loading, setLoading] = useState({
        isLoading: true,
    });

    const [allUsers, setAllUsers] = useState({
        collection: [{message:'No hay Usuarios'}]
    }) 

    const headers = ['ID', 'Nombre' , 'Correo Electronico', 'Role'];

    useEffect(()=>{
        getUsers();
    }, [globalContext.isReload]);

    return(
        <div className='viewDraftContainer'>

            {
                loading.isLoading && <Loading />
            }

            <Table title='Agregar Usuario' headers={headers} data={allUsers.collection} ChangeLoading={setLoading}/>

        </div>

    );
}

export default Users;