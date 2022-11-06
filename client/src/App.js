import React , {useEffect , useState} from 'react';
import './App.css';
import Header from './components/header/Header';
import Body from './components/body/Body';
import {useDispatch , useSelector} from 'react-redux';
import axios from 'axios';
import {dispatchLogin , fetchUser , dispatchGetUser} from './redux/actions/authAction' 

function App() {

  const dispatch = useDispatch();
  const token = useSelector(state => state.tokenReducer)
  const authReducer = useSelector(state => state.authReducer)

  useEffect(()=>{
    const firstLogin = localStorage.getItem('firstLogin');
    if(firstLogin){
      const get_Token = async() => {
        const res = await axios.post('user/refresh_token' , null)
        dispatch({type : 'GET_TOKEN' , payload : res.data.access_token})
      } 
      get_Token()
    }
  }, [authReducer.isLogged , dispatch])

  useEffect(()=>{
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin());
        
        return fetchUser(token).then(res=>{
        dispatch(dispatchGetUser(res))
        
        })

      }
      getUser();
    }
  } , [token , dispatch])
  return (
    <>
      <Body/>
    </>
  );
}

export default App;
