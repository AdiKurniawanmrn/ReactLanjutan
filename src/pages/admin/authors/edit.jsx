import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showAuthors, updateAuthors } from "../../../_service/authors";

export default function AuthorsEdit() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      name: "",
      bio: "",
      _method: "PUT",
    });
    useEffect(() => {
            const fetchData = async () => {
              const [ authorsData] = await Promise.all([
                showAuthors(id),
              ]);
              setFormData({
                name: authorsData.name,
                bio: authorsData.bio,
                _method: "PUT",
              })
            };
            fetchData();
        }, [id]);
      // Meng-handle perubahan input
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value,
          });
        };
      
        // Meng-handle submit form
        const handleSubmit = async (e) => {
          e.preventDefault();
          try {
            await updateAuthors(id,formData);
            navigate("/admin/authors");
          } catch (error) {
            console.log(error);
            alert("Error updated authors");
          }
        };
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Edit Authors
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            {/* Name */}
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Authors 
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="e.g. Fiction"
                required
              />
            </div>

            {/* bio */}
            <div className="sm:col-span-2">
              <label
                htmlFor="bio"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows="4"
                value={formData.bio}
                onChange={handleChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                placeholder="Write genre bio..."
              ></textarea>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-4 mt-6">
            <button
              type="submit"
              className="text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Save Authors
            </button>
            <button
              type="reset"
              className="text-gray-600 border border-gray-600 hover:bg-gray-600 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}