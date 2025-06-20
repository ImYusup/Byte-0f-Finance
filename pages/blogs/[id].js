import { getAllBlogPosts, getAllTopics } from "../../Lib/Data";
import { serialize } from "next-mdx-remote/serialize";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Head from "next/head";
import BlogInner from "../../Components/BlogInner";
import BlogShare from "../../Components/BlogShare";
import Comments from "../../Components/Comments";
import { SWRConfig } from "swr";
import { remarkHeadingId } from "remark-custom-heading-id";
import { getHeadings } from "../../Lib/GetHeadings";
import LikeBtn from "../../Components/LikeBtn";

export const getStaticPaths = () => {
  const allBlogs = getAllBlogPosts();
  return {
    paths: allBlogs.map((blog) => ({
      params: {
        id: String(blog.data.Title.split(" ").join("-").toLowerCase()),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const params = context.params;
  const allBlogs = getAllBlogPosts();
  const allTopics = getAllTopics();

  const page = allBlogs.find(
    (blog) =>
      String(blog.data.Title.split(" ").join("-").toLowerCase()) === params.id
  );

  if (!page) return { notFound: true };

  const { data, content } = page;
  data.HeaderImage = data.HeaderImage || "/default.jpg";

  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: { remarkPlugins: [remarkHeadingId] },
  });

  const headings = await getHeadings(content);

  return {
    props: {
      data,
      content: mdxSource,
      id: params.id,
      headings,
      topics: allTopics,
    },
  };
};

function BlogById({ data, content, id, headings, topics }) {
  const shareUrl = `https://imyusupblogs.vercel.app/blogs/${id}`;
  const imageUrl = `https://raw.githubusercontent.com/imyusup/Byte-0f-Finance/main/public${data.HeaderImage}`;

  return (
    <>
      <Head>
        <title>{data.Title}</title>
        <meta name="title" content={data.Title} />
        <meta name="description" content={data.Abstract} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:title" content={data.Title} />
        <meta property="og:description" content={data.Abstract} />
        <meta property="og:image" content={imageUrl} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={shareUrl} />
        <meta property="twitter:title" content={data.Title} />
        <meta property="twitter:description" content={data.Abstract} />
        <meta property="twitter:image" content={imageUrl} />
      </Head>

      <div className="min-h-screen relative bg-white dark:bg-gray-900">
        <Navbar topics={topics} />

        <div className="px-4 py-6 flex justify-center">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-7448328675787714"
            data-ad-slot="9654195362"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>

        <div className="py-12 px-2 md:px-6">
          <BlogInner data={data} content={content} headings={headings} />
          <LikeBtn id={id} />
          <BlogShare data={data} />

          <SWRConfig>
            <Comments id={id} />
          </SWRConfig>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default BlogById;