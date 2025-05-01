"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import { getTeamMembers, getStrapiMedia } from "@/lib/api";
import { useTranslations } from "next-intl";
import { FaWhatsapp, FaPhone, FaEnvelope } from "react-icons/fa";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  social: {
    whatsapp: string;
    phone: string;
    email: string;
  };
}

export const fallbackTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Hamza Naveed",
    position: "Software Engineer",
    image: "/man.png",
    social: {
      email: "officialhamxa@gmail.com",
      phone: "03075060161",
      whatsapp: "03075060161",
    },
  },
  {
    id: 2,
    name: "Ayesha Khan",
    position: "Legal Advisor",
    image: "/man.png",
    social: {
      email: "ayesha@example.com",
      phone: "03001234567",
      whatsapp: "03001234567",
    },
  },
  {
    id: 3,
    name: "George",
    position: "Legal Advisor",
    image: "/man.png",
    social: {
      email: "ayesha@example.com",
      phone: "03001234567",
      whatsapp: "03001234567",
    },
  },
  {
    id: 4,
    name: "Martin",
    position: "Legal Advisor",
    image: "/man.png",
    social: {
      email: "ayesha@example.com",
      phone: "03001234567",
      whatsapp: "03001234567",
    },
  },
];

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);

  const { language, isRTL } = useLanguage();
  const t = useTranslations("team");

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const data = fallbackTeamMembers;

        if (data && data.length > 0) {
          const members = data.map((member: any) => ({
            id: member.id,
            name: member.name,
            position: member.role,
            image: getStrapiMedia(member.image),
            social: member.social,
          }));

          setTeamMembers(members);
        } else {
          setTeamMembers(fallbackTeamMembers);
        }
      } catch (err) {
        setTeamMembers(fallbackTeamMembers);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, [language]);

  const visibleMembers = teamMembers.slice(startIndex, startIndex + 3);

  const nextSlide = () => {
    setStartIndex((prevIndex) => {
      if (prevIndex + 3 >= teamMembers.length) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return Math.max(0, teamMembers.length - 3);
      }
      return prevIndex - 1;
    });
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5D4037]"></div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-100">
        <div className="container-custom">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  if (teamMembers.length === 0) {
    return (
      <section className="py-16 bg-gray-100">
        <div className="container-custom">
          <div className="text-center">No team members available</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-100 text-[#3E2723]">
      <div className="container-custom max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">{t("ourTeam")}</h2>
        <p className="text-center mb-16 max-w-3xl mx-auto">
          {t("teamDescription")}
        </p>

        <div className="relative">
          {/* Team Members Slider */}
          <div className="flex justify-center gap-8">
            {visibleMembers.map((member) => (
              <div key={member.id} className="w-full max-w-xs text-center">
                <div className="relative w-full aspect-[3/4] bg-[#5D4037] mb-4">
                  <Image
                    alt="alt"
                    src={
                      member.image || "/placeholder.svg?height=400&width=300"
                    }
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                <p className="text-gray-500 text-sm tracking-wider uppercase mb-4">
                  {member.position}
                </p>
                <div className="flex justify-center space-x-4">
                  {member.social.whatsapp && (
                    <a
                      href={`https://wa.me/${member.social.whatsapp.replace(
                        /[^0-9]/g,
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="text-black hover:text-gray-700"
                    >
                      <FaWhatsapp className="h-5 w-5" />
                    </a>
                  )}
                  {member.social.phone && (
                    <a
                      href={`tel:${member.social.phone.replace(/[^0-9]/g, "")}`}
                      aria-label="Phone"
                      className="text-black hover:text-gray-700"
                    >
                      <FaPhone className="h-5 w-5" />
                    </a>
                  )}
                  {member.social.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      aria-label="Email"
                      className="text-black hover:text-gray-700"
                    >
                      <FaEnvelope className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between">
            <button
              onClick={prevSlide}
              className="bg-white hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center transition-colors z-10"
              aria-label={t("previousTeamMembers")}
            >
              <svg
                className={`h-6 w-6 text-[#3E2723] ${
                  isRTL ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="bg-white hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center transition-colors z-10"
              aria-label={t("nextTeamMembers")}
            >
              <svg
                className={`h-6 w-6 text-[#3E2723] ${
                  isRTL ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
