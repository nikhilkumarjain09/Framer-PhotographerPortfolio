import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/navigation/Navbar";
import Home from "./pages/Home";
import { motion } from "framer-motion";
// import './css/home.css'
function App() {
  const [isBackgroundBlack, setIsBackgroundBlack] = useState(false);
  const highlightSectionRef = useRef(null); // Ref for the "I AM..." section

  useEffect(() => {
    const handleScroll = () => {
      if (highlightSectionRef.current) {
        console.log("Scrolled her");
        const sectionTop = highlightSectionRef.current.getBoundingClientRect().top;
        const sectionHeight = highlightSectionRef.current.offsetHeight;

        // Check if the "I AM..." section is in the viewport
        if (sectionTop <= window.innerHeight / 2 && sectionTop + sectionHeight >= 0) {
          setIsBackgroundBlack(true);
        } else {
          setIsBackgroundBlack(false);
        }
      }
    };

    // Add and clean up scroll listener
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [textColor, setTextColor] = useState("black"); // Default text color
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const navbarHeight = 100; // Adjust this value according to your Navbar height
  const navbarWidth = window.innerWidth / 4;

  const analyzeFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = navbarWidth;
      canvas.height = navbarHeight;

      ctx.drawImage(video, 0, 0, navbarWidth, navbarHeight, 0, 0, navbarWidth, navbarHeight);

      const imageData = ctx.getImageData(0, 0, navbarWidth, navbarHeight);
      const pixels = imageData.data;

      let r = 0, g = 0, b = 0;

      for (let i = 0; i < pixels.length; i += 4) {
        r += pixels[i];
        g += pixels[i + 1];
        b += pixels[i + 2];
      }

      const pixelCount = pixels.length / 4;
      r = r / pixelCount;
      g = g / pixelCount;
      b = b / pixelCount;

      const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      if (brightness > 128) {
        setTextColor("black");
      } else {
        setTextColor("white");
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(analyzeFrame, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className={`relative w-full h-screen ${isBackgroundBlack ? "bg-black" : "bg-white"}`}>
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {/* <div className={`app-container ${isBackgroundBlack ? "black-background" : ""}`}> */}
        <video
          ref={videoRef}
          src="src/assets/videos/bg-video.mp4" // Your video file
          autoPlay
          loop
          muted
          className="object-cover w-full h-full"
        />
      </div>

      {/* Canvas to analyze the specific area near the Navbar */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Navbar */}
      <Navbar textColor={textColor} className="fixed top-0 left-0 w-full z-50" />
      {/* Scrollable Content */}
      <div className="relative top-[100px] left-[50px] h-[calc(100%-160px)] overflow-y-auto z-10 flex flex-col space-y-8">
  <AnimatePresence mode="wait">
    {/* Home Component */}
    {/* <div className="home-container flex-shrink-0"> */}
      <Home highlightSectionRef={highlightSectionRef} />
    {/* </div> */}
    {/* Highlight Section */}
  </AnimatePresence>
  <motion.div
      ref={highlightSectionRef}
      className="highlighted-text-container flex-shrink-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    >
      <div className="relative highlight-left">
        <p className="relative highlight">I AM...</p>
      </div>
      <div className="simple-right">
        <p>
          a passionate photographer dedicated to capturing life's most precious
          moments. With a keen eye for detail and a love for storytelling, I
          strive to create images that are not just beautiful, but that also
          evoke emotion and tell a compelling story.
        </p>
      </div>
    </motion.div>
</div>


      {/* </div> */}
    </main>
  );
}

export default App;
