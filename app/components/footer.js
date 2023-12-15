// Footer.js

import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer id="footer" className={styles.footer}>
            <div className={styles.footerRow}>
                <h4>&copy; 2023 GameChanger</h4>
                <div>Maharajgunj (Behind Teaching Hospital), Kathmandu, Nepal</div>
                <div><a href="tel:+9779808305830">+977 9808305830</a></div>
                <div><a href="mailto:gamechanger.com.np@gmail.com">gamechanger.com.np@gmail.com</a></div>
            </div>

            <h4 className={styles.connectTitle}>Connect with us</h4>

            <div className={styles.footerColumn}>
                <div className={styles.socialIcons}>
                    <a href="https://www.youtube.com/@gamechangerrky"><img src="https://img.icons8.com/color/48/000000/youtube-play.png" alt="YouTube" /></a>
                    <a href="https://www.facebook.com/profile.php?id=100091780968711"><img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" /></a>
                    <a href="https://www.instagram.com"><img src="https://img.icons8.com/color/48/000000/instagram-new.png" alt="Instagram" /></a>
                    <a href="https://www.twitter.com/GameChangerNp"><img src="https://img.icons8.com/color/48/000000/twitter--v1.png" alt="Twitter" /></a>
                    <a href="https://www.linkedin.com/in/gamechanger-company-59b029273"><img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="LinkedIn" /></a>
                </div>
            </div>

            <h4 className={styles.chatTitle}>Chat with us</h4>

            <div className={styles.footerColumn}>
                <div className={styles.socialIcons}>
                    <a href="fb-messenger://user-thread/rahulkumar.yadav.98622733">
                        <img src="https://img.icons8.com/color/48/000000/facebook-messenger--v3.png" alt="Messenger Icon" />
                    </a>
                    <a href="https://wa.me/+9779808305830">
                        <img src="https://img.icons8.com/color/48/000000/whatsapp--v3.png" alt="WhatsApp Icon" />
                    </a>
                    <a href="viber://chat?number=+9779808305830">
                        <img src="https://img.icons8.com/color/48/000000/viber.png" alt="Viber Icon" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
