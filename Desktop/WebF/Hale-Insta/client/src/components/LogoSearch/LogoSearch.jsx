import React from 'react'
import Logo from '../../img/logo.png'
import {UilSearch} from '@iconscout/react-unicons'
import './LogoSearch.css'

const LogoSearch = () => {
  return (
    <div className="LogoSearch">
        {/* our twitter image */}
        <img src={Logo} alt=""/>
        <div className="Search">
          {/* our input bar */}
          <input type="text" placeholder="#Explore"/>
          {/* our search icon */}
          <div className="s-icon">
            <UilSearch/>
          </div>
        </div>
    </div>

  )
}

export default LogoSearch
