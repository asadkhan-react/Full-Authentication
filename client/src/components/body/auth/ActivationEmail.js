import React , {useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {showErrMsg , showSuccessMsg} from '../../utils/notificaton/Notification'
import Header from '../../header/Header'
const initialState = {
    err : "" ,
    success : ""
}

function ActivationEmail () {
    const {activate_User} = useParams();
    const [user , setUser] = useState(initialState);
    const {err , success} = user ;
    
    useEffect(() => {
        if(activate_User){
            const activateEmail = async() => {
                try {
                    const res = await axios.post('/user/activation' , {activate_User})
                    setUser({err:"" , success:res.data.msg})
                } catch (error) {
                    error.response.data.msg && 
                    setUser({err : error.response.data.msg , success : ""})
                }
            }
            activateEmail();
        }
    } , [activate_User])

    return(
        <>
            <Header/>
            <div>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
            </div>
        </>
    )
} 

export default ActivationEmail;