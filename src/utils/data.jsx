import blogImage from "../assets/Banners/banner1.png";
import coverPhoto from "../assets/Banners/banner2.png";
import userPhoto from "../assets/ProfileImages/profile_pic.png";
import profilePhoto from "../assets/ProfileImages/profile_pic2.jpeg";

import twitch from "../assets/social_icons/twitch.svg";
import discord from "../assets/social_icons/discord.svg";
import telegram from "../assets/social_icons/telegram.svg";
import twitter from "../assets/social_icons/twitter.svg";
import gitlab from "../assets/social_icons/icons8-gitlab.svg";
import github from "../assets/social_icons/icons8-github.svg";
import linkedin from "../assets/social_icons/icons8-linkedin-circled.svg";
import behance from "../assets/social_icons/icons8-behance.svg";
import codepen from "../assets/social_icons/icons8-codepen.svg";
import custom from "../assets/social_icons/icons8-custom-64.png";

import ProjectImg1 from "../assets/ProjectImages/project1.jpg";
import ProjectImg2 from "../assets/ProjectImages/project2.jpg";
import ProjectImg3 from "../assets/ProjectImages/project3.jpg";
import ProjectImg4 from "../assets/ProjectImages/project4.jpg";
import ProjectImg5 from "../assets/ProjectImages/project5.jpg";

export const comments = () => {
  const comment = {
    name: "Andy Tester",
    userName: "@johntest123",
    comment:
      "The first frame on the right (named Components) houses all the spheres created first. Every other frame has explorations gotten by changing the colours in the bigger frame. Drag one out and inspect it’s content as you like. They are all frames so, they’ll behave as frames especially when you resize.",
    date: "11/22/22",
    profile_pic: userPhoto,
  };
  return comment;
};

export const tags = () => {
  const tags = [
    "react",
    "webapp",
    "UI/UX design",
    "redux",
    "     ",
    "     ",
    "AntD",
  ];
  return tags;
};

export const socialIcons = {
  twitter: twitter,
  gitlab: gitlab,
  github: github,
  linkedin: linkedin,
  behance: behance,
  codepen: codepen,
  discord: discord,
  custom: custom,
};

export const profile = () => {
  const profile = {
    name: "JACOB",
    userName: "@Legendone ",
    location: "Tokyo, Japan",
    posts: "465",
    followers: "123k",
    following: "1.2k",
    about:
      "The first frame on the right (named Components) houses all the spheres created first. Every other frame has explorations gotten by changing the colours in the bigger frame.Drag one out and inspect its content as you like. They are all frames so, theyll behave as frames especially when you resize. The magic is knowing what was done to create them so you can try out different colour variations. Try yours and share with me via Twitter: @seyioniyitan",
    joined: "December 2021",
    coverPhoto: coverPhoto,
    profilePic: profilePhoto,
    socialLinks: [
      {
        link: "https://twitch.com/",
        logo: gitlab,
      },
      {
        link: "https://twitter.com/",
        logo: twitter,
      },

      {
        link: "https://telegram.com/",
        logo: telegram,
      },
      {
        link: "https://discord.com/",
        logo: discord,
      },
    ],
    projects: [
      {
        projectName: "Daily Sync",
        author: "Figma",
        cover: ProjectImg1,
        logo: "",
        likes: "29",
        views: "65",
      },
      {
        projectName: "Component properties",
        author: "By; John ",
        cover: ProjectImg2,
        logo: "",
        likes: "44",
        views: "456",
      },
      {
        projectName: "Magnet poem",
        author: "John ",
        cover: ProjectImg3,
        logo: "",
        likes: "442",
        views: "46",
      },
      {
        projectName: "Auto Layout",
        author: "Figma ",
        cover: ProjectImg4,
        logo: "",
        likes: "42",
        views: "146",
      },
      {
        projectName: "Daily Sync",
        author: "Figma",
        cover: ProjectImg5,
        logo: "",
        likes: "29",
        views: "65",
      },
      {
        projectName: "Component properties",
        author: "By; John ",
        cover: ProjectImg1,
        logo: "",
        likes: "44",
        views: "456",
      },
      {
        projectName: "Magnet poem",
        author: "John ",
        cover: ProjectImg2,
        logo: "",
        likes: "442",
        views: "46",
      },
      {
        projectName: "Auto Layout",
        author: "Figma ",
        cover: ProjectImg3,
        logo: "",
        likes: "42",
        views: "146",
      },
      {
        projectName: "Daily Sync",
        author: "Figma",
        cover: ProjectImg4,
        logo: "",
        likes: "29",
        views: "65",
      },
      {
        projectName: "Component properties",
        author: "By; John ",
        cover: ProjectImg5,
        logo: "",
        likes: "44",
        views: "456",
      },
      {
        projectName: "Magnet poem",
        author: "John ",
        cover: ProjectImg1,
        logo: "",
        likes: "442",
        views: "46",
      },
      {
        projectName: "Auto Layout",
        author: "Figma ",
        cover: ProjectImg2,
        logo: "",
        likes: "42",
        views: "146",
      },
      {
        projectName: "Daily Sync",
        author: "Figma",
        cover: ProjectImg3,
        logo: "",
        likes: "29",
        views: "65",
      },
      {
        projectName: "Component properties",
        author: "By; John ",
        cover: ProjectImg4,
        logo: "",
        likes: "44",
        views: "456",
      },
      {
        projectName: "Magnet poem",
        author: "John ",
        cover: ProjectImg5,
        logo: "",
        likes: "442",
        views: "46",
      },
      {
        projectName: "Auto Layout",
        author: "Figma ",
        cover: ProjectImg1,
        logo: "",
        likes: "42",
        views: "146",
      },
    ],
  };
  return profile;
};

export const articles = () => {
  const article = {
    blogTitle: "Landing Page static Site",
    author: "Killan James",
    profile_pic: "../assets/ProfileImages/profile_pic.png",
    likes: "84",
    views: "84",
    posted: "07/05/22",
    description:
      "The first frame on the right (named Components) houses all the spheres created first. Every other frame has explorations gotten by changing the colours in the bigger frame. Drag one out and inspect it’s content as you like. They are all frames so, they’ll behave as frames especially when you resize. The magic is knowing what was done to create them so you can try out different colour variations.Try yours and share with me via Twitter: @seyioniyitan The first frame on the right (named Components) houses all the spheres created first. Every other frame has explorations gotten by changing the colours in the bigger frame. Drag one out and inspect it’s content as you like. They are all frames so, they’ll behave as frames especially when you resize. The magic is knowing what was done to create them so you can try out different colour variations.Try yours and share with me via Twitter: @seyioniyitan",
    blogImages: [
      {
        image: blogImage,
      },
      {
        image: blogImage,
      },
      {
        image: blogImage,
      },
    ],
  };

  return article;
};

export const carousel = () => {
  const images = [
    "../assets/Banners/banner1.png",
    "../assets/Banners/banner2.png",
    "../assets/Banners/banner3.png",
  ];
  return images;
};
