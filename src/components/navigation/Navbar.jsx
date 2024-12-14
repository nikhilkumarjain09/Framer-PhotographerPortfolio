import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import DropMenu from "./DropMenu";

const Navbar = ({textColor}) => {
  const [open, setOpen] = useState(false);
  const [textclr,setTextClr] = useState("black");
  console.log(textColor)
  useEffect(()=>{
    setTextClr(textColor);
  })
  return (
    <header className="full-width">
      <nav className="flex items-center justify-between w-full border-b border-shade-800">
        <h1 className="relative text-2xl font-bold">
          {/* BLOB */}
          {/* <span className='w-12 aspect-video absolute -z-20 left-20 blur-3xl bg-primary-500 rounded-full'></span> */}

          <NavLink
            to={`/`}
            className={`text-${textColor} text-3xl font-sans font-serif` }
          >
            Framer
          </NavLink>
                  </h1>
        <div
          // onMouseEnter={() => setOpen(true)}
          className="group relative right-0 h-fit w-fit"
        >
          <motion.button
            onClick={()=>setOpen(!open)}
            whileTap={{ scale: 0.98 }}
            whileHover={{ backgroundColor: "#F08C00" }}
            transition={{ bounceDamping: 10, bounceStiffness: 600 }}
            className="w-max rounded-lg bg-primary-400 px-4 py-2 text-xl font-semibold text-shade-900 shadow-md"
          >
            {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
          </motion.button>

          {open && (
              <DropMenu setOpen={setOpen}
              className="fixed top-0 left-0 w-full h-full bg-opacity-80 bg-black z-50" />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
