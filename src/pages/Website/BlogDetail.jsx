/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import WebsiteLayout from "../../Layouts/Website";
import Faqs from "../../Components/Faqs";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { BLOGS } from "../../constants";

const Blog = () => {
  const { fetchData } = useFetch();
    const [blog, setBlog] = useState([]);
    const id = useParams().id;
  
    const fetchBlog = async () => {
      try {
        const response = await fetchData(`${BLOGS}/${id}`);
        setBlog(response?.data?.blog);
        // Handle the response if needed
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
  
    useEffect(() => {
      fetchBlog();
    }, []);
  return (
    <WebsiteLayout>
      <div className="container_custom">
        <div className="mt-[100px]">
          <main className="pt-8 lg:pt-16 lg:pb-14 bg-white antialiased">
            <div className="flex justify-between px-4 mx-auto">
              <article className="mx-auto w-full  format format-sm sm:format-base lg:format-lg text-[14px] format-blue dark:format-invert blog_details">
                <header className="mb-4 lg:mb-6 not-format">
                  <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">
                    {blog?.title}
                  </h1>
                </header>
                <p className="lead">
                 {blog?.description}
                </p>
                {/* <p>
                  Before going digital, you might benefit from scribbling down
                  some ideas in a sketchbook. This way, you can think things
                  through before committing to an actual design project.
                </p>
                <p>
                  But then I found a{" "}
                  <a href="https://flowbite.com">
                    component library based on Tailwind CSS called Flowbite
                  </a>
                  . It comes with the most commonly used UI components, such as
                  buttons, navigation bars, cards, form elements, and more which
                  are conveniently built with the utility classes from Tailwind
                  CSS.
                </p> */}
                <figure>
                  <img
                    src={blog?.image || "https://via.placeholder.com/800x400"}
                    alt=""
                    className="w-full mt-4 mb-5"
                  />
                </figure>
                
                
                
                
              </article>
            </div>
          </main>
        
        </div>
      </div>

    </WebsiteLayout>
  );
};

export default Blog;
