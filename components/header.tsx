"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearchQuery, toggleSearch } from "@/redux/features/searchSlice";
import { fetchAPI } from "@/lib/api";
import { useTranslations } from "next-intl";
import { searchContent } from "@/lib/search";

interface Service {
  id: number;
  title_en: string;
  title_ar: string;
  slug: string;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const { language, toggleLanguage, isRTL } = useLanguage();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isSearchOpen } = useAppSelector((state) => state.search);
  const t = useTranslations();
  const headerT = useTranslations("header");
  const commonT = useTranslations("common");

  const searchRef = useRef<HTMLDivElement>(null);

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMounted) return;
    const fetchServices = async () => {
      try {
        const res = await fetchAPI("/api/services?fields=slug,title_en");
        setServices(res.data);
      } catch (err) {}
    };
    fetchServices();
  }, [isMounted, language]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      dispatch(setSearchQuery(searchInput));
      router.push(`/${language}/search?q=${encodeURIComponent(searchInput)}`);
      setSearchInput("");
      dispatch(toggleSearch());
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value.trim().length >= 1) {
      setIsSearching(true);
      const timer = setTimeout(() => performSearch(value), 300);
      return () => clearTimeout(timer);
    } else {
      setSearchResults(null);
      setIsSearching(false);
    }
  };

  const performSearch = async (query: string) => {
    try {
      const results = await searchContent(query, language);
      setSearchResults(results);
      setIsSearching(false);
    } catch (error) {
      setIsSearching(false);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleToggleSearch = () => dispatch(toggleSearch());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSearchOpen &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        dispatch(toggleSearch());
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen, dispatch]);

  if (!isMounted) return null;

  const isSolid = isScrolled || servicesDropdownOpen;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isSolid ? "bg-[#3E2723] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link href={`/${language}`} className="flex items-center">
            <div className="text-white font-bold text-xl">Logo</div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-gray-300">
              {headerT("aboutUs")}
            </Link>
            <div
              className="relative group"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button className="text-white hover:text-gray-300 flex items-center py-2">
                {headerT("services")}
                <svg
                  className={`w-4 h-4 ${isRTL ? "mr-1" : "ml-1"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {servicesDropdownOpen && (
                <div
                  className={`absolute ${
                    isRTL ? "right-0" : "left-0"
                  } top-full w-[100vw] bg-[#3E2723] rounded-b-lg shadow-lg py-6 px-8 z-10`}
                >
                  <div className="grid grid-cols-4 gap-6">
                    {services.map((service) => (
                      <Link
                        key={service.id}
                        href={`/${language}/services/${service.slug}`}
                        className="block text-sm text-white hover:text-gray-300"
                      >
                        {language === "en"
                          ? service.title_en
                          : service.title_ar}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link href="/" className="text-white hover:text-gray-300">
              {headerT("ourTeam")}
            </Link>
            <Link href="/" className="text-white hover:text-gray-300">
              {headerT("blogs")}
            </Link>
            <Link href="/" className="text-white hover:text-gray-300">
              {headerT("contactUs")}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleToggleSearch}
              className="text-white hover:text-gray-300"
            >
              <Search className="h-5 w-5" />
            </button>
            <button onClick={toggleLanguage} className="text-white px-2 py-1">
              {language === "en" ? "En" : "Ar"}
            </button>
            <Link
              href="/"
              className="hidden md:block border border-white px-4 py-2 rounded text-white hover:bg-white hover:text-[#3E2723]"
            >
              {commonT("bookAppointment")}
            </Link>
            {/* Mobile Menu Toggle */}
            <button onClick={toggleMenu} className="md:hidden text-white">
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#3E2723] text-white px-6 py-4 space-y-2">
          <Link
            href={`/${language}/about`}
            onClick={toggleMenu}
            className="block py-2 text-lg"
          >
            {headerT("aboutUs")}
          </Link>
          <Link
            href={`/${language}/team`}
            onClick={toggleMenu}
            className="block py-2 text-lg"
          >
            {headerT("ourTeam")}
          </Link>
          <Link
            href={`/${language}/blog`}
            onClick={toggleMenu}
            className="block py-2 text-lg"
          >
            {headerT("blogs")}
          </Link>
          <Link
            href={`/${language}/contact`}
            onClick={toggleMenu}
            className="block py-2 text-lg"
          >
            {headerT("contactUs")}
          </Link>
          <Link
            href={`/${language}/contact`}
            onClick={toggleMenu}
            className="block py-2 text-lg"
          >
            {commonT("bookAppointment")}
          </Link>
        </div>
      )}

      {/* 🔍 Search Box */}
      {isSearchOpen && (
        <div
          ref={searchRef}
          className="fixed top-[72px] left-0 w-full bg-[#3E2723]/95 p-4 shadow-md z-[60]"
        >
          <form onSubmit={handleSearchSubmit} className="flex flex-col">
            <div className="flex w-full">
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchInputChange}
                placeholder={commonT("search")}
                className="w-full p-3 rounded-l focus:outline-none text-black"
                autoFocus
              />
              <button
                type="submit"
                className="bg-[#5D4037] text-white p-3 rounded-r"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
