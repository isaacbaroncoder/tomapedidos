// Import modules
import React, {useState, useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';
import Loading from './components/Loading/Loading';
import ViewDraft from './components/ViewDraft/ViewDraft';
import Sidebar from './components/Sidebar/Sidebar';
import Navigation from './components/Navigation/Navigation';
import Restore from './components/Restore/Restore';
import Users from './components/Users/Users';
import Bodegas from './components/Bodegas/Bodegas';
import CentrosDeOperacion from './components/CentrosDeOperacion/CentrosDeOperacion';
import CondicionesDeVentas from './components/CondicionesDeVentas/CondicionesDeVentas';
import Clientes from './components/Clientes/Clientes';
import Form from './components/Form/Form';
import axios from 'axios';
import {auth} from './firebase';

// Import contexts
import GlobalContext from './contexts/Global/Global';

// Import styles
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

// Enviroment Variables
const {
  REACT_APP_AUTH_API_URI
} = process.env;

function App() {

  const HandleUpdateIsLoading = ()=>{
    setGlobal((prevState)=>{
      return{
        ...prevState,
        isLoading: !prevState.isLoading
      }
    });
  }

  const HandleUpdateReload = ()=>{
    setGlobal((prevState)=>{
      return{
        ...prevState,
        isReload: !prevState.isReload
      }
    });
  }

  const HandleUpdateForm = (formObject)=>{
    setGlobal((prevState)=>{
      return{
        ...prevState,
        form: formObject,
      }
    });
  }

  const HandleResentForm = (formObjectResent)=>{

    setGlobal((prevState)=>{
      return{
        ...prevState,
        form: formObjectResent
      }

    });

  }

  const initiazeGlobal = {
    isReload: false,
    isLoading: true,
    isLogin: false,
    user:{},
    form: {
      editable: false,
      section:false,
      saving: false,
      action: false,
      form: {},
      sidebar: {}
    },
    updateIsLoading: HandleUpdateIsLoading,
    updateForm: HandleUpdateForm,
    updateIsReload: HandleUpdateReload,
    resentForm: HandleResentForm
  }
  
  

  const [global, setGlobal] = useState(initiazeGlobal);

  const getUser = ()=>{
    auth.onAuthStateChanged(async(currentUser)=>{
      if(currentUser){
       const URL = `${REACT_APP_AUTH_API_URI}getUser/${currentUser.uid}`
       const user = await axios({
         method: 'get',
         url: URL,
         params: {
           id: currentUser.uid
         }
       });

       let timeout =setTimeout(()=>{
          setGlobal({
            isReload: false,
            isLoading: false,
            isLogin: true,
            user: user.data,
            form:{
              editable: false,
              section:false,
              saving: false,
              action: false,
              form: {},
              sidebar: {}
            },
            updateIsLoading: HandleUpdateIsLoading,
            updateForm: HandleUpdateForm,
            updateIsReload: HandleUpdateReload,
            resentForm: HandleResentForm
          });
        }, 3000);

        return timeout;
      }
      else{
        let timeout = setTimeout(()=>{
          setGlobal({
            isReload: false,
            isLoading: false,
            isLogin: false,
            user:{},
            form:{
              editable: false,
              section:false,
              saving: false,
              action: false,
              form: {},
              sidebar: {}
            },
            updateIsLoading: HandleUpdateIsLoading,
            updateForm: HandleUpdateForm,
            updateIsReload: HandleUpdateReload,
            resentForm: HandleResentForm
          });
        }, 3000);

        return timeout;
      }
    });
  }

  useEffect(()=>{
    const timeoutBack= getUser();
    return ()=>{
      clearTimeout(timeoutBack);
    }
  }, []);

  return (
    <GlobalContext.Provider value={global}>
      <div className="App">

        {global.isLoading && <Loading />}

        { global.isLogin && <Navigation /> }

        { global.isLogin && <Form /> }

        <div className='mainView'>
          
            { global.isLogin && <Sidebar /> }

            <Switch>

              <Route exact path='/'>
                {
                  global.isLogin
                    ? <Redirect to='/dashboard' />
                    : <Login />
                }        
              </Route>

              <Route exact path='/restablecer'>
                {
                  global.isLogin
                    ? <Redirect to='/dashboard' />
                    : <Restore />
                }        
              </Route>

              <Route exact path='/dashboard'>
              {
                  global.isLogin
                    ? <ViewDraft  title='Dashboard' /> 
                    : <Redirect to='/' />
                } 
              </Route>

              <Route exact path='/pedidos'>
              {
                  global.isLogin
                    ? <ViewDraft  title='Pedidos' /> 
                    : <Redirect to='/' />
                } 
              </Route>
              
              <Route exact path='/reportes'>
              {
                  global.isLogin
                    ? <ViewDraft  title='Reportes' /> 
                    : <Redirect to='/' />
                } 
              </Route>

              <Route exact path='/clientes'>
              {
                  global.isLogin
                    ? <Clientes /> 
                    : <Redirect to='/' />
                } 
              </Route>

              <Route exact path='/usuarios'>
              {
                  global.isLogin
                    ? <Users />
                    : <Redirect to='/' />
                } 
              </Route>

              <Route exact path='/cotizaciones'>
              {
                  global.isLogin
                    ? <ViewDraft  title='Cotizaciones' /> 
                    : <Redirect to='/' />
                } 
              </Route>

              <Route exact path='/bodegas'>
              {
                  global.isLogin
                    ? <Bodegas /> 
                    : <Redirect to='/' />
                } 
              </Route>

              <Route exact path='/centros-de-operaciones'>
              {
                  global.isLogin
                    ? <CentrosDeOperacion /> 
                    : <Redirect to='/' />
                } 
              </Route>

              <Route exact path='/condiciones-de-ventas'>
              {
                  global.isLogin
                    ? <CondicionesDeVentas /> 
                    : <Redirect to='/' />
                } 
              </Route>

              <Route exact path='/presupuestos'>
              {
                  global.isLogin
                    ? <ViewDraft  title='Presupuestos' /> 
                    : <Redirect to='/' />
                } 
              </Route>

              <Route exact path='/seguridad'>
              {
                  global.isLogin
                    ? <ViewDraft  title='Seguridad' /> 
                    : <Redirect to='/' />
                } 
              </Route>

            </Switch>
        </div>

        <ToastContainer />

    </div>
  </GlobalContext.Provider>
  );
}

export default App;
