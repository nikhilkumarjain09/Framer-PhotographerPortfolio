import React from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const DropMenu = ({ setOpen }) => {
  const navlinks = [
    "Home",
    "About",
    "Works",
    "Reviews",
    "Blogs",
    "Contact",
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-[60px] h-[calc(100vh-60px)] w-full z-50 bg-shade-900 bg-opacity-90 text-white shadow-lg"
      >
        <ul className="mt-16 space-y-6 text-center">
          {navlinks.map((navlink, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <NavLink
                to={`/${navlink.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="block px-4 py-0 text-7xl font-bold hover:text-primary-500 active:bg-primary-400"
              >
                {navlink}
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </AnimatePresence>
  );
};

export default DropMenu;
