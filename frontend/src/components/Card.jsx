import React from 'react'
import { useDeleteProductsMutation } from '../redux/productApiSlice';
import { toast } from 'react-hot-toast';
import { Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const Card = ({ _id, title, description, image, price }) => {
    const dispatch = useDispatch();
    console.log('id', _id)

    const [deleteTask] = useDeleteProductsMutation();

    return (
        <div className="card bg-base-100 w-72 shadow-sm ">
            <figure className='h-48'>
                <img
                    src={image}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="card-actions items-center justify-between">
                    <p className='font-bold text-xl text-success'>{price}</p>
                    <Trash2 
                    onClick={(e) => {
                        e.preventDefault();
                        deleteTask(_id);
                        toast.success('Product deleted successfully!');
                    }}
                     className='cursor-pointer' />
                    <button className="btn btn-primary"
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(addToCart({ _id, title, description, image, price }));
                        toast.success('Product added to cart!');
                    }}
                    >Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card