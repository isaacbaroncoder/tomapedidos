// Import modules
import React, {useState, useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';
import Loading from './components/Loading/Loading';
import ViewDraft from './components/ViewDraft/ViewDraft';
import Sidebar from './components/Sidebar/Sidebar';
import Navigation from './components/Navigation/Navigation';
import Restore from './components/Restore/Restore';
import Users from './components/Users/Users';
import {auth} from './firebase';

// Import contexts
import GlobalContext from './contexts/Global/Global';

// Import styles
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const HandleUpdateIsLoading = ()=>{
    setGlobal((prevState)=>{
      return{
        ...prevState,
        isLoading: !prevState.isLoading
      }
    });
  }

  const initiazeGlobal = {
    isLoading: true,
    isLogin: false,
    user:{},
    updateIsLoading: HandleUpdateIsLoading,
  }
  
  

  const [global, setGlobal] = useState(initiazeGlobal);

  const getUser = ()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        setTimeout(()=>{
          setGlobal({
            isLoading: false,
            isLogin: true,
            user,
            updateIsLoading: HandleUpdateIsLoading,
          });
        }, 3000);
      }
      else{
        setTimeout(()=>{
          setGlobal({
            isLoading: false,
            isLogin: false,
            user:{},
            updateIsLoading: HandleUpdateIsLoading,
          });
        }, 3000);
      }
    });
  }

  useEffect(()=>{
    getUser();
  }, []);

  return (
    <GlobalContext.Provider value={global}>
      <div className="App">

        {global.isLoading && <Loading />}

        { global.isLogin && <Navigation /> }

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
                ? <ViewDraft  title='Clientes' /> 
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
                ? <ViewDraft  title='Bodegas' /> 
                : <Redirect to='/' />
            } 
          </Route>

          <Route exact path='/centros-de-operaciones'>
          {
              global.isLogin
                ? <ViewDraft  title='Centros de Operaciones' /> 
                : <Redirect to='/' />
            } 
          </Route>

          <Route exact path='/condiciones-de-ventas'>
          {
              global.isLogin
                ? <ViewDraft  title='Condiciones de Ventas' /> 
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

        <Footer />

        <ToastContainer />

    </div>
  </GlobalContext.Provider>
  );
}

export default App;
