import React from 'react'

const CartCard = ({title,description,image}) => {
   
    return (
        <div className="card card-side bg-base-100 shadow-sm h-44">
            <figure className='w-48'>
                <img
                    src={image}
                    alt="Movie" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Watch</button>
                </div>
            </div>
        </div>
    )
}

export default CartCard