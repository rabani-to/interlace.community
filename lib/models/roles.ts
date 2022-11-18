export const DEVELOPER = {
  name: "Developer",
  categories: [
    "Back-End Developer",
    "Data Scientist",
    "Data Engineer",
    "Front-end Developer",
    "Full Stack Engineer",
    "GameFi Developer",
    "Infrastructure Engineer",
    "QA Engineer",
    "Rust Developer",
    "Security Engineer",
    "Solidity Developer",
    "Solution Architect",
    "Technical Writer",
  ],
}

export const DESIGNER = {
  name: "Designer",
  categories: [
    "Content Designer",
    "Data Visualizer",
    "Graphic Designer",
    "NFT Designer",
    "Product Designer",
    "UI Designer",
    "UX Designer",
    "UX Researcher",
    "UX/UI Designer",
    "Visual Graphic Designer",
    "Video Creator",
  ],
}

export const OPERATIONS = {
  name: "Operations",
  categories: [
    "Operations",
    "Operations Specialist",
    "Product Owner",
    "Project Manager",
    "Scrum Master",
  ],
}

export const BUSINESS = {
  name: "Business",
  categories: [
    "DAO Specialist",
    "Chief of Staff",
    "Data Analyst",
    "Executive Assistant",
    "Human Resources",
    "QA Analyst",
    "Research Analyst",
    "Talent Acquisition",
    "Token-economics Specialist",
  ],
}

export const MARKETING = {
  name: "Marketing",
  categories: [
    "Copy writer",
    "Content Strategist",
    "SEO Specialist",
    "Social Media Manager",
    "Brand Manager",
    "Influencer",
    "Article Writer",
    "Event Marketing",
    "Growth Marketing",
    "Public Relations",
  ],
}

export const COMMUNITY = {
  name: "Community",
  categories: ["Community Manager", "Community Moderator", "Customer Support"],
}

export const BUSINESS_DEV = {
  name: "Business Development",
  categories: [
    "Business Development",
    "Account Manager",
    "Customer Success",
    "Partnerships Manager",
    "Sales Representative",
    "Partnerships",
  ],
}

export const OTHER = {
  name: "Other",
  categories: [
    "Business Designer",
    "Developer Relations",
    "DAO Designer",
    "Venture Capital",
    "Risk Management",
    "Investment Analyst",
    "Accounting",
    "Finance",
    "Legal",
  ],
}

export default {
  [DEVELOPER.name]: DEVELOPER,
  [DESIGNER.name]: DESIGNER,
  [OPERATIONS.name]: OPERATIONS,
  [BUSINESS.name]: BUSINESS,
  [MARKETING.name]: MARKETING,
  [COMMUNITY.name]: COMMUNITY,
  [BUSINESS_DEV.name]: BUSINESS_DEV,
  [OTHER.name]: OTHER,
} as const
