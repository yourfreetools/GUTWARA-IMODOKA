function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'en',
      includedLanguages: 'en,rw',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    },
    'google_translate_element'
  );

  const savedLang = localStorage.getItem("userLang");

  if (!savedLang) {
    // Only ask in index.html (by checking URL)
    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
      const choice = confirm("Do you want to continue in Kinyarwanda?\n\nPress OK for Kinyarwanda or Cancel for English.");
      const lang = choice ? "rw" : "en";
      localStorage.setItem("userLang", lang);
      applyTranslation(lang);
    }
  } else {
    applyTranslation(savedLang);
  }
}

function applyTranslation(lang) {
  setTimeout(() => {
    const select = document.querySelector("select.goog-te-combo");
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    }
  }, 1000);
}

// Hide Google Translate branding/toolbars
const css = document.createElement("style");
css.innerHTML = `
  .goog-logo-link, .goog-te-gadget { display:none !important; }
  .goog-te-banner-frame.skiptranslate { display: none !important; }
  body { top: 0px !important; }
`;
document.head.appendChild(css);
