import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p className="md:w-2/12 cursor-pointer text-gray-800 dark:text-white font-bold text-lg">Bookstore</p>
        <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Bookstore. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
