import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddNewBook = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();
  const bookedit = useSelector((state) => state.auth.bookedit);
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const [uploadfile, setUploadFile] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: bookedit.bookid,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  console.log(bookedit.edit, bookedit.bookid);

  const handleFileupload = (e) => {
    console.log("e is", e.target.files[0]);
    setUploadFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("form submit clicked");

    if (!uploadfile) {
      alert("Please select a file to upload.");
      return;
    }

    console.log("uploadfile", uploadfile);
    try {
      const formData = new FormData();
      formData.append("file", uploadfile);
      formData.append("title", bookData.title);
      formData.append("author", bookData.author);
      formData.append("price", bookData.price);
      formData.append("desc", bookData.desc);
      formData.append("language", bookData.language);

      console.log("formdata", formData);

      const response =
        bookedit.edit === false
          ? await axios.post(`${API_BASE_URL}/api/v1/add-book`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                id: localStorage.getItem("id"),
                authorization: `Bearer ${localStorage.getItem("token")}`,
                bookid: bookedit.bookid,
              },
            })
          : await axios.put(`${API_BASE_URL}/api/v1/update-book`, formData, {
              headers,
            });
      console.log("Book processed:", response.data);
      navigate("/all-books");

      // Reset form after successful submission
      setBookData({
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
      });

      setUploadFile("");
    } catch (error) {
      console.error("Error processing book:", error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="bg-zinc-700 p-8 rounded shadow-md w-full max-w-md text-white">
        <h2 className="text-2xl mb-6 text-center">
          {bookedit.edit ? "Edit Book" : "Add a New Book"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="url" className="block font-medium mb-2">
              Image Photo Upload
            </label>
            <input
              type="file"
              onChange={handleFileupload}
              className="w-full px-3 py-2 border rounded-md focus:outline-none text-black focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium mb-2">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={bookData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring text-black focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="block font-medium mb-2">
              Author
            </label>
            <input
              id="author"
              name="author"
              type="text"
              value={bookData.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring text-black focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block font-medium mb-2">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              value={bookData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring text-black focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="desc" className="block font-medium mb-2">
              Description
            </label>
            <input
              id="desc"
              name="desc"
              type="text"
              value={bookData.desc}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring text-black focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="language" className="block font-medium mb-2">
              Language
            </label>
            <input
              id="language"
              name="language"
              type="text"
              value={bookData.language}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring text-black focus:border-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            {bookedit.edit ? "Edit Book" : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewBook;
