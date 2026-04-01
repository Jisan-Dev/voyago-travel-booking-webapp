"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconBrandJavascript,
  IconBrandMongodb,
  IconBrandNextjs,
  IconBrandTailwind,
  IconBuilding,
  IconCalendar,
  IconFilter,
  IconShieldCheck,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export default function AboutContent() {
  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-center"
          style={{ transform: "scale(1.1)" }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="container relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Discover Your Perfect Stay with Voyago
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
          >
            A seamless, modern, and reliable hotel booking experience designed for the passionate
            traveler.
          </motion.p>
        </div>
      </section>

      {/* 2. Our Mission */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Voyago, we believe that finding the right accommodation shouldn&apos;t be a
                hassle. Our mission is to connect travelers with their ideal hotels, whether
                it&apos;s a luxury resort or a cozy retreat, through a platform that is secure,
                fast, and incredibly easy to use.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2 grid grid-cols-2 gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-primary/10 rounded-xl p-6 flex items-center justify-center min-h-[150px]"
              >
                <IconBuilding className="w-16 h-16 text-primary" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-secondary/50 rounded-xl p-6 flex items-center justify-center min-h-[150px]"
              >
                <IconCalendar className="w-16 h-16 text-secondary" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-muted rounded-xl p-6 flex items-center justify-center min-h-[150px]"
              >
                <IconShieldCheck className="w-16 h-16 text-primary" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-primary/5 rounded-xl p-6 flex items-center justify-center min-h-[150px]"
              >
                <IconFilter className="w-16 h-16 text-primary" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Voyago? */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Why Choose Voyago?
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <Card className="hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <IconBuilding className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Extensive Selection</CardTitle>
                  <CardDescription className="text-base mt-2">
                    Browse a comprehensive list of curated hotels across the globe.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card className="hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <IconCalendar className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Seamless Booking</CardTitle>
                  <CardDescription className="text-base mt-2">
                    An intuitive, multi-step booking process making reservations effortless.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card className="hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <IconShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Secure Payments</CardTitle>
                  <CardDescription className="text-base mt-2">
                    Bank-grade security powered by Stripe integration ensures your transactions are
                    completely safe.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card className="hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <IconFilter className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Smart Filtering</CardTitle>
                  <CardDescription className="text-base mt-2">
                    Advanced search by destination, price range, star ratings, and amenities to find
                    exactly what you need.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. The Technology Behind Voyago */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              The Technology Behind Voyago
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-muted-foreground leading-relaxed mb-8"
            >
              Engineered for excellence. Voyago is built as a robust full-stack application
              leveraging the power of <strong>Next.js</strong>, <strong>TypeScript</strong>, and{" "}
              <strong>MongoDB</strong>. With blazing-fast UI crafted via{" "}
              <strong>Tailwind CSS</strong> and <strong>Shadcn UI</strong>, and robust
              authentication securely handled by <strong>Better Auth</strong>, we&apos;ve built a
              platform that never compromises on performance or user experience.
            </motion.p>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.div
                variants={scaleIn}
                className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full"
              >
                <IconBrandNextjs className="w-5 h-5" />
                <span className="font-medium">Next.js</span>
              </motion.div>
              <motion.div
                variants={scaleIn}
                className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full"
              >
                <IconBrandJavascript className="w-5 h-5" />
                <span className="font-medium">TypeScript</span>
              </motion.div>
              <motion.div
                variants={scaleIn}
                className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full"
              >
                <IconBrandMongodb className="w-5 h-5" />
                <span className="font-medium">MongoDB</span>
              </motion.div>
              <motion.div
                variants={scaleIn}
                className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full"
              >
                <IconBrandTailwind className="w-5 h-5" />
                <span className="font-medium">Tailwind CSS</span>
              </motion.div>
              <motion.div
                variants={scaleIn}
                className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full"
              >
                <span className="font-medium">Shadcn UI</span>
              </motion.div>
              <motion.div
                variants={scaleIn}
                className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full"
              >
                <span className="font-medium">Better Auth</span>
              </motion.div>
              <motion.div
                variants={scaleIn}
                className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full"
              >
                <span className="font-medium">Stripe</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Meet the Creator */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Meet the Creator
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-4"
                    >
                      <span className="text-3xl font-bold text-primary">IJ</span>
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">Istiak Kashem Jisan</h3>
                    <p className="text-muted-foreground mb-4">Full-Stack Developer</p>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      A passionate full-stack developer dedicated to building impactful digital
                      experiences.
                    </p>
                    <Button asChild>
                      <a
                        href="https://jisan-swe.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Portfolio
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready for your next adventure?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg mb-8 opacity-90 max-w-2xl mx-auto"
          >
            Start exploring hotels worldwide and find your perfect stay today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/hotels">
              <Button
                size="lg"
                className="bg-white text-primary font-bold tracking-wide hover:bg-white/80"
              >
                Start Exploring Hotels
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
