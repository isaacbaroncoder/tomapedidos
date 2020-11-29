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

const CentrosDeOperacion = (props)=>{

    const globalContext = useContext(Global);

    const getCentrosDeOperacion = async()=>{

        try{

            let URI = `${REACT_APP_TOMAPEDIDOS_API_URI}catalogos/centro-operacion/`;
            let response = await axios.get(URI);
            let collectionCentrosDeOperacion = response.data;
            let centrosDeOperacion = [];
            collectionCentrosDeOperacion.forEach((centroDeOperacion, index)=>{
                
                centrosDeOperacion.push({
                    id: centroDeOperacion.idCentroOperacion,
                    name: centroDeOperacion.nombre,
                    codCentroOperacion: centroDeOperacion.codCentroOperacion,
                });
            });


            setCentrosDeOperacion({
                collection: centrosDeOperacion,
            });

            globalContext.updateForm({
                editable: false,
                section: 'centroDeOperacion',
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

    const [allCentrosDeOperacion, setCentrosDeOperacion] = useState({
        collection: [{message:'No hay Usuarios'}]
    }) 

    const headers = ['ID', 'Nombre' , 'Codigo del Centro de Operación'];

    useEffect(()=>{
        getCentrosDeOperacion();
    }, [allCentrosDeOperacion]);

    return(
        <div className='viewDraftContainer'>

            {
                loading.isLoading && <Loading />
            }

            <Table headers={headers} data={allCentrosDeOperacion.collection} ChangeLoading={setLoading}/>
        </div>

    );
}

export default CentrosDeOperacion;