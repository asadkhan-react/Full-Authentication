import React, { useState } from 'react';
import login from '../../../assets/login.jpeg'
import {Link , useNavigate} from 'react-router-dom'
import axios from 'axios' ;
import {showErrMsg , showSuccessMsg} from '../../utils/notificaton/Notification'
import {dispatchLogin} from '../../../redux/actions/authAction';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Header from '../../header/Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    email : "" ,
    password : "" ,
    profile_type : "" ,
    err: "" ,
    success: ""
}

function Login() {
    const [user , setUser] = useState(initialState)
    const {email, password, profile_type , err, success} = user //I just did object destructring
    const [passwordShowHide , setPasswordShowHide] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onValueChange = (e) => {
        const {name , value} = e.target
        setUser({...user, [name]:value , err:'', success:''})
    }

    const onFormSubmit = async(e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/login' , {email , password , profile_type})
            setUser({...user , err:'' , success : res.data.msg})

            localStorage.setItem('firstLogin' , true)
            dispatch(dispatchLogin());

            navigate("/profile");

        }  catch (error) {
            error.response.data.msg &&
            setUser({...user , err: error.response.data.msg , success : ''})
            toast(error.response.data.msg)
        }
    }

    return(
        <>
        <Header />
        <div>
            <ToastContainer />
        </div>
        <div className='login-container'>
            <div className='login-form-container'>

                <div className='login-headings'>
                    <h2>Get started now!</h2>
                    <span>Enter your details to login</span>
                </div>

                <form onSubmit={onFormSubmit}>
                    <div className='first_form_section common_register'>
                        {/* <input placeholder='Email address' className='forminput' type='email' name='email' value={email} onChange={onValueChange}/> */}
                        <TextField fullWidth  id="outlined-basic" label="Email Address" variant="outlined" name='email' value={email} type='email' onChange={onValueChange}/>

                    </div>

                    <div className='first_form_section common_register'>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                name='password'
                                id="outlined-adornment-password"
                                label="Password"
                                type={passwordShowHide ? 'text' : 'password'}
                                value={password}
                                onChange={onValueChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={()=>setPasswordShowHide(true)}
                                            onMouseDown={()=>setPasswordShowHide(false)}
                                            edge="end"
                                            >
                                            {passwordShowHide ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </div>
                    
                    <div className='first_form_section common_register'>
                        {/* <input style={{display : "none"}} placeholder='Please Select Type' className='forminput' type='text' name='profile_type' value={profile_type} onChange={onValueChange}/> */}
                        <TextField variant="outlined" id="outlined-select-currency" select label="Select Profile Type" value={profile_type} onChange={onValueChange} name='profile_type' fullWidth>
                            <MenuItem value="founder"> Founder </MenuItem>
                            <MenuItem value="investor"> Investor </MenuItem>
                        </TextField>
                    </div>

                    <span style={{marginTop : "20px" , display : "block"}}>Don't have an account? <Link exact to='/register'>Sign Up</Link></span>
                    <div className='third_form_section'>
                        <button type='submit'>Login</button>
                        <div className='third_form_little'>
                            <span><Link exact to='/forgot'>forgot password?</Link></span>
                        </div>
                    </div>
                </form>

            </div>
            <div className='login_banner'><img src={login}/></div>
        </div>
        </>
    )
}

export default Login;