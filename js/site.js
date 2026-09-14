/* Mobile nav toggle + consent-gated 17hats contact form embed */

document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("siteNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var CONTACT_IFRAME_HTML =
    '<iframe name="lc_contact_form" frameborder="0" width="100%" height="600" ' +
    'src="https://sitecollab.17hats.com/p#/embed/AyT1u4phggwS" title="SiteCollab enquiry form"></iframe>' +
    '<script type="text/javascript" src="https://sitecollab.17hats.com/vendor/iframeSizer.min.js"><' + '/script>';

  document.querySelectorAll("[data-consent-category]").forEach(function (embed) {
    var placeholder = embed.querySelector("[data-embed-placeholder]");
    var target = embed.querySelector("[data-embed-target]");
    var loadBtn = embed.querySelector("[data-embed-load]");

    function reveal() {
      if (target.hasChildNodes()) return; // already loaded
      target.innerHTML = CONTACT_IFRAME_HTML;
      target.hidden = false;
      placeholder.hidden = true;
    }

    // Already consented from a previous visit?
    if (
      typeof CookieConsent !== "undefined" &&
      CookieConsent.acceptedCategory &&
      CookieConsent.acceptedCategory("analytics_marketing")
    ) {
      reveal();
    }

    document.addEventListener("sitecollab:consent", function (e) {
      if (e.detail && e.detail.analytics_marketing) reveal();
    });

    if (loadBtn) {
      loadBtn.addEventListener("click", function () {
        if (typeof CookieConsent !== "undefined") {
          CookieConsent.acceptCategory("analytics_marketing");
          CookieConsent.hide();
        }
        reveal();
      });
    }
  });
});
