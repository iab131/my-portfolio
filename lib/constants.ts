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
  threejs,
  git,
  unity,
  csharp,
  blender,
  ar,
  onshape,
  java,
  ai,
  orca,
} from "../src/assets";

export interface Service {
  title: string;
  icon: StaticImageData;
}

export const services: Service[] = [
  { title: "Robotics Engineer", icon: mobile },
  { title: "Game Developer", icon: backend },
  { title: "3D Creator", icon: creator },
  { title: "Simluation Developer", icon: web },
];

export interface Technology {
  name: string;
  icon: StaticImageData;
}
export const technologies: Technology[] = [
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "React JS", icon: reactjs },
  { name: "Node JS", icon: nodejs },
  { name: "Java", icon: java },
  { name: "C#", icon: csharp },
  { name: "MongoDB", icon: mongodb },
  { name: "Three JS", icon: threejs },
  { name: "Unity", icon: unity },
  { name: "Blender", icon: blender },
  { name: "Onshape", icon: onshape },

  { name: "git", icon: git },
];

export interface ProjectTag {
  name: string;
  color: string;
}

export interface Project {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
}
export const projects: Project[] = [
  {
    id: 1,
    title: "FLL Simulator",
    des: "A Unity-based 3D and AR simulator for building and coding LEGO-style robots with block-based programming and motor physics. Developed to support STEM learning and FIRST LEGO League training with realistic robotics simulation.",
    img: "/img/fllsim.png", // 📷 Suggestion: screenshot of the 3D robot, block coding UI, or AR view
    iconLists: [
      "/img/unity.svg",
      "/img/blender.svg",

      "/img/csharp.svg",
      "/img/ar.svg",
    ],
    link: "https://github.com/iab131/ARISE-FLL-Sim",
  },
  {
    id: 2,
    title: "FTC Robotics",
    des: "Led engineering and CAD as the Engineering Head of our FTC team. Designed drivetrains, custom mechanisms, and modular attachments using Onshape, with hands-on testing and iteration for international-level competitions.",
    img: "/img/robot.jpg", // 📷 Suggestion: team robot CAD, action shot from competition, or pit photo
    iconLists: ["/img/onshape.png", "/img/ftc.png", "/img/java.svg"],
    link: "https://www.instagram.com/devolotics/",
  },
  {
    id: 3,
    title: "DuoDev Game Studio",
    des: "Co-founded a game studio building both 2D and 3D Unity games. Released polished mini-games with creative mechanics and stylized UI. Focused on gameplay design, programming, and FUN.",
    img: "/img/duodev.png", // 📷 Suggestion: Itch.io screenshots, GIFs of gameplay, or logo

    iconLists: ["/img/unity.svg", "/img/csharp.svg", "/img/ai.svg"],
    link: "https://duodev.itch.io/",
  },
  {
    id: 4,
    title: "MakerWorld 3D Models",
    des: "Created and published functional 3D printable parts with over 3K downloads and 1K likes on MakerWorld. Focused on blending design, utility, and STEM education using Blender and Onshape.",
    img: "/img/makerworld.png", // 📷 Suggestion: screenshots of MakerWorld profile or 3D model previews
    iconLists: ["/img/orca.jpeg", "/img/onshape.png", "/img/blender.svg"],
    link: "https://makerworld.com/en/@Enhe/upload",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/img/git.svg",
    link: "https://github.com/iab131",
  },

  {
    id: 2,
    img: "/img/link.svg",
    link: "https://www.linkedin.com/in/enhe-bai-64b068313/",
  },
];
