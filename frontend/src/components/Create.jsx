import { useState, useRef } from 'react';
import { XSquare, ImageIcon, X } from 'lucide-react';

const CreateProduct = ({ open, setOpen }) => {
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
        imageFile: null,
        previewUrl: '',
    });
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProduct((prev) => ({
                ...prev,
                imageFile: file,
                previewUrl: URL.createObjectURL(file),
            }));
        }
    };

    const removeImage = () => {
        setProduct((prev) => ({
            ...prev,
            imageFile: null,
            previewUrl: '',
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const { title, description, price, imageFile } = product;

        if (!title || !description || !price) {
            setError('All fields except image are required');
            return;
        }

        console.log('Product Data:', product);
        alert('Product data logged in console');
        setOpen(false);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50  bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
                <button
                    onClick={() => setOpen(false)}
                    className="btn btn-sm btn-ghost absolute top-4 right-4"
                >
                    <XSquare size={30} />
                </button>

                <h2 className="text-2xl font-bold mb-6">Create New Product</h2>

                {error && (
                    <div className="alert alert-error mb-4">
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Product title"
                        className="input input-bordered w-full"
                        value={product.title}
                        onChange={handleChange}
                    />

                    <textarea
                        name="description"
                        placeholder="Product description"
                        className="textarea textarea-bordered w-full h-24"
                        value={product.description}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        className="input input-bordered w-full"
                        value={product.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                    />

                    {/* Custom file input trigger */}
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <ImageIcon size={40} className="text-gray-600 hover:text-blue-600" />
                        <span className="text-sm">Choose Product Image</span>
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {/* Image Preview with Remove Option */}
                    {product.previewUrl && (
                        <div className="relative mt-2">
                            <img
                                src={product.previewUrl}
                                alt="Preview"
                                className="rounded-lg object-cover h-48 w-full"
                            />
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute top-2 right-2 bg-white rounded-lg p-1 shadow"
                            >
                                <X size={20} className="text-red-500" />
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                    >
                        Create Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
