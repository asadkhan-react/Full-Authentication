import React from 'react'
import './home.css'
import banner from '../../../assets/banner.jpeg'
import {Link} from 'react-router-dom'
import Header from '../../header/Header'
function Home() {
    return (
        <>
            <Header />
            
            <div className='hero-container'>
                <div className='first'>
                    <h2>One tool for all your <span>deal flow and fundraising</span> needs</h2>
                    <p>With FundaPitch, we help investors manage deals <br />
                       We bring efficiency to startups and investors through interactions, engagement and data insights.
                    </p>
                    <div className='button-container'>
                        <Link exact to='/register'><button className='investor_button'>Join as Investor</button></Link>
                        <Link exact to='/login'><button className='founder_button'>Join as founder</button></Link>
                    </div>
                </div>
                <div className='second'><img src={banner}/></div>
            </div>
        </>
    )
}

export default Home;