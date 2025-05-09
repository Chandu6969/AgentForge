import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github,
  Mail
} from 'lucide-react';
import { APP_NAME } from '../../utils/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/#features' },
        { name: 'How it Works', href: '/#how-it-works' },
        { name: 'Pricing', href: '/#pricing' },
        { name: 'FAQ', href: '/#faq' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '/docs' },
        { name: 'Tutorials', href: '/tutorials' },
        { name: 'Blog', href: '/blog' },
        { name: 'API Reference', href: '/api' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
        { name: 'Press Kit', href: '/press' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookie-policy' },
        { name: 'Data Processing', href: '/data-processing' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Twitter size={20} />, href: 'https://twitter.com' },
    { icon: <Linkedin size={20} />, href: 'https://linkedin.com' },
    { icon: <Facebook size={20} />, href: 'https://facebook.com' },
    { icon: <Instagram size={20} />, href: 'https://instagram.com' },
    { icon: <Github size={20} />, href: 'https://github.com' },
  ];

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Logo and company description */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-primary-600 to-accent-500 w-8 h-8 rounded-md flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <span className="text-xl font-bold text-neutral-900">{APP_NAME}</span>
            </Link>
            <p className="mt-4 text-sm text-neutral-600 max-w-xs">
              Build custom AI agents for your business in minutes. 
              Upload your documents and create a specialized assistant
              for HR, sales, or customer support.
            </p>
            
            {/* Social links */}
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-primary-600 transition-colors"
                >
                  {link.icon}
                  <span className="sr-only">Social link</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-neutral-900 tracking-wider uppercase">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-neutral-600 hover:text-primary-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <div className="max-w-md">
            <h3 className="text-sm font-semibold text-neutral-900 tracking-wider uppercase">
              Subscribe to our newsletter
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              Get the latest news and updates from our team.
            </p>
            <div className="mt-4 flex sm:max-w-md">
              <div className="relative rounded-md w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="block w-full bg-white border border-neutral-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-neutral-400 focus:outline-none focus:text-neutral-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                />
              </div>
              <div className="mt-0 ml-3 flex-shrink-0">
                <button
                  type="submit"
                  className="bg-primary-600 border border-transparent rounded-md w-full py-2 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-neutral-200 pt-8">
          <p className="text-sm text-neutral-500 text-center">
            &copy; {currentYear} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;