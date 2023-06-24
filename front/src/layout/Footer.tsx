import React from 'react';
import { BsGoogle } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="flex flex-col py-5 bg-gray-700 gap-y-5">
      <div className="flex justify-center gap-x-10">
        <Link to="/" className="text-white bg-[#df4e3d] p-3 text-xl rounded-full">
          <BsGoogle />
        </Link>
        <Link to="/" className="text-white bg-[#3e5a97] p-3 text-xl rounded-full">
          <FaFacebookF />
        </Link>
        <Link to="/" className="text-white bg-[#549de3] p-3 text-xl rounded-full">
          <FiTwitter />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center text-white md:flex-row gap-y-5 gap-x-10">
        <Link to="/">Home</Link>
        <Link to="/">Services</Link>
        <Link to="/">About</Link>
        <Link to="/">Terms</Link>
        <Link to="/">Privacy Policy</Link>
      </div>
      <div className="flex justify-center text-white">
        <p>Blog generator © 2023</p>
      </div>
    </footer>
  );
}

export default Footer;
