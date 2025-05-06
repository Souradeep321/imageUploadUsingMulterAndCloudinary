import React from 'react'
import { useSelector } from 'react-redux'
import CartCard from '../components/CartCard'

const Cart = () => {
    const cardItems = [
        {
            _id: 1,
            title: "New movie is released!",
            description: "Click the button to watch on Jetflix app.",
            image: "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
        },
        {
            _id: 2,
            title: "New movie is released!",
            description: "Click the button to watch on Jetflix app.",
            image: "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
        },
        {
            _id: 3,
            title: "New movie is released!",
            description: "Click the button to watch on Jetflix app.",
            image: "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
        },
        {
            _id: 4,
            title: "New movie is released!",
            description: "Click the button to watch on Jetflix app.",
            image: "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
        },
    ]

    const { products: cartItems } = useSelector((state) => state.cart);

    console.log('cart', cartItems)

    return (
        <div className='flex flex-col gap-4'>
            {cartItems.map((card) => (
                <CartCard key={card._id} {...card} />
            ))}
        </div>
    )
}

export default Cart