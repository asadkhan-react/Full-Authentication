import {Routes , Route} from 'react-router-dom';
import Home from './home/Home';
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import {useSelector} from 'react-redux'
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import Profile from './profile/Profile';
import EditUser from './profile/EditUser';
import EditYourProfile from './profile/EditYourProfile';
import InvestorProfile from './profile/InvestorProfile';
import InvestmentPreferences from './profile/InvestmentPreferences';
import Meeting from './profile/Meeting';

function Body() {
    const authReducer = useSelector(state => state.authReducer)
    const {isLogged} = authReducer;
    return(
        <>
            <Routes>
                <Route exact path='/' element={<Home />}/>
                <Route exact path='/login' element={isLogged ? <Home /> : <Login />}/>
                <Route exact path='/register' element={isLogged ? <Home /> : <Register />}/>
                <Route exact path='/complete_profile' element={isLogged ? <EditYourProfile /> : <Login />}/>
                <Route exact path='/meeting' element={isLogged ? <Meeting /> : <Login />}/>
                <Route exact path='/investor_profile' element={isLogged ? <InvestorProfile /> : <Login />}/>
                <Route exact path='/preferences' element={isLogged ? <InvestmentPreferences /> : <Login />}/>
                <Route exact path='/activate/:activate_User' element={<ActivationEmail />}/>
                <Route exact path='/forgot' element={<ForgotPassword />}/>
                <Route exact path='/reset/:access_token' element={<ResetPassword />}/>
                <Route exact path='/profile' element={isLogged ? <Profile /> : <Login /> }/>
                <Route exact path='/edit_user/:id' element={<EditUser />}/>
            </Routes>
        </>
    )
}

export default Body;