import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add form submission logic
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header Section */}
      <header className="text-center py-12">
        <h1 className="text-4xl font-extrabold text-white">Contact Us</h1>
        <p className="mt-4 text-lg text-gray-400">We’d love to hear from you. Reach out to us through the form below or connect with us on social media.</p>
      </header>

      {/* Contact Form Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-semibold text-gray-100">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
                placeholder="Your Name"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-semibold text-gray-100">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
                placeholder="Your Email"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-lg font-semibold text-gray-100">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
                placeholder="Your Message"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Send Message
            </button>

            {formSubmitted && (
              <div className="mt-4 text-center text-green-400">Thank you for your message! We will get back to you soon.</div>
            )}
          </form>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white">Contact Details</h2>
          <p className="mt-4 text-lg text-gray-300">You can also reach us through the following methods:</p>
          <div className="mt-8">
            <p className="text-lg text-gray-100">Email: <a href="mailto:contact@yourwebsite.com" className="text-blue-400 hover:underline">contact@yourwebsite.com</a></p>
            <p className="mt-2 text-lg text-gray-100">Phone: <a href="tel:+1234567890" className="text-blue-400 hover:underline">+123-456-7890</a></p>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white">Follow Us</h2>
          <div className="mt-8 flex justify-center gap-6">
            <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <i className="fab fa-facebook-f fa-2x"></i>
            </a>
            <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
