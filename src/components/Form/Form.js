// Import modules
import React, {useContext} from 'react';
import {ReactComponent as DownIcon} from '../../assets/down.svg';
import {toast} from 'react-toastify';
import axios from 'axios';


// Import styles
import './styles/Form.css';

// Import Contexts
import Global from '../../contexts/Global/Global';

// Enviroment Variables
const {
    REACT_APP_AUTH_API_URI
  } = process.env;

const Form = ({})=>{

    const globalContext = useContext(Global);

    const formClean = {
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
    }

    const onChangedInput = (e)=>{
        !e.target.type === 'checkbox' && e.preventDefault()
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        const name = e.target.name;
        const part = e.target.attributes.part.value;

        if(part === 'form'){
            globalContext.updateForm({
                ...globalContext.form,
                form:{
                    ...globalContext.form.form,
                    [name]:value
                }
            });
        }else{
            globalContext.updateForm({
                ...globalContext.form,
                sidebar:{
                    ...globalContext.form.sidebar,
                    [name]:value
                }
            });
        }
    }

    const closeForm = (e)=>{
        e.preventDefault();
        let form = document.querySelector('.FormContainer');
        form.className = 'FormContainer';
        globalContext.resentForm(formClean);
    }

    const saveContent = async(e)=>{

        try{
            if(globalContext.form.section === 'users' && globalContext.form.action === 'create'){

                if(!globalContext.form.form.name){
                    return toast('El nombre del usuario es obligatorio', {type:'error'});
                }

                if(!globalContext.form.form.email){
                    return toast('El correo electronico es obligatorio', {type:'error'});
                }

                if(!globalContext.form.form.codeSeller){
                    return toast('El codigo de vendedor es obligatorio', {type:'error'});
                }
                
                if(!globalContext.form.form.password){
                    return toast('La contraseña es obligatoria', {type:'error'});
                }

                if(!globalContext.form.form.confirmPassword){
                    return toast('Confirme la contraseña', {type:'error'});
                }

                if(globalContext.form.form.confirmPassword !== globalContext.form.form.password){
                    return toast('La contraseña no coinsiden con la confirmacion', {type:'error'});
                }

                globalContext.updateForm({
                    editable: globalContext.form.editable,
                    section:globalContext.form.section,
                    saving: true,
                    action: globalContext.form.action,
                    form: globalContext.form.form,
                    sidebar: globalContext.form.sidebar
                });

                const URL = `${REACT_APP_AUTH_API_URI}createUser/`;

               const response = await axios({
                    method: 'post',
                    url: URL,
                    data: {
                        ...globalContext.form
                    }
                });

                setTimeout(()=>{
                    globalContext.updateForm({
                        editable: globalContext.form.editable,
                        section:globalContext.form.section,
                        saving: false,
                        action: globalContext.form.action,
                        form: globalContext.form.form,
                        sidebar: globalContext.form.sidebar
                    });
                }, 1000);

                if(response.data === 'success'){
                    toast(`${globalContext.form.form.name} se registro satifactoriamente`, {type:'success'});
                    globalContext.updateIsReload();
                    let form = document.querySelector('.FormContainer');
                    form.className = 'FormContainer';
                    globalContext.resentForm(formClean);
                }else{
                    toast(response.data, {type:'error'});
                }
            }
        }
        catch(error){
            console.log(error);
            setTimeout(()=>{
                globalContext.updateForm({
                    editable: globalContext.form.editable,
                    section:globalContext.form.section,
                    saving: false,
                    action: globalContext.form.action,
                    form: globalContext.form.form,
                    sidebar: globalContext.form.sidebar
                });
            }, 1000);
            toast(':( Algo salio mal', {type:'error'});
        }

    }

    const putContent = async(id, e)=>{
        if(!globalContext.form.form.name){
            return toast('El nombre del usuario es obligatorio', {type:'error'});
        }

        if(!globalContext.form.form.email){
            return toast('El correo electronico es obligatorio', {type:'error'});
        }

        if(!globalContext.form.form.codeSeller){
            return toast('El codigo de vendedor es obligatorio', {type:'error'});
        }
        if(globalContext.form.form.newPassword && globalContext.form.form.newPassword !== globalContext.form.form.confirmNewPassword){
            return toast('La nueva contraseña no coincide con su confirmación', {type:'error'});
        }

        try{

            globalContext.updateForm({
                editable: globalContext.form.editable,
                section:globalContext.form.section,
                id,
                saving: true,
                action: globalContext.form.action,
                form: globalContext.form.form,
                sidebar: globalContext.form.sidebar
            });

            const URL = `${REACT_APP_AUTH_API_URI}updateUser/${id}`;

            const response = await axios({
                 method: 'put',
                 url: URL,
                 data: {
                     ...globalContext.form
                 },
                 params:{
                     id
                 }
             });

             setTimeout(()=>{
                globalContext.updateForm({
                    editable: globalContext.form.editable,
                    section:globalContext.form.section,
                    saving: false,
                    action: globalContext.form.action,
                    form: globalContext.form.form,
                    sidebar: globalContext.form.sidebar
                });
            }, 1000);

            if(response.data === 'success'){
                globalContext.updateIsReload();
                toast(`${globalContext.form.form.name} se actualizo satifactoriamente`, {type:'success'});

            }else{
                toast(response.data, {type:'error'});
            }

        }
        catch(error){
            setTimeout(()=>{
                globalContext.updateForm({
                    editable: globalContext.form.editable,
                    section:globalContext.form.section,
                    id,
                    saving: false,
                    action: globalContext.form.action,
                    form: globalContext.form.form,
                    sidebar: globalContext.form.sidebar
                });
            }, 1000);
            toast('response.data' , {type:'error'});
        }


    }

    return(
        <div className='FormContainer'>
            <div className='Form'>
                <div className='FormNavigation'>
                    <button onClick={(e)=> closeForm(e)}>
                        <DownIcon />
                        {
                            globalContext.form.section === 'users' && globalContext.form.action === false && 'Crear nuevo usuario'
                        }
                        {
                            globalContext.form.section === 'users' && globalContext.form.action === 'view' && `Ver ${globalContext.form.form.name}`
                        }
                        {
                            globalContext.form.section === 'users' && globalContext.form.action === 'edit' && `Editar ${globalContext.form.form.name}`
                        }
                    </button>
                </div>
                <div className='FormInfo'>
                    {
                        globalContext.form.section === 'users'&& (
                            <>
                                {
                                    !globalContext.form.form.isVerification
                                    && (
                                        <div className='messageConfirmEmail'>
                                            <h4><span>!</span>Confirmar Correo</h4>
                                            <p>Al terminar el proceso de registro, revise la bandeja de mensaje de su correo electronico para confirmar el mismo</p>
                                        </div>
                                    )
                                }


                                <label htmlFor="">
                                    Nombre Completo
                                    <input type="text" onChange={onChangedInput} placeholder='Nombre Completo' name='name' value={globalContext.form.form.name} part='form'/>
                                </label>
                                <label htmlFor="">
                                    Correo Electronico
                                    <input type="email" onChange={onChangedInput} placeholder='Correo Electronico' name='email' value={globalContext.form.form.email} part='form'/>
                                </label>
                                <label htmlFor="">
                                Codigo de Vendedor
                                    <input type="text" onChange={onChangedInput} placeholder='Codigo de Vendedor' name='codeSeller' value={globalContext.form.form.codeSeller} part='form'/>
                                </label>
                                {
                                    globalContext.form.action === 'create'
                                    ? (
                                        <>
                                        <label htmlFor="">
                                        Contraseña
                                        <input type="password" onChange={onChangedInput} placeholder='Contraseña' name='password' value={globalContext.form.form.password} part='form'/>
                                        </label>
                                        <label htmlFor="">
                                            Confirmar Contraseña
                                            <input type="password" onChange={onChangedInput} placeholder='Confirmar contraseña' name='confirmPassword' value={globalContext.form.form.confirmPassword} part='form'/>
                                        </label>
                                        </>
                                        )
                                    : (
                                        <>
                                        <label htmlFor="">
                                        Nueva Contraseña
                                        <input type="password" onChange={onChangedInput} placeholder='Nueva Contraseña' name='newPassword' value={globalContext.form.form.newPassword} part='form'/>
                                        </label>
                                        <label htmlFor="">
                                            Confirmar Nueva Contraseña
                                            <input type="password" onChange={onChangedInput} placeholder='Confirmar Nueva Contraseña' name='confirmNewPassword' value={globalContext.form.form.confirmNewPassword} part='form'/>
                                        </label>
                                        </>
                                        )
                                }
                            </>
                        )
                    }
                </div>
                <div className='sidebarForm'>

                    <button className='buttonSave' onClick={(e)=> (globalContext.form.action === 'create') ? saveContent(e) : putContent(globalContext.form.id, e) }>
                        {
                            globalContext.form.saving
                            ? (
                                <div className='loadIcon' >

                                </div>
                            )
                            : 'Guardar'
                        }
                    </button>

                    
                    {
                        globalContext.form.section === 'users'&& (
                            <>
                                <div className='roles'>
                                    <h4>Role</h4>
                                <select name='role' onChange={onChangedInput} value={globalContext.form.sidebar.role} part='sidebar'>
                                    <option value='seller'>Vendedor</option>
                                    <option value='admin'>Administrador</option>
                                </select>
                                </div>
                                <div className='multipleOptions'>
                                    <h4>Centro de Operación asignado</h4>
                                    <div className='optionsCheck'>
                                        <label htmlFor="coOption01">
                                            <input type="checkbox" name="" id="coOption01"/>
                                            Centro de Operacion 01
                                        </label>
                                        <label htmlFor="coOption02">
                                            <input type="checkbox" name="" id="coOption02"/>
                                            Centro de Operacion 02
                                        </label>
                                        <label htmlFor="coOption03">
                                            <input type="checkbox" name="" id="coOption03"/>
                                            Centro de Operacion 03
                                        </label>
                                    </div>
                                </div>
                                <div className='multipleOptions'>
                                    <h4>Bodegas asignadas</h4>
                                    <div className='optionsCheck'>
                                        <label htmlFor="bOption01">
                                            <input type="checkbox" name="" id="bOption01"/>
                                            Bodega 01
                                        </label>
                                        <label htmlFor="bOption02">
                                            <input type="checkbox" name="" id="bOption02"/>
                                            Bodega 02
                                        </label>
                                        <label htmlFor="bOption03">
                                            <input type="checkbox" name="" id="bOption03"/>
                                            Bodega 03
                                        </label>
                                    </div>
                                </div>
                                <h4>Condicionales</h4>
                                <label htmlFor="checkchangeco">
                                    <input type='checkbox' part='sidebar' name='changeCentroOperaciones' checked={globalContext.form.sidebar.changeCentroOperaciones} id="checkchangeco" onChange={onChangedInput}/>
                                    Cambiar centros de operaciones
                                </label>

                                <label htmlFor="checkchangeb">
                                    <input type='checkbox' part='sidebar' name='changeBodegas' checked={globalContext.form.sidebar.changeBodegas} id="checkchangeb" onChange={onChangedInput}/>
                                    Cambiar Bodegas
                                </label>
                                
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Form;