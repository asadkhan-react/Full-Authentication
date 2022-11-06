import React, { useState } from 'react';
import login from '../../../assets/login.jpeg'
import {Link , useNavigate} from 'react-router-dom'
import axios from 'axios' ;
import {showErrMsg , showSuccessMsg} from '../../utils/notificaton/Notification'
import {useParams} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    password : '' ,
    cf_password : '',
    profile_type : '' ,
    err : '' ,
    success : ''
}
function ResetPassword() {
    const [user , setUser] = useState(initialState);
    const {access_token} = useParams()
    const [passwordShowHide , setPasswordShowHide] = useState(false)

    const {password , cf_password , profile_type , err , success} = user


    const onValueChange = (e) => {
        const {name , value} = e.target
        setUser({...user , [name]:value , err:'', success:''})
    }

    const isLength = password => {
        if(password.length < 6) return true
        return false
    }

    const isMatch = (password , cf_password) => {
        if(password === cf_password) return true
        return false
    }

    const onSubmitForm = async(e) => {
        e.preventDefault()

        if(isLength(password)){
            setUser({...user, err: "Password must be at least 6 characters.", success: ''})
            toast("Password must be at least 6 characters")
            return err
        }

        if(!isMatch(password, cf_password)){
            setUser({...user, err: "Password did not match.", success: ''})
            toast("Password did not match")
            return err
        }
        
        try {
            const res = await axios.post('/user/reset' , {password , profile_type} , {
                headers : {Authorization : access_token}
            });
            setUser({...user , err:'' , success : res.data.msg})
            toast(res.data.msg)
            return success
        } catch (error) {
            error.response.data.msg && 
            setUser({...user , err:error.response.data.msg , success:''})
            toast(error.response.data.msg)
        }
    }

    return(
        <>
        <ToastContainer />
        <div className='login-container'>
            <div className='login-form-container'>

                <div className='login-headings'>
                    <h2>Reset Your Password!</h2>
                    <span>Enter your New Password</span>
                </div>

                <form onSubmit={onSubmitForm}>

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

                    <div className='second_form_section common_register'>
                        <TextField fullWidth  id="outlined-basic" label="Confirm Password" variant="outlined" value={cf_password} name='cf_password' type={passwordShowHide ? 'text' : 'password'} onChange={onValueChange}/>
                    </div>

                    <div className='first_form_section common_register'>
                        <TextField variant="outlined" id="outlined-select-currency" select label="Select Profile Type" value={profile_type} onChange={onValueChange} name='profile_type' fullWidth>
                            <MenuItem value="founder"> Founder </MenuItem>
                            <MenuItem value="investor"> Investor </MenuItem>
                        </TextField>
                    </div>

                    <div className='third_form_section'>
                        <button type='submit'>Reset</button>
                        <div className='third_form_little'>
                            <span>Don't have an account? <Link exact to='/register'>Sign Up</Link></span>
                            <span><Link exact to='/login'>Login</Link></span>
                        </div>
                    </div>
                </form>

            </div>
            <div className='login_banner'><img src={login}/></div>
        </div>
        </>
    )
}

export default ResetPassword;