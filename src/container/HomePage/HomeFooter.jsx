import React from "react";
import { Link } from "react-router";
import { scrollToSection } from "../../utils/scrollUtils";
import { useTranslation } from "react-i18next";
function HomeFooter() {
  const { t, i18n } = useTranslation();

  const handleChangeLang = () => {
    if (i18n.language == "ar") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("ar");
    }
  };
  return (
    <footer className="bg-[#122031] text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8 py-8 px-4">
        {/* Left Side - Logo and About */}
        <div className="md:w-1/2">
          <div className="flex items-center gap-3 mb-4">
            <img src="logoPng.png" alt="Logo" className="h-10 w-10" />
            <span className="text-xl font-bold">{t("BusLine")}</span>
          </div>
          <p className="text-gray-300 leading-relaxed text-justify">
            {t("landing:Footer-SubTitle")}
          </p>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col justify-center space-y-2 md:w-1/5 ">
          <li className="text-white transition-colors text-xl font-semibold">
            {t("Get Started")}
          </li>
          <li
            className="text-gray-200 hover:text-white transition-colors cursor-pointer"
            onClick={() => scrollToSection("homeBook")}
          >
            {t("Book a Trip")}
          </li>
          <li>
            <Link
              to="/driver-register"
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              {t("Join as a Driver")}
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              {t("Login")}
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              {t("Register")}
            </Link>
          </li>
          <li>
            <button
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              onClick={handleChangeLang}
            >
              {i18n.language == "en" ? "عربي" : "English"}
            </button>
          </li>
        </ul>
      </div>

      {/*  Team Names */}

      <div className="w-full ps-5">
        <h3 className="lg:text-center text-lg font-semibold mb-2 ">
          {t("Our Team", { ns: "landing" })}
        </h3>
        <div className="flex flex-col lg:flex-row  flex-wrap justify-center gap-2 lg:gap-5 md:text-left">
          <a
            href="https://www.linkedin.com/in/ahmed-y-alsaleh/"
            target="_blank"
            className="text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            {t("Ahmed Alsaleh")}
          </a>
          <a
            href="https://www.linkedin.com/in/sulaiman-alfawzan/"
            target="_blank"
            className="text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            {t("Sulaiman Alfawzan")}
          </a>
          <a
            href="https://www.linkedin.com/in/thekra-aljagthmi/"
            target="_blank"
            className="text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            {t("Thekra Aljagthmi")}
          </a>
          <a
            href="https://www.linkedin.com/in/sahar-mansour-/"
            target="_blank"
            className="text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            {t("Sahar Faris")}
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-4 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            {/* © {new Date().getFullYear()} BusLine. All rights reserved. */}
            {t("copyRight", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default HomeFooter;
