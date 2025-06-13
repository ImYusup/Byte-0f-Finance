import { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import BlogHeader from "../Components/BlogHeader";
import SEO from "../Components/SEO";
import { getAllBlogPosts, getAllTopics } from "../Lib/Data";

export const getStaticProps = () => {
  const allBlogs = getAllBlogPosts();
  const allTopics = getAllTopics();
  return {
    props: {
      blogs: allBlogs,
      topics: allTopics,
    },
  };
};

export default function Home({ blogs, topics }) {
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
        title="Byte-0f-Finance 💸"
        description="Tech blogs and insights on Crypto, Stocks, and Commodities — covering Bitcoin, Ethereum, Nvidia, Gold, and more."
        url="https://imyusupblogs.vercel.app"
        image="https://raw.githubusercontent.com/imyusup/Byte-0f-Finance/main/Extra/sc.png"
        keywords="Bitcoin, Ethereum, Solana, SUI, Hyperliquid, Microsoft, Nvidia, Apple, Amazon, Google, Gold, Silver, Cryptocurrency, Stocks, Commodities, DeFi, Saving, Staking, Investing, Tech, AI, Trading, Layer1, Perpetuals, E-Commerce, Cloud, Inflation-Hedge, Safe-Haven, Precious-Metals, Green-Energy"
      />

      {/* Google AdSense Script */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7448328675787714"
        crossOrigin="anonymous"
      ></script>

      <div className="min-h-screen relative bg-white dark:bg-gray-900">
        <Navbar topics={topics} />
        <Header />

        {/* Manual AdSense unit */}
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

        <div className="px-0.5 md:px-7 pb-14 pt-6 mx-auto">
          <div className="flex flex-wrap">
            {blogs &&
              blogs.map(
                (blog) =>
                  blog.data.isPublished && (
                    <BlogHeader
                      key={blog.data.Id}
                      data={blog.data}
                      content={blog.content}
                      readTime={blog.readTime.text}
                    />
                  )
              )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
