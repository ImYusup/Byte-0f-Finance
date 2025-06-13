// pages/blog/[slug].js
import { useEffect } from "react";
import { useRouter } from "next/router";
import SEO from "../../Components/SEO";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import BlogContent from "../../Components/BlogContent";
import { getBlogPostBySlug, getAllBlogSlugs, getAllTopics } from "../../Lib/Data";

export async function getStaticPaths() {
  const slugs = getAllBlogSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const blog = getBlogPostBySlug(params.slug);
  const topics = getAllTopics();
  return {
    props: {
      blog,
      topics,
    },
  };
}

export default function BlogPage({ blog, topics }) {
  const router = useRouter();
  const { data, content, readTime } = blog;

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  return (
    <>
      <SEO
        title={`${data.Title} | Byte-0f-Finance`}
        description={data.Description || `${data.Title} article on Byte-0f-Finance`}
        url={`https://imyusupblogs.vercel.app/blog/${data.Slug}`}
        image={data.Image || "https://raw.githubusercontent.com/imyusup/Byte-0f-Finance/main/Extra/sc.png"}
        keywords={data.Tags?.join(", ") || "Cryptocurrency, Stocks, Commodities"}
      />

      <div className="min-h-screen relative bg-white dark:bg-gray-900">
        <Navbar topics={topics} />

        {/* AdSense Unit */}
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

        <div className="px-0.5 md:px-7 pt-6 mx-auto pb-14">
          <BlogContent data={data} content={content} readTime={readTime?.text} />
        </div>

        <Footer />
      </div>
    </>
  );
}
