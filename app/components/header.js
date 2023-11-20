
import React from 'react';

const Header = () => {
   

    return (
        <div className="header">
            <div className="logo">GameChanger Academy</div>
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
          
        </div>
    );
};

export default Header;
