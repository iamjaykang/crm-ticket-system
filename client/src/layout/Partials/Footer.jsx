import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    <>
      <div class="relative bg-blueGray-200 pt-8 pb-6">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap text-left lg:text-left">
            <div class="w-full lg:w-6/12 px-4">
              <div class="mt-6 lg:mb-0 mb-6">
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="flex flex-wrap items-top mb-6">
                <div class="w-full lg:w-4/12 px-4 ml-auto">
                  <ul class="list-unstyled flex justify-center gap-6">
                    <li>
                      <a
                        class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="https://github.com/jaykang95"
                      >
                        <GitHubIcon fontSize="large"/>
                      </a>
                    </li>
                    <li>
                      <a
                        class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="mailto:jaykang0395@gmail.com"
                      >
                        <EmailIcon fontSize="large"/>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr class="my-6 border-black" />
          <div class="flex flex-wrap items-center md:justify-between justify-center">
            <div class="w-full md:w-4/12 px-4 mx-auto text-center">
              <div class="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © <span id="get-current-year">2022</span>
                <a
                  href="https://github.com/jaykang95/crm-ticket-system"
                  class="text-blueGray-500 hover:text-gray-800"
                  target="_blank"
                >
                  {" "}
                  CRM by
                </a>
                <a
                  href="https://www.linkedin.com/in/jay-kang95/"
                  class="text-blueGray-500 hover:text-blueGray-800"
                >
                  {" "}
                  Jay Kang
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
