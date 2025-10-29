import { useState, useEffect } from "react";
import axios from "axios";

function AdminService() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("image");
  const [url, setUrl] = useState(""); // for URL
  const [file, setFile] = useState(null); // for upload
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [category, setCategory] = useState("");


  const token = localStorage.getItem("token");

  const fetchServices = async () => {
    const res = await axios.get("http://localhost:5000/api/services");
    setServices(res.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("type", type);

    if (file) formData.append("file", file);
    else formData.append("url", url);

    try {
      if (editingService) {
        await axios.put(
          `http://localhost:5000/api/services/${editingService._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` } }
        );
        alert("✅ Service updated!");
      } else {
        await axios.post("http://localhost:5000/api/services", formData, {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        });
        alert("✅ Service added!");
      }

      setTitle("");
      setDescription("");
      setCategory("");
      setType("image");
      setUrl("");
      setFile(null);
      setEditingService(null);
      fetchServices();
    } catch (err) {
      console.error(err);
      alert("❌ Error saving service");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this service?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setTitle(service.title);
    setDescription(service.description);
      setCategory(service.category);
    setType(service.type);
    setUrl(service.url);
    setFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6 mt-24">
      <h2 className="text-2xl font-bold mb-6">{editingService ? "Edit Service" : "Add Service"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full rounded"
          value={title}  
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="border p-2 w-full rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

<input
  type="text"
  placeholder="Category"
  className="border p-2 w-full rounded"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
/>

        <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 w-full rounded">
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>

        <input
          type="text"
          placeholder="Media URL"
          className="border p-2 w-full rounded"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <p className="text-center text-gray-600">OR</p>
        <input type="file" className="border p-2 w-full rounded" onChange={(e) => setFile(e.target.files[0])} />

        <div className="flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {editingService ? "Update Service" : "Add Service"}
          </button>
          {editingService && (
            <button
              type="button"
              onClick={() => {
                setEditingService(null);
                setTitle("");
                setDescription("");
                setType("image");
                setUrl("");
                setFile(null);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-2xl font-bold mb-4">Service List</h2>
      <div className="grid grid-cols-3 gap-4">
        {services.map((s) => (
          <div key={s._id} className="border p-4 rounded shadow">
            {s.type === "image" ? (
              <img
                src={s.url.startsWith("/uploads/") ? `http://localhost:5000${s.url}` : s.url}
                alt={s.title}
                className="w-full h-40 object-cover rounded"
              />
            ) : (
              <video controls className="w-full h-40 rounded">
                <source src={s.url.startsWith("/uploads/") ? `http://localhost:5000${s.url}` : s.url} />
              </video>
            )}
            <h3 className="font-bold mt-2">{s.title}</h3>
            <p>{s.description}</p>
            <p className="text-sm text-gray-600 italic">Category: {s.category}</p>
            <div className="flex justify-between mt-3">
              <button onClick={() => handleEdit(s)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                Edit
              </button>
              <button onClick={() => handleDelete(s._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminService;
