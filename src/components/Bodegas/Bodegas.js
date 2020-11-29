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

const Bodegas = (props)=>{

    const globalContext = useContext(Global);

    const getBodegas = async()=>{

        try{

            let URI = `${REACT_APP_TOMAPEDIDOS_API_URI}catalogos/bodega/`;
            let response = await axios.get(URI);
            let collectionBodegas = response.data;
            let bodegas = [];
            collectionBodegas.forEach((bodega, index)=>{
                
                bodegas.push({
                    id: bodega.id,
                    name: bodega.nombre,
                    idRemote: bodega.idRemoto,
                });
            });


            setBodegas({
                collection: bodegas,
            });

            globalContext.updateForm({
                editable: false,
                section: 'bodegas',
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

    const [allBodegas, setBodegas] = useState({
        collection: [{message:'No hay Usuarios'}]
    }) 

    const headers = ['ID', 'Nombre' , 'ID Remoto'];

    useEffect(()=>{
        getBodegas();
    }, [allBodegas]);

    return(
        <div className='viewDraftContainer'>

            {
                loading.isLoading && <Loading />
            }

            <Table headers={headers} data={allBodegas.collection} ChangeLoading={setLoading}/>
        </div>

    );
}

export default Bodegas;