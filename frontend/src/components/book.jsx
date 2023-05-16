import { useDispatch } from "react-redux"
import { removeBook, incrementQnt, decrementQnt } from "../features/reducer"
import { leftArrow, rightArrow } from "../assets/icons"

const Book = (props) => {

    const { order } = props
    const dispatch = useDispatch()
    const ratingCount = order.book.ratings.length
    const rating = order.book.ratings.reduce((t, r) => { return t += r.rating }, 0) / ratingCount

    return (
        <div className="md:flex items-center mt-14 py-8 border-t border-gray-200">
            <div className="w-1/4">
                <img src={order.book.coverImage} className="w-full h-full object-center object-cover" />
            </div>
            <div className="md:pl-3 md:w-3/4">
                <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4"></p>
                <div className="flex items-center justify-between w-full pt-1">
                    <p className="text-base font-black leading-none text-gray-800">{order.book.title}</p>
                    <div className="flex py-2 px-1 mr-6">
                        <button className="border p-2 hover:bg-slate-200" onClick={() => dispatch(decrementQnt(order._id))}>
                            {leftArrow}
                        </button>
                        <div className="px-4 border -pt-.5">{order.quantity}</div>
                        <button className="border p-2 hover:bg-slate-200" onClick={() => dispatch(incrementQnt(order._id))}>
                            {rightArrow}
                        </button>
                    </div>
                </div>
                <p className="text-s leading-3 text-gray-600 pt-2">Author: {order.book.author}</p>
                <p className="text-xs leading-3 text-gray-600 py-4">Category: {order.book.category}</p>
                <p className="w-96 text-xs leading-3 text-gray-600">Publisher: {order.book.publisher}</p>
                <p className="text-xs leading-3 text-gray-600 py-4">
                    Ratings: {rating} ({ratingCount})
                </p>
                <div className="flex items-center justify-between pt-5 pr-11 -mx-4">
                    <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer" onClick={() => dispatch(removeBook(order._id))}>Remove</p>
                    <p className="text-base font-black leading-none text-gray-800">${order.book.price}</p>
                </div>
            </div>
        </div>
    )
}

export default Book