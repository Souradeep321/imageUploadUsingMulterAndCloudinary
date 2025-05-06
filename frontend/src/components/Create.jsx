import { useState, useRef, useEffect } from 'react';
import { XSquare, ImageIcon, X } from 'lucide-react';
import { useCreateProductsMutation } from '../redux/productApiSlice';
import toast from 'react-hot-toast';

const CreateProduct = ({ open, setOpen }) => {
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
        imageFile: null,
        previewUrl: '',
    });
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const preview = URL.createObjectURL(file);
            setProduct((prev) => ({
                ...prev,
                imageFile: file,
                previewUrl: preview,
            }));
        }
    };

    const removeImage = () => {
        if (product.previewUrl) {
            URL.revokeObjectURL(product.previewUrl);
        }
        setProduct((prev) => ({
            ...prev,
            imageFile: null,
            previewUrl: '',
        }));
    };

    useEffect(() => {
        return () => {
            if (product.previewUrl) {
                URL.revokeObjectURL(product.previewUrl);
            }
        };
    }, [product.previewUrl]);

    const [createProducts, { isLoading, isError, error }] = useCreateProductsMutation();

    const handleSubmit = (e) => {
        e.preventDefault();

        const { title, description, price, imageFile } = product;

        if (!title || !description || !price) {
            toast.error('Please fill in all fields');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        createProducts(formData)
            .unwrap()
            .then(() => {
                toast.success('Product created successfully!');
                setProduct({
                    title: '',
                    description: '',
                    price: '',
                    imageFile: null,
                    previewUrl: '',
                });
                setOpen(false);
            })
            .catch((err) => {
                console.error('Error creating product:', err);
                toast.error('Failed to create product');
            });
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
                <button
                    onClick={() => setOpen(false)}
                    className="btn btn-sm btn-ghost absolute top-4 right-4"
                >
                    <XSquare size={30} />
                </button>

                <h2 className="text-2xl font-bold mb-6">Create New Product</h2>

                {isError && (
                    <div className="alert alert-error mb-4">
                        <span>{error?.data?.message || 'Something went wrong'}</span>
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

                    <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                        {isLoading ? 'Creating...' : 'Create Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
