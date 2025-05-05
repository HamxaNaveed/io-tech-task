"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { getHeroData, getStrapiMedia } from "@/lib/api";
import { useTranslations } from "next-intl";

interface HeroSlide {
  id: number;
  title: string;
  description: string;
  image: any;
  type: "image" | "video";
  videoUrl?: string;
}

export const fallbackHeroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Your Success, Our Commitment",
    description: "Watch how we make legal excellence a reality.",
    type: "image",
    image: "/hero-image.jpg",
    videoUrl: "",
  },
  {
    id: 2,
    title: "Your Justice, Our Priority",
    description: "Expert legal guidance tailored to your needs.",
    type: "video",
    image: "",
    videoUrl:
      "https://videos.pexels.com/video-files/2424117/2424117-sd_640_360_30fps.mp4",
  },
];

const HeroSection = () => {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const { language, isRTL } = useLanguage();
  const t = useTranslations("hero");
  const commonT = useTranslations("common");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const fetchHeroData = async () => {
      try {
        setLoading(true);
        const heroData = (await getHeroData(language)) || fallbackHeroSlides;

        if (heroData) {
          const slides = heroData.map((slide: any) => ({
            id: slide.id,
            title: slide.title_en,
            description: slide.description_en,
            image: getStrapiMedia(slide.image),
            type: slide.media_type || "image",
            videoUrl: slide.video_url || "",
          }));

          setHeroSlides(slides);
        } else {
          setHeroSlides(fallbackHeroSlides);
        }
      } catch (err) {
        setHeroSlides(fallbackHeroSlides);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, [isMounted, language]);

  useEffect(() => {
    if (!isMounted || heroSlides.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isMounted, currentSlide, heroSlides.length]);

  useEffect(() => {
    if (!isMounted || heroSlides.length === 0) return;

    const currentSlideData = heroSlides[currentSlide];

    if (currentSlideData.type === "video" && videoRefs.current[currentSlide]) {
      videoRefs.current[currentSlide]?.play();
    }

    videoRefs.current.forEach((video, index) => {
      if (index !== currentSlide && video) {
        video.pause();
      }
    });
  }, [isMounted, currentSlide, heroSlides]);

  const nextSlide = () => {
    if (isTransitioning || heroSlides.length <= 1) return;

    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isTransitioning || heroSlides.length <= 1) return;

    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide || heroSlides.length <= 1)
      return;

    setIsTransitioning(true);
    setCurrentSlide(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  if (!isMounted) {
    return (
      <section className="relative hero-slider overflow-hidden flex items-center justify-center h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5D4037]"></div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="relative hero-slider overflow-hidden flex items-center justify-center h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5D4037]"></div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative hero-slider overflow-hidden flex items-center justify-center h-[500px]">
        <div className="text-center text-red-500">{error}</div>
      </section>
    );
  }

  if (heroSlides.length === 0) {
    return (
      <section className="relative hero-slider overflow-hidden flex items-center justify-center h-[500px]">
        <div className="text-center">No hero content available</div>
      </section>
    );
  }

  return (
    <section className="relative hero-slider overflow-hidden h-[500px]">
      {/* Slides */}
      <div className="h-full relative ">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {slide.type === "video" ? (
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                src={slide.videoUrl}
              />
            ) : (
              <div className="relative w-full h-full">
                {/* Background Image */}
                <Image
                  src={slide.image || "/placeholder.svg?height=1080&width=1920"}
                  alt={slide.title || "Hero image"}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#4B261533] via-[#4B261555] to-[#4B2615AA]"></div>
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
                {/* Left Content */}
                <div className="w-full md:w-1/2 text-white z-20 p-6">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg mb-6">{slide.description}</p>
                  <Link
                    href={`/${language}/services`}
                    className="bg-white text-[#3E2723] hover:bg-gray-200 px-6 py-3 rounded inline-block font-medium"
                  >
                    Read More
                  </Link>
                </div>

                {/* Right Content - Empty white box for person image */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center mt-8 md:mt-0">
                  <div className="relative w-64 h-64 md:w-80 md:h-80 bg-white rounded-sm overflow-hidden">
                    <Image
                      src={"/man.png"}
                      alt={"Man image"}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Navigation - Positioned on left side */}
      {/* <div className="absolute left-12 top-1/2 -translate-y-1/2 z-20 flex flex-col space-y-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}
    </section>
  );
};

export default HeroSection;
