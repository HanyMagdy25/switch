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
  const cardsData = [
    {
      id: 1,
      title: "first title flores",
      content:
        "Alii nusquam cu duo, vim eu consulatu percipitur, meis dolor comprehensam at vis. Vel ut percipitur dignissim signiferumque.",
      image:
        "https://res.cloudinary.com/dia1kfg4m/image/upload/v1673438535/image_7_y4tzoo.png",
    },
    {
      id: 2,
      title: "second title flores",
      content:
        "Alii nusquam cu duo, vim eu consulatu percipitur, meis dolor comprehensam at vis. Vel ut percipitur dignissim signiferumque.",
      image:
        "https://res.cloudinary.com/dia1kfg4m/image/upload/v1673438535/image_6_hzoqzy.png",
    },
    {
      id: 3,
      title: "first title flores",
      content:
        "Alii nusquam cu duo, vim eu consulatu percipitur, meis dolor comprehensam at vis. Vel ut percipitur dignissim signiferumque.",
      image:
        "https://res.cloudinary.com/dia1kfg4m/image/upload/v1673438535/image_7_y4tzoo.png",
    },
    {
      id: 4,
      title: "second title flores",
      content:
        "Alii nusquam cu duo, vim eu consulatu percipitur, meis dolor comprehensam at vis. Vel ut percipitur dignissim signiferumque.",
      image:
        "https://res.cloudinary.com/dia1kfg4m/image/upload/v1673438535/image_6_hzoqzy.png",
    },
    {
      id: 5,
      title: "first title flores",
      content:
      "Alii nusquam cu duo, vim eu consulatu percipitur, meis dolor comprehensam at vis. Vel ut percipitur dignissim signiferumque.",
      image:
        "https://res.cloudinary.com/dia1kfg4m/image/upload/v1673438535/image_7_y4tzoo.png",
    },
    {
      id: 6,
      title: "second title flores",
      content:
      "Alii nusquam cu duo, vim eu consulatu percipitur, meis dolor comprehensam at vis. Vel ut percipitur dignissim signiferumque.",
      image:
        "https://res.cloudinary.com/dia1kfg4m/image/upload/v1673438535/image_6_hzoqzy.png",
    },
  ];

  const myContent = document.querySelector(".swiper-card-div");

  const showInHtml = cardsData.map((item, index) => {
    return `
    <div class="swiper-slide">
        <div class="card" data-wow-duration="1.3s" data-wow-delay="0.2s">
            <img class="card-img-top" src=${item.image} alt=${item.title}>
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">${item.content}</p>
                <a href="#" class="btn main-btn">Purchase</a>
            </div>
        </div>
    </div> `;
  });

  myContent.innerHTML = showInHtml;
});
