import { Route, Routes } from "react-router"
import Navbar from "./components/navbar"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import BookDetails from "./pages/BookDetails"
import About from "./components/about"
import Footer from "./components/footer"
import Checkout from "./pages/Checkout"


function App() {


  return (
    <div className="relative flex flex-col min-h-screen parent-container">
        <main className="flex-grow">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkout" element={<Checkout/>}/>
          </Routes>
        </main>
        <footer className="mt-auto">
          <Footer />
        </footer>
    </div>
  )
}

export default App
