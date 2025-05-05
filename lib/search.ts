import { fetchAPI } from "./api";
import { fallbackServices } from "./fallback-data";
export const fallbackTeam = [
  {
    id: 1,
    name: "Hamza Naveed",
    role: "Software Engineer",
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
    role: "Legal Advisor",
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
    role: "Legal Advisor",
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
    role: "Legal Advisor",
    image: "/man.png",
    social: {
      email: "ayesha@example.com",
      phone: "03001234567",
      whatsapp: "03001234567",
    },
  },
];

export const searchContent = async (query: string, language = "en") => {
  if (!query || query.trim() === "") {
    return {
      team: [],
      services: [],
      blog: [],
    };
  }

  const encodedQuery = encodeURIComponent(query.trim());
  const lowercaseQuery = query.trim().toLowerCase();

  // API search setup
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
  );

  const servicesFilters = createSearchFilters(["title_en"]);
  const servicesPromise = fetchAPI(
    `/api/services?populate=image&${servicesFilters}`
  );

  try {
    const [teamData, servicesData] = await Promise.all([
      teamPromise,
      servicesPromise,
    ]);

    return {
      team: teamData.data || [],
      services: servicesData.data || [],
      blog: [],
    };
  } catch (error) {
    const teamResults = fallbackTeam.filter(
      (member) =>
        member.name.toLowerCase().includes(lowercaseQuery) ||
        member.role.toLowerCase().includes(lowercaseQuery)
    );

    const servicesResults = fallbackServices.filter(
      (service) =>
        service.title_en.toLowerCase().includes(lowercaseQuery) ||
        (service.description_en &&
          service.description_en.toLowerCase().includes(lowercaseQuery))
    );

    const formattedTeam = teamResults.map((member) => ({
      id: member.id,
      name: member.name,
      role: member.role,
      image: { url: member.image },
    }));

    const formattedServices = servicesResults.map((service) => ({
      id: service.id,
      title_en: service.title_en,
      slug: service.slug,
      description_en: service.description_en,
      image: service.image,
    }));

    return {
      team: formattedTeam,
      services: formattedServices,
      blog: [],
    };
  }
};
