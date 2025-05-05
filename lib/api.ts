import { log } from "console";
import { notFound } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

export const getStrapiURL = (path = "") => {
  return `${API_URL}${path}`;
};

export const getStrapiMedia = (media: any) => {
  if (!media || !media.url) return null;
  return media.url.startsWith("/") ? getStrapiURL(media.url) : media.url;
};

export const fetchAPI = async (path: string, options = {}) => {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  try {
    const res = await fetch(getStrapiURL(path), mergedOptions);

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    notFound();
    throw error;
  }
};

export const getLocalizedField = (field: any, language = "en") => {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[language] || field.en || "";
};

export const getPages = async (language = "en") => {
  const data = await fetchAPI("/api/pages?populate=*");
  return data.data;
};

export const getPageBySlug = async (slug: string, language = "en") => {
  const data = await fetchAPI("/api/pages?filters[slug][$eq]=home&populate=*");
  return data.data[0] || null;
};

export const getHeroData = async (language = "en") => {
  const data = await fetchAPI(
    "/api/pages?filters[slug][$eq]=home&populate[hero_slides][populate]=image"
  );
  return data.data[0]?.hero_slides || null;
};

export const getServices = async (language = "en") => {
  const data = await fetchAPI(
    "/api/services?populate=features,image,approach_image"
  );
  return data.data;
};

export const getServiceBySlug = async (slug: string, language = "en") => {
  const data = await fetchAPI(
    `/api/services?filters[slug][$eq]=${slug}&populate=image`
  );
  return data.data[0] || null;
};

export const getTeamMembers = async (language = "en") => {
  const data = await fetchAPI("/api/team-members?populate=*");
  return data.data;
};

export const getClientTestimonials = async (language = "en") => {
  const data = await fetchAPI("/api/clients?populate=logo");
  return data.data;
};

export const getBlogPosts = async (
  page = 1,
  pageSize = 10,
  language = "en"
) => {
  const data = await fetchAPI(
    `/api/blogs?populate=cover_image&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );
  return {
    data: data.data,
    pagination: data.meta.pagination,
  };
};

export const getBlogPostBySlug = async (slug: string, language = "en") => {
  const data = await fetchAPI(
    `/api/blogs?filters[slug][$eq]=${slug}&populate=cover_image`
  );
  return data.data[0] || null;
};

export const searchContent = async (query: string, language = "en") => {
  console.log("Searching for:", query);

  if (!query || query.trim() === "") {
    return {
      team: [],
      services: [],
      blog: [],
    };
  }

  const encodedQuery = encodeURIComponent(query.trim());

  console.log("Encoded query:", encodedQuery);

  const createSearchFilters = (fields: string[]) => {
    const filters = fields.flatMap((field) => [
      `filters[$or][${
        fields.indexOf(field) * 2
      }][${field}][$containsi]=${encodedQuery}`,
      `filters[$or][${
        fields.indexOf(field) * 2 + 1
      }][${field}][$containsi]=${encodedQuery}`,
    ]);

    return filters.join("&");
  };

  console.log("Team filters:", createSearchFilters(["name_en", "name_ar"]));

  const teamFilters = createSearchFilters(["name"]);
  const teamPromise = fetchAPI(
    `/api/team-members?populate=image&${teamFilters}`
  );

  const servicesFilters = createSearchFilters(["title_en", "description_en"]);
  const servicesPromise = fetchAPI(
    `/api/services?populate=image&${servicesFilters}`
  );

  try {
    const [teamData, servicesData, blogData] = await Promise.all([
      teamPromise,
      servicesPromise,
    ]);

    console.log("Team data:", teamData);
    console.log("Services data:", servicesData);
    console.log("Blog data:", blogData);

    return {
      team: teamData.data || [],
      services: servicesData.data || [],
    };
  } catch (error) {
    return {
      team: [],
      services: [],
      blog: [],
      error: "Failed to perform search",
    };
  }
};

export const addSubscriber = async (email: string) => {
  const response = await fetchAPI("/api/subscribers", {
    method: "POST",
    body: JSON.stringify({
      data: {
        email,
      },
    }),
  });

  return response;
};

export const checkSubscriberExists = async (email: string) => {
  const data = await fetchAPI(`/api/subscribers?filters[email][$eq]=${email}`);
  return data.data.length > 0;
};
