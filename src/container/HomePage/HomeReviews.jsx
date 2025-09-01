import React from "react";
import { useTranslation } from "react-i18next";

function HomeReviews() {
  const { t } = useTranslation("landing");
  return (
    <div className="w-full bg-[#f4f7fa] pt-10 pb-15">
      <div className="max-w-7xl mx-auto px-4 md:px-8 ">
        <h1 className="text-lg md:text-2xl lg:text-3xl text-center text-gray-900 font-bold pb-10 ">
          {t("What Our Clients Say")}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1 */}
          <div className="flex flex-col justify-between bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 ">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed text-justify">
              Excellent service! The bus was clean, comfortable, and arrived on
              time. The driver was professional and friendly.
            </p>
            <div>
              <h4 className="font-semibold text-gray-900">Sarah Ahmed</h4>
              <p className="text-sm text-gray-500">High School Student</p>
            </div>
          </div>
          {/* 2 */}
          <div className="flex flex-col justify-between bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 ">
            <div className="flex mb-4">
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed text-justify">
              تجربة رهيبة! الحجز كان سهل مرة والتنبيهات في التطبيق كانت تعطيني
              آخر التحديثات. الباص واسع وحسّيت بالأمان طول الرحلة.
            </p>
            <div>
              <h4 className="font-semibold text-gray-900">Mohammed Ali</h4>
              <p className="text-sm text-gray-500">University Student</p>
            </div>
          </div>

          {/* 3 */}
          <div className="flex flex-col justify-between bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 ">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed text-justify">
              The service is fantastic! The drivers are always on time and the
              buses are well-maintained. I highly recommend it to anyone looking
              for reliable transportation.
            </p>
            <div>
              <h4 className="font-semibold text-gray-900">Fatima Hassan</h4>
              <p className="text-sm text-gray-500">
                Parent of a High School Student
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeReviews;
