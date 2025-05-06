import React from 'react'

const Card = ({title,description,image,price}) => {
    return (
        <div className="card bg-base-100 w-72 shadow-sm">
            <figure>
                <img
                    src={image}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <p className='font-bold text-xl text-success'>{price}</p>
                    <button className="btn btn-primary">Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card