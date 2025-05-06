import React from 'react'
import Card from '../components/Card'
import { useFetchProductsQuery } from '../redux/productApiSlice'

const Home = () => {
    const { data:products, isLoading, isError, error } = useFetchProductsQuery();

    console.log('products', products)

    

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <span className="loading loading-ring loading-xl"></span>
        </div>
    )

    if (isError) return (
        <div className="flex justify-center items-center h-screen">
            <span className="text-3xl">{error.error || 'Something went wrong'}</span>
        </div>
    )

    return (
        <div className='grid grid-cols-4 gap-4 align-content-center justify-items-center pt-4'>
            {!isLoading && products &&
                products.map((product) => (
                    <Card key={product?._id} {...product} />
                ))}
        </div>
    )
}

export default Home