import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWhtZWQyOTc3IiwiYSI6ImNtMmc0dmQyOTBlbmEycHBmbnFxcjRtbzcifQ.y97cAeETJnH9x2kpXDaAzA";

if (
  !mapboxgl.getRTLTextPluginStatus ||
  mapboxgl.getRTLTextPluginStatus() === "unavailable"
) {
  mapboxgl.setRTLTextPlugin(
    "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
    () => console.log("تم تحميل دعم اللغة العربية"),
    true
  );
}
