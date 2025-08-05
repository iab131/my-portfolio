
import { StaticImageData } from "next/image";
import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../src/assets";

export interface NavLink {
  id: string;
  title: string;
}

export const navLinks: NavLink[] = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "contact", title: "Contact" },
];

export interface Service {
  title: string;
  icon: StaticImageData;
}

export const services: Service[] = [
  { title: "Web Developer", icon: web },
  { title: "React Native Developer", icon: mobile },
  { title: "Backend Developer", icon: backend },
  { title: "Content Creator", icon: creator },
];

export interface Technology {
  name: string;
  icon: StaticImageData;
}

export const technologies: Technology[] = [
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "React JS", icon: reactjs },
  { name: "Redux Toolkit", icon: redux },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Node JS", icon: nodejs },
  { name: "MongoDB", icon: mongodb },
  { name: "Three JS", icon: threejs },
  { name: "git", icon: git },
  { name: "figma", icon: figma },
  { name: "docker", icon: docker },
];

export interface Experience {
  title: string;
  company_name: string;
  icon: StaticImageData;
  iconBg: string;
  date: string;
  points: string[];
}

export const experiences: Experience[] = [
  {
    title: "React.js Developer",
    company_name: "Starbucks",
    icon: starbucks,
    iconBg: "#383E56",
    date: "March 2020 - April 2021",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "React Native Developer",
    company_name: "Tesla",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "Jan 2021 - Feb 2022",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Web Developer",
    company_name: "Shopify",
    icon: shopify,
    iconBg: "#383E56",
    date: "Jan 2022 - Jan 2023",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Full stack Developer",
    company_name: "Meta",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "Jan 2023 - Present",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];


export interface ProjectTag {
  name: string;
  color: string;
}

export interface Project {
  id: number;
  title: string;
  des: string;
  img: StaticImageData;
  iconLists: string[];
  link: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Car Rent",
    des: "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    img: carrent,
    iconLists: ["/img/next.svg", "/img/tail.svg", "/img/ts.svg", "/img/stream.svg", "/img/c.svg"],
    link: "https://github.com/",
  },
  {
    id: 2,
    title: "Job IT",
    des: "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    img: jobit,
    iconLists: ["/img/re.svg", "/img/git.svg", "/img/gsap.svg"],
    link: "https://github.com/",
  },
  {
    id: 3,
    title: "Trip Guide",
    des: "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    img: tripguide,
    iconLists: ["/img/next.svg", "/img/cloud.svg", "/img/tail.svg"],
    link: "https://github.com/",
  },
  {
    id: 4,
    title: "Trip Guide",
    des: "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    img: tripguide,
    iconLists: ["/img/next.svg", "/img/cloud.svg", "/img/tail.svg"],
    link: "https://github.com/",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/img/git.svg",
    link: "https://github.com/iab131"
  },

  {
    id: 2,
    img: "/img/link.svg",
    link: "https://www.linkedin.com/in/enhe-bai-64b068313/"
  },
];