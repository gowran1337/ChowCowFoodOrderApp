import React from 'react';

const Profile = ({onCloseProfile}) => {
    return (
        <div className='cartContainer'>
            <button className='closeBTN clickable' onClick={onCloseProfile}>X</button>
            <h2>Your Profile</h2>
        </div>
    );
};

export default Profile;