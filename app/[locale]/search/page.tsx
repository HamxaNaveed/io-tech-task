"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import { searchContent, getStrapiMedia } from "@/lib/api";
import { useTranslations } from "next-intl";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const t = useTranslations();

  useEffect(() => {
    const performSearch = async () => {
      if (!query) {
        setResults({ team: [], services: [], blog: [] });
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const searchResults = await searchContent(query, language);
        setResults(searchResults);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query, language]);

  return (
    <main className="pt-32 pb-16">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">
          {query ? `Search results for "${query}"` : "Search"}
        </h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5D4037]"></div>
          </div>
        ) : (
          <div>
            {!results ||
            (!results.team?.length && !results.services?.length) ? (
              <div className="text-center py-12 text-gray-500">
                {query
                  ? `No results found for "${query}"`
                  : "Enter a search term to find content"}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Team Members */}
                {results.team && results.team.length > 0 && (
                  <div className="col-span-1">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200">
                      Team Members
                    </h2>
                    <ul className="space-y-4">
                      {results.team.map((member: any) => (
                        <li
                          key={member.id}
                          className="border-b border-gray-100 pb-4"
                        >
                          <Link
                            href={`/${language}/team/${member.id}`}
                            className="group"
                          >
                            {member.image && (
                              <div className="relative w-full h-48 mb-3 overflow-hidden rounded">
                                <Image
                                  src={
                                    getStrapiMedia(member.image) ||
                                    "/placeholder.svg?height=400&width=300"
                                  }
                                  alt={member.name}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                            )}
                            <h3 className="font-bold text-lg group-hover:text-[#5D4037]">
                              {member.name}
                            </h3>
                            <p className="text-gray-600">{member.role}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Services */}
                {results.services && results.services.length > 0 && (
                  <div className="col-span-1">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200">
                      Services
                    </h2>
                    <ul className="space-y-4">
                      {results.services.map((service: any) => (
                        <li
                          key={service.id}
                          className="border-b border-gray-100 pb-4"
                        >
                          <Link
                            href={`/${language}/services/${service.slug}`}
                            className="group"
                          >
                            {service.image && (
                              <div className="relative w-full h-48 mb-3 overflow-hidden rounded">
                                <Image
                                  src={
                                    getStrapiMedia(service.image) ||
                                    "/placeholder.svg?height=400&width=300"
                                  }
                                  alt={service.title_en}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                            )}
                            <h3 className="font-bold text-lg group-hover:text-[#5D4037]">
                              {service.title_en}
                            </h3>
                            {service.description_en && (
                              <p className="text-gray-600 line-clamp-2">
                                {service.description_en}
                              </p>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
