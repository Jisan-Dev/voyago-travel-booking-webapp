import { TextEffect } from "@/components/motion-primitives/text-effect";
import Search from "@/components/search/search";
import * as motion from "motion/react-client";

export default async function Home() {
  // const data = await getAllHotels();
  return (
    <section className="relative min-h-screen flex items-center">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://www.pexels.com/download/video/2764953.mp4"
        poster="https://images.unsplash.com/photo-1670960058964-79063a8ecc91?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        autoPlay
        loop
        muted
      />
      <div className="absolute inset-0 bg-black/60" />
      {/* <div className="absolute inset-0 bg-[rgba(46,46,46,0.25)] mix-blend-overlay" /> */}

      <div className="container mx-auto px-6 relative z-10 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-white font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight">
            <TextEffect per="char" preset="fade">
              Discover Serenity in Nature&apos;s Embrace
            </TextEffect>
          </h1>
          <p className="mt-4 text-lg sm:text-xl">
            <TextEffect preset="fade-in-blur" speedReveal={1.1} speedSegment={0.3}>
              Explore breathtaking landscapes and find your perfect escape in our curated collection
              of nature-inspired stays.
            </TextEffect>
          </p>

          {/* <div className="mt-8 flex justify-center gap-4">
            <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-md shadow-lg font-semibold">
              Explore Hotels
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-md">
              My Bookings
            </button>
          </div> */}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-3xl mx-auto"
          >
            <Search />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
