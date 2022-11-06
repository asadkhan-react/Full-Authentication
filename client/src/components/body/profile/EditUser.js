import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {showSuccessMsg, showErrMsg} from '../../utils/notificaton/Notification';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditUser(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [editUser , setEditUser] = useState([])
    const [editUserFounder , setEditUserFounder] = useState([])

    const users = useSelector(state => state.users);
    const usersTwo = useSelector(state => state.usersReducerTwo)
    const token = useSelector(state => state.tokenReducer);

    const [checkAdmin , setCheckAdmin] = useState(false);
    const [checkAdminFounder , setCheckAdminFounder] = useState(false);
    const [checkApproval , setCheckApprval] = useState(false);
    const [checkApprovalFounder , setCheckApprvalFounder] = useState(false);
    const [err , setErr] = useState(false)
    const [success , setSuccess] = useState(false)
    const [num , setNum] = useState(0)

    useEffect(() => {
        if(users.length !== 0){
            users.forEach(user => {
                if(user._id === id){
                    setEditUser(user)
                    setCheckAdmin(user.role === 1 ? true : false)
                    setCheckApprval(user.approved === true ? true : false )
                }
            })
        
        }else{
            navigate('/profile')
        }
    } , [users , id , navigate])

    useEffect(() => {
        if(usersTwo.length !== 0){
            usersTwo.forEach(user => {
                if(user._id === id){
                    setEditUserFounder(user)
                    setCheckAdminFounder(user.role === 1 ? true : false)
                    setCheckApprvalFounder(user.approved === true ? true : false )
                }
            })
        
        }else{
            navigate('/profile')
        }
    } , [usersTwo , id , navigate])

    const handleUpdate = async () => {
        try {
            if(num % 4 !==0){
                const res = await axios.patch(`/user/update_role/${editUser._id}` , {role : checkAdmin ? 1 : 0 , approved : checkApproval ? true : false} , {
                    headers : {Authorization : token}
                })
                setSuccess(res.data.msg)
                setNum(0)
                toast(res.data.msg)
            }
        } catch (error) {
            error.response.data.msg && setErr(err.response.data.msg)
            toast(err.response.data.msg)
        }
    }

    const handleUpdateFounder = async () => {
        try {
            if(num % 4 !==0){
                const res = await axios.patch(`/user/update_role/${editUserFounder._id}` , {role : checkAdminFounder ? 1 : 0 , approved : checkApprovalFounder ? true : false} , {
                    headers : {Authorization : token}
                })
                setSuccess(res.data.msg)
                setNum(0)
                toast(res.data.msg)
            }
        } catch (error) {
            error.response.data.msg && setErr(err.response.data.msg)
            toast(err.response.data.msg)
        }
    }

    const handleCheck = () => {
        setSuccess('')
        setErr('')
        setCheckAdmin(!checkAdmin)
        setNum(num + 1)
    }

    const handleApprovalCheck = () => {
        setSuccess('')
        setErr('')
        setCheckApprval(!checkApproval)
        setNum(num + 1)
    }

    const handleCheckAdmin = () => {
        setSuccess('')
        setErr('')
        setCheckAdminFounder(!checkAdminFounder)
        setNum(num + 1)
    }

    const handleApprovalCheckFounder = () => {
        setSuccess('')
        setErr('')
        setCheckApprvalFounder(!checkApprovalFounder)
        setNum(num + 1)
    }

    return(
        <>
            <ToastContainer />
            
            {editUser.user_check ? 
            
            <div className='edit_user_container'>
                <div className='edit_user_second_container'>
                    <button className='goback' onClick={() => navigate('/profile')}>Go Back</button>
                    <div className='edit_first_container'>
                        <div className='edit_parent_one'>
                            <img src={editUser.avatar}/>
                            <div className='edit_child_one'>
                                <h2>{editUser.name}</h2>
                                <p>{editUser.email}</p>
                                <p>{editUser.profile_type}</p>
                            </div>
                        </div>
                        <div className='edit_parent_two'>
                            <div>
                                <input type='checkbox' id="approval" checked={checkApproval} onChange={handleApprovalCheck}/>
                                <label for='approval'>Approval</label>
                            </div>
                            {
                            checkApproval &&
                            <div>
                                <input type='checkbox' id="isAdmin" checked={checkAdmin} onChange={handleCheck}/>
                                <label for='isAdmin'>Admin</label>
                            </div>
                            }
                            <button className='update_button' onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                    
                    <table>
                        <thead>
                            <th>Expertise</th>
                            <th>Location</th>
                            <th>Minimum Investment</th>
                            <th>Maximum Investment</th>
                            <th>Sectors</th>
                            <th>Busness Model</th>
                        </thead>
                        <tbody>
                            <td>{editUser.expertise}</td>
                            <td>{editUser.location}</td>
                            <td>{editUser.min_investment}{editUser.currency}</td>
                            <td>{editUser.max_invesment}{editUser.currency}</td>
                            <td>{editUser.sectors}</td>
                            <td>{editUser.business_model}</td>
                        </tbody>
                    </table>

                    <table>
                        <thead>
                            <th>How much investment {editUser.name} has</th>
                        </thead>
                        <tbody>
                            <td>{editUser.accredited_investor}</td>
                        </tbody>
                    </table>

                    <table>
                        <thead>
                            <th>Website Name</th>
                            <th>Linkedin</th>
                            <th>Target Location</th>
                            <th>Most Interested</th>
                            <th>Not Interested</th>
                        </thead>
                        <tbody>
                            <td>{editUser.website_url}</td>
                            <td>{editUser.linkedin}</td>
                            <td>{editUser.target_location}</td>
                            <td>{editUser.most_interested}</td>
                            <td>{editUser.not_interested}</td>
                        </tbody>
                    </table>

                </div>
            </div>

            :

            <div className='edit_user_container'>
                <div className='edit_user_second_container'>
                    <button className='goback' onClick={() => navigate('/profile')}>Go Back</button>
                    <div className='edit_first_container'>
                        <div className='edit_parent_one'>
                            <img src={editUserFounder.avatar}/>
                            <div className='edit_child_one'>
                                <h2>{editUserFounder.name}</h2>
                                <p>{editUserFounder.email}</p>
                                <p>{editUserFounder.profile_type}</p>
                            </div>
                        </div>
                        <div className='edit_parent_two'>
                            <div>
                                <input type='checkbox' id="approval" checked={checkApprovalFounder} onChange={handleApprovalCheckFounder}/>
                                <label for='approval'>Approval</label>
                            </div>
                            {
                            checkApprovalFounder &&
                            <div>
                                <input type='checkbox' id="isAdmin" checked={checkAdminFounder} onChange={handleCheckAdmin}/>
                                <label for='isAdmin'>Admin</label>
                            </div>
                            }
                            <button className='update_button' onClick={handleUpdateFounder}>Update</button>
                        </div>
                    </div>
                    
                    <table>
                        <thead>
                            <th>Doing Business As Name</th>
                            <th>Founder Website</th>
                            <th>Business Tagline</th>
                            <th>Maximum Investment</th>
                            <th>Sector</th>
                            <th>specializtation</th>
                        </thead>
                        <tbody>
                            <td>{editUserFounder.dba}</td>
                            <td>{editUserFounder.founder_website}</td>
                            <td>{editUserFounder.tagline}</td>
                            <td>{editUserFounder.max_invesment}</td>
                            <td>{editUserFounder.sector}</td>
                            <td>{editUserFounder.specializtation}</td>
                        </tbody>
                    </table>

                    <table>
                        <thead>
                            <th>Revenue Stream</th>
                        </thead>
                        <tbody>
                            <td>{editUser.revenue_stream}</td>
                        </tbody>
                    </table>

                    <table>
                        <thead>
                            <th>Business Model</th>
                            <th>Location</th>
                            <th>Target Location</th>
                            <th>Email</th>
                            <th>Linkedin</th>
                        </thead>
                        <tbody>
                            <td>{editUserFounder.founder_business_model}</td>
                            <td>{editUserFounder.founder_location}</td>
                            <td>{editUserFounder.contact_person}</td>
                            <td>{editUserFounder.contact_email}</td>
                            <td>{editUserFounder.company_linkedin}</td>
                        </tbody>
                    </table>
                </div>
            </div>
        
            }
        </>
    )
}

export default EditUser