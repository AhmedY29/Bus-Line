import React from "react";

function TrackingMap() {
  return (
    <div className="flex flex-col gap-2 p-2  bg-white shadow-md rounded-lg w-full h-full ">
      <h1 className="text-lg font-semibold">Active buses locations</h1>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.6828946724!2d46.38738892529297!3d24.774265139465507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1735497600000!5m2!1sen!2s"
        style={{ border: 0, minHeight: "500px" }}
        className="rounded-lg h-full w-full"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Riyadh Map"
      />
    </div>
  );
}

export default TrackingMap;
