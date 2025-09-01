import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { HiMenu, HiX } from "react-icons/hi";
import { scrollToHomeBook } from "../../utils/scrollUtils";
import { Trans, useTranslation } from "react-i18next";

function LandingPage() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { t, i18n } = useTranslation();

  const handleChangeLang = () => {
    if (i18n.language == "ar") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("ar");
    }
  };
  return (
    <div className="h-fit flex flex-col justify-center md:h-screen bg-[#F5F7FA] py-5 px-7">
      <nav className="flex justify-between items-center py-3 px-10 bg-white shadow-md shadow-black/5 rounded-full">
        <div className="flex items-center gap-2 rtl:gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2 rtl:gap-4">
              <img src="/logoPng.png" alt="Logo" className="h-10 w-10" />
              <h1 className="text-xl font-bold">{t("BusLine")}</h1>
            </div>
          </Link>

          <Link to="/" className="text-blue-700 text-lg hidden md:block">
            {t("Home")}
          </Link>
          <a
            href="/files/Bus_Line_Presentation.pdf"
            target="_blank"
            className="text-neutral-700 text-lg hover:text-blue-700 transition-colors cursor-pointer hidden md:block"
          >
            {t("Pitch Deck")}
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 pr-5">
          <button
            className="text-neutral-700 text-lg hover:text-blue-700 transition-colors cursor-pointer"
            onClick={handleChangeLang}
          >
            {i18n.language == "en" ? "عربي" : "English"}
          </button>
          <Link
            to="/login"
            className="text-neutral-700 text-lg hover:text-blue-700 transition-colors"
          >
            {t("Login")}
          </Link>
          <Link
            to="/register"
            className="text-neutral-700 text-lg hover:text-blue-700 transition-colors"
          >
            {t("Register")}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 hover:text-blue-700 transition-colors p-2"
          >
            {isMobileMenuOpen ? (
              <HiX className="text-2xl" />
            ) : (
              <HiMenu className="text-2xl" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden top-20 bg-white absolute w-9/12 shadow-md rounded-lg mt-2 mx-7 overflow-hidden">
          <div className="flex flex-col">
            <button
              className="text-neutral-700 text-lg hover:text-blue-700 hover:bg-gray-50 transition-colors px-6 py-3 border-b border-gray-100 text-start"
              onClick={handleChangeLang}
            >
              {i18n.language == "en" ? "عربي" : "English"}
            </button>
            <Link
              to="/"
              className="text-blue-700 text-lg px-6 py-3 border-b border-gray-100"
              onClick={toggleMobileMenu}
            >
              {t("Home")}
            </Link>
            <a
              href="/files/Bus_Line_Presentation.pdf"
              target="_blank"
              className="text-neutral-700 text-lg hover:text-blue-700 hover:bg-gray-50 transition-colors px-6 py-3 border-b border-gray-100"
            >
              {t("Pitch Deck")}
            </a>
            <Link
              to="/login"
              className="text-neutral-700 text-lg hover:text-blue-700 hover:bg-gray-50 transition-colors px-6 py-3 border-b border-gray-100"
              onClick={toggleMobileMenu}
            >
              {t("Login")}
            </Link>
            <Link
              to="/register"
              className="text-neutral-700 text-lg hover:text-blue-700 hover:bg-gray-50 transition-colors px-6 py-3"
              onClick={toggleMobileMenu}
            >
              {t("Register")}
            </Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-center h-full md:h-10/12 gap-5 md:pt-5">
        <section className="flex flex-col-reverse md:flex-row items-center justify-center h-full md:h-10/12 gap-5 md:pt-5">
          <div className="flex flex-col justify-center rounded-lg p-3 gap-10 h-full w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-[#152C5B]">
              <Trans
                i18nKey="Hero-Title"
                ns="landing"
                components={{ br: <br /> }}
              />
            </h2>
            <p className="text-gray-700 text-base md:text-lg lg:text-xl">
              {t("landing:Hero-SubTitle")}
            </p>
            <div className="flex w-full gap-5 justify-start items-center">
              <button
                onClick={scrollToHomeBook}
                className="bg-[#0165AD] text-white px-5 md:px-7 lg:px-10 py-1.5 rounded-lg shadow-md shadow-blue-700/20 hover:bg-[#0165add2] transition-colors text-base cursor-pointer"
              >
                {t("Book a Trip")}
              </button>
              <button
                className="bg-[#0165AD] text-white px-5 md:px-7 lg:px-10 py-1.5 rounded-lg shadow-md shadow-blue-700/20 hover:bg-[#0165add2] transition-colors text-base cursor-pointer"
                onClick={() => navigate("/driver-register")}
              >
                {t("Join as a Driver")}
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-lg p-5 gap-10 h-full w-full md:w-1/2">
            <img
              src="/logoPng.png"
              alt="Logo"
              className="h-full w-full object-contain"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default LandingPage;
