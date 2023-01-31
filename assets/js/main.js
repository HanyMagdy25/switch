import translations from "./translitions.js";

$(function () {
  "use strict";

  //===== Prealoder

  $(window).on("load", function (event) {
    $(".preloader").delay(500).fadeOut(500);
  });

  //===== Sticky

  $(window).on("scroll", function (event) {
    var scroll = $(window).scrollTop();
    if (scroll < 20) {
      $(".navbar-area").removeClass("sticky");
    } else {
      $(".navbar-area").addClass("sticky");
    }
  });

  //===== Section Menu Active

  var scrollLink = $(".page-scroll");
  // Active link switching
  $(window).scroll(function () {
    var scrollbarLocation = $(this).scrollTop();

    scrollLink.each(function () {
      var sectionOffset = $(this.hash).offset().top - 73;

      if (sectionOffset <= scrollbarLocation) {
        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");
      }
    });
  });

  //===== close navbar-collapse when a  clicked

  $(".navbar-nav a").on("click", function () {
    $(".navbar-collapse").removeClass("show");
  });

  $(".navbar-toggler").on("click", function () {
    $(this).toggleClass("active");
  });

  $(".navbar-nav a").on("click", function () {
    $(".navbar-toggler").removeClass("active");
  });

  //===== Back to top

  // Show or hide the sticky footer button
  $(window).on("scroll", function (event) {
    if ($(this).scrollTop() > 600) {
      $(".back-to-top").fadeIn(200);
    } else {
      $(".back-to-top").fadeOut(200);
    }
  });

  //Animate the scroll to yop
  $(".back-to-top").on("click", function (event) {
    event.preventDefault();

    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500
    );
  });

  //===== Svg

  jQuery("img.svg").each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("src");

    jQuery.get(
      imgURL,
      function (data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find("svg");

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== "undefined") {
          $svg = $svg.attr("id", imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== "undefined") {
          $svg = $svg.attr("class", imgClass + " replaced-svg");
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr("xmlns:a");

        // Replace image with new SVG
        $img.replaceWith($svg);
      },
      "xml"
    );
  });

  //=====  WOW active

  new WOW().init();

  //   my Js Flores
});
function truncate(string, n) {
  return string?.length > n ? string.substr(0, n - 1) + "..." : string;
}


const url_main = "https://switch.technomasrsystems.com";

// To Change Language

const languageSelector = document.querySelector("select");

languageSelector.addEventListener("change", (e) => {
  setLanguage(e.target.value);
  localStorage.setItem("lang", e.target.value);
});
document.addEventListener("DOMContentLoaded", () => {
  // const language = localStorage.getItem("lang");

  setLanguage("en");
  setLanguage(localStorage.getItem("lang"));
});
function update(valueLang, newValueLang) {
  valueLang = newValueLang;
  return valueLang;
}

function state(valueLang) {
  return [valueLang, update];
}

let [valueLang, setValueLang] = state("en");
// valueLang = setValueLang(valueLang, 14)

const setLanguage = (language) => {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const translitionKey = element.getAttribute("data-i18n");
    element.textContent = translations[language][translitionKey];
  });

  if (language === "ar") {
    document.dir = "rtl";
    document.getElementsByTagName("body")[0].style.fontFamily =
      "'Cairo', sans-serif";
    valueLang = setValueLang(valueLang, "ar");
   

    /////////////// Fetching Arabic

    fetch(`${url_main}/api/products`, {
      headers: {
        "Content-Type": "application/json",
        lang: "ar",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        console.log("pro",res)
        let data1 = ""
        res.data.map((item) => {
          data1 += ` <div class="swiper-slide">
    <div class="card" data-wow-duration="1.3s" data-wow-delay="0.2s">
        <img class="card-img-top" src=${item.image} alt=${item.productName}>
        <div class="card-body">
            <h5 class="card-title">${item.productName}</h5>
            <p class="card-text">${truncate(item?.description, 140)}</p>
            <a href="#download" class="btn main-btn">Purchase</a>
        </div>
    </div>
</div> `;
        });
        document.querySelector(".swiper-card-div").innerHTML = data1;
      });

    fetch(`${url_main}/api/landingPage`, {
      headers: {
        "Content-Type": "application/json",
        lang: "ar",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        let mainPage = `  <div
      class="row align-items-center justify-content-center justify-content-lg-between"
    >
      <div class="col-lg-6 col-md-10">
        <div class="header-hero-content">
          <h3
            class="header-title wow fadeInLeftBig"
            data-wow-duration="1.3s"
            data-wow-delay="0.2s"
          >
            ${res.data.mainPage.title}
          </h3>
          <p
            class="text wow fadeInLeftBig"
            data-wow-duration="1.3s"
            data-wow-delay="0.6s"
          >
            ${res.data.mainPage.description}
          </p>
          <ul class="d-flex">
            <li>
              <a
                href="#download"
                class="main-btn wow fadeInLeftBig"
                >اشترى الآن</a
              >
            </li>
          </ul>
        </div>
        <!-- header hero content -->
      </div>
      <div class="col-lg-4 col-md-6 col-sm-6 col-10">
        <div class="header-image">
          <img
            src=${res.data.mainPage.image}
            alt="app"
            class="image wow fadeInRightBig"
            data-wow-duration="1.3s"
            data-wow-delay="0.5s"
          />
         
        </div>
        <!-- header image -->
      </div>
    </div> `;

        let whySectionTitle = `
    <h3 class="title">${res.data.why.title}</h3>
    <p class="text">
      ${res.data.why.dscription}
    </p>
    `;
        let whySectionBoxes = `

        <div class="col-lg-3 col-sm-6">
          <div
            class="single-services services-color-1 text-center mt-30 wow fadeInUpBig"
            data-wow-duration="1.3s"
            data-wow-delay="0.2s"
          >
            <div
              class="services-icon d-flex align-items-center justify-content-center"
            >
              <i class="lni lni-layers"></i>
            </div>
            <div class="services-content">
              <h4 class="services-title"><a href="#">${res.data.why.Boxes.box1.title1}</a></h4>
              <p class="text">
              ${res.data.why.Boxes.box1.description1}
              </p>
            </div>
          </div>
          <!-- single services -->
        </div>
        <div class="col-lg-3 col-sm-6">
          <div
            class="single-services services-color-2 text-center mt-30 wow fadeInUpBig"
            data-wow-duration="1.3s"
            data-wow-delay="0.4s"
          >
            <div
              class="services-icon d-flex align-items-center justify-content-center"
            >
              <i class="lni lni-layout"></i>
            </div>
            <div class="services-content">
              <h4 class="services-title"><a href="#">${res.data.why.Boxes.box2.title2}</a></h4>
              <p class="text">
              ${res.data.why.Boxes.box2.description2}
              </p>
            </div>
          </div>
          <!-- single services -->
        </div>
        <div class="col-lg-3 col-sm-6">
          <div
            class="single-services services-color-3 text-center mt-30 wow fadeInUpBig"
            data-wow-duration="1.3s"
            data-wow-delay="0.6s"
          >
            <div
              class="services-icon d-flex align-items-center justify-content-center"
            >
              <i class="lni lni-bolt"></i>
            </div>
            <div class="services-content">
              <h4 class="services-title"><a href="#">${res.data.why.Boxes.box3.title3}</a></h4>
              <p class="text">
              ${res.data.why.Boxes.box3.description3}
              </p>
            </div>
          </div>
          <!-- single services -->
        </div>
        <div class="col-lg-3 col-sm-6">
          <div
            class="single-services services-color-4 text-center mt-30 wow fadeInUpBig"
            data-wow-duration="1.3s"
            data-wow-delay="0.8s"
          >
            <div
              class="services-icon d-flex align-items-center justify-content-center"
            >
              <i class="lni lni-protection"></i>
            </div>
            <div class="services-content">
              <h4 class="services-title"><a href="#">${res.data.why.Boxes.box4.title4}</a></h4>
              <p class="text">
              ${res.data.why.Boxes.box4.description4}
              </p>
            </div>
          </div>
          <!-- single services -->
     
      </div>
        `;
        let downloadFetch = `
        <div class="col-lg-6 col-md-9">
            <div
              class="download-image mt-50 wow fadeInRightBig"
              data-wow-duration="1.3s"
              data-wow-delay="0.2s"
            >
              <img
                class="image"
                src=${res.data.download.image}
                alt="download"
              />

              <div class="download-shape-1"></div>
              <div class="download-shape-2">
                <img
                  class="svg"
                  src="assets/images/download-shape.svg"
                  alt="shape"
                />
              </div>
            </div>
            <!-- download image -->
          </div>
          <div class="col-lg-6">
            <div
              class="download-content mt-45 wow fadeInLeftBig"
              data-wow-duration="1.3s"
              data-wow-delay="0.5s"
            >
              <h3 class="download-title">${res.data.download.title}</h3>
              <p class="text">
              ${res.data.download.description}
              </p>
              <ul>
                <li>
                  <a class="app-store" href=${res.data.download.link.apple}
                    ><img src="assets/images/app-store.png" alt="store"
                  /></a>
                </li>
                <li>
                  <a class="play-store" href=${res.data.download.link.google}
                    ><img src="assets/images/play-store.png" alt="store"
                  /></a>
                </li>
              </ul>
            </div>
            <!-- download image -->
          </div>
        `;
        let footer = `

            <div class="col-lg-4 col-md-6">
              <div
                class="footer-about mt-50 wow fadeIn"
                data-wow-duration="1.3s"
                data-wow-delay="0.2s"
              >
                <a class="logo" href="#">
                  <img src=${res.data.footer.logo} alt="Logo" />
                </a>
                <p class="text">
                ${res.data.footer.siteDescription}
                </p>
                <ul class="social">
                  <li>
                    <a href=${res.data.footer.socail.facebook}><i class="lni lni-facebook"></i></a>
                  </li>
                  <li>
                    <a href=${res.data.footer.socail.twitter}><i class="lni lni-twitter"></i></a>
                  </li>
                  <li>
                    <a href=${res.data.footer.socail.gmail}><i class="lni lni-google"></i></a>
                  </li>
                  <li>
                    <a href=${res.data.footer.socail.linkedin}><i class="lni lni-linkedin"></i></a>
                  </li>
                </ul>
              </div>
              <!-- footer about -->
            </div>
            <div class="col-lg-4 col-md-6 text-align-start">
              <div class="footer-link d-flex flex-wrap">
                <div
                  class="footer-link-wrapper mt-45 wow fadeIn"
                  data-wow-duration="1.3s"
                  data-wow-delay="0.4s"
                >
                  <div class="footer-title">
                    <h4 class="title">روابط</h4>
                  </div>
                  <ul class="link">
                    <li><a class="" href="#home">الرئيسية</a></li>
                    <li><a class="" href="#why">لماذا نحن</a></li>
                    <li><a class="" href="#products">المنتجات</a></li>
                    <li><a class="" href="#download">تنزيل</a></li>
                 
                  </ul>
                </div>
                <!-- footer link wrapper -->

                
                <!-- footer link wrapper -->
              </div>
              <!-- footer link -->
            </div>
            <div class="col-lg-4 col-md-6 text-align-start">
              <div
                class="footer-contact mt-45 wow fadeIn"
                data-wow-duration="1.3s"
                data-wow-delay="0.8s"
              >
                <div class="footer-title">
                  <h4 class="title">تواصل</h4>
                </div>
                <ul class="contact-list">
                  <li>
                    <div class="contact-info d-flex">
                      <div class="info-content media-body">
                        <p class="text">
                          <i class="lni lni-phone"></i> ${res.data.footer.contact.phone}
                        </p>
                      </div>
                    </div>
                    <!-- contact info -->
                  </li>
                  <li>
                    <div class="contact-info d-flex">
                      <div class="info-content media-body">
                        <p class="text">
                          <a href="#"
                            ><i class="lni lni-envelope"></i>
                            ${res.data.footer.contact.email}</a
                          >
                        </p>
                      </div>
                    </div>
                    <!-- contact info -->
                  </li>
                  
                  
                </ul>
                <!-- contact list -->
              </div>
              <!-- footer contact -->
            </div>
    `;
        let whatsappFixed = `
    <a href={https://wa.me/${res.data.footer.contact.phone}} target="_blank"
    rel="noreferrer" class="whatsapp-fix-div"><i class="lni lni-whatsapp"></i></a>
    `;

        document.querySelector(".mainPage").innerHTML = mainPage;
        document.querySelector(".why-section-title").innerHTML =
          whySectionTitle;
        document.querySelector(".why-section-boxes").innerHTML =
          whySectionBoxes;
        document.querySelector(".download-fetch").innerHTML = downloadFetch;
        document.querySelector(".footer-fetch").innerHTML = footer;
        document.querySelector(".whatsapp-fix").innerHTML = whatsappFixed;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    document.dir = "ltr";
    document.getElementsByTagName("body")[0].style.fontFamily =
      "'Open Sans', sans-serif";
    valueLang = setValueLang(valueLang, "en");
 

    /////////// Fetching English . https://switch.technomasrsystems.com/api/products
    fetch(`${url_main}/api/products`, {
      headers: {
        "Content-Type": "application/json",
        lang: "en",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        // console.log("products", res);
        let data1 = ""
        res.data.map((item) => {
          data1 += ` <div class="swiper-slide">
        <div class="card" data-wow-duration="1.3s" data-wow-delay="0.2s">
            <img class="card-img-top" src=${item.image} alt=${item.productName}>
            <div class="card-body">
                <h5 class="card-title">${item.productName}</h5>
                <p class="card-text">${truncate(item.description, 140)}</p>
                <a href="#download" class="btn main-btn">Purchase</a>
            </div>
        </div>
    </div> `;
        });
        document.querySelector(".swiper-card-div").innerHTML = data1;
      });

    fetch(`${url_main}/api/landingPage`, {
      headers: {
        "Content-Type": "application/json",
        lang: "en",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        // console.log("55 res", res);
        let mainPage = `  <div
          class="row align-items-center justify-content-center justify-content-lg-between"
        >
          <div class="col-lg-6 col-md-10">
            <div class="header-hero-content">
              <h3
                class="header-title wow fadeInLeftBig"
                data-wow-duration="1.3s"
                data-wow-delay="0.2s"
              >
                ${res.data.mainPage.title}
              </h3>
              <p
                class="text wow fadeInLeftBig"
                data-wow-duration="1.3s"
                data-wow-delay="0.6s"
              >
                ${res.data.mainPage.description}
              </p>
              <ul class="d-flex">
                <li>
                  <a
                    href="#download"
                    class="main-btn wow fadeInLeftBig"
                    >Purchase Now</a
                  >
                </li>
              </ul>
            </div>
            <!-- header hero content -->
          </div>
          <div class="col-lg-4 col-md-6 col-sm-6 col-10">
            <div class="header-image">
              <img
                src=${res.data.mainPage.image}
                alt="app"
                class="image wow fadeInRightBig"
                data-wow-duration="1.3s"
                data-wow-delay="0.5s"
              />
             
            </div>
            <!-- header image -->
          </div>
        </div> `;

        let whySectionTitle = `
        <h3 class="title">${res.data.why.title}</h3>
        <p class="text">
          ${res.data.why.dscription}
        </p>
        `;
        let whySectionBoxes = `

        <div class="col-lg-3 col-sm-6">
          <div
            class="single-services services-color-1 text-center mt-30 wow fadeInUpBig"
            data-wow-duration="1.3s"
            data-wow-delay="0.2s"
          >
            <div
              class="services-icon d-flex align-items-center justify-content-center"
            >
              <i class="lni lni-layers"></i>
            </div>
            <div class="services-content">
              <h4 class="services-title"><a href="#">${res.data.why.Boxes.box1.title1}</a></h4>
              <p class="text">
              ${res.data.why.Boxes.box1.description1}
              </p>
            </div>
          </div>
          <!-- single services -->
        </div>
        <div class="col-lg-3 col-sm-6">
          <div
            class="single-services services-color-2 text-center mt-30 wow fadeInUpBig"
            data-wow-duration="1.3s"
            data-wow-delay="0.4s"
          >
            <div
              class="services-icon d-flex align-items-center justify-content-center"
            >
              <i class="lni lni-layout"></i>
            </div>
            <div class="services-content">
              <h4 class="services-title"><a href="#">${res.data.why.Boxes.box2.title2}</a></h4>
              <p class="text">
              ${res.data.why.Boxes.box2.description2}
              </p>
            </div>
          </div>
          <!-- single services -->
        </div>
        <div class="col-lg-3 col-sm-6">
          <div
            class="single-services services-color-3 text-center mt-30 wow fadeInUpBig"
            data-wow-duration="1.3s"
            data-wow-delay="0.6s"
          >
            <div
              class="services-icon d-flex align-items-center justify-content-center"
            >
              <i class="lni lni-bolt"></i>
            </div>
            <div class="services-content">
              <h4 class="services-title"><a href="#">${res.data.why.Boxes.box3.title3}</a></h4>
              <p class="text">
              ${res.data.why.Boxes.box3.description3}
              </p>
            </div>
          </div>
          <!-- single services -->
        </div>
        <div class="col-lg-3 col-sm-6">
          <div
            class="single-services services-color-4 text-center mt-30 wow fadeInUpBig"
            data-wow-duration="1.3s"
            data-wow-delay="0.8s"
          >
            <div
              class="services-icon d-flex align-items-center justify-content-center"
            >
              <i class="lni lni-protection"></i>
            </div>
            <div class="services-content">
              <h4 class="services-title"><a href="#">${res.data.why.Boxes.box4.title4}</a></h4>
              <p class="text">
              ${res.data.why.Boxes.box4.description4}
              </p>
            </div>
          </div>
          <!-- single services -->
     
      </div>
        `;
        let downloadFetch = `
        <div class="col-lg-6 col-md-9">
            <div
              class="download-image mt-50 wow fadeInRightBig"
              data-wow-duration="1.3s"
              data-wow-delay="0.2s"
            >
              <img
                class="image"
                src=${res.data.download.image}
                alt="download"
              />

              <div class="download-shape-1"></div>
              <div class="download-shape-2">
                <img
                  class="svg"
                  src="assets/images/download-shape.svg"
                  alt="shape"
                />
              </div>
            </div>
            <!-- download image -->
          </div>
          <div class="col-lg-6">
            <div
              class="download-content mt-45 wow fadeInLeftBig"
              data-wow-duration="1.3s"
              data-wow-delay="0.5s"
            >
              <h3 class="download-title">${res.data.download.title}</h3>
              <p class="text">
              ${res.data.download.description}
              </p>
              <ul>
                <li>
                  <a class="app-store" href=${res.data.download.link.apple}
                    ><img src="assets/images/app-store.png" alt="store"
                  /></a>
                </li>
                <li>
                  <a class="play-store" href=${res.data.download.link.google}
                    ><img src="assets/images/play-store.png" alt="store"
                  /></a>
                </li>
              </ul>
            </div>
            <!-- download image -->
          </div>
        `;
        let footer = `

            <div class="col-lg-4 col-md-6">
              <div
                class="footer-about mt-50 wow fadeIn"
                data-wow-duration="1.3s"
                data-wow-delay="0.2s"
              >
                <a class="logo" href="#">
                  <img src=${res.data.footer.logo} alt="Logo" />
                </a>
                <p class="text">
                ${res.data.footer.siteDescription}
                </p>
                <ul class="social">
                  <li>
                    <a href=${res.data.footer.socail.facebook}><i class="lni lni-facebook"></i></a>
                  </li>
                  <li>
                    <a href=${res.data.footer.socail.twitter}><i class="lni lni-twitter"></i></a>
                  </li>
                  <li>
                    <a href=${res.data.footer.socail.gmail}><i class="lni lni-google"></i></a>
                  </li>
                  <li>
                    <a href=${res.data.footer.socail.linkedin}><i class="lni lni-linkedin"></i></a>
                  </li>
                </ul>
              </div>
              <!-- footer about -->
            </div>
            <div class="col-lg-4 col-md-6 text-align-start">
              <div class="footer-link d-flex flex-wrap">
                <div
                  class="footer-link-wrapper mt-45 wow fadeIn"
                  data-wow-duration="1.3s"
                  data-wow-delay="0.4s"
                >
                  <div class="footer-title">
                    <h4 class="title">Quick Links</h4>
                  </div>
                  <ul class="link">
                    <li><a class="" href="#home">Home</a></li>
                    <li><a class="" href="#why">Why</a></li>
                    <li><a class="" href="#products">Products</a></li>
                    <li><a class="" href="#download">Download</a></li>
                 
                  </ul>
                </div>
                <!-- footer link wrapper -->

                
                <!-- footer link wrapper -->
              </div>
              <!-- footer link -->
            </div>
            <div class="col-lg-4 col-md-6 text-align-start">
              <div
                class="footer-contact mt-45 wow fadeIn"
                data-wow-duration="1.3s"
                data-wow-delay="0.8s"
              >
                <div class="footer-title">
                  <h4 class="title">Contact Info</h4>
                </div>
                <ul class="contact-list">
                  <li>
                    <div class="contact-info d-flex">
                      <div class="info-content media-body">
                        <p class="text">
                          <i class="lni lni-phone"></i> ${res.data.footer.contact.phone}
                        </p>
                      </div>
                    </div>
                    <!-- contact info -->
                  </li>
                  <li>
                    <div class="contact-info d-flex">
                      <div class="info-content media-body">
                        <p class="text">
                          <a href="#"
                            ><i class="lni lni-envelope"></i>
                            ${res.data.footer.contact.email}</a
                          >
                        </p>
                      </div>
                    </div>
                    <!-- contact info -->
                  </li>
                  
                  
                </ul>
                <!-- contact list -->
              </div>
              <!-- footer contact -->
            </div>
    `;

        let whatsappFixed = `
    <a href={https://wa.me/${res.data.footer.contact.phone}} target="_blank"
    rel="noreferrer" class="whatsapp-fix-div"><i class="lni lni-whatsapp"></i></a>
    `;

        document.querySelector(".mainPage").innerHTML = mainPage;
        document.querySelector(".why-section-title").innerHTML =
          whySectionTitle;
        document.querySelector(".why-section-boxes").innerHTML =
          whySectionBoxes;
        document.querySelector(".download-fetch").innerHTML = downloadFetch;
        document.querySelector(".footer-fetch").innerHTML = footer;
        document.querySelector(".whatsapp-fix").innerHTML = whatsappFixed;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
