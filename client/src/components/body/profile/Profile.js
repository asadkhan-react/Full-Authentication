import React, { useState , useEffect } from 'react';
import Header from '../../header/Header'
import {Link , useNavigate} from 'react-router-dom'
import {showErrMsg , showSuccessMsg} from '../../utils/notificaton/Notification'
import { useSelector , useDispatch } from 'react-redux';
import {fetchAllUsers, dispatchGetAllUsers , fetchAllUsersForVisitors , dispatchGetAllUsersForVisitors , fetchAllUsersTwo , dispatchGetAllUsersTwo} from '../../../redux/actions/usersAction'
import axios from 'axios' ;
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

const customStyles = {
    content: {
      position: 'absolute',
      width : '50%' ,
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const initialState = {
    name: '' ,
    password : '' ,
    cf_password : '',
    err : '' ,
    success : ''
}

function Profile(){
    const navigate = useNavigate()

    const auth = useSelector(state => state.authReducer)
    const token = useSelector(state => state.tokenReducer)
    const users = useSelector(state => state.users)
    const usersTwo = useSelector(state => state.usersReducerTwo)
    const visitorUsers = useSelector(state => state.visitorUsers)

    const {user , isAdmin} = auth
    const [data , setData] = useState(initialState);
    const {name , password , cf_password , err , success} = data;

    const {profile_type , user_check , role, approved} = user
    const [avatar , setAvatar] = useState(false)
    const [intro_video , setChangeVideo] = useState(false)
    const [checkVideo , setCheckVideo] = useState(false)
    const [official_doc , setChangeSoc] = useState(false)
    const [loading , setLoading] = useState(false)
    const [callback , setCallback] = useState(false)

    if(user.intro_video === ""){
        setCheckVideo(true)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then(res => {
                dispatch(dispatchGetAllUsers(res))
            })
        }
    } , [token , isAdmin , dispatch , callback])

    useEffect(() => {
        if(isAdmin){
            fetchAllUsersTwo(token).then(res => {
                dispatch(dispatchGetAllUsersTwo(res))
            })
        }
    } , [token , isAdmin , dispatch , callback])

    useEffect(()=>{
        fetchAllUsersForVisitors(token).then(res => {
            dispatch(dispatchGetAllUsersForVisitors(res))
        })
    } , [token, dispatch])


    const onValueChange = (e) => {
        const {name , value} = e.target
        setData({...data, [name]:value , err:'' , success:''})
    }

    const isLength = password => {
        if(password.length < 6) return true
        return false
    }

    const isMatch = (password , cf_password) => {
        if(password === cf_password) return true
        return false
    }

    const changeAvatar = async(e) => {
        try {
            const file = e.target.files[0]

            if(!file) return setData({...data, err: "No files were uploaded." , success: ''})

            if(file.size > 1024 * 1024)
                return setData({...data, err: "Size too large." , success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setData({...data, err: "File format is incorrect." , success: ''})

            let formData = new FormData()
            formData.append('file' , file)

            setLoading(true);
            const res = await axios.post('/api/upload_avatar' , formData , {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setAvatar(res.data)

        } catch (error) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const changevideo = async(e) => {
        try {
            const file = e.target.files[0]

            let formData = new FormData()
            formData.append('file' , file)

            setLoading(true);
            const res = await axios.post('/api/upload_video' , formData , {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false);
            setChangeVideo(res.data)

        } catch (error) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const changeDoc = async(e) => {
        try {
            const file = e.target.files[0]

            let formData = new FormData()
            formData.append('file' , file)

            setLoading(true);
            const res = await axios.post('/api/upload_docs' , formData , {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false);
            setChangeSoc(res.data)

        } catch (error) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const updateInfor = () => {
        try {
            axios.patch('/user/update' , {
                name : name ? name : user.name ,
                avatar : avatar ? avatar : user.avatar ,
                intro_video : intro_video ? intro_video : user.intro_video ,
                official_doc : official_doc ? official_doc : user.official_doc ,
                profile_type
            },{
                headers : {Authorization : token} 
            })
            setData({...data, err: '' , success: "Updated Success!"})
        } catch (error) {
            setData({...data, err: error.response.data.msg , success: ''})
        }
    }

    const updatePassword = () => {
        if(isLength(password))
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})

        try {
            const res = axios.post('/user/reset' , {password , profile_type} , {
                headers : {Authorization : token}
            })
            setData({...data, err: '' , success: "Updates Success"})
        } catch (error) {
            setData({...data, err: error.response.data.msg , success: ''})
        }
    }

    const handleUpdate = () => {
        if(name || avatar || intro_video || official_doc) updateInfor();
        if(password) updatePassword();
        window.scroll(0, 0)
    }

    const handleDelete = async(id) => {
        try {
            if(user._id ==id){
                window.confirm("You can not delete yourself")
            }

            if(user._id !==id){
                if(window.confirm(`Are you sure you want to delete this user?`)){
                    setLoading(true)
                    await axios.delete(`/user/delete/${id}` , {
                        headers : {Authorization : token}
                    })
                    setLoading(false)
                    setCallback(!callback)
                    toast("user deleted successfully")
                }
            }
        } catch (error) {
            setData({...data, err: error.response.data.msg , success: ''})
            toast("user can't deleted")
        }
    }

    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalvalue , SetModalValue] = useState({});

    const viewModal = (data) => {
        setIsOpen(true)
        SetModalValue(data)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return(
        <>
        <Header />
        <div>
            <ToastContainer />
        </div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <div className='profile_container'>

            <div className='profile_heading_container'>
                <h2>Thank you for being an important part of Our Journey</h2>
                <button className='profile_complete'>Get 7x more relevant portfolios when you complete your profile. <button onClick={()=>navigate('/meeting')}>Meeting</button><button onClick={()=>navigate('/complete_profile')}>Edit Profile</button></button>
            </div>
            
            <div className='profile_first'>

                <div className='profile_first_childOne childeOne_first'>
                    <div className='first_row_container'>
                        <div className='label_image_container'>
                            <label>
                                <img src={avatar ? avatar : user.avatar} className='profile_image' /> <br/>
                            </label>
                            
                            <div className='labels_container'>
                                <h2>{user.name}</h2>
                                <h3 style={{textTransform : "uppercase"}}>{isAdmin ? "(Admin Profile)" : `${user.profile_type} profile`}</h3>
                            </div>
                        </div>
                        <i onClick={()=>navigate('/complete_profile')} class="fa fa-pencil" aria-hidden="true"></i>
                    </div>

                    {loading && <i class='loader fa fa-spinner'></i>}

                    <div className='second_row_container'>
                        <label>Bio</label>
                        <p>{user.bio}</p>
                    </div>

                    {user_check ? 
                    <>

                        <div className='third_row_container'>

                            <div className='common_investor_profile'>
                                <label className='labels'>Location</label>
                                <label>{user.location}</label>
                            </div>
                            <div className='common_investor_profile'>
                                <label className='labels'>Sector</label>
                                <label>{user.sectors}</label>
                            </div>
                            <div className='common_investor_profile'>
                                <label className='labels'>{"Target Location"}</label>
                                <label>{user.target_location}</label>
                            </div>

                        </div>

                        <div className='third_row_container'>
                            
                            <div className='common_investor_profile'>
                                <label className='labels'>{user_check ? "Expertise" : "Problem" }</label>
                                <label>{user_check ? user.expertise : user.problem}</label>
                            </div>
                            <div className='common_investor_profile'>
                                <label className='labels'>{user_check ? "Most Interested" : "Solution" }</label>
                                <label>{user_check ? user.most_interested : user.solution}</label>
                            </div>
                            <div className='common_investor_profile'>
                                <label className='labels'>Business Model</label>
                                <label>{user_check ? user.business_model : user.founder_business_model}</label>
                            </div>

                        </div> 

                    </>

                    :
                    
                    <>
                        {isAdmin ? 
                        <>
                            <div className='third_row_container'>

                                <div className='common_investor_profile'>
                                    <label className='labels'>Location</label>
                                    <label>{user.founder_location}</label>
                                </div>
                                <div className='common_investor_profile'>
                                    <label className='labels'>Sector</label>
                                    <label>{user.sector}</label>
                                </div>
                                <div className='common_investor_profile'>
                                    <label className='labels'>Tagline</label>
                                    <label>{user.tagline}</label>
                                </div>

                            </div>

                            <div className='third_row_container'>

                                <div className='common_investor_profile'>
                                    <label className='labels'>Problem</label>
                                    <label>{user.problem}</label>
                                </div>
                                <div className='common_investor_profile'>
                                    <label className='labels'>Solution</label>
                                    <label>{user.solution}</label>
                                </div>
                                <div className='common_investor_profile'>
                                    <label className='labels'>Business Model</label>
                                    <label>{user.founder_business_model}</label>
                                </div>

                            </div> 
                        </>

                        :

                        ""
                        }
                    
                    
                    </>
                    }
                    
                   

                    {!isAdmin ? 
                        <>
                            {!user_check && 
                            <>
                            
                            <label className='video_label'><i style={{color : "red" , fontSize : "22px" , marginRight : "10px"}} class="fa fa-file-pdf-o"></i>Detailed Documents</label>
                            <div className='upload_file'>
                                <a target='_blank' href={official_doc ? official_doc : user.official_doc} download><i style={{marginRight : "10px"}} class="fa fa-download"></i>File 1</a>
                                <p>&#40;Please Click on Update to save this file permanently&#41;</p>
                            </div>

                            <label className='video_label'><i style={{color : "#0D103D" , fontSize : "22px" , marginRight : "10px"}} class="fa fa-file-video-o"></i>Video  Introduction</label>
                            <div className='video_introduction'>
                                <video autoplay muted src={intro_video ? intro_video : user.intro_video} height="240" controls></video>
                            </div>
                                                        

                            
                            </>
                            }
                        </>
                        
                        :
                        
                        ""
                    }

                </div>

                
                {
                
                user_check ? 

                <div className='profile_first_childOne childOne_two'>
                    <h1>Profile Details</h1>

                    <div className='third_row_container'>
                        
                        <div className='common_for_thirdrow childOne_two_third'>
                            <label className='labels'>Expertise</label>
                            <label>{user.expertise}</label>
                        </div>

                        <div className='common_for_thirdrow  childOne_two_third'>
                            <label className='labels'>Accredited</label>
                            <label>{user.accredited_investor}</label>
                        </div>

                    </div>

                    <div className='third_row_container'>

                        <div className='common_for_thirdrow  childOne_two_third'>
                            <label className='labels'>Minimum Investment</label>
                            <label>{user.currency + user.min_investment}</label>
                        </div>
                        
                        <div className='common_for_thirdrow childOne_two_third'>
                            <label className='labels'>Maximum Investment</label>
                            <label>{user.currency + user.max_invesment}</label>
                        </div>

                    </div>

                    <div className='third_row_container'>

                        <div className='common_for_thirdrow  childOne_two_third'>
                            <label className='labels'>Contact Person</label>
                            <label>{user.name}</label>
                        </div>
                        
                        <div className='common_for_thirdrow childOne_two_third'>
                            <label className='labels'>Contact Email</label>
                            <label>{user.email}</label>
                        </div>

                    </div>

                    <div className='third_row_container'>

                        <div className='common_for_thirdrow  childOne_two_third'>
                            <label className='labels'>Not Interested</label>
                            <label>{user.not_interested}</label>
                        </div>
                        
                        <div className='common_for_thirdrow childOne_two_third'>
                            <label className='labels'>Social Links</label>
                            <label className='social_links'>
                                <a style={{marginRight : "10px"}} href={user.linkedin}><i class="fa fa-linkedin-square"></i></a>
                                <a href={user.website_url}><i class="fa fa-globe"></i></a>
                            </label>
                        </div>

                    </div>

                </div>

                :

                <div className='profile_first_childOne childOne_two'>
                    <h1>Profile Details</h1>

                    {
                        !isAdmin ? 
                        <>
                            <div className='third_row_container'>
                                <div className='common_for_thirdrow'>
                                    <label className='labels'>Location</label>
                                    <label>{user.founder_location}</label>
                                </div>
                                <div className='common_for_thirdrow'>
                                    <label className='labels'>Sector</label>
                                    <label>{user.sector}</label>
                                </div>

                            </div>

                            <div className='third_row_container'>
                            
                                <div className='common_for_thirdrow'>
                                    <label className='labels'>{user_check ? "Target Location" : "Tagline" }</label>
                                    <label>{user.tagline}</label>
                                </div>

                                <div className='common_for_thirdrow'>
                                    <label className='labels'>{user_check ? "Expertise" : "Problem" }</label>
                                    <label>{user.problem}</label>
                                </div>

                            </div>

                            <div className='third_row_container'>
                                
                                <div className='common_for_thirdrow childOne_two_third'>
                                    <label className='labels'>Solution</label>
                                    <label>{user.solution}</label>
                                </div>
                                
                                <div className='common_for_thirdrow childOne_two_third'>
                                    <label className='labels'>Business Model</label>
                                    <label>user.founder_business_model</label>
                                </div>
                            </div>
                        </>

                        :

                        ""
                        
                    }

                    <div className='third_row_container'>
                        
                        <div className='common_for_thirdrow childOne_two_third'>
                            <label className='labels'>Doing Business As</label>
                            <label>{user.dba}</label>
                        </div>

                        <div className='common_for_thirdrow  childOne_two_third'>
                            <label className='labels'>Company Name</label>
                            <label>{user.company_name}</label>
                        </div>

                    </div>

                    <div className='third_row_container'>

                        <div className='common_for_thirdrow  childOne_two_third'>
                            <label className='labels'>Specializtation</label>
                            <label>{user.specializtation}</label>
                        </div>
                        
                        <div className='common_for_thirdrow childOne_two_third'>
                            <label className='labels'>Revenue Stream</label>
                            <label>{user.revenue_stream}</label>
                        </div>

                    </div>

                    <div className='third_row_container'>

                        <div className='common_for_thirdrow  childOne_two_third'>
                            <label className='labels'>Contact Person</label>
                            <label>{user.contact_person}</label>
                        </div>
                        
                        <div className='common_for_thirdrow childOne_two_third'>
                            <label className='labels'>Contact Email</label>
                            <label>{user.contact_email}</label>
                        </div>

                    </div>

                    <div className='third_row_container'>

                        <div className='common_for_thirdrow  childOne_two_third'>
                            <label className='labels'>Sales Channel</label>
                            <label>{user.sales_channel}</label>
                        </div>
                        
                        <div className='common_for_thirdrow childOne_two_third'>
                            <label className='labels'>Social Links</label>
                            <label className='social_links'>
                                <a style={{marginRight : "10px"}} href={user.company_linkedin}><i class="fa fa-linkedin-square"></i></a>
                                <a href={user.founder_website}><i class="fa fa-globe"></i></a>
                            </label>
                        </div>

                    </div>

                </div>

                }


                    
                <div className='profile_first_childtwo update_settings'>

                    <h2>Update Settings</h2>

                    <div className='childtwo_sections'>
                        <label>Name:</label>
                        <input  type='text' name='name' onChange={onValueChange}/>
                    </div>

                    <div className='childtwo_sections'>
                        <label>Email:</label>
                        <input type='text' name='email' value={user.email} disabled/>
                    </div>

                    <div className='childtwo_sections'>
                        <label>Change Picture</label>
                        <input type='file' name='file' onClick={() => window.scroll(0 , 0)} onChange={changeAvatar}/>
                    </div>

                    {
                        !isAdmin ? 
                        <>
                            {!user_check && 
                            <>
                                <div className='childtwo_sections'>
                                    <label> Video Introduction <i class="video_icon fa fa-plus" aria-hidden="true"></i></label>
                                    <input type='file' name='file' onClick={() => window.scroll(0 , 0)} onChange={changevideo} />
                                </div>
            
                                <div className='childtwo_sections'>
                                    <label for='uploadfile'>Upload Documents <i class="video_icon fa fa-plus" aria-hidden="true"></i></label>
                                    <input type='file' name='file' onClick={() => window.scroll(0 , 0)} onChange={changeDoc}/>
                                </div>
                            </>
                            }
                        </>

                        :

                        ""
                    }

                    <div className='childtwo_sections'>
                        <label>Password:</label>
                        <input type='password' name='password' onChange={onValueChange} value={password}/>
                    </div>

                    <div className='childtwo_sections'>
                        <label>Confirm Password:</label>
                        <input type='password' name='cf_password' onChange={onValueChange} value={cf_password}/>
                    </div>

                    <button disabled={loading} className='update' onClick={handleUpdate}>Update Changes</button>

                </div>
            </div>

            <div className='profile_second_container'>

                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{customStyles}}>
                        <i onClick={closeModal} class="close_button fa fa-window-close" aria-hidden="true"></i>

                        <div className='first_modal_container'>
                            <div className='modal_image_conatiner'>
                                <img src={modalvalue.avatar}/>
                                <div className='modal_label_container'>
                                    <h3>{modalvalue.name}</h3>
                                    <label>({modalvalue.profile_type})</label>
                                </div>
                            </div>
                            
                            <div className='modal_info_container'>

                            </div>
                        </div>
                        <p>{modalvalue.bio}</p>
                </Modal>

                {
                    isAdmin &&
                    <>

                        <div className='profile_second_users'>
                            <h2>Here you can see all the admins</h2>
                            <p>You can delete , approve and view any profile.</p>
                            <div className='profile_second'>
                            {
                                users.map((parameter)=>{           
                                    return(
                                        <>
                                        {parameter.role ? 
                                            <div className='user_card'>

                                                <div className='user_image_title'>
                                                    <div className='user_image'>
                                                        <img className='user_card_img' src={parameter.avatar}/>
                                                        <label className='user_name'>{parameter.name}</label>
                                                    </div>
                                                    <i onClick={() => viewModal(parameter)} class="eye_button fa fa-eye"></i>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Business Model</label>
                                                    <label className='valuelabel'>{parameter.user_check ? parameter.business_model : parameter.founder_business_model}</label>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Role</label>
                                                    <label className='valuelabel'>{parameter.role ? "Admin" : parameter.profile_type}</label>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Location</label>
                                                    <label className='valuelabel'>{parameter.user_check ? parameter.location : parameter.founder_location}</label>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Sectors</label>
                                                    <label className='valuelabel'>{parameter.user_check ? parameter.sectors : parameter.sector}</label>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Business Target</label>
                                                    <label className='valuelabel'>{parameter.user_check ? parameter.target_location : parameter.founder_business_model}</label>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Status</label>
                                                    <label className='valuelabel'>{parameter.approved ? "Approved" : "Not Approved"}</label>
                                                </div>

                                                <div className='user_card_buttons'>
                                                    <Link to={`/edit_user/${parameter._id}`}><i class="fa edit_user fa-pencil" aria-hidden="true"></i>Edit</Link>
                                                    <a onClick={() => handleDelete(parameter._id)}><i class="fa delete_user fa-trash-o" aria-hidden="true"></i>Delete</a>
                                                </div>
                                            </div>

                                            :

                                            ""
                                        }
                                        </>
                                    )
                                })
                            }

                            {
                                usersTwo.map((parameter)=>{           
                                    return(
                                        <>  
                                        {parameter.role ?
                                            <div className='user_card'>

                                                <div className='user_image_title'>
                                                    <div className='user_image'>
                                                        <img className='user_card_img' src={parameter.avatar}/>
                                                        <label className='user_name'>{parameter.name}</label>
                                                    </div>
                                                    <i onClick={() => viewModal(parameter)} class="eye_button fa fa-eye"></i>
                                                </div>


                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Business Model</label>
                                                    <label className='valuelabel'>{parameter.user_check ? parameter.business_model : parameter.founder_business_model}</label>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Role</label>
                                                    <label className='valuelabel'>{parameter.role ? "Admin" : parameter.profile_type}</label>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Location</label>
                                                    <label className='valuelabel'>{parameter.user_check ? parameter.location : parameter.founder_location}</label>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Sectors</label>
                                                    <label className='valuelabel'>{parameter.user_check ? parameter.sectors : parameter.sector}</label>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Business Target</label>
                                                    <label className='valuelabel'>{parameter.user_check ? parameter.target_location : parameter.founder_business_model}</label>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Status</label>
                                                    <label className='valuelabel'>{parameter.approved ? "Approved" : "Not Approved"}</label>
                                                </div>

                                                <div className='user_card_buttons'>
                                                    <Link to={`/edit_user/${parameter._id}`}><i class="fa edit_user fa-pencil" aria-hidden="true"></i>Edit</Link>
                                                    <a onClick={() => handleDelete(parameter._id)}><i class="fa delete_user fa-trash-o" aria-hidden="true"></i>Delete</a>
                                                </div>
                                            </div>      
                                            
                                            :

                                            ""
                                        }
                                        </>
                                    )
                                })
                            }

                            </div>
                        </div>
                    </>


                }
                {
                    isAdmin &&
                    <>
                        <div className='profile_second_users profile_founder_users'>
                            <h2>Here you can see all the Investors</h2>
                            <p>You can visit the best founders and can grow your business.</p>

                            <div className='profile_second'>
                            {
                                users.map((parameter)=>{           
                                    return(
                                        <>
                                        {!parameter.role && 
                                            <div className='user_card'>

                                                <div className='user_image_title'>
                                                    <div className='user_image'>
                                                        <img className='user_card_img' src={parameter.avatar}/>
                                                        <label className='user_name'>{parameter.name}</label>
                                                    </div>
                                                    <i onClick={() => viewModal(parameter)} class="eye_button fa fa-eye"></i>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Business Model</label>
                                                    <label className='valuelabel'>{parameter.user_check ? parameter.business_model : parameter.founder_business_model}</label>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Role</label>
                                                    <label className='valuelabel'>{parameter.role ? "Admin" : parameter.profile_type}</label>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Location</label>
                                                    <label className='valuelabel'>{parameter.user_check ? parameter.location : parameter.founder_location}</label>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Sectors</label>
                                                    <label className='valuelabel'>{parameter.user_check ? parameter.sectors : parameter.sector}</label>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Business Target</label>
                                                    <label className='valuelabel'>{parameter.user_check ? parameter.target_location : parameter.founder_business_model}</label>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Status</label>
                                                    <label className='valuelabel'>{parameter.approved ? "Approved" : "Not Approved"}</label>
                                                </div>

                                                <div className='user_card_buttons'>
                                                    <Link to={`/edit_user/${parameter._id}`}><i class="fa edit_user fa-pencil" aria-hidden="true"></i>Edit</Link>
                                                    <a onClick={() => handleDelete(parameter._id)}><i class="fa delete_user fa-trash-o" aria-hidden="true"></i>Delete</a>
                                                </div>
                                            </div>
                                        }
                                        </>
                                    )
                                })
                            }
                            </div>
                        </div>
                    </>

                }

                {
                    isAdmin &&
                    <>
                        <div className='profile_second_users profile_founder_users'>
                            <h2>Here you can see all the Founders</h2>
                            <p>You can get a person who can help you in your business growth.</p>
                            <div className='profile_second'>
                            {
                                usersTwo.map((parameter)=>{           
                                    return(
                                        <>  
                                        {!parameter.role && 
                                            <div className='user_card'>

                                                <div className='user_image_title'>
                                                    <div className='user_image'>
                                                        <img className='user_card_img' src={parameter.avatar}/>
                                                        <label className='user_name'>{parameter.name}</label>
                                                    </div>
                                                    <i onClick={() => viewModal(parameter)} class="eye_button fa fa-eye"></i>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Business Model</label>
                                                    <label className='valuelabel'>{parameter.user_check ? parameter.business_model : parameter.founder_business_model}</label>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Role</label>
                                                    <label className='valuelabel'>{parameter.role ? "Admin" : parameter.profile_type}</label>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Location</label>
                                                    <label className='valuelabel'>{parameter.user_check ? parameter.location : parameter.founder_location}</label>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Sectors</label>
                                                    <label className='valuelabel'>{parameter.user_check ? parameter.sectors : parameter.sector}</label>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Business Target</label>
                                                    <label className='valuelabel'>{parameter.user_check ? parameter.target_location : parameter.founder_business_model}</label>
                                                </div>

                                                <div className='user_card_sections'>
                                                    <label className='headlabel'>Status</label>
                                                    <label className='valuelabel'>{parameter.approved ? "Approved" : "Not Approved"}</label>
                                                </div>

                                                <div className='user_card_buttons'>
                                                    <Link to={`/edit_user/${parameter._id}`}><i class="fa edit_user fa-pencil" aria-hidden="true"></i>Edit</Link>
                                                    <a onClick={() => handleDelete(parameter._id)}><i class="fa delete_user fa-trash-o" aria-hidden="true"></i>Delete</a>
                                                </div>
                                            </div>                              
                                        }
                                        </>
                                    )
                                })
                            }
                            </div>
                        </div>
                    </>
                }

                {/* If a person is a visitor then he will see the following data */}

                {!isAdmin &&
                    <>
                        {
                            approved ?
                            <div className='profile_second_users profile_founder_users'>
                                <h2>{user_check ? "All the Founders you Love" : "All the Investors you Love"}</h2>
                                <p>{user_check ? "You can visit all the founders and can get benefit in your money growth" : "You can get a person who can help you in your business growth"}</p>
                                <div className='profile_second'>
                                {
                                    visitorUsers.map((parameter)=>{
                                        return(
                                            <div className='user_card'>
                                            
                                            <div className='user_image_title'>
                                                <div className='user_image'>
                                                    <img className='user_card_img' src={parameter.avatar}/>
                                                    <label className='user_name'>{parameter.name}</label>
                                                </div>
                                                <i onClick={() => viewModal(parameter)} class="eye_button fa fa-eye"></i>
                                            </div>

                                            <div className='user_card_sections'>
                                                <label className='headlabel'>Business Model</label>
                                                <label className='valuelabel'>{parameter.user_check ? parameter.business_model : parameter.founder_business_model}</label>
                                            </div>

                                            <div className='user_card_sections'>
                                                <label className='headlabel'>Role</label>
                                                <label className='valuelabel'>{parameter.role ? "Admin" : parameter.profile_type}</label>
                                            </div>

                                            <div className='user_card_sections'>
                                                <label className='headlabel'>Location</label>
                                                <label className='valuelabel'>{parameter.user_check ? parameter.location : parameter.founder_location}</label>
                                            </div>

                                            <div className='user_card_sections'>
                                                <label className='headlabel'>Sectors</label>
                                                <label className='valuelabel'>{parameter.user_check ? parameter.sectors : parameter.sector}</label>
                                            </div>

                                            <div className='user_card_sections'>
                                                <label className='headlabel'>Business Target</label>
                                                <label className='valuelabel'>{parameter.user_check ? parameter.target_location : parameter.founder_business_model}</label>
                                            </div>   

                                            <div className='user_card_sections'>
                                                <label className='headlabel'>{parameter.user_check ? "Min Investment" : "Specializtation"}</label>
                                                <label className='valuelabel'>{parameter.user_check ? parameter.min_investment : parameter.specializtation}</label>
                                            </div>  

                                            <div className='user_card_sections'>
                                                <label className='headlabel'>{parameter.user_check ? "Max Investment" : "Revenue Stream"}</label>
                                                <label className='valuelabel'>{parameter.user_check ? parameter.max_invesment : parameter.revenue_stream}</label>
                                            </div>      

                                            <div className='user_card_sections'>
                                                <label className='headlabel'>{parameter.user_check ? "Max Investment" : "Contact Email"}</label>
                                                <label className='valuelabel'>{parameter.user_check ? parameter.most_interested : parameter.contact_email}</label>
                                            </div>                 

                                        </div>
                                        )
                                    })
                                }
                                </div>
                            </div>

                            :

                            <div className='not_approved'>
                                <h2>Hello {user.name}! Your Account is not approved yet. We are still reviewing your Account.</h2>
                                <p>Please Contact Support Team for fast approval.</p>
                            </div>
                        }
                    </>
                }

            </div>

        </div>
        </>
    )
}

export default Profile;