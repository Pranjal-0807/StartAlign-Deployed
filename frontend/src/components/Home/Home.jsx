import "./Home.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { userTestimonials, features } from "../../utils/constants";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden text-white animate-gradient">
      {/* Animated Bubbles Background */}
      <div className="absolute inset-0 z-0 bubble-background"></div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 z-10 relative">
        <h1 className="text-3xl font-bold">StartAlign</h1>
        <div className="space-x-4">
          <Link to="/account">
            <button className="px-5 py-2 bg-green-600 hover:bg-green-700 rounded-2xl shadow">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow z-10 relative">
        <Hero setShowModal={setShowModal} />
        <Features />
        <Testimonials />
        <CTA setShowModal={setShowModal} />
        <AccountModal showModal={showModal} setShowModal={setShowModal} />
      </main>

      {/* Footer */}
      <footer className="bg-black/40 text-white text-center py-4 z-10 relative">
        © {new Date().getFullYear()} StartAlign. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;

// Hero Section
const Hero = ({ setShowModal }) => {
  const scrollToFeatures = () => {
    document.getElementById("features").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="flex flex-col items-center justify-center text-center py-24 px-6">
      <h1 className="text-5xl font-extrabold leading-tight mb-4 animate-fadeIn">
        Supercharge Your Team with{" "}
        <span className="text-yellow-400">StartAlign</span>
      </h1>
      <p className="text-lg text-gray-200 max-w-2xl">
        The all-in-one platform to plan, track, and collaborate on projects
        seamlessly.
      </p>
      <div className="mt-6 flex gap-4">
        <button
          className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transition"
          onClick={() => setShowModal(true)}
        >
          Get Started
        </button>
        <button
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition"
          onClick={scrollToFeatures}
        >
          Learn More
        </button>
      </div>
    </header>
  );
};

// Features Section
const Features = () => {
  return (
    <section
      id="features"
      className="py-20 px-6 bg-white/10 backdrop-blur-lg text-white"
    >
      <h2 className="text-4xl font-bold text-center mb-12">
        Why Choose StartAlign?
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-white/20 hover:bg-white/30 shadow-lg backdrop-blur-md transition text-center"
          >
            <Icon className="text-5xl text-yellow-300 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-200 mt-2">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Testimonials Section
const Testimonials = () => {
  return (
    <section className="py-20 px-6 bg-white/10 backdrop-blur-lg text-white text-center">
      <h2 className="text-4xl font-bold mb-12">What Our Users Say</h2>
      <div className="max-w-4xl mx-auto space-y-8">
        {userTestimonials.map(({ name, feedback }, i) => (
          <div
            key={i}
            className="p-6 bg-white/20 rounded-xl shadow-lg backdrop-blur-md hover:bg-white/30 transition"
          >
            <p className="text-lg font-semibold">"{feedback}"</p>
            <p className="mt-2 text-gray-300">— {name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// CTA Section
const CTA = ({ setShowModal }) => {
  return (
    <section className="text-center py-20 px-6 backdrop-blur-lg bg-white/10 text-white">
      <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
      <p className="text-lg text-gray-200 mt-2">
        Join thousands of teams using StartAlign to manage their projects
        efficiently.
      </p>
      <button
        className="mt-6 bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transition"
        onClick={() => setShowModal(true)}
      >
        Sign Up for Free
      </button>
    </section>
  );
};

// Modal Component
const AccountModal = ({ showModal, setShowModal }) => {
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowModal(false)}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome to StartAlign!
            </h2>
            <p className="text-gray-600 mb-4">
              Sign up now to unlock powerful project management tools.
            </p>
            <Link to="/account">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};




// import "./Home.css";
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaTimes } from "react-icons/fa";
// import { userTestimonials, features } from "../../utils/constants";

// const Home = () => {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <div className="relative flex flex-col min-h-screen overflow-hidden animate-gradient text-white">
//       {/* Animated Bubbles Background */}
//       <div className="absolute inset-0 z-0 bubble-background"></div>

//       {/* Navbar */}
//       <nav className="flex justify-between items-center px-6 py-4 z-10">
//         <h1 className="text-3xl font-bold">StartAlign</h1>
//         <div className="space-x-4">
//           <Link to="/account">
//             <button className="px-5 py-2 bg-green-600 hover:bg-green-700 rounded-2xl shadow">
//               Sign Up
//             </button>
//           </Link>
//         </div>
//       </nav>

//       {/* Main Sections */}
//       <main className="flex-grow z-10">
//         <Hero setShowModal={setShowModal} />
//         <Features />
//         <Testimonials />
//         <CTA setShowModal={setShowModal} />
//         <AccountModal showModal={showModal} setShowModal={setShowModal} />
//       </main>

//       {/* Footer */}
//       <footer className="bg-black/40 text-white text-center py-4 z-10">
//         © {new Date().getFullYear()} StartAlign. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default Home;

// const Hero = ({ setShowModal }) => {
//   // Scroll to Features Section
//   const scrollToFeatures = () => {
//     document.getElementById("features").scrollIntoView({ behavior: "smooth" });
//   };
//   return (
//     <>
//       {/* Hero Section */}
//       <header className="flex flex-col items-center justify-center text-center py-24 px-6">
//         <h1 className="text-5xl font-extrabold leading-tight mb-4 animate-fadeIn">
//           Supercharge Your Team with
//           <span className="text-yellow-400">StartAlign</span>
//         </h1>
//         <p className="text-lg text-gray-200 max-w-2xl">
//           The all-in-one platform to plan, track, and collaborate on projects
//           seamlessly.
//         </p>
//         <div className="mt-6 flex gap-4">
//           <button
//             className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transition"
//             onClick={() => setShowModal(true)}
//           >
//             Get Started
//           </button>
//           <button
//             className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition"
//             onClick={scrollToFeatures}
//           >
//             Learn More
//           </button>
//         </div>
//       </header>
//     </>
//   );
// };

// const Features = () => {
//   return (
//     <>
//       {/* Features Section */}
//       <section id="features" className="bg-white text-gray-800 py-20 px-6">
//         <h2 className="text-4xl font-bold text-center mb-12">
//           Why Choose StartAlign?
//         </h2>
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
//           {features.map(({ icon: Icon, title, desc }, i) => (
//             <div
//               key={i}
//               className="p-6 rounded-xl shadow-lg bg-gray-100 text-center hover:shadow-xl transition"
//             >
//               <Icon className="text-5xl text-blue-500 mb-4 mx-auto" />
//               <h3 className="text-xl font-semibold">{title}</h3>
//               <p className="text-gray-600 mt-2">{desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// };

// const Testimonials = () => {
//   return (
//     <>
//       {/* Testimonials Section */}
//       <section className="py-20 px-6 text-center bg-gray-100">
//         <h2 className="text-4xl font-bold text-gray-800 mb-12">
//           What Our Users Say
//         </h2>
//         <div className="max-w-4xl mx-auto space-y-8">
//           {userTestimonials.map(({ name, feedback }, i) => (
//             <div
//               key={i}
//               className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition"
//             >
//               <p className="text-lg font-semibold text-gray-800">
//                 "{feedback}"
//               </p>
//               <p className="mt-2 text-gray-500">— {name}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// };

// const AccountModal = ({ showModal, setShowModal }) => {
//   return (
//     <>
//       {/* Modal for Get Started */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center relative">
//             <button
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
//               onClick={() => setShowModal(false)}
//             >
//               <FaTimes size={20} />
//             </button>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Welcome to StartAlign!
//             </h2>
//             <p className="text-gray-600 mb-4">
//               Sign up now to unlock powerful project management tools.
//             </p>
//             <Link to="/account">
//               <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
//                 Sign Up
//               </button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// const CTA = ({ setShowModal }) => {
//   return (
//     <>
//       {/* Call to Action */}
//       <section className="text-center py-20 px-6">
//         <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
//         <p className="text-lg text-gray-200 mt-2">
//           Join thousands of teams using StartAlign to manage their projects
//           efficiently.
//         </p>
//         <button
//           className="mt-6 bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transition"
//           onClick={() => setShowModal(true)}
//         >
//           Sign Up for Free
//         </button>
//       </section>
//     </>
//   );
// };


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaTimes } from "react-icons/fa";
// import { userTestimonials, features } from "../../utils/constants";

// const HomePage = () => {
//   const [showModal, setShowModal] = useState(false);
//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//       <Hero setShowModal={setShowModal} />
//       <Features />
//       <Testimonials />
//       <CTA setShowModal={setShowModal} />
//       <AccountModal showModal={showModal} setShowModal={setShowModal} />
//     </div>
//   );
// };

// export default HomePage;