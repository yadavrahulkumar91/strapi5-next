
import React from 'react';
import NavBar from '../navbar/NavBar'

const Header = () => {
   

    return (
        <>
        <div className="header">
            <div className="text-center text-4xl font-extrabold pt-2">GameChanger Academy</div>
            <div className="user-section">
                {/* {user ? (
                    <div className="user-info">
                        Welcome, {user.username}!
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <button onClick={handleLogin}>Login</button>
                )} */}
            </div>
            <div className="search-bar">
                {/* Include your search bar component */}
            </div>
          
            <NavBar/>
        </div>
        </>
    );
};

export default Header;
