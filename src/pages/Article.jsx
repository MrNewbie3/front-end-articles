import { BarLoader } from "react-spinners";
import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Dashboard() {
  const router = useParams();
  const { id } = router;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState();
  const handleSubmit = () => {
    setLoadingButton(true);
    axios
      .put("https://api-articles-tour.vercel.app/api/articles/" + id, {
        title: data.title.toString(),
        content: data.content.toString(),
      })
      .then(() => {
        alert("Article update success");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(setLoadingButton(false));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: [value],
    }));
  };
  useEffect(() => {
    if (data === null)
      axios
        .get("https://api-articles-tour.vercel.app/api/articles/" + id)
        .then((result) => {
          setData(result.data.response);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <AdminLayout>
      <p className="text-gray-700 text-3xl mb-16 font-bold">Article Controller</p>
      {loading ? (
        <div className="wrapper w-full h-96 flex items-center justify-center">
          <BarLoader />
        </div>
      ) : (
        <form>
          <h1 className="font-bold text-2xl mb-10">Edit Article</h1>
          <h1>Title:</h1>
          <textarea name="title" value={data.title} onChange={handleChange} cols={30} rows={3} className="bg-transparent w-full"></textarea>
          <h1>Content:</h1>
          <textarea name="content" value={data.content} onChange={handleChange} className="bg-transparent w-full h-96"></textarea>
          {loadingButton ? (
            <button
              disabled
              type="button"
              onClick={handleSubmit}
              className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Loading
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Submit
            </button>
          )}
        </form>
      )}
    </AdminLayout>
  );
}
