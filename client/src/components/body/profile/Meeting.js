import React , {useEffect, useState} from 'react';
import Header from '../../header/Header';
import {useSelector , useDispatch} from 'react-redux';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import {showSuccessMsg, showErrMsg} from '../../utils/notificaton/Notification';
import {fetchAllUsersForAll , fetchAllUsersTwoForAll , dispatchGetAllUsersForAll , dispatchGetAllUsersTwoForAll} from '../../../redux/actions/usersAction'
import moment from 'moment';
import 'moment-timezone';
import {DateTime} from 'luxon';
import Coutries from './Coutries';
import newCountries from './newCountries';


function Meeting () {
    const [allEmails , setAllEmails] = useState([]);
    const [response , setResponse] = useState();
    const [getCountry , GetSetCountry] = useState();
    const [timevalue, setTimeValue] = useState();
    const [value, setValue] = useState();

    const auth = useSelector(state => state.authReducer)
    const {user} = auth

    const usersforAll = useSelector(state => state.usersReducerForAll)
    const usersTwoForAll = useSelector(state => state.usersReducerTwoForAll)
    const token = useSelector(state => state.tokenReducer);

    const dispatch = useDispatch()

    useEffect(()=>{
        fetchAllUsersForAll(token).then(res => {
            dispatch(dispatchGetAllUsersForAll(res))
        })
    } , [token, dispatch])
    useEffect(()=>{
        fetchAllUsersTwoForAll(token).then(res => {
            dispatch(dispatchGetAllUsersTwoForAll(res))
        })
    } , [token, dispatch])
    const sendAll = async() => {
        try{
            const res =  await axios.post(`/user/meeting` , {userName : user.name , country : getCountry, email : allEmails.map((e)=>e.email) , date : moment(value).format('YYYY-MMMM-DD') , time : moment(timevalue).format('hh:mm a')} , {headers : {Authorization : token}})

            setResponse(res.data)
        }catch(err){
            console.log(err)
        }
    }
    const AllemailChange = (e) => {
        try{
            
                setAllEmails([...allEmails , { id : e.target.value._id , name : e.target.value.name, email : e.target.value.email}])
                // console.log(allEmails)
                
        }catch(error){
            console.log(error)
        }

    }
    const clear = (e) => {
        setAllEmails([])
        console.log(usersforAll)
        console.log(usersTwoForAll)
    }
    const onTimeValue = (e) => {
        setTimeValue(e.$d)
    }
    const onDateValue = (e) => {
        setValue(e.$d)
    }
    const onChangeCountry = (e) => {
        GetSetCountry(e.target.value)
    }

    return (
        <>
            <Header />

            {response && showSuccessMsg(response)}
            <div className='meeting-container'>
                <div className='metting_profile'>
                    <div className='meeting_user_info'>
                        <img src={user.avatar}/>
                        <h4>{user.name}</h4>
                        <h3>FundaPitch Demo</h3>
                    </div>
                    <div className='meeting_user_details'>
                        <h3>Details</h3>
                        <div><i class="fa fa-clock-o" aria-hidden="true"></i><span>30 minutes</span></div>
                        <div><i class="fa fa-video-camera" aria-hidden="true"></i><span>Video Conference Zoom</span></div>
                    </div>
                </div>


                <div className='meeting_schedule'>
                
                    <TextField value={getCountry} onChange={onChangeCountry} className='schedule_selection time_zone_selection' select  variant="outlined" id="outlined-select-currency" label="Select TimeZone">
                        {newCountries.map((e)=>{
                            return <MenuItem value={e.name + " " + e.utcTime}>{e.utcTime}&nbsp;&nbsp;({e.name})</MenuItem>
                        })}

                    </TextField>
                    {/* <button>{utcTime}</button> */}

                    <div className='schedule_header'>

                        <TextField className='schedule_selection' select value={allEmails} onChange={AllemailChange} variant="outlined" id="outlined-select-currency" label="Select" >
                            
                            {usersforAll.map((parameter)=>{
                                if(parameter.role === 1){
                                    return(
                                            <MenuItem key={parameter._id} value={parameter}>{parameter.name}</MenuItem>
                                    )
                                }
                            })}
                            
                            {usersTwoForAll.map((parameter)=>{
                                if(parameter.role === 1){
                                    return(
                                            <MenuItem key={parameter._id} value={parameter}> {parameter.name} </MenuItem>
                                    )
                                }
                            })}
                        </TextField>
                        
                        <div className='tag_container'>
                            {allEmails.map((parameter)=>{
                                // console.log(parameter)
                                return(        
                                    <div className='tag'>{parameter.name}</div>
                                )
                            })}
                        </div>

                        <div className='schedule_buttons'>
                                    <button onClick={clear}>Clear</button><br/>
                                    <button onClick={sendAll}>Send Schedule</button><br/>
                        </div>

                    </div>

                    <div className='schedule_pickers'>
                        <div className='timepicker uniuqe_class_time'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <StaticTimePicker
                                    ampm
                                    orientation="landscape"
                                    openTo="minutes"
                                    value={timevalue}
                                    onChange={(newValue) => onTimeValue(newValue)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>

                        <div className='timepicker'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <StaticDatePicker
                                orientation="landscape"
                                openTo="day"
                                value={value}
                                onChange={(newValue) => onDateValue(newValue)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        </div>
                    </div>

                </div>   
            </div> 
        </>
    )
}

export default Meeting;