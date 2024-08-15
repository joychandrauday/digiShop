import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header Section */}
      <header className="text-center py-12">
        <h1 className="text-4xl font-extrabold text-white">About Us</h1>
        <p className="mt-4 text-lg text-gray-400">Discover more about our mission, vision, and team.</p>
      </header>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600">
        <div className="container mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl font-bold text-white">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-100">
            We aim to revolutionize your shopping experience with a digital platform that seamlessly integrates
            the latest trends, technology, and user-centric design. Our goal is to provide a personalized and 
            innovative shopping journey that exceeds expectations.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white">Our Vision</h2>
          <p className="mt-4 text-lg text-gray-300">
            To be the leading digital shopping experience provider, continuously evolving to meet the needs 
            of our users with cutting-edge technology and unparalleled service. We envision a future where
            technology enhances every aspect of your shopping experience.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white">Meet the Team</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {/* Team Member 1 */}
            <div className="w-full sm:w-1/3 md:w-1/4">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <img src="/path/to/member1.jpg" alt="Team Member 1" className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500"/>
                <h3 className="mt-4 text-xl font-semibold text-white">Joy Chandra Uday</h3>
                <p className="mt-2 text-gray-400">Lead React Developer</p>
                <p className="mt-4 text-gray-300">
                  Passionate about creating intuitive and engaging web applications. Leading the development
                  of our innovative projects with a focus on modern technologies and user experience.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="w-full sm:w-1/3 md:w-1/4">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <img src="/path/to/member2.jpg" alt="Team Member 2" className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500"/>
                <h3 className="mt-4 text-xl font-semibold text-white">Jane Doe</h3>
                <p className="mt-2 text-gray-400">UI/UX Designer</p>
                <p className="mt-4 text-gray-300">
                  Creative designer dedicated to crafting visually stunning and user-friendly interfaces.
                  Ensuring every aspect of our platform is both beautiful and functional.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="w-full sm:w-1/3 md:w-1/4">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <img src="/path/to/member3.jpg" alt="Team Member 3" className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500"/>
                <h3 className="mt-4 text-xl font-semibold text-white">John Smith</h3>
                <p className="mt-2 text-gray-400">Backend Developer</p>
                <p className="mt-4 text-gray-300">
                  Expert in server-side technologies and database management. Building robust and scalable
                  backends to support our dynamic web applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white">Get in Touch</h2>
          <p className="mt-4 text-lg text-gray-100">
            We’d love to hear from you! If you have any questions, feedback, or just want to say hi, feel free
            to reach out to us. Connect with us through our social media channels or send us an email.
          </p>
          <div className="mt-8">
            <a href="mailto:contact@yourwebsite.com" className="text-lg text-blue-200 hover:text-blue-100">contact@yourwebsite.com</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
