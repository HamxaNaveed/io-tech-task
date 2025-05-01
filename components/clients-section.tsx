"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { getClientTestimonials, getStrapiMedia } from "@/lib/api";
import { useTranslations } from "next-intl";

interface ClientTestimonial {
  id: number;
  name: {
    en: string;
    ar: string;
  };
  position: {
    en: string;
    ar: string;
  };
  image: string;
  testimonial: {
    en: string;
    ar: string;
  };
}

const ClientsSection = () => {
  const [clientTestimonials, setClientTestimonials] = useState<
    ClientTestimonial[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const { language, isRTL } = useLanguage();
  const t = useTranslations("clients");

  useEffect(() => {
    const fetchClientTestimonials = async () => {
      try {
        setLoading(true);
        const data = await getClientTestimonials(language);

        console.log(data);

        if (data && data.length > 0) {
          const testimonials = data.map((client: any) => ({
            id: client.id,
            name: {
              en: client.attributes.name_en,
              ar: client.attributes.name_ar,
            },
            position: {
              en: client.attributes.position_en,
              ar: client.attributes.position_ar,
            },
            image: getStrapiMedia(client.image) || "/man.png",
            testimonial: {
              en: client.attributes.testimonial_en,
              ar: client.attributes.testimonial_ar,
            },
          }));

          setClientTestimonials(testimonials);
        } else {
          setClientTestimonials([
            {
              id: 1,
              name: { en: "Mohammed Saif", ar: "محمد سيف" },
              position: { en: "CEO/Company", ar: "الرئيس التنفيذي/الشركة" },
              image: "/man.png",
              testimonial: {
                en: "With the help of the hospitable staff of Al Safar and Partners I was able to get my work done without any hassle. The help I received helped me a great deal to overcome the issues that I faced. I was always updated about my case and my queries never went unanswered.",
                ar: "بمساعدة الفريق المضياف في الصفار وشركاه، تمكنت من إنجاز عملي دون أي متاعب. المساعدة التي تلقيتها ساعدتني كثيرًا في التغلب على المشكلات التي واجهتها. كنت دائمًا على اطلاع بحالة قضيتي ولم تبق استفساراتي أبدًا دون إجابة.",
              },
            },
            {
              id: 2,
              name: { en: "Mohammed Hamza", ar: "محمد حمزة" },
              position: { en: "CEO/Company", ar: "الرئيس التنفيذي/الشركة" },
              image: "/man.png",
              testimonial: {
                en: "With the help of the hospitable staff of Al Safar and Partners I was able to get my work done without any hassle. The help I received helped me a great deal to overcome the issues that I faced. I was always updated about my case and my queries never went unanswered.",
                ar: "بمساعدة الفريق المضياف في الصفار وشركاه، تمكنت من إنجاز عملي دون أي متاعب. المساعدة التي تلقيتها ساعدتني كثيرًا في التغلب على المشكلات التي واجهتها. كنت دائمًا على اطلاع بحالة قضيتي ولم تبق استفساراتي أبدًا دون إجابة.",
              },
            },
          ]);
        }
      } catch (err) {
        setClientTestimonials([
          {
            id: 1,
            name: { en: "Mohammed Saif", ar: "محمد سيف" },
            position: { en: "CEO/Company", ar: "الرئيس التنفيذي/الشركة" },
            image: "/man.png",
            testimonial: {
              en: "With the help of the hospitable staff of Al Safar and Partners I was able to get my work done without any hassle. The help I received helped me a great deal to overcome the issues that I faced. I was always updated about my case and my queries never went unanswered.",
              ar: "بمساعدة الفريق المضياف في الصفار وشركاه، تمكنت من إنجاز عملي دون أي متاعب. المساعدة التي تلقيتها ساعدتني كثيرًا في التغلب على المشكلات التي واجهتها. كنت دائمًا على اطلاع بحالة قضيتي ولم تبق استفساراتي أبدًا دون إجابة.",
            },
          },
          {
            id: 2,
            name: { en: "Mohammed Hamza", ar: "محمد حمزة" },
            position: { en: "CEO/Company", ar: "الرئيس التنفيذي/الشركة" },
            image: "/man.png",
            testimonial: {
              en: "With the help of the hospitable staff of Al Safar and Partners I was able to get my work done without any hassle. The help I received helped me a great deal to overcome the issues that I faced. I was always updated about my case and my queries never went unanswered.",
              ar: "بمساعدة الفريق المضياف في الصفار وشركاه، تمكنت من إنجاز عملي دون أي متاعب. المساعدة التي تلقيتها ساعدتني كثيرًا في التغلب على المشكلات التي واجهتها. كنت دائمًا على اطلاع بحالة قضيتي ولم تبق استفساراتي أبدًا دون إجابة.",
            },
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchClientTestimonials();
  }, [language]);

  const nextSlide = () => {
    setCurrentTestimonial((prev) =>
      prev + 1 >= clientTestimonials.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentTestimonial((prev) =>
      prev - 1 < 0 ? clientTestimonials.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <section className="py-16 bg-[#3E2723] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-[#3E2723] text-white">
        <div className="container-custom">
          <div className="text-center text-red-300">{error}</div>
        </div>
      </section>
    );
  }

  if (clientTestimonials.length === 0) {
    return (
      <section className="py-16 bg-[#3E2723] text-white">
        <div className="container-custom">
          <div className="text-center">No client testimonials available</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#3E2723] text-white">
      <div className="container-custom max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6">{t("whatClientsSaying")}</h2>

        <p className="text-white/80 mb-12 max-w-3xl">
          {t("clientsDescription")}
        </p>

        <div className="mt-12">
          {/* Testimonial */}
          <div
            key={clientTestimonials[currentTestimonial].id}
            className="flex flex-col md:flex-row gap-8 transition-opacity duration-500 ease-in-out"
          >
            {/* Image */}
            <div className="md:w-1/3">
              <div className="relative w-full aspect-square bg-[#5D4037] overflow-hidden rounded-lg">
                <Image
                  src={
                    clientTestimonials[currentTestimonial].image ||
                    "/placeholder.svg?height=400&width=300"
                  }
                  alt={
                    clientTestimonials[currentTestimonial].name[
                      language as "en" | "ar"
                    ]
                  }
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="md:w-2/3">
              <blockquote className="text-lg mb-8">
                "
                {
                  clientTestimonials[currentTestimonial].testimonial[
                    language as "en" | "ar"
                  ]
                }
                "
              </blockquote>

              <div className="mt-auto">
                <div className="font-bold text-2xl mb-1">
                  {
                    clientTestimonials[currentTestimonial].name[
                      language as "en" | "ar"
                    ]
                  }
                </div>
                <div className="text-white/80">
                  {
                    clientTestimonials[currentTestimonial].position[
                      language as "en" | "ar"
                    ]
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {clientTestimonials.length > 1 && (
            <div className="flex justify-end mt-8 space-x-4">
              <button
                onClick={prevSlide}
                className="bg-[#5D4037] hover:bg-[#8D6E63] rounded-full w-12 h-12 flex items-center justify-center transition-colors z-10"
                aria-label={t("previousTestimonial")}
              >
                <ChevronLeft
                  className={`h-6 w-6 ${isRTL ? "transform rotate-180" : ""}`}
                />
              </button>
              <button
                onClick={nextSlide}
                className="bg-white hover:bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center transition-colors z-10"
                aria-label={t("nextTestimonial")}
              >
                <ChevronRight
                  className={`h-6 w-6 text-[#3E2723] ${
                    isRTL ? "transform rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
