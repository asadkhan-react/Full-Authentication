import React, { useState } from 'react';
import login from '../../../assets/login.jpeg'
import {Link , useNavigate} from 'react-router-dom'
import axios from 'axios' ;
import {showErrMsg , showSuccessMsg} from '../../utils/notificaton/Notification'
import {dispatchLogin} from '../../../redux/actions/authAction';
import { useSelector , useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import personal from '../../../assets/personal.svg'

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
    err : "" ,
    success : "" ,
    company_name : "",
    dba : "",
    founder_website : "" ,
    tagline : "",
    sector : "",
    specializtation: "" ,
    revenue_stream: "" ,
    founder_business_model: "",
    bio:""
}
function EditYourProfile() {
    const [profileInfo , setProfileInfo] = useState(initialState)
    const auth = useSelector(state => state.authReducer)
    const token = useSelector(state => state.tokenReducer)
    const {user , isAdmin} = auth
    
    const {bio , expertise , location  , accredited_investor , website_url , linkedin , sector , company_name , dba , founder_website , tagline , specializtation, revenue_stream , founder_business_model , err , success} = profileInfo
    const {profile_type , user_check} = user

    const navigate = useNavigate();

    const onValueChange = (e) => {
        const {name , value} = e.target;
        setProfileInfo({...profileInfo , [name] : value})
        console.log(profileInfo)
    }

    const updateInfor = (e) => {
        e.preventDefault()
        if(!expertise , !location  , !accredited_investor , !website_url , !linkedin){
            window.scroll(0 , 0)
            return setProfileInfo({...profileInfo , err : "You Did Not Change Anything" , success:""})
        }
        try {
            const res = axios.patch('/user/update_profile' , {bio , expertise  , location , profile_type , linkedin , website_url , accredited_investor , sector , company_name , dba , founder_website , tagline , specializtation, revenue_stream , founder_business_model},{
                headers : {Authorization : token} 
            })
            navigate("/investor_profile")

        } catch (error) {
            setProfileInfo({...profileInfo, err: error.response.data.msg , success: ''})
        }
    }

    const updatefounderInfo = (e) => {
        e.preventDefault()
        if(!sector , !company_name , !dba , !founder_website , !tagline , !specializtation, !revenue_stream , !founder_business_model){
            window.scroll(0 , 0)
            return setProfileInfo({...profileInfo , err : "You Did Not Change Anything" , success:""})
        }
        try {
            const res = axios.patch('/user/update_profile' , {bio , profile_type , sector , company_name , dba , founder_website , tagline , specializtation, revenue_stream , founder_business_model},{
                headers : {Authorization : token} 
            })
            navigate("/investor_profile")
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
                            <i style={{background : "rgb(0 15 226)"}}>1</i>
                            <h4 onClick={() => navigate("/complete_profile")} style={{color : "white"}}>Personal Profile</h4>
                        </div>
                        <div className='steps_container step_investing'>
                            <i>2</i>
                            <h4 onClick={() => navigate("/investor_profile")}>Investing Profile</h4>
                        </div>
                        <div className='steps_container step_previous'>
                            <i>3</i>
                            <h4 onClick={() => navigate("/preferences")}>Preferences</h4>
                        </div>
                    </div>

                    <div className='login-form-container'>

                        <div className='login-headings'>
                            <h2><img src={personal}/>Personal profile</h2>
                            <span>- Basic details</span>      
                        </div>

                        <form>

                            <div className='first_form_section'>
                                <TextField fullWidth  id="outlined-basic" label="Expertise" variant="outlined" name='expertise' value={expertise} type='text' onChange={onValueChange}/>
                            </div>
                            <div className='second_form_section common_register'>
                                <TextField fullWidth  id="outlined-basic" label="Location" variant="outlined" name='location' value={location} type='text' onChange={onValueChange}/>
                            </div>
                            <div className='second_form_section common_register'>
                                <TextField variant="outlined" id="outlined-select-currency" select label="Are you an accredited investor" value={accredited_investor} onChange={onValueChange} name='accredited_investor' fullWidth>
                                    <MenuItem value="Yes, I have between $2.1M and $5M in investments"> Yes, I have between $2.1M and $5M in investments </MenuItem>
                                    <MenuItem value="Yes, I have at least $5M in investments"> Yes, I have at least $5M in investments </MenuItem>
                                    <MenuItem value="Yes, I have between $1M and $2.1M in investments">Yes, I have between $1M and $2.1M in investments</MenuItem>
                                    <MenuItem value="Yes, I have income of $200k (or $300k jointly with spouse) for each of the past 2 years and expect same for this year">Yes, I have income of $200k (or $300k jointly with spouse) for each of the past 2 years and expect same for this year</MenuItem>
                                </TextField>
                            </div>
                            <div className='second_form_section common_register'>
                                <TextField fullWidth  id="outlined-basic" label="Website URL" variant="outlined" name='website_url' value={website_url} type='url' onChange={onValueChange}/>
                            </div>
                            <div className='second_form_section common_register'>
                                {/* <input value={linkedin} onChange={onValueChange} placeholder='Linkedin' className='forminput' type='text' name='linkedin'/> */}
                                <TextField fullWidth  id="outlined-basic" label="Linkedin" variant="outlined" name='linkedin' value={linkedin} type='url' onChange={onValueChange}/>
                            </div>
                            <div className='second_form_section common_register'>
                                {/* <input value={linkedin} onChange={onValueChange} placeholder='Linkedin' className='forminput' type='text' name='linkedin'/> */}
                                <TextField fullWidth  id="outlined-basic" label="Bio" variant="outlined" name='bio' value={bio} type='text' onChange={onValueChange}/>
                            </div>
                            
                            <div className='third_form_section'>
                                <button type='submit' onClick={() => navigate("/investor_profile")}>Skip</button>
                                <button type='submit' onClick={updateInfor}>Next</button>
                            </div>

                        </form>

                    </div>
                </div>
            </>

            :

            <>
                {err && showErrMsg(err)}
                
                <div className='profile_steps_container'>

                    <div className='tab_container'>
                        {/* <img src={logo}/> */}
                        <h1>Welcome to FundaPitch {user.name}!</h1>
                        <div className='steps_container'>
                            <i style={{background : "rgb(0 15 226)"}}>1</i>
                            <h4 onClick={() => navigate("/complete_profile")} style={{color : "white"}}>Personal Profile</h4>
                        </div>
                        <div className='steps_container step_investing'>
                            <i>2</i>
                            <h4 onClick={() => navigate("/investor_profile")}>Company Overview</h4>
                        </div>
                        <div className='steps_container step_previous'>
                            <i>3</i>
                            <h4 onClick={() => navigate("/preferences")}>Problems and Solutions</h4>
                        </div>
                    </div>                    
                    
                    <div className='login-form-container'>

                        <div className='login-headings'>
                            <h2>Company Overview</h2>
                            <span>-Company Bio</span>      
                        </div>

                        <form>

                            <div className='first_form_section'>
                                <TextField fullWidth  id="outlined-basic" label="Company_name" variant="outlined" name='company_name' value={company_name} type='text' onChange={onValueChange}/>
                            </div>
                            <div className='second_form_section common_register'>
                                <TextField fullWidth  id="outlined-basic" label="Doing Business as Name" variant="outlined" name='dba' value={dba} type='text' onChange={onValueChange}/>
                            </div>

                            <div className='second_form_section common_register'>
                                <TextField fullWidth  id="outlined-basic" label="Website URL" variant="outlined" name='founder_website' value={founder_website} type='url' onChange={onValueChange}/>
                            </div>

                            <div className='second_form_section common_register'>
                                <TextField fullWidth  id="outlined-basic" label="Tagline" variant="outlined" name='tagline' value={tagline} type='text' onChange={onValueChange}/>
                            </div>

                            <div className='second_form_section common_register'>
                                <TextField fullWidth  id="outlined-basic" label="Sector" variant="outlined" name='sector' value={sector} type='text' onChange={onValueChange}/>
                            </div>

                            <div className='second_form_section common_register'>
                                <TextField fullWidth  id="outlined-basic" label="Bio" variant="outlined" name='bio' value={bio} type='text' onChange={onValueChange}/>
                            </div>

                            <div className='second_form_section common_register'>
                                <TextField fullWidth  id="outlined-basic" label="Specializtation" variant="outlined" name='specializtation' value={specializtation} type='text' onChange={onValueChange}/>
                            </div>

                            <div className='second_form_section common_register'>
                                <TextField fullWidth  id="outlined-basic" label="Revenue Stream" variant="outlined" name='revenue_stream' value={revenue_stream} type='text' onChange={onValueChange}/>
                            </div>

                            <div className='second_form_section common_register'>
                                <TextField fullWidth  id="outlined-basic" label="Founder Business Model" variant="outlined" name='founder_business_model' value={founder_business_model} type='text' onChange={onValueChange}/>
                            </div>
                            
                            <div className='third_form_section'>
                                <button type='submit' onClick={() => navigate("/investor_profile")}>Skip</button>
                                <button type='submit' onClick={updatefounderInfo}>Next</button>
                            </div>

                        </form>

                    </div>

                </div>
            </>
    
        }
        
        

        

            
        

        
        </>
    )
}

export default EditYourProfile;