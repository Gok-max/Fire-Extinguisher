import { useState, useEffect } from "react";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";

function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [keypoints, setKeypoints] = useState("");
  const [variants, setVariants] = useState([{ name: "", size: "", price: "", specifications: [], image: null, preview: "" }]);
  const [editingProduct, setEditingProduct] = useState(null);

  const token = localStorage.getItem("token");

  // ✅ Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Handle Variant Changes
  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleVariantImage = (index, file) => {
    const updated = [...variants];
    updated[index].image = file;
    updated[index].preview = URL.createObjectURL(file);
    setVariants(updated);
  };

  const handleSpecChange = (variantIdx, specIdx, field, value) => {
    const updated = [...variants];
    updated[variantIdx].specifications[specIdx][field] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([...variants, { name: "", size: "", price: "", specifications: [], image: null, preview: "" }]);
  };

  const removeVariant = (index) => {
    const updated = variants.filter((_, i) => i !== index);
    setVariants(updated);
  };

  const addSpecification = (index) => {
    const updated = [...variants];
    updated[index].specifications.push({ name: "", value: "" });
    setVariants(updated);
  };

  const removeSpecification = (variantIdx, specIdx) => {
    const updated = [...variants];
    updated[variantIdx].specifications.splice(specIdx, 1);
    setVariants(updated);
  };

  // ✅ Handle Submit (Add / Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
   formData.append("keypoints", JSON.stringify(keypoints.split(",").map(p => p.trim())));

    if (file) formData.append("image", file);
    else if (image) formData.append("image", image);

    if (video && video instanceof File) formData.append("video", video);

    const variantData = variants.map((v, i) => ({
  name: v.name,
  size: v.size,
  price: v.price,
  specifications: v.specifications,
  gallery: v.gallery, // ✅ include this
  index: i,
}));

    formData.append("variants", JSON.stringify(variantData));

    variants.forEach((v, i) => {
      if (v.image) formData.append(`variantImage_${i}`, v.image);
    });

    try {
      if (editingProduct) {
        await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        });
        alert("✅ Product updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/products", formData, {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        });
        alert("✅ Product added successfully!");
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("❌ Error saving product");
    }
  };

  // ✅ Reset Form
  const resetForm = () => {
    setName("");
    setDescription("");
    setCategory("");
    setPrice("");
    setFile(null);
    setImage("");
    setVariants([{ name: "", size: "", price: "", specifications: [], image: null, preview: "" }]);
    setEditingProduct(null);
  };

  // ✅ Delete Product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

 const handleEdit = (product) => {
  setEditingProduct(product);
  setName(product.name || "");
  setDescription(product.description || "");
  setCategory(product.category || "");
  setImage(
    product.image
      ? product.image.startsWith("/uploads/")
        ? `http://localhost:5000${product.image}`
        : product.image
      : ""
  );

  setVideo(
  product.video
    ? product.video.startsWith("/uploads/")
      ? `http://localhost:5000${product.video}`
      : product.video
    : ""
);


  // ✅ Join keypoints back into a comma-separated string
  setKeypoints(product.keypoints ? product.keypoints.join(", ") : "");

  // ✅ Restore all variant data
  setVariants(
    product.variants?.map((v) => ({
      name: v.name || "",
      size: v.size || "",
      price: v.price || "",
      specifications: v.specifications || [],
      gallery: v.gallery || [],
      image: null,
      preview:
        v.gallery && v.gallery.length > 0
          ? `http://localhost:5000${v.gallery[0]}`
          : "",
    })) || [
      { name: "", size: "", price: "", specifications: [], image: null, preview: "" },
    ]
  );

  window.scrollTo({ top: 0, behavior: "smooth" });
};



  return (
    <div className="p-6 mt-24">
      <h2 className="text-2xl font-bold mb-6 text-[#F28C1E] text-center">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>

      {/* ✅ Form Section */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Product Name"
          className="border p-2 w-full rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="border p-2 w-full rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <textarea
          placeholder="Enter each point separated by commas"
          className="border p-2 w-full rounded"
          value={keypoints}
          onChange={(e) => setKeypoints(e.target.value)}
        />

        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="border p-2 w-full rounded" />

        <input
  type="file"
  accept="video/*"
  onChange={(e) => setVideo(e.target.files[0])}
  className="border p-2 w-full rounded"
/>

{/* 🎥 Preview video */}
{video && typeof video === "string" ? (
  <video
    src={video}
    controls
    className="w-64 h-40 mt-3 rounded shadow"
  />
) : video instanceof File ? (
  <video
    src={URL.createObjectURL(video)}
    controls
    className="w-64 h-40 mt-3 rounded shadow"
  />
) : null}


        {/* ✅ Variants */}
        <h3 className="font-semibold text-lg mt-6 mb-2">
          Variants (e.g., 2.5 lbs / 10 lbs / 20 lbs)
        </h3>

        {variants.map((variant, idx) => (
          <div key={idx} className="border p-4 rounded mb-4 bg-gray-50">
            <div className="flex justify-between items-center mb-2 gap-2">
            <input
                type="text"
                placeholder="Variant Name"
                className="border p-2 w-3/4 rounded"
                value={variant.name}
                onChange={(e) => handleVariantChange(idx, "name", e.target.value)}
              />
              <input
                type="text"
                placeholder="Variant Size"
                className="border p-2 w-3/4 rounded"
                value={variant.size}
                onChange={(e) => handleVariantChange(idx, "size", e.target.value)}
              />
               <input
                type="number"
                placeholder="Variant Price"
                className="border p-2 w-1/2 rounded"
                value={variant.price}
                onChange={(e) => handleVariantChange(idx, "price", e.target.value)}
              />
              <button type="button" onClick={() => removeVariant(idx)} className="text-red-500">
                <MdDeleteOutline size={24} />
              </button>
            </div>

            <input
              type="file"
              onChange={(e) => handleVariantImage(idx, e.target.files[0])}
              className="border p-2 w-full rounded mb-3"
            />

           {image && (
  <img
    src={image}
    alt="Product Preview"
    className="w-40 h-40 object-cover rounded mt-3 border"
  />
)}


            {(variant.specifications || []).map((spec, i) => (
              <div key={i} className="flex mb-2">
                <input
                  type="text"
                  placeholder="Specification Name"
                  className="border p-2 w-1/2 rounded"
                  value={spec.name}
                  onChange={(e) => handleSpecChange(idx, i, "name", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Value"
                  className="border p-2 w-1/2 rounded"
                  value={spec.value}
                  onChange={(e) => handleSpecChange(idx, i, "value", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeSpecification(idx, i)}
                  className="text-red-500"
                >
                  <MdDeleteOutline size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addSpecification(idx)}
              className="text-[#F28C1E] border border-[#F28C1E] px-3 py-1 rounded text-sm font-medium"
            >
              + Add Specification
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addVariant}
          className="text-[#F28C1E] border-2 border-[#F28C1E] px-4 py-2 rounded font-medium"
        >
          + Add Variant
        </button>

        <div className="flex gap-4 mt-4">
          <button type="submit" className="bg-[#F28C1E] text-white px-4 py-2 rounded text-lg font-semibold">
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
          {editingProduct && (
            <button
              type="button"
              onClick={resetForm}
              className="text-[#F28C1E] px-4 py-2 rounded border-2 border-[#F28C1E] font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* ✅ Product List */}
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p._id} className="p-4 rounded-xl shadow">
            <img
              src={
                p.image?.startsWith("/uploads/")
                  ? `http://localhost:5000${p.image}`
                  : p.image
              }
              alt={p.name}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="font-bold mt-2 text-center text-xl">{p.name}</h3>
            <p className="text-center text-gray-600">{p.category}</p>

            <div className="flex gap-2 justify-end mt-3">
              <button
                onClick={() => handleEdit(p)}
                className="bg-[#F28C1E] text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="text-[#F28C1E] border-2 border-[#F28C1E] px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProductPage;
