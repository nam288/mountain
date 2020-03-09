

function selectClass(cls) {
  return document.getElementsByClassName(cls)[0];
}
const selectAll   = (selector) => document.querySelectorAll(selector);
const selectFirst = (selector) => selectAll(selector)[0];

let debug = false;
const showPageTime = "1000"
const showTime = "400", hideTime = "1000";
const showTiming = "(.19,.53,.27,.92)", hideTiming = "(1,.4,.31,.73)";

var btn       = document.getElementsByClassName("go-down-btn")[0];
var page2     = document.getElementsByClassName("p2")[0];
var menu      = document.getElementsByClassName("menu")[0];
var searchBtn = document.getElementsByClassName("searchBtn")[0];
var moreBtn   = document.getElementsByClassName("moreBtn")[0];
var curPage   = document.getElementsByClassName("curPage")[0];
var dots      = document.getElementsByClassName("dot");
var explore   = document.getElementsByClassName("explore")[0];
var fromPage = 0, toPage = 1;
var moveDownBtn = selectClass("nav-downBtn");
var moveUpBtn = selectClass("nav-upBtn");
// Init position of transition components

initMultipleTransition(selectAll(".TransDown"),  {y: -100});
initMultipleTransition(selectAll(".TransUp"),    {y:  100});
initMultipleTransition(selectAll(".TransLeft"),  {x: -100});
initMultipleTransition(selectAll(".TransRight"), {x:  100});

// Animate the second page
const page2ShowTime = 1000,
      page2ImgShowTime = 600,
      page2ImgExtraTime = 200,
      page2ContentShowTime = 600;
addTransition(page2, btn, () => true,
  {},
  {
    duration: page2ShowTime,
    timing: "cubic-bezier(.65,.29,.54,0.9)",
  });

// Show the second page's components

// Images

addMultipleTransition(
  [
    selectClass("p2-top"),
    selectClass("p2-bottom"),
    selectFirst(".p2-top > img"),
    selectFirst(".p2-bottom > img"),
  ],
  [btn, ],
  (_, to) => to == 1,
  {},
  [...Array(4)].map((_,i) =>
    {
      return {
        delay: page2ShowTime,
        duration: page2ImgShowTime + +(i > 1) * page2ImgExtraTime,
        timing: `cubic-bezier${showTiming}`,
      };
    }
  )
);

// Content

// Title
addMultipleTransition(
  selectAll(".content-title div"),
  [btn],
  (_, to) => to == 1,
  {},
  [{
    delay: page2ShowTime + page2ImgShowTime,
    duration: page2ContentShowTime,
    timing: `cubic-bezier${showTiming}`,
  }]
);

// Description
addMultipleTransition(
  selectAll(".content-description div"),
  [btn],
  (_, to) => to == 1,
  {},
  [{
    delay: page2ShowTime + page2ImgShowTime,
    duration: page2ContentShowTime + 200,
    timing: `cubic-bezier${showTiming}`,
  }]
);

moveDownBtn



btn.onclick = function () {

  // runTransition(page2, 0);
  for (const el of this.transitionObjects) {
    for (let i = 0, n = el.transitioners.length; i < n; i++)
      if (el.transitioners[i].predicate(fromPage, toPage))
        runTransition(el, i);
  }
  /* save
  // transition page
  page2.style.display = "grid";
  page2.style.transform = "translateX(0)";
  page2.style.transition = `transform ${showPageTime}ms cubic-bezier(.65,.29,.54,0.9)`;

  // change menu component's color
  explore.style.opacity = "0";
  searchBtn.src = "./images/search-black.svg";
  moreBtn.src = "./images/more-black.svg";

  setTimeout(function() {
      document.getElementsByClassName("cur-dot")[0].src = "./images/choose-circle-black.svg";
      document.getElementsByClassName("delimPage")[0].style.color = "black";
      document.getElementsByClassName("logo")[0].style.color = "black";
      curPage.innerText = "02";
      curPage.style.color = "black";
      for (const dot of dots)
        dot.src = "./images/circle-black.svg"
  }, 100);

  this.style.display = "none";

  setDelayTime();
  setTransitionDuration();

  // transition
  for (const directionWrappers of wrps)
    for (const wrapper of directionWrappers)
      wrapper.style.transform = "none";

  for (const directionImages of imgs)
    for (const image of directionImages)
      image.style.transform = "none";
  */
};

// document.getElementsByClassName("nav-downBtn")[0].onclick = function () {
//   btn.onclick();

// }
