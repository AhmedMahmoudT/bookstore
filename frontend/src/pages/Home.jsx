import { useEffect, useState } from "react"
import axios from "axios"
import "pure-react-carousel/dist/react-carousel.es.css"
import Cta from "../components/cta"
import Slides from "../components/slides"
import Loading from "../components/loading"

const Home = () => {
  const userLogged = JSON.parse(localStorage.getItem("user"))
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/books/"
        )
        setBooks(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBooks()
  }, [])

  return (
    <>
      <div>
        {!isLoading && books.length > 0 ? (
          <>
            {!userLogged&&<Cta />}
            <h1 className="text-4xl text-center mt-24 font-semibold">Best Sellers of the Week</h1>
            <Slides books={books} />
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  )
}

export default Home