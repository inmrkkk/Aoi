import React from 'react';

const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & Head Florist',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      description: 'With over 15 years of experience in floral design'
    },
    {
      name: 'Michael Chen',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      description: 'Bringing artistic vision to every arrangement'
    },
    {
      name: 'Emma Williams',
      role: 'Customer Experience Manager',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      description: 'Ensuring every customer receives perfect service'
    }
  ];

  const milestones = [
    { year: '2015', title: 'Gigante Fleur Founded', description: 'Started as a small local flower shop' },
    { year: '2017', title: 'Expanded Delivery Services', description: 'Began offering same-day delivery across the city' },
    { year: '2019', title: 'Opened Second Location', description: 'Expanded to serve more customers' },
    { year: '2021', title: 'Launched Online Platform', description: 'Made our bouquets available online' },
    { year: '2024', title: 'Community Recognition', description: 'Awarded Best Local Flower Shop' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Flower shop interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Story</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Bringing beauty and joy through flowers since 2015
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                From Passion to Profession
              </h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  Gigante Fleur began as a dream in a small corner shop, fueled by a passion for creating beautiful floral arrangements that touch people's hearts. What started as a humble venture has grown into a beloved local institution.
                </p>
                <p>
                  Our founder, Sarah Johnson, believed that flowers have the power to convey emotions when words fall short. Whether it's celebrating life's joyous moments or offering comfort during difficult times, our bouquets are crafted with intention and care.
                </p>
                <p>
                  Today, we're proud to be part of thousands of special moments, from weddings and anniversaries to simple "just because" gestures that brighten someone's day.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1606074791941-3170c8b4d5d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Florist arranging flowers"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-flower-pink">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-flower-rose rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-heart text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Passion</h3>
              <p className="text-gray-600">
                We pour our hearts into every arrangement, ensuring each bouquet tells a unique story
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-flower-rose rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-leaf text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className="text-gray-600">
                Only the freshest, most beautiful flowers make it into our arrangements
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-flower-rose rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-smile text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Joy</h3>
              <p className="text-gray-600">
                We believe in spreading happiness through the beauty of nature
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600">
              The talented people behind Gigante Fleur
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover shadow-lg"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-flower-rose font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600">
              Milestones that shaped our story
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-flower-rose"></div>
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <span className="text-flower-rose font-bold text-lg">{milestone.year}</span>
                    <h3 className="text-xl font-semibold mt-2 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-flower-rose rounded-full border-4 border-white"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-flower-rose to-rose-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Visit Our Flower Shop
          </h2>
          <div className="text-white text-lg mb-8 space-y-2">
            <p><i className="fas fa-map-marker-alt mr-2"></i> 123 Flower Street, Garden City, GC 12345</p>
            <p><i className="fas fa-phone mr-2"></i> (555) 123-4567</p>
            <p><i className="fas fa-envelope mr-2"></i> hello@gigantefleur.com</p>
            <p><i className="fas fa-clock mr-2"></i> Mon-Sat: 9AM-6PM, Sun: 10AM-4PM</p>
          </div>
          <p className="text-white text-lg mb-6">
            We'd love to help you create the perfect bouquet for your special moment!
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
