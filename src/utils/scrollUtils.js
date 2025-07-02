export const scrollToHomeBook = () => {
  const homeBookElement = document.getElementById("homeBook");
  if (homeBookElement) {
    homeBookElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

//  scroll to any section by id
export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
