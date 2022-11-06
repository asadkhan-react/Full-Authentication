import React, { useState } from 'react';
import register from '../../../assets/login.jpeg';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {showErrMsg , showSuccessMsg} from '../../utils/notificaton/Notification'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import PwdReq from './PwdReq';
import Header from '../../header/Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    profile_type: "" ,
    name : "" ,
    email : "" ,
    password : "" ,
    cf_password : "" ,
    err : "" ,
    success : ""
}

function Register() {
    const [user , SetUser] = useState(initialState);
    const {name , email , password , cf_password , profile_type, err , success} = user;
    const [pwdRequisite , setPwdRequisite] = useState(false)
    const [passwordShowHide , setPasswordShowHide] = useState(false)

    const [checkPassword , setPasswordChecker] = useState({
        capsLetterCheck : false ,
        numericCheck : false ,
        symbolCheck : false ,
        passwordLength : false
    })

    const isMatch = (password , cf_password) => {
        if(password === cf_password) return true
        return false
    }

    const handlePwdReq = () => {
        setPwdRequisite(true)
    }

    const handleBlur = () => {
        setPwdRequisite(false)
    }

    const handleKeyUp = (e) => {
        const {value} = e.target
        const capsLetterCheck = /[A-Z]/.test(value);
        const numericCheck = /[0-9]/.test(value);
        const symbolCheck = /[!@$#%^&*]/.test(value);
        const passwordLength = value.length >= 8;
        setPasswordChecker({
            capsLetterCheck ,
            numericCheck ,
            passwordLength ,
            symbolCheck
        })
    }

    const onValueChange = (e) => {
        const {name , value} = e.target
        SetUser({...user , [name]:value , err:'' , success:''})
    }

    const onFormSubmit = async(e) => {
        e.preventDefault();
        if(!isMatch(password , cf_password)){
            SetUser({...user , err:'Password Not Matches' , success: ''})
            toast('Password Not Matches');
            return err
        }

        try {
            const res = await axios.post('/user/register' , {name , email , password , profile_type})
            SetUser({...user , err:'' , success: res.data.msg})
            toast(res.data.msg);

            console.log(res)
        } catch (error) {
            error.response.data.msg &&
            SetUser({...user , err: error.response.data.msg , success: ''})
            toast(error.response.data.msg);
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
                    <span>Enter your details below to Register</span>
                </div>
                <form onSubmit={onFormSubmit}>

                    <div className='first_form_section common_register'>
                        {/* <input style={{marginBottom : "20px"}} placeholder='Full Name' className='forminput' type='text' name='name' value={name} onChange={onValueChange}/> */}
                        <TextField fullWidth  id="outlined-basic" label="Full Name" variant="outlined" name='name' value={name} type='text' onChange={onValueChange}/>
                    </div>

                    <div className='second_form_section common_register'>
                        {/* <input style={{marginBottom : "20px"}} placeholder='Email address' className='forminput'  name='email' value={email} onChange={onValueChange}/> */}
                        <TextField fullWidth  id="outlined-basic" label="Email Address" variant="outlined" name='email' value={email} type='email' onChange={onValueChange}/>
                    </div>

                    <div className='first_form_section common_register'>
                        <TextField variant="outlined" id="outlined-select-currency" select label="Select Profile Type" value={profile_type} onChange={onValueChange} name='profile_type' fullWidth>
                            <MenuItem value="founder"> Founder </MenuItem>
                            <MenuItem value="investor"> Investor </MenuItem>
                        </TextField>
                    </div>

                    <div className='second_form_section common_register'>
                        {/* <input placeholder='Password' className='forminput' type='password' name='password' value={password} onChange={onValueChange}/> */}                        
                            {/* <TextField className='password_field' onKeyUp={handleKeyUp} onFocus={handlePwdReq} onBlur={handleBlur} fullWidth  id="outlined-basic" label="Password" variant="outlined" value={password} name='password' type={passwordShowHide ? 'text' : 'password'} onChange={onValueChange}/> */}
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    name='password'
                                    id="outlined-adornment-password"
                                    label="Password"
                                    onKeyUp={handleKeyUp}
                                    onFocus={handlePwdReq} 
                                    onBlur={handleBlur}
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
                        { pwdRequisite ? 
                        <PwdReq 
                        captialFlag={checkPassword.capsLetterCheck ? "valid" : "invalid"}
                        numberFlag = {checkPassword.numericCheck ? "valid" : "invalid"}
                        lengthFlag = {checkPassword.passwordLength ? "valid" : "invalid"}
                        speciaCharFlag = {checkPassword.symbolCheck ? "valid" : "invalid"}
                        captialFlagBoolean={checkPassword.capsLetterCheck}
                        numberFlagBoolean = {checkPassword.numericCheck}
                        lengthFlagBoolean = {checkPassword.passwordLength}
                        speciaCharFlagBoolean = {checkPassword.symbolCheck}/>: null}
                    </div>

                    <div className='second_form_section common_register'>
                        {/* <input placeholder='Confirm Password' className='forminput' type='password' name='cf_password' value={cf_password} onChange={onValueChange}/> */}
                        <TextField fullWidth  id="outlined-basic" label="Confirm Password" variant="outlined" value={cf_password} name='cf_password' type={passwordShowHide ? 'text' : 'password'} onChange={onValueChange}/>
                    </div>

                    <div className='third_form_section'>
                        <button type='submit'>Register</button>
                        <span>Already have an account? <Link exact to='/login'>Login</Link></span>
                    </div>
                </form>
            </div>
            <div className='login_banner'><img src={register}/></div>
        </div>
        </>
    )
}

export default Register;