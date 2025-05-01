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
      console.error(`API error: ${res.status} ${res.statusText}`);
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching from Strapi API:", error);
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
  if (!query || query.trim() === "") {
    return {
      team: [],
      services: [],
      blog: [],
    };
  }

  const encodedQuery = encodeURIComponent(query.trim());

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

  const teamFilters = createSearchFilters([
    "name_en",
    "name_ar",
    "position_en",
    "position_ar",
    "bio_en",
    "bio_ar",
  ]);
  const teamPromise = fetchAPI(
    `/api/team-members?populate=image&${teamFilters}`
  );

  const servicesFilters = createSearchFilters([
    "title_en",
    "title_ar",
    "description_en",
    "description_ar",
    "features.title_en",
    "features.title_ar",
  ]);
  const servicesPromise = fetchAPI(
    `/api/services?populate=image&${servicesFilters}`
  );

  const blogsFilters = createSearchFilters([
    "title_en",
    "title_ar",
    "content_en",
    "content_ar",
    "excerpt_en",
    "excerpt_ar",
  ]);
  const blogsPromise = fetchAPI(
    `/api/blogs?populate=cover_image&${blogsFilters}`
  );

  try {
    const [teamData, servicesData, blogData] = await Promise.all([
      teamPromise,
      servicesPromise,
      blogsPromise,
    ]);

    return {
      team: teamData.data || [],
      services: servicesData.data || [],
      blog: blogData.data || [],
    };
  } catch (error) {
    console.error("Search error:", error);
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
