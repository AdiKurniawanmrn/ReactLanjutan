import { useNavigate, useParams } from "react-router-dom";
import { getGenres } from "../../../_service/genres";
import { getAuthors } from "../../../_service/authors";
import { useEffect, useState } from "react";
import { showBooks, updateBooks } from "../../../_service/books";

export default function BooksEdit() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
      title: "",
      price: 0,
      stock: 0,
      genres_id: 0,
      authors_id: 0,
      cover_photo: null,
      description: "",
      _method: "PUT",
    });
    useEffect(() => {
        const fetchData = async () => {
          const [genresData, authorsData, booksData] = await Promise.all([
            getGenres(),
            getAuthors(),
            showBooks(id),
          ]);
          setGenres(genresData);
          setAuthors(authorsData);
          setFormData({
            title: booksData.title,
            price: booksData.price,
            stock: booksData.stock,
            genres_id: booksData.genres_id,
            authors_id: booksData.authors_id,
            cover_photo: booksData.cover_photo,
            description: booksData.description,
            _method: "PUT",
          })
        };
        fetchData();
    }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cover_photo") {
      setFormData({
        ...formData,
        cover_photo: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }};
    console.log(formData);
  const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const payload = new FormData();
        for (const key in formData) {
          payload.append(key, formData[key]);
        }
  
        await updateBooks(id, payload);
        navigate("/admin/books");
      } catch (error) {
        console.log(error);
        alert("Error updated book");
      }
    };
   return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Edit Book
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            {/* Title */}
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Book title"
                required
              />
            </div>

            {/* Price */}
            <div className="w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="e.g. 15000"
                required
              />
            </div>

            {/* Stock */}
            <div className="w-full">
              <label
                htmlFor="stock"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Stock
              </label>
              <input
                type="number"
                name="stock"
                id="stock"
                value={formData.stock}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="e.g. 20"
                required
              />
            </div>
          </div>

          {/* Genres */}
          <div>
            <label
              htmlFor="genres_id"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Genres
            </label>
            <select
              id="genres_id"
              name="genres_id"
              value={formData.genres_id}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
              <option value="">-- Select Genres --</option>
              {genres.map((genres) => (
                <option key={genres.id} value={genres.id}>
                  {genres.name}
                </option>
              ))}
            </select>
          </div>

          {/* Authors */}
          <div>
            <label
              htmlFor="authors_id"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Authors
            </label>
            <select
              id="authors_id"
              name="authors_id"
              value={formData.authors_id}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
              <option value="">-- Select Author --</option>
              {authors.map((authors) => (
                <option key={authors.id} value={authors.id}>
                  {authors.name}
                </option>
              ))}
            </select>
          </div>

          {/* Cover */}
          <div className="w-full mt-4">
            <label
              htmlFor="cover_photo"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Cover Photo
            </label>
            <input
              type="file"
              name="cover_photo"
              id="cover_photo"
              accept="image/*"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full cursor-pointer"
              required
            />
          </div>

          {/* Description */}
          <div className="mt-4">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              placeholder="Write book description..."
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-4 mt-6">
            <button
              type="submit"
              className="text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Save Book
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
