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

const CondicionesDeVentas = (props)=>{

    const globalContext = useContext(Global);

    const getCondicionesDeVentas = async()=>{

        try{

            let URI = `${REACT_APP_TOMAPEDIDOS_API_URI}catalogos/condicion-venta/`;
            let response = await axios.get(URI);
            let collectionCondicionesDeVentas = response.data;
            let condicionesDeVentas = [];
            collectionCondicionesDeVentas.forEach((condicionDeVenta, index)=>{
                
                condicionesDeVentas.push({
                    id: condicionDeVenta.idCondicionVenta,
                    name: condicionDeVenta.nombre,
                    idRemoto: condicionDeVenta.idRemoto,
                    nivelRecaudo: condicionDeVenta.nivelRecaudo,
                });
            });


            setCondicionesDeVentas({
                collection: condicionesDeVentas,
            });

            globalContext.updateForm({
                editable: false,
                section: 'condicionesDeVentas',
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

    const [allCondicionesDeVentas, setCondicionesDeVentas] = useState({
        collection: [{message:'No hay Usuarios'}]
    }) 

    const headers = ['ID', 'Nombre' , 'ID Remoto', 'Nivel de Recaudo'];

    useEffect(()=>{
        getCondicionesDeVentas();
    }, [allCondicionesDeVentas]);

    return(
        <div className='viewDraftContainer'>

            {
                loading.isLoading && <Loading />
            }

            <Table headers={headers} data={allCondicionesDeVentas.collection} ChangeLoading={setLoading}/>
        </div>

    );
}

export default CondicionesDeVentas;