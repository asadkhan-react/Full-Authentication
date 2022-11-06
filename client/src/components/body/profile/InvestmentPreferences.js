import React, { useState } from 'react';
import login from '../../../assets/login.jpeg'
import {Link , useNavigate} from 'react-router-dom'
import axios from 'axios' ;
import {showErrMsg , showSuccessMsg} from '../../utils/notificaton/Notification'
import {dispatchLogin} from '../../../redux/actions/authAction';
import { useSelector , useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
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
    problem : "",
    solution : "",
    sales_channel : "" ,
    err : "" ,
    success : ""
}
function InvestmentPreferences() {
    const [profileInfo , setProfileInfo] = useState(initialState)
    const auth = useSelector(state => state.authReducer)
    const token = useSelector(state => state.tokenReducer)
    const {user , isAdmin} = auth

    const {business_model , most_interested  , not_interested , target_location , problem , solution , sales_channel , err , success} = profileInfo
    const {profile_type , user_check} = user
    const navigate = useNavigate();

    const onValueChange = (e) => {
        const {name , value} = e.target;
        setProfileInfo({...profileInfo , [name] : value})
        console.log(profileInfo)
    }

    const updateInfor = (e) => {
        e.preventDefault()
        if(!business_model , !most_interested  , !not_interested , !target_location){
            window.scroll(0 , 0)
            return setProfileInfo({...profileInfo , err : "You Did Not Change Anything" , success:""})
        }

        try {
            const res = axios.patch('/user/update_profile' , {business_model , most_interested , profile_type , not_interested , target_location},{
                headers : {Authorization : token} 
            })

            navigate("/profile")

        } catch (error) {
            setProfileInfo({...profileInfo, err: error.response.data.msg , success: ''})
        }
    }
    
    const updatefounderInfo = (e) => {
        e.preventDefault()
        if(!problem , !solution , !sales_channel){
            window.scroll(0 , 0)
            return setProfileInfo({...profileInfo , err : "You Did Not Change Anything" , success:""})
        }
        try {
            const res = axios.patch('/user/update_profile' , {profile_type , problem , solution , sales_channel},{
                headers : {Authorization : token} 
            })
            navigate("/profile")
        } catch (error) {
            setProfileInfo({...profileInfo, err: error.response.data.msg , success: ''})
        }
    }

    return(
        
        <>
            {user_check ? 
            
                <>
                    {err ? showErrMsg(err) : ""}
                    <div className='profile_steps_container investor-profile'>

                        <div className='tab_container'>
                            {/* <img src={logo}/> */}
                            <h1>Welcome to FundaPitch {user.name}!</h1>
                            <div className='steps_container'>
                                <i >1</i>
                                <h4 onClick={() => navigate("/complete_profile")}>Personal Profile</h4>
                            </div>
                            <div className='steps_container step_investing'>
                                <i>2</i>
                                <h4 onClick={() => navigate("/investor_profile")}>Investing Profile</h4>
                            </div>
                            <div className='steps_container step_previous'>
                                <i style={{background : "rgb(0 15 226)"}}>3</i>
                                <h4 onClick={() => navigate("/preferences")} style={{color : "white"}}>Investment Preferences</h4>
                            </div>
                        </div>

                        <div className='login-form-container'>

                            <div className='login-headings'>
                                <h2><img src={investing}/>Investing profile</h2>
                                <span>- Investment preferences</span>      
                            </div>

                            <form>

                                <div className='second_form_section common_register'>
                                    <TextField fullWidth id="outlined-basic" label="Business_model" variant="outlined" name='business_model' value={business_model} type='text' onChange={onValueChange}/>
                                </div>
                                <div className='second_form_section common_register'>
                                    <TextField fullWidth id="outlined-basic" label="Most_interested" variant="outlined" name='most_interested' value={most_interested} type='text' onChange={onValueChange}/>
                                </div>
                                <div className='second_form_section common_register'>
                                    <TextField fullWidth id="outlined-basic" label="Not_interested" variant="outlined" name='not_interested' value={not_interested} type='text' onChange={onValueChange}/>
                                </div>
                                <div className='second_form_section common_register'>
                                    <TextField fullWidth id="outlined-basic" label="target_location" variant="outlined" name='target_location' value={target_location} type='text' onChange={onValueChange}/>
                                </div>
                                
                                <div className='third_form_section'>
                                    <button type='submit' onClick={() => navigate("/investor_profile")}>Back</button>
                                    <button type='submit' onClick={updateInfor}>Submit</button>
                                </div>
                                <button className='skip_investor' type='submit' onClick={() => navigate("/profile")}>Skip</button>

                            </form>

                        </div>

                    </div>
                </>

                :

                <>
                {err ? showErrMsg(err) : ""}
                
                <div className='profile_steps_container investor-profile'>

                    <div className='tab_container'>
                        {/* <img src={logo}/> */}
                        <h1>Welcome to FundaPitch {user.name}!</h1>
                        <div className='steps_container'>
                            <i >1</i>
                            <h4 onClick={() => navigate("/complete_profile")}>Personal Profile</h4>
                        </div>
                        <div className='steps_container step_investing'>
                            <i>2</i>
                            <h4 onClick={() => navigate("/investor_profile")}>Comapny Overview</h4>
                        </div>
                        <div className='steps_container step_previous'>
                            <i style={{background : "rgb(0 15 226)"}}>3</i>
                            <h4 onClick={() => navigate("/preferences")} style={{color : "white"}}>Problem and Solution</h4>
                        </div>
                    </div>

                    <div className='login-form-container'>

                        <div className='login-headings'>
                            <h2>Company Overview</h2>
                            <span>Problem and Solution</span>      
                        </div>

                        <form>

                            <div className='first_form_section'>
                                <TextField fullWidth  id="outlined-basic" label="What is the problem you are solving" variant="outlined" name='problem' value={problem} type='text' onChange={onValueChange}/>
                            </div>
                            <div className='second_form_section common_register'>
                                <TextField fullWidth  id="outlined-basic" label="What does your product do" variant="outlined" name='solution' value={solution} type='text' onChange={onValueChange}/>
                            </div>

                            <div className='second_form_section common_register'>
                                <TextField fullWidth  id="outlined-basic" label="What Sales Channel will use" variant="outlined" name='sales_channel' value={sales_channel} type='url' onChange={onValueChange}/>
                            </div>

                            <div className='third_form_section'>
                                <button type='submit' onClick={() => navigate("/investor_profile")}>Back</button>
                                <button type='submit' onClick={updatefounderInfo}>Next</button>
                            </div>
                                <button className='skip_investor' type='submit' onClick={() => navigate("/profile")}>Skip</button>

                        </form>

                    </div>

                </div>
            </>
        
            }
        </>
    )
}

export default InvestmentPreferences;