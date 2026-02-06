export function makeSelectable(containerId, multiple = true) {
  const container = document.querySelector(`#${containerId} a`);
  if (!container) return;

  const words = container.textContent.trim().split(/\s+/);
  container.textContent = "";

  words.forEach((word) => {
    const span = document.createElement("span");
    span.textContent = word;
    span.classList.add("feedback-option");

    span.addEventListener("click", () => {
      if (!multiple) {
        container
          .querySelectorAll(".feedback-option")
          .forEach((el) => el.classList.remove("selected"));
      }

      span.classList.toggle("selected");

      const selected = [...container.querySelectorAll(".selected")].map(
        (el) => el.textContent,
      );

      return selected;
    });

    container.appendChild(span);
    container.append(" ");
  });
}
