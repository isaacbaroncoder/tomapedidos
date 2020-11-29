// Import modules
import React, {useContext} from 'react';
import {ReactComponent as EditIcon} from '../../assets/edit.svg';
import {ReactComponent as DeleteIcon} from '../../assets/delete.svg';
import {ReactComponent as VisibilityIcon} from '../../assets/visibility.svg';
import Footer from '../Footer/Footer';
import axios from 'axios';

// Import styles
import './styles/Table.css';

// Import Contexts
import Global from '../../contexts/Global/Global';
import { toast } from 'react-toastify';

// Enviroment Variables
const {
    REACT_APP_AUTH_API_URI
  } = process.env;
  

const Table = ({title, headers, data, ChangeLoading})=>{

    const globalContext = useContext(Global);

    const showForm = (e)=>{
        e.preventDefault();
        let form = document.querySelector('.FormContainer');
        form.className = 'FormContainer showForm';
    }

    const DeleteContent = async(uid, e)=>{
        const URL = `${REACT_APP_AUTH_API_URI}deleteUser/${uid}`;
        try{
            const response = await axios({
                method: 'delete',
                url: URL,
                params: {
                    id: uid
                }
            });
            ChangeLoading({
                isLoading: true
            });
            setTimeout(()=>{
                toast(response.data, {type:'success'});
                globalContext.updateIsReload();
            }, 2000);
        }
        catch(error){
            toast(error.message, {type:'error'});
        }
    }

    const viewOrUpdated = async(action, id)=>{

        try{

            const URL = `${REACT_APP_AUTH_API_URI}getUser/${id}`
            const request = await axios({
                method: 'get',
                url: URL,
                params: {
                id
                }
            });

            const content = request.data;

            if(globalContext.form.section === 'users'){
                globalContext.updateForm({
                    section: globalContext.form.section,
                    action: action,
                    id: id,
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

    const addNewContent = ()=>{

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

    return(
        <>
        <div className='TableContainer showForm'>
            {
               title && (
                    <div className='new'>
                        <h2>
                            {title}
                        </h2>
                        <button onClick={addNewContent}>
                            Agregar nuevo
                        </button>
                    </div>
                )
            }
            <table className='Table'>
                <tr className='TableHead'>
                    {
                        headers.map( (header)=>(
                            <th>
                                {header}
                            </th>
                         ) )
                    }

                    {
                      globalContext.form.editable  && (
                        <th>
                            Acciones
                        </th>
                        )
                    }

                </tr>
                {
                  data.map((item, index)=>(
                        <tr class='TableItem' key={item.id}>
                            {
                                Object.keys(item).map((key)=>(
                                    <td>
                                      { ( key !== 'id' ) ? item[key] : index }
                                    </td>
                                ))
                            }

                            {
                               globalContext.form.editable && (
                                    <td>
                                        <button onClick={(e)=> showForm(e)} onClick={(e)=>{viewOrUpdated('view', item.id)}}>
                                            <VisibilityIcon />
                                            Ver
                                        </button>
                                        <button onClick={(e)=> showForm(e)} onClick={(e)=>{viewOrUpdated('edit', item.id)}}>
                                            <EditIcon />
                                            Editar
                                        </button>
                                        <button  onClick={(e)=> DeleteContent(item.id, e)} className='buttonDelete'>
                                            <DeleteIcon />
                                            Eliminar
                                        </button>
                                    </td>
                                )
                            }
                            
                        </tr>
                    ) )
                }
            </table>
        </div>
        <Footer />
        </>
    );
}

export default Table;