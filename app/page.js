import RandomPost from "@/components/RandomPost";
import Hero from "@/share/Hero";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Hero />
      <RandomPost/>
    </div>
  )
}





{/* <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <section className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Posts</h2>
    <div className="space-y-4">
      {[1, 2, 3].map((post) => (
        <div key={post} className="border-b border-gray-200 pb-4 last:border-b-0">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Example Post Title {post}</h3>
          <p className="text-gray-600">This is a brief excerpt from the post content...</p>
          <Link href={`/posts/${post}`} className="text-indigo-600 hover:text-indigo-800 mt-2 inline-block">
            Read more
          </Link>
        </div>
      ))}
    </div>
  </section>
</main> */}