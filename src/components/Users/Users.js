// Import modules
import React, {useState, useEffect} from 'react';
import Table from '../Table/Table';
import Loading from '../Loading/Loading'

// Import styles
import './styles/Users.css';

const Users = (props)=>{

    const getUsers = ()=>{
        setTimeout(()=>{
            setLoading({
                isLoading: false,
            });
        }, 1000);
    }

    const [loading, setLoading] = useState({
        isLoading: true,
    });

    const headers = ['ID', 'Nombre' , 'Correo Electronico', 'Role'];

    useEffect(()=>{
        getUsers();
    }, []);

    return(
        <div className='viewDraftContainer'>

            {
                loading.isLoading && <Loading />
            }

            <Table title='Agregar Usuario' headers={headers} />
        </div>

    );
}

export default Users;