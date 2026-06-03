import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import Body from "./Body.jsx"
import Contact from "./Contact.jsx";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from "react";
<link rel="stylesheet" href="./src/import.css"/>
   
function App() {

const [view, setView] = useState("home");

  return (
    <>
      {/* We pass setView down so the header buttons can change the page */}
      <Header setView={setView} />
      
      {view === "home" ? <Body /> : <Contact />}
      
      <Footer />
    </>
  );
}
export default App
