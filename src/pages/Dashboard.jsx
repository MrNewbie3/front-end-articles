import { RadioGroup } from "@headlessui/react";
import { BarLoader } from "react-spinners";
import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (data === null)
      axios
        .get("https://api-articles-tour.vercel.app/api/articles")
        .then((result) => {
          setData(result.data.response);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
  }, [data]);

  return (
    <AdminLayout>
      <p className="text-gray-700 text-3xl mb-16 font-bold">Article Controller</p>
      {loading ? (
        <div className="wrapper w-full h-96 flex items-center justify-center">
          <BarLoader />
        </div>
      ) : (
        <div className="w-full h-full px-4 py-16">
          <div className="w-full max-w-md flex flex-col gap-y-5">
            <p className="font-bold">Article List, Click to edit</p>
            <RadioGroup>
              <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
              <div className="flex flex-col gap-y-2">
                {data.map((data) => (
                  <Link to={"/article/" + data._id}>
                    <RadioGroup.Option key={data} value={data} className={`bg-[${data.color}] relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md hover:scale-110 transition-all duration-1 00 ease-linear`}>
                      <RadioGroup.Label as="p" className={`font-medium text-white `}>
                        {data.title}
                      </RadioGroup.Label>
                      <RadioGroup.Description as="span" className={`inline ${"text-gray-500"}`}>
                        <span></span> <span aria-hidden="true">&middot;</span> <span></span>
                      </RadioGroup.Description>
                    </RadioGroup.Option>
                  </Link>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
