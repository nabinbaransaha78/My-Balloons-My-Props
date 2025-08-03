// src/pages/Home.tsx

import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-yellow-50">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <img
          src="/lovable-uploads/34c11f5d-7c74-4a25-b9ad-718f3279b247.png"
          alt="My Balloons Logo"
          className="mx-auto h-24 mb-6"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-pink-600">
          My Balloons My Props
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-xl mx-auto">
          Make every celebration unforgettable with our custom balloon decor and party props.
        </p>
        <Link
          to="/products"
          className="inline-block mt-8 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          Explore Products
        </Link>
      </section>

      {/* Highlight Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <img src="/icons/party.svg" alt="Party Setup" className="mx-auto h-16 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-pink-600">Custom Party Setups</h3>
          <p className="text-gray-600">Theme-based balloon and prop decor for birthdays, anniversaries, and more.</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <img src="/icons/delivery.svg" alt="Fast Delivery" className="mx-auto h-16 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-pink-600">Same-Day Delivery</h3>
          <p className="text-gray-600">We deliver in top cities to make your celebrations hassle-free.</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <img src="/icons/trust.svg" alt="Trusted" className="mx-auto h-16 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-pink-600">Trusted by 10K+ Customers</h3>
          <p className="text-gray-600">Join our growing family of happy clients and amazing moments.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-pink-100">
        <h2 className="text-3xl font-bold text-pink-700 mb-4">Need Help Planning a Party?</h2>
        <p className="text-gray-700 mb-6">We can help you create the perfect event setup in just minutes.</p>
        <Link
          to="/contact"
          className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default Home;
