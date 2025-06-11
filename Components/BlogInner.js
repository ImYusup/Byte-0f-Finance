import { MDXRemote } from "next-mdx-remote";
import { BsThreeDots } from "react-icons/bs";
import Toc from "./Toc";

function BlogInner({ data, content, headings }) {
  return (
    <div className="mx-auto max-w-screen-xl px-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8">
      {/* LEFT: Main Content */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg pb-8">
        {/* Header Image */}
        <img
          className="object-cover w-full h-72 mb-8 rounded-t-lg"
          src={data.HeaderImage}
          alt="Article Image"
        />

        <div className="p-4">
          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {data.Tags.split(" ").map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase rounded-full bg-indigo-500 dark:bg-indigo-600"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-semibold text-center text-gray-800 dark:text-gray-100">
            {data.Title}
          </h1>

          {/* Decorative Dots */}
          <div className="text-center text-5xl pt-2 text-gray-400">
            <BsThreeDots />
          </div>

          {/* Article Content */}
          <article className="prose max-w-xs sm:max-w-sm md:max-w-prose lg:prose-lg py-7 dark:prose-dark mx-auto">
            <MDXRemote {...content} />
          </article>

          {/* Footer */}
          <div className="mt-6 text-center">
            <div className="text-5xl pb-2 text-gray-400">
              <BsThreeDots />
            </div>
            <p className="text-2xl pb-2">Thanks for reading!!!</p>
            <p className="font-semibold text-gray-700 dark:text-gray-100">
              {data.Author}
            </p>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Author
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT: Table of Contents */}
      <aside className="toc">
        <Toc headings={headings} />
      </aside>
    </div>
  );
}

export default BlogInner;
