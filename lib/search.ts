import { fetchAPI } from "./api";
import { fallbackServices, fallbackTeam } from "./fallback-data";
/**
 * Search content in Strapi
 */
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

  const teamFilters = createSearchFilters(["name", "role"]);
  const teamPromise = fetchAPI(
    `/api/team-members?populate=image&${teamFilters}`
  ).catch(() => fallbackTeam);

  const servicesFilters = createSearchFilters(["title_en"]);
  const servicesPromise = fetchAPI(
    `/api/services?populate=image&${servicesFilters}`
  ).catch(() => fallbackServices);

  console.log("Using fallbackTeam data:", fallbackTeam);
  console.log("Using fallbackServices data:", fallbackServices);

  try {
    const [teamData, servicesData] = await Promise.all([
      teamPromise,
      servicesPromise,
    ]);

    return {
      team: teamData.data || [],
      services: servicesData.data || [],
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
