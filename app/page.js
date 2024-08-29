
import React from 'react'

import Link from 'next/link'


export default function Home () {


  return (
    <>
      <main className="bg-gray-100 h-full">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold">
              Empowering Education, Changing Lives
            </h1>
            <p className="mt-4 text-lg">
              Free, effective learning resources, top tutors, and video lectures
              tailored for the Nepali curriculum.
            </p>
            <button className="mt-8 bg-white text-blue-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-100">
              Start Learning Now
            </button>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800">What We Are</h2>
            <p className="mt-4 text-gray-600">
              GameChanger Academy is committed to providing free, high-quality
              education to every student in Nepal. Our goal is to make students
              competitive and ready for the future by offering a wide range of
              educational resources.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              What We Provide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {/* Service 1: Home Tutors */}
              <div className="bg-gray-100 p-6 rounded-lg text-center shadow-md">
                <h3 className="text-xl font-semibold text-gray-700">
                  Best Home Tutors
                </h3>
                <p className="mt-4 text-gray-600">
                  We provide the best home tutors for all classes, ensuring
                  personalized attention and quality education at your doorstep.
                </p>
              </div>

              {/* Service 2: MBBS Entrance Preparation */}
              <div className="bg-gray-100 p-6 rounded-lg text-center shadow-md">
                <h3 className="text-xl font-semibold text-gray-700">
                  MBBS Entrance Preparation
                </h3>
                <p className="mt-4 text-gray-600">
                  Our comprehensive courses are designed to help students ace
                  the MBBS entrance exams with confidence.
                </p>
              </div>

              {/* Service 3: Free YouTube Videos */}
              <div className="bg-gray-100 p-6 rounded-lg text-center shadow-md">
                <h3 className="text-xl font-semibold text-gray-700">
                  High-Quality YouTube Videos
                </h3>
                <p className="mt-4 text-gray-600">
                  Our YouTube channel offers a wealth of free, high-quality
                  video lectures covering a variety of subjects and topics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold">
              Ready to Change Your Learning Journey?
            </h2>
            <p className="mt-4 text-lg">
              Join thousands of students in accessing free, high-quality
              educational resources today.
            </p>
            <button className="mt-8 bg-white text-blue-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-100">
              Get Started Now
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto text-center">
            <p className="text-sm">
              © 2024 GameChanger Academy. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
