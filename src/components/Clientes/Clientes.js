// Import modules
import React, {useState, useEffect, useContext} from 'react';
import Table from '../Table/Table';
import Loading from '../Loading/Loading'
import axios from 'axios';

// Import styles
// import './styles/Users.css';

// Import Contexts
import Global from '../../contexts/Global/Global';


// Enviroment Variables
const {
    REACT_APP_TOMAPEDIDOS_API_URI
  } = process.env;

const Clientes = (props)=>{

    const globalContext = useContext(Global);

    const getClientes = async()=>{

        try{

            let URI = `${REACT_APP_TOMAPEDIDOS_API_URI}clientes/listado-clientes/`;
            let response = await axios.get(URI);
            let collectionClientes = response.data;
            let clientes = [];
            collectionClientes.forEach((cliente, index)=>{
                
                clientes.push({
                    id: cliente.idCliente,
                    name: cliente.nombre,
                    nit: cliente.nit,
                    idClient: cliente.idCliente,
                    idRemoto: cliente.idRemoto,
                });
            });


            setClientes({
                collection: clientes,
            });

            globalContext.updateForm({
                editable: false,
                section: 'clientes',
                action: false,
                form: {},
                sidebar: {}
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

    const [allClientes, setClientes] = useState({
        collection: [{message:'No hay Usuarios'}]
    }) 

    const headers = ['ID', 'Nombre' , 'NIT', 'ID DE CLIENTE', 'ID Remoto'];

    useEffect(()=>{
        getClientes();
    }, [allClientes]);

    return(
        <div className='viewDraftContainer'>

            {
                loading.isLoading && <Loading />
            }

            <Table headers={headers} data={allClientes.collection} ChangeLoading={setLoading}/>
        </div>

    );
}

export default Clientes;