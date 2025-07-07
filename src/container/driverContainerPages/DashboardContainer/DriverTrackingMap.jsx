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

const DriverTrackingMap = ({ tripId, token, trackingStarted }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const socketRef = useRef(null);
  const driverMarkerRef = useRef(null);
  const watchIdRef = useRef(null);
  const directionsRef = useRef(null);
  const passengerMarkersRef = useRef([]); // لتخزين ماركر الركاب

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
        const trip = res.data.trip;
        setDestination([
          trip.destinationId.longitude,
          trip.destinationId.latitude,
        ]);
      } catch (err) {
        console.error("خطأ في جلب بيانات الرحلة:", err);
      }
    };

    const fetchPassengers = async () => {
      try {
        const res = await axios.get(
          `https://bus-line-backend.onrender.com/api/bookings/booking-passengers`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPassengers(res.data.passengers);
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
    if (!trackingStarted) {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    const socket = io("https://bus-line-backend.onrender.com", {
      extraHeaders: { Authorization: `Bearer ${token}` },
    });
    socketRef.current = socket;

    socket.emit("join-trip", tripId);

    socket.on("driver-location-update", ({ location }) => {
      const coords = [location.lng, location.lat];

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

        // مسح جميع النقاط
        const count = directionsRef.current.getWaypoints().length;
        for (let i = count - 1; i >= 0; i--) {
          directionsRef.current.removeWaypoint(i);
        }

        // إضافة Waypoints
        passengers?.forEach((p, idx) => {
          console.log(p, "sss");
          directionsRef.current.addWaypoint(idx, [

            p?.address?.coordinate?.lng,
            p?.address?.coordinate?.lat,

          ]);
        });

        // إضافة الوجهة
        if (destination) {
          directionsRef.current.setDestination(destination);
        }
      }

      // حذف Markers قديمة
      passengerMarkersRef.current.forEach((marker) => marker.remove());
      passengerMarkersRef.current = [];

      // إضافة Markers جديدة للركاب
      passengers?.forEach((p) => {
        const marker = new mapboxgl.Marker({ color: "green" })
          .setLngLat([p?.address?.coordinate?.lng, p?.address?.coordinate?.lat])
          .setPopup(new mapboxgl.Popup().setText(`راكب: ${p.name || "مجهول"}`))
          .addTo(mapRef.current);

        passengerMarkersRef.current.push(marker);
      });
    });

    // إرسال الموقع الحالي
    if ("geolocation" in navigator) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          console.log(pos.coords, "my location");
          const { latitude, longitude } = pos.coords;
          socket.emit("driver-location", { lat: latitude, lng: longitude });
        },
        (err) => {
          console.error("Error getting location:", err);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    }

    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      socket.disconnect();
    };
  }, [trackingStarted, tripId, token, passengers, destination]);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: "100%", height: "100%", borderRadius: "8px" }}
    />
  );
};

export default DriverTrackingMap;
