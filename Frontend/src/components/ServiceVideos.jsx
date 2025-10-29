import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const backendURL = "http://localhost:5000";

function ServiceVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/services`);
        // Filter only video files
        const videoServices = res.data.filter(
          (item) => item.url && item.url.match(/\.(mp4|mov|avi|mkv)$/i)
        );
        setVideos(videoServices);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };
    fetchVideos();
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-red-700">Service Videos</h2>
        <p className="text-gray-600 mt-2">
          Watch videos showcasing our fire safety training and installations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <motion.div
              key={video._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-4 text-center hover:shadow-2xl transition"
            >
              <video
                controls
                className="w-full h-56 object-cover rounded-lg mb-4"
              >
                <source src={`${backendURL}${video.url}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <h3 className="text-xl font-semibold text-gray-800">
                {video.title}
              </h3>
              <p className="text-gray-600 mt-2">{video.description}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            No videos available
          </p>
        )}
      </div>
    </section>
  );
}

export default ServiceVideos;
