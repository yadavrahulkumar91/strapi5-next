// Footer.js

import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-[#454555] text-white py-2 px-2 ml-40 bottom-0 '>
      <h4 className='text-xl text-[#efc75e]'>
        &copy; 2023 GameChanger Academy
      </h4>
      <div className='flex justify-between'>
        <div className=''>
          <div>Maharajgunj (Behind Teaching Hospital), Kathmandu, Nepal</div>
          <div>
            <a href='tel:+9779808305830'>+977 9808305830</a>
          </div>
          <div>
            <a href='mailto:gamechanger.com.np@gmail.com'>
              gamechanger.com.np@gmail.com
            </a>
          </div>
        </div>

        <div>
          <h4 className=''>Connect with us</h4>
          <div className='flex'>
            <a href='https://www.youtube.com/@gamechangeracademyrky'>
              <img
                src='https://img.icons8.com/color/48/000000/youtube-play.png'
                alt='YouTube'
              />
            </a>
            <a href='https://www.facebook.com/profile.php?id=100091780968711'>
              <img
                src='https://img.icons8.com/color/48/000000/facebook-new.png'
                alt='Facebook'
              />
            </a>
            <a href='https://www.instagram.com'>
              <img
                src='https://img.icons8.com/color/48/000000/instagram-new.png'
                alt='Instagram'
              />
            </a>
            <a href='https://www.twitter.com/GameChangerNp'>
              <img
                src='https://img.icons8.com/color/48/000000/twitter--v1.png'
                alt='Twitter'
              />
            </a>
            <a href='https://www.linkedin.com/in/gamechanger-company-59b029273'>
              <img
                src='https://img.icons8.com/color/48/000000/linkedin.png'
                alt='LinkedIn'
              />
            </a>
          </div>
        </div>
        <div>
          <h4 className=''>Chat with us</h4>
          <div className='flex'>
            <a href='fb-messenger://user-thread/rahulkumar.yadav.98622733'>
              <img
                src='https://img.icons8.com/color/48/000000/facebook-messenger--v3.png'
                alt='Messenger Icon'
              />
            </a>
            <a href='https://wa.me/+9779808305830'>
              <img
                src='https://img.icons8.com/color/48/000000/whatsapp--v3.png'
                alt='WhatsApp Icon'
              />
            </a>
            <a href='viber://chat?number=+9779808305830'>
              <img
                src='https://img.icons8.com/color/48/000000/viber.png'
                alt='Viber Icon'
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
