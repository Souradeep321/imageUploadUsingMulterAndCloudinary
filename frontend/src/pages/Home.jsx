import React from 'react'
import Card from '../components/Card'

const Home = () => {

    const cardItems = [
        {
            _id: 1,
            title: "Card Title",
            description: "A card component has a figure, a body part, and inside body there are title and actions parts",
            image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
            price: "$999"
        },
        {
            _id: 2,
            title: "Card Title",
            description: "A card component has a figure, a body part, and inside body there are title and actions parts",
            image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
            price: "$999"
        },
        {
            _id: 3,
            title: "Card Title",
            description: "A card component has a figure, a body part, and inside body there are title and actions parts",
            image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
            price: "$999"
        },
        {
            _id: 4,
            title: "Card Title",
            description: "A card component has a figure, a body part, and inside body there are title and actions parts",
            image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
            price: "$999"
        },
        {
            _id: 5,
            title: "Card Title",
            description: "A card component has a figure, a body part, and inside body there are title and actions parts",
            image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
            price: "$999"
        },
        {
            _id: 6,
            title: "Card Title",
            description: "A card component has a figure, a body part, and inside body there are title and actions parts",
            image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
            price: "$999"
        },
        {
            _id: 7,
            title: "Card Title",
            description: "A card component has a figure, a body part, and inside body there are title and actions parts",
            image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
            price: "$999"
        },
        {
            _id: 8,
            title: "Card Title",
            description: "A card component has a figure, a body part, and inside body there are title and actions parts",
            image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
            price: "$999"
        },

    ]

    return (
        <div className='grid grid-cols-4 gap-4 align-content-center justify-items-center pt-4'>
           {cardItems.map((card) => (
            <Card key={card._id} {...card} />
           ))}
        </div>
    )
}

export default Home