import React from 'react'
// import './ProfileLeft.css'
import FollowersCard from '../FollowersCard/FollowersCard';
import InfoCard from '../InfoCard/InfoCard';
import LogoSearch from '../LogoSearch/LogoSearch';

const ProfileLeft = () => {
  return (
    /*We can use the ProfileSide class style from ProfileSide.css without a need to import the sheet*/
    /*This is one of the perks of react*/
    <div className="ProfileSide">
        <LogoSearch/>
        <InfoCard/>
        <FollowersCard/>
    </div>
  )
}

export default ProfileLeft
