import React from 'react'

const AboutUs = () => {
  return (
    <div className='min-h-screen w-full bg-gray-100 flex flex-col items-center justify-center p-6'>
      <div className=' bg-white shadow-md rounded-lg p-8'>
        <h1 className='text-4xl font-bold text-center text-gray-800 mb-6'>
          About GameChanger Academy
        </h1>
        <p className='text-lg text-gray-700 mb-4'>
          Welcome to GameChanger Academy, your go-to platform for comprehensive
          and free educational resources in Nepal. We provide complete notes and
          full content on YouTube for a wide range of official courses from
          Playgroup to Master's level. Whether you're looking to ace your exams
          or enhance your understanding, GameChanger Academy is here to support
          your educational journey.
        </p>
        <p className='text-lg text-gray-700 mb-4'>
          Our courses are meticulously crafted to meet the curriculum
          requirements of Nepal's education system, ensuring that students have
          access to quality learning materials. We believe in empowering
          students by making education accessible to everyone, regardless of
          their financial background. With our easy-to-follow video tutorials
          and detailed notes, students can learn at their own pace and excel in
          their studies.
        </p>
        <p className='text-lg text-gray-700 mb-8'>
          Join our community of learners today and take the first step towards
          academic success with GameChanger Academy!
        </p>

        <div className='bg-[#454555] text-white py-6 px-4 rounded-lg'>
          <h4 className='text-2xl text-[#efc75e] mb-4'>
            &copy; 2023 GameChanger Academy
          </h4>
          <div className='flex justify-between mb-4'>
            <div>
              <p>Maharajgunj (Behind Teaching Hospital), Kathmandu, Nepal</p>
              <p>
                <a href='tel:+9779808305830'>+977 9808305830</a>
              </p>
              <p>
                <a href='mailto:gamechanger.com.np@gmail.com'>
                  gamechanger.com.np@gmail.com
                </a>
              </p>
            </div>
            <div>
              <h4 className='mb-2'>Connect with us</h4>
              <div className='flex space-x-4'>
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
              <h4 className='mb-2'>Chat with us</h4>
              <div className='flex space-x-4'>
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
        </div>
      </div>
    </div>
  )
}

export default AboutUs
