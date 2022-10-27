import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <>
      <div className="name text-xl py-4">
        CRM App made by -{" "}
        <a
          href="https://www.linkedin.com/in/jay-kang-b5284a228/"
          target="__blank"
        >
          Jay Kang
        </a>
      </div>
      <div className="iconContainer flex gap-10 py-2">
        <a
          href="https://www.instagram.com/just__kang/"
          target="__blank"
          className="flex-1"
        >
          <InstagramIcon fontSize="large" />
        </a>
        <a
          href="https://www.linkedin.com/in/jay-kang-b5284a228/"
          target="__blank"
          className="flex-1"
        >
          <LinkedInIcon fontSize="large" />
        </a>
        <a
          href="https://github.com/jaykang95"
          target="__blank"
          className="flex-1"
        >
          <GitHubIcon fontSize="large" />
        </a>
      </div>
    </>
  );
};

export default Footer;
