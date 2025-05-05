import { deleteFromCloudinary, uploadOnCloudinary } from "../lib/utils/cloudinary.js";
import { Product } from "../models/products.models.js";

export const createProducts = async (req, res) => {
    let image; // declare outside for access in catch block

    try {
        const { title, description, price } = req.body;

        if (!title || !description || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const imageLocalPath = req.file?.path;

        if (!imageLocalPath) {
            return res.status(400).json({ message: "Image is required" });
        }

        try {
            image = await uploadOnCloudinary(imageLocalPath);
            console.log("Uploaded image", image);
        } catch (error) {
            console.error("Error uploading image:", error);
            return res.status(500).json({ message: "Failed to upload image" });
        }

        if (!image?.url) {
            return res.status(500).json({ message: "Image upload failed" });
        }

        const product = await Product.create({
            title,
            description,
            price,
            image: image.url,
        });

        return res.status(200).json(product);

    } catch (error) {
        console.error("Error in createProducts controller:", error);
        if (image?.public_id) {
            await deleteFromCloudinary(image.public_id);
        }
        return res.status(500).json({ error: error.message });
    }
};

export const fetchProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, length: products.length, data: products });
    } catch (error) {
        console.log("Error in fetchProducts controller", error);
        res.status(500).json({ error: error.message });
    }
}
export const updateProducts = async (req, res) => {
    let image; // declared outside to avoid ReferenceError in catch

    try {
        const { title, description, price } = req.body;
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Update fields only if provided
        if (title) product.title = title;
        if (description) product.description = description;
        if (price) product.price = price;

        const imageLocalPath = req.file?.path;
        if (imageLocalPath) {
            // Delete old image from Cloudinary
            if (product.image) {
                const oldImageFile = product.image.split("/").pop();
                const oldImagePublicId = oldImageFile?.split(".")[0];
                if (oldImagePublicId) {
                    await deleteFromCloudinary(oldImagePublicId);
                }
            }

            image = await uploadOnCloudinary(imageLocalPath);
            if (!image?.url) {
                return res.status(500).json({ message: "Image upload failed" });
            }

            product.image = image.url;
        }

        await product.save();
        return res.status(200).json(product);
    } catch (error) {
        console.error("Error in updateProducts controller:", error);
        if (image?.public_id) {
            await deleteFromCloudinary(image.public_id); // cleanup new upload on failure
        }
        return res.status(500).json({ error: error.message });
    }
};


export const deleteProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        
        // Delete from Cloudinary if image exists
        if (product.image) {
            try {
                const imageUrl = product.image;
                const imageFileName = imageUrl.split("/").pop();
                const imagePublicId = imageFileName?.split(".")[0];
                if (imagePublicId) {
                    await deleteFromCloudinary(imagePublicId);
                }
            } catch (err) {
                console.warn("Failed to delete image from Cloudinary:", err.message);
            }
        }

        await Product.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error in deleteProducts controller:", error);
        return res.status(500).json({ error: error.message });
    }
};
