import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

// تهيئة Mapbox مرة واحدة فقط
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWhtZWQyOTc3IiwiYSI6ImNtMmc0dmQyOTBlbmEycHBmbnFxcjRtbzcifQ.y97cAeETJnH9x2kpXDaAzA";

if (
  !mapboxgl.getRTLTextPluginStatus ||
  mapboxgl.getRTLTextPluginStatus() === "unavailable"
) {
  mapboxgl.setRTLTextPlugin(
    "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
    () => console.log("✅ دعم اللغة العربية تم تحميله"),
    true
  );
}

const StudentTrackingMap = ({ tripId, token }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const socketRef = useRef(null);
  const driverMarkerRef = useRef(null);
  const directionsRef = useRef(null);

  const [passengers, setPassengers] = useState([]);
  const [destination, setDestination] = useState(null);

  // تحميل بيانات الرحلة
  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const res = await axios.get(
          `https://bus-line-backend.onrender.com/api/trips/${tripId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res.data);
        setDestination([
          res.data.trip.destinationId.longitude,
          res.data.trip.destinationId.latitude,
        ]);
      } catch (err) {
        console.error("خطأ في جلب بيانات الرحلة:", err);
      }
    };

    const fetchPassengers = async () => {
      try {
        const res = await axios.get(
          `https://bus-line-backend.onrender.com/api/bookings/trip/${tripId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res.data, "passenger");
        setPassengers(res.data);
      } catch (err) {
        console.error("خطأ في جلب الركاب:", err);
      }
    };

    if (tripId) {
      fetchTripData();
      fetchPassengers();
    }
  }, [tripId, token]);

  // تهيئة الخريطة
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/ahmed2977/cmcludijs000201s63p073u6a",
      center: [46.6753, 24.7136],
      zoom: 10,
    });
    mapRef.current = map;

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
      language: "ar",
      controls: false,
    });
    map.addControl(directions, "top-left");
    directionsRef.current = directions;

    return () => {
      map.remove();
    };
  }, []);

  // إدارة التتبع
  useEffect(() => {
    const socket = io("https://bus-line-backend.onrender.com", {
      extraHeaders: { Authorization: `Bearer ${token}` },
    });
    socketRef.current = socket;

    socket.emit("join-trip", tripId);

    socket.on("driver-location-update", ({ location }) => {
      const coords = [location.lng, location.lat];

      // تحديث ماركر السائق
      if (driverMarkerRef.current) {
        driverMarkerRef.current.setLngLat(coords);
      } else {
        driverMarkerRef.current = new mapboxgl.Marker({ color: "blue" })
          .setLngLat(coords)
          .setPopup(new mapboxgl.Popup().setText("موقع السائق"))
          .addTo(mapRef.current);
      }

      mapRef.current.flyTo({ center: coords, zoom: 13 });

      // تحديث المسار
      if (directionsRef.current) {
        directionsRef.current.setOrigin(coords);

        // مسح كل النقاط
        const count = directionsRef.current.getWaypoints().length;
        for (let i = count - 1; i >= 0; i--) {
          directionsRef.current.removeWaypoint(i);
        }

        // إضافة Waypoints (بدون ماركر)
        passengers?.forEach((p, idx) => {
          directionsRef.current.addWaypoint(idx, [
            p.userId.address.coordinate.lng,
            p.userId.address.coordinate.lat,
          ]);
        });

        // إضافة الوجهة النهائية
        if (destination) {
          directionsRef.current.setDestination(destination);
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [tripId, token, passengers, destination]);

  return (
    <>

      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "400px", borderRadius: "8px" }}
      />
    </>
  );
};

export default StudentTrackingMap;
