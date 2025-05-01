import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, getStrapiMedia } from "@/lib/api";
import { ArrowLeft } from "lucide-react";
import HeroSection from "@/components/hero-section";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title_en} | Our Services`,
    description: service.description_en?.substring(0, 160),
  };
}

export default async function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const {
    title_en,
    description_en,
    approach_en,
    image,
    approach_image,
    features,
  } = service;

  const imageUrl = getStrapiMedia(image);
  const approachImageUrl = getStrapiMedia(approach_image);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Content */}
      <main className="flex-grow bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 mb-6 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back</span>
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-6">{title_en}</h1>

          {description_en && (
            <div
              className="prose max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: description_en }}
            />
          )}

          {/* Features Section */}
          {features && features.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-4">Our Services</h2>
              <div className="space-y-6">
                {features.map((feature: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-2 h-2 bg-gray-900 rounded-full mt-2" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-2">
                          {feature.title_en}
                        </h3>
                        {feature.description_en && (
                          <div
                            className="text-gray-600"
                            dangerouslySetInnerHTML={{
                              __html: feature.description_en,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Approach Section */}
          {approach_en && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-4">Our Approach</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {approachImageUrl && (
                  <div className="relative h-[300px]">
                    <Image
                      src={approachImageUrl || "/placeholder.svg"}
                      alt="Our Approach"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: approach_en }}
                />
              </div>
            </div>
          )}

          {/* Contact CTA */}
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <p className="text-gray-700 mb-4">
              Need professional assistance with {title_en.toLowerCase()}?
              Contact us today to receive professional and comprehensive legal
              consultation.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
