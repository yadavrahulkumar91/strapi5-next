
import React from 'react';

const Header = () => {
    // const [user, setUser] = useState(null); // State to hold user data
    // const [cartCount, setCartCount] = useState(0); // State to hold the number of items in the cart

    // // Function to fetch user data and cart count from Strapi
    // const fetchUserData = async () => {
    //     try {
    //         // Replace with your Strapi API endpoint
    //         const response = await fetch('https://your-strapi-api.com/users/me', {
    //             method: 'GET',
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('token')}` // Use the user's authentication token
    //             }
    //         });

    //         if (response.status === 200) {
    //             const userData = await response.json();
    //             setUser(userData);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching user data:', error);
    //     }

    //     try {
    //         // Replace with your Strapi API endpoint for the cart
    //         const cartResponse = await fetch('https://your-strapi-api.com/cart', {
    //             method: 'GET',
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('token')}` // Use the user's authentication token
    //             }
    //         });

    //         if (cartResponse.status === 200) {
    //             const cartData = await cartResponse.json();
    //             setCartCount(cartData.length);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching cart data:', error);
    //     }
    // };

    // // Effect to fetch user data and cart count on component mount
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         fetchUserData();
    //     }
    // }, []);

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
