import React from 'react';
import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import axios from 'axios';

function Header() {

    const auth = useSelector(state => state.authReducer)

    const {user , isLogged} = auth;

    const logout_handle = async() => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/login"
        } catch (error) {
            window.location.href = "/login"
        }
    }

    const userLink = () => {
         return (
            <>
                <div className='loggedin_user'>
                    <Link exact to='/profile'>Profile</Link>
                    <img src={user.avatar}/>
                    <button onClick={logout_handle}>Logout</button>
                </div>
            </>
         )
    }

    return(
        <div className='header-container'>
            <Link exact to='/'><div className='logo'><img src={logo}/></div></Link>
            
            <ul className='header-ul'>
                <li>Founders</li>
                <li>Investors</li>
                <li>Pricing</li>
                <li>Education</li>
                <li>Resources</li>
                <li>Media</li>
            </ul>
            {
            isLogged ? userLink() 
            : 
            <div className='header-buttons'>
                <Link exact to='/register'><button className='header-register'>Register</button></Link>
                <Link exact to='/login'><button className='header-login'>Login</button></Link>
            </div>
            }

        </div>
    )
}

export default Header;