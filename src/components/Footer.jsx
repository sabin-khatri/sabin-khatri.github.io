// src/components/Footer.jsx
import React from 'react';
import { FaGithub, FaLinkedin, FaFacebook  } from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', icon: <FaGithub />, url: 'https://github.com/sabin-khatri' },
    { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/sabin-khatri-25460b26a/' },
    { name: 'Facebook', icon: <FaFacebook />, url: 'https://www.facebook.com/sabin.khatri.77312/' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-dark py-8">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          
          {/* Left Side: Brand Name */}
          <div>
            <a href="#home" className="text-xl font-bold text-white hover:text-brand-blue transition-colors duration-300">
              Sabin Khatri
            </a>
          </div>

          {/* Right Side: Social Media Icons */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank" // Opens the link in a new tab
                rel="noopener noreferrer" // Security best practice for new tabs
                aria-label={link.name}
                className="text-gray-400 hover:text-white text-2xl transition-colors duration-300"
              >
                {link.icon}
              </a>
            ))}
          </div>

        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-700" />

        {/* Bottom Section: Copyright */}
        <div className="text-center text-sm text-gray-500">
          <p>© {currentYear} sabin Khatri. All Rights Reserved.</p>
          <p className="mt-1">
            Built with ❤️ using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;