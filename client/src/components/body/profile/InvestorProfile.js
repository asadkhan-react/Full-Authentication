import React, { useState } from 'react';
import login from '../../../assets/login.jpeg'
import {Link , useNavigate} from 'react-router-dom'
import axios from 'axios' ;
import {showErrMsg , showSuccessMsg} from '../../utils/notificaton/Notification'
import {dispatchLogin} from '../../../redux/actions/authAction';
import { useSelector , useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import investing from '../../../assets/investing.svg'


const initialState = {
    expertise : "" ,
    location : "" ,
    accredited_investor : "" ,
    website_url : "" ,
    linkedin : "" ,
    currency : "" ,
    min_investment : "" ,
    max_invesment : "" ,
    sectors : "",
    business_model : "" ,
    most_interested : "" ,
    not_interested : "" , 
    target_location : "" ,
    founder_location : "" ,
    contact_person : "",
    contact_email : "",
    company_linkedin : "",
    err : "" ,
    success : "" ,
}
function InvestorProfile() {
    const [profileInfo , setProfileInfo] = useState(initialState)
    const auth = useSelector(state => state.authReducer)
    const token = useSelector(state => state.tokenReducer)
    const {user , isAdmin} = auth
    const {currency , min_investment , max_invesment , sectors , founder_location , contact_person , contact_email , company_linkedin , err , success} = profileInfo
    const {profile_type , user_check} = user
    const navigate = useNavigate()

    const onValueChange = (e) => {
        const {name , value} = e.target;
        setProfileInfo({...profileInfo , [name] : value})
        console.log(profileInfo)
    }

    const updateInfor = (e) => {
        e.preventDefault()
        if(!currency , !min_investment , !max_invesment , !sectors){
            window.scroll(0 , 0)
            return setProfileInfo({...profileInfo , err : "You Did Not Change Anything" , success:""})
        }
        try {
            const res = axios.patch('/user/update_profile' , {profile_type , currency , min_investment , max_invesment , sectors},{
                headers : {Authorization : token} 
            })

            navigate("/preferences")

        } catch (error) {
            setProfileInfo({...profileInfo, err: error.response.data.msg , success: ''})
        }
    }

    const updatefounderInfo = (e) => {
        e.preventDefault()
        if(!founder_location , !contact_person , !contact_email , !company_linkedin ){
            window.scroll(0 , 0)
            return setProfileInfo({...profileInfo , err : "You Did Not Change Anything" , success:""})
        }

        try {
            const res = axios.patch('/user/update_profile' , {founder_location , contact_person , contact_email , company_linkedin},{
                headers : {Authorization : token} 
            })

            navigate("/preferences")

        } catch (error) {
            setProfileInfo({...profileInfo, err: error.response.data.msg , success: ''})
        }
    }

    return(
        <>
        {user_check ? 
            <>
                {err && showErrMsg(err)}
                <div className='profile_steps_container investor-profile'>
                   
                    <div className='tab_container'>
                        {/* <img src={logo}/> */}
                        <h1>Welcome to FundaPitch {user.name}!</h1>
                        <div className='steps_container'>
                            <i >1</i>
                            <h4 onClick={() => navigate("/complete_profile")}>Personal Profile</h4>
                        </div>
                        <div className='steps_container step_investing'>
                            <i  style={{background : "rgb(0 15 226)"}}>2</i>
                            <h4 onClick={() => navigate("/investor_profile")} style={{color : "white"}}>Investing Profile</h4>
                        </div>
                        <div className='steps_container step_previous'>
                            <i>3</i>
                            <h4 onClick={() => navigate("/preferences")}>Investment Preferences</h4>
                        </div>
                    </div>

                    <div className='login-form-container '>

                        <div className='login-headings'>
                            <h2><img src={investing}/>Investing profile</h2>
                            <span>- Stage and range</span>      
                        </div>

                        <form>
                            <div className='second_form_section common_register'>
                                {/* <input value={currency} onChange={onValueChange} placeholder='Currency' className='forminput' type='text' name='currency'/> */}
                                <TextField variant="outlined" id="outlined-select-currency" select label="Currency" value={currency} onChange={onValueChange} name='currency' fullWidth>
                                    <MenuItem value="USD"> USD </MenuItem>
                                    <MenuItem value="EUR"> EUR </MenuItem>
                                    <MenuItem value="GBP"> GBP </MenuItem>
                                    <MenuItem value="AED"> AED </MenuItem>
                                    <MenuItem value="INR"> INR </MenuItem>
                                </TextField>
                            </div>
                            <div className='second_form_section common_register'>
                                {/* <input value={min_investment} onChange={onValueChange} placeholder='Min_investment' className='forminput' type='text' name='min_investment'/> */}
                                <TextField fullWidth id="outlined-basic" label="Min_investment" variant="outlined" name='min_investment' value={min_investment} type='text' onChange={onValueChange}/>
                            </div>
                            <div className='second_form_section common_register'>
                                {/* <input value={max_invesment} onChange={onValueChange} placeholder='Max_invesment' className='forminput' type='text' name='max_invesment'/> */}
                                <TextField fullWidth  id="outlined-basic" label="Max_invesment" variant="outlined" name='max_invesment' value={max_invesment} type='text' onChange={onValueChange}/>
                            </div>
                            <div className='second_form_section common_register'>
                                {/* <input value={sectors} onChange={onValueChange} placeholder='sectors' className='forminput' type='text' name='sectors'/> */}
                                <TextField fullWidth  id="outlined-basic" label="Sectors" variant="outlined" name='sectors' value={sectors} type='text' onChange={onValueChange}/>
                            </div>
                            
                            
                            <div className='third_form_section'>
                                <button type='submit' onClick={() => navigate("/complete_profile")}>Back</button>
                                <button type='submit' onClick={updateInfor}>Next</button>
                            </div>
                                <button className='skip_investor' type='submit' onClick={() => navigate("/preferences")}>Skip</button>

                        </form>

                    </div>

                </div>
            </>

            :

            <>
            {err && showErrMsg(err)}
            
            <div className='profile_steps_container investor-profile'>
 
                <div className='tab_container'>
                    {/* <img src={logo}/> */}
                    <h1>Welcome to FundaPitch {user.name}!</h1>
                    <div className='steps_container'>
                        <i >1</i>
                        <h4 onClick={() => navigate("/complete_profile")}>Personal Profile</h4>
                    </div>
                    <div className='steps_container step_investing'>
                        <i  style={{background : "rgb(0 15 226)"}}>2</i>
                        <h4 onClick={() => navigate("/investor_profile")} style={{color : "white"}}>Company Overview</h4>
                    </div>
                    <div className='steps_container step_previous'>
                        <i>3</i>
                        <h4 onClick={() => navigate("/preferences")}>Investment Preferences</h4>
                    </div>
                </div>

                <div className='login-form-container'>

                    <div className='login-headings'>
                        <h2>Company Overview</h2>
                        <span>Company Contact</span>      
                    </div>

                    <form>

                        <div className='second_form_section common_register'>
                            <TextField fullWidth  id="outlined-basic" label="Founder Location" variant="outlined" name='founder_location' value={founder_location} type='text' onChange={onValueChange}/>
                        </div>

                        <div className='second_form_section common_register'>
                            <TextField fullWidth  id="outlined-basic" label="Contact Person" variant="outlined" name='contact_person' value={contact_person} type='text' onChange={onValueChange}/>
                        </div>

                        <div className='second_form_section common_register'>
                            <TextField fullWidth  id="outlined-basic" label="Contact Email" variant="outlined" name='contact_email' value={contact_email} type='text' onChange={onValueChange}/>
                        </div>

                        <div className='second_form_section common_register'>
                            <TextField fullWidth  id="outlined-basic" label="Company Linkedin" variant="outlined" name='company_linkedin' value={company_linkedin} type='text' onChange={onValueChange}/>
                        </div>
                        
                        <div className='third_form_section'>
                            <button type='submit' onClick={() => navigate("/complete_profile")}>Back</button>
                            <button type='submit' onClick={updatefounderInfo}>Next</button>
                        </div>
                        <button className='skip_investor' type='submit' onClick={() => navigate("/preferences")}>Skip</button>

                    </form>

                </div>

            </div>
        </>


        }
        </>
    )
}

export default InvestorProfile;