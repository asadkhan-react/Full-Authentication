import React, { useState } from 'react';
import login from '../../../assets/login.jpeg'
import {Link , useNavigate} from 'react-router-dom'
import axios from 'axios' ;
import {showErrMsg , showSuccessMsg} from '../../utils/notificaton/Notification'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Header from '../../header/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    email : '' ,
    profile_type : '' ,
    err : '' ,
    success : ''
}
function ForgotPassword() {
    const [user , setUser] = useState(initialState);
    const {email , profile_type , err , success} = user

    const onValueChange = (e) => {
        const {name , value} = e.target
        setUser({...user , [name]:value , err:'', success:''})
    }

    const onSubmitForm = async(e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/forgot' , {email , profile_type});
            setUser({...user , err:'' , success : res.data.msg})
            toast(res.data.msg)
        } catch (error) {
            error.response.data.msg && 
            setUser({...user , err:error.response.data.msg , success:''})
            toast(error.response.data.msg)
        }
    }

    return(
        <>
        <Header />
        <ToastContainer />
        <div className='login-container'>
            <div className='login-form-container'>

                <div className='login-headings'>
                    <h2>Forgot Password!</h2>
                    <span>Enter your details to reset the password</span>
                </div>

                <form onSubmit={onSubmitForm}>
                    <div className='first_form_section'>
                        {/* <input placeholder='Email address' className='forminput' type='email' name='email' onChange={onValueChange}/> */}
                        <TextField fullWidth  id="outlined-basic" label="Email Address" variant="outlined" name='email' value={email} type='email' onChange={onValueChange}/>
                    </div>

                    <div className='first_form_section common_register'>
                        {/* <input style={{display : "none"}} placeholder='Please Select Type' className='forminput' type='text' name='profile_type' value={profile_type} onChange={onValueChange}/> */}
                        <TextField variant="outlined" id="outlined-select-currency" select label="Select Profile Type" value={profile_type} onChange={onValueChange} name='profile_type' fullWidth>
                            <MenuItem value="founder"> Founder </MenuItem>
                            <MenuItem value="investor"> Investor </MenuItem>
                        </TextField>
                    </div>

                    <div className='third_form_section'>
                        <button type='submit'>Send Email</button>
                        <div className='third_form_little'>
                            <span>Don't have an account? <Link exact to='/register'>Sign Up</Link></span>
                        </div>
                    </div>
                </form>

            </div>
            <div className='login_banner'><img src={login}/></div>
        </div>
        </>
    )
}

export default ForgotPassword;