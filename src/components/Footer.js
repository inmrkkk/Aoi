import React from 'react';

const Footer = () => {
  const socialLinks = [
    { icon: 'fab fa-facebook', url: '#', label: 'Facebook' },
    { icon: 'fab fa-instagram', url: '#', label: 'Instagram' },
    { icon: 'fab fa-twitter', url: '#', label: 'Twitter' },
    { icon: 'fab fa-pinterest', url: '#', label: 'Pinterest' }
  ];

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-spa text-flower-rose text-2xl"></i>
              <span className="font-bold text-xl">Gigante Fleur</span>
            </div>
            <p className="text-gray-300">
              Fresh bouquets delivered with love. Making every moment special with our beautiful flowers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Link</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-flower-rose transition-colors">Home</a></li>
              <li><a href="/gallery" className="text-gray-300 hover:text-flower-rose transition-colors">Gallery</a></li>
              <li><a href="/upload" className="text-gray-300 hover:text-flower-rose transition-colors">Upload</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-flower-rose transition-colors">About</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect With us</h3>
            <div className="space-y-2 text-gray-300 mb-6">
              <p><i className="fas fa-phone mr-2"></i> +639624778146</p>
              <p><i className="fas fa-envelope mr-2"></i> hello@bloomblossom.com</p>
              <p><i className="fas fa-map-marker-alt mr-2"></i> 1223 Flower St, Garden City</p>
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  aria-label={social.label}
                  className="text-gray-300 hover:text-flower-rose transition-colors duration-200"
                >
                  <i className={`${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p> 2024 Gigante Fleur. All rights reserved. Made with <i className="fas fa-heart text-flower-rose"></i> for flower lovers.</p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
