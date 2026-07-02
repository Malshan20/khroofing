// content-loader.js
// Fetches the JSON files that Decap CMS edits and drops the values into the
// existing page elements (matched by id). It never touches classes, layout,
// or styling — only text/HTML/src of the specific elements below.

(function () {
  async function getJSON(path) {
    try {
      const res = await fetch(path, { cache: "no-store" });
      if (!res.ok) throw new Error(path + " " + res.status);
      return await res.json();
    } catch (err) {
      console.warn("content-loader: could not load", path, err);
      return null;
    }
  }

  function setHTML(id, value) {
    if (value === undefined || value === null) return;
    const el = document.getElementById(id);
    if (el) el.innerHTML = value;
  }

  function setSrc(id, value) {
    if (!value) return;
    const el = document.getElementById(id);
    if (el) el.src = value;
  }

  function setAlt(id, value) {
    if (!value) return;
    const el = document.getElementById(id);
    if (el) el.alt = value;
  }

  async function loadHero() {
    const d = await getJSON("content/hero.json");
    if (!d) return;
    setHTML("cms-hero-line1", d.heading_line1);
    setHTML("cms-hero-highlight", d.heading_highlight);
    setHTML("cms-hero-line2", d.heading_line2);
    setHTML("cms-hero-subtext", d.subtext);
    setHTML("cms-badge-1", d.badge_1);
    setHTML("cms-badge-2", d.badge_2);
    setHTML("cms-badge-3", d.badge_3);
    setSrc("cms-hero-img", d.image);
    setHTML("cms-hero-location", d.image_location_tag);
  }

  async function loadAbout() {
    const d = await getJSON("content/about.json");
    if (!d) return;
    setHTML("cms-about-heading", d.heading);
    setHTML("cms-about-text", d.text);
    setHTML("cms-stat1-number", d.stat1_number);
    setHTML("cms-stat1-label", d.stat1_label);
    setHTML("cms-stat2-number", d.stat2_number);
    setHTML("cms-stat2-label", d.stat2_label);
    setSrc("cms-about-img", d.image);
  }

  async function loadServices() {
    const d = await getJSON("content/services.json");
    if (!d) return;
    setHTML("cms-services-heading", d.heading);
    setHTML("cms-services-subtext", d.subtext);
    (d.items || []).forEach((item, i) => {
      const n = i + 1;
      setHTML(`cms-service-${n}-icon`, item.icon);
      setHTML(`cms-service-${n}-title`, item.title);
      setHTML(`cms-service-${n}-desc`, item.description);
    });
  }

  async function loadTestimonials() {
    const d = await getJSON("content/testimonials.json");
    if (!d) return;
    setHTML("cms-reviews-heading", d.heading);
    (d.items || []).forEach((item, i) => {
      const n = i + 1;
      setHTML(`cms-review-${n}-quote`, item.quote);
      setHTML(`cms-review-${n}-name`, item.name);
      setHTML(`cms-review-${n}-location`, item.location);
      setHTML(`cms-review-${n}-initials`, item.initials);
    });
  }

  async function loadPortfolio() {
    const d = await getJSON("content/portfolio.json");
    if (!d) return;
    setHTML("cms-portfolio-heading", d.heading);
    setHTML("cms-portfolio-subtext", d.subtext);
    (d.images || []).forEach((img, i) => {
      const n = i + 1;
      setSrc(`cms-portfolio-img-${n}`, img.image);
      setAlt(`cms-portfolio-img-${n}`, img.alt);
    });
  }

  async function loadCoverage() {
    const d = await getJSON("content/coverage.json");
    if (!d) return;
    setHTML("cms-coverage-heading", d.heading);
    setHTML("cms-coverage-subtext", d.subtext);
    (d.regions || []).forEach((r, i) => {
      const n = i + 1;
      setHTML(`cms-region-${n}-name`, r.name);
      setHTML(`cms-region-${n}-desc`, r.description);
    });
  }

  async function loadContact() {
    const d = await getJSON("content/contact.json");
    if (!d) return;
    setHTML("cms-contact-heading", d.heading);
    setHTML("cms-contact-address", d.address);
    setHTML("cms-contact-email", d.email);
    setHTML("cms-office-1-label", d.office_1_label);
    setHTML("cms-office-1-phone", d.office_1_phone);
    setHTML("cms-office-2-label", d.office_2_label);
    setHTML("cms-office-2-phone", d.office_2_phone);
    setHTML("cms-office-3-label", d.office_3_label);
    setHTML("cms-office-3-phone", d.office_3_phone);
  }

  async function loadFooter() {
    const d = await getJSON("content/footer.json");
    if (!d) return;
    setHTML("cms-footer-tagline", d.tagline);
    setHTML("cms-footer-phone", d.phone);
    setHTML("cms-footer-email", d.email);
    setHTML("cms-footer-copyright", d.copyright);
  }

  document.addEventListener("DOMContentLoaded", function () {
    loadHero();
    loadAbout();
    loadServices();
    loadTestimonials();
    loadPortfolio();
    loadCoverage();
    loadContact();
    loadFooter();
  });
})();
