const selectClass = (cls) => document.getElementsByClassName(cls)[0];
const selectAll   = (selector) => document.querySelectorAll(selector);
const selectFirst = (selector) => selectAll(selector)[0];

let debug = false;
const showPageTime = "1000";
const showTiming = "(.19,.53,.27,.92)";

var btn       = document.getElementsByClassName("go-down-btn")[0];
var page2     = document.getElementsByClassName("p2")[0];
var searchBtn = document.getElementsByClassName("searchBtn")[0];
var moreBtn   = document.getElementsByClassName("moreBtn")[0];
var curPage   = document.getElementsByClassName("curPage")[0];
var dots      = document.getElementsByClassName("dot");
var explore   = document.getElementsByClassName("explore")[0];
var fromPage = 0, toPage = 1;
var moveDownBtn = selectClass("nav-downBtn");
var transitionElements = selectAll(".TransDown, .TransUp, .TransLeft, .TransRight, .Trans");

console.log(transitionElements);
// Init position of transition components

initMultipleTransition(selectAll(".TransDown"),  {y: -100});
initMultipleTransition(selectAll(".TransUp"),    {y:  100});
initMultipleTransition(selectAll(".TransLeft"),  {x: -100});
initMultipleTransition(selectAll(".TransRight"), {x:  100});

const page1HideTime = 1000,
      page2ShowTime = 1000,
      page2ImgShowTime = 600,
      page2ImgExtraTime = 200,
      page2ContentShowTime = 600;
// Hide the first page's content
addTransition(selectClass("C-letter"), (_from, _) => _from == 0,
  {
    y: 50,
    opacity: 0
  },
  {
    duration: page1HideTime,
    timing: "cubic-bezier(.65,.29,.54,0.9)",
  }
);

addTransition(selectClass("peaks"), (_from, _) => _from == 0,
  {
    y: 50,
    opacity: 0
  },
  {
    delay: page1HideTime * 0.3,
    duration: page1HideTime * 0.2,
    timing: "cubic-bezier(.65,.29,.54,0.9)",
  }
);

// Animate the second page
addTransition(page2, (_, to) => to == 1,
  {},
  {
    delay: page1HideTime * 0.5,
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
  (_, to) => to == 1,
  {},
  [...Array(4)].map((_,i) =>
    {
      return {
        delay: page2ShowTime + page1HideTime * 0.5,
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
  (_, to) => to == 1,
  {},
  [{
    delay: page2ShowTime + page2ImgShowTime + page1HideTime * 0.5,
    duration: page2ContentShowTime,
    timing: `cubic-bezier${showTiming}`,
  }]
);

// Description
addMultipleTransition(
  selectAll(".content-description .TransLeft"),
  (_, to) => to == 1,
  {},
  [{
    delay: page2ShowTime + page2ImgShowTime + page1HideTime * 0.5 + 200,
    duration: page2ContentShowTime,
    timing: `cubic-bezier${showTiming}`,
  }]
);

addMultipleTransition(
  selectAll(".content-description .TransRight"),
  (_, to) => to == 1,
  {},
  [{
    delay: page2ShowTime + page2ImgShowTime + page1HideTime * 0.5 + 400,
    duration: page2ContentShowTime,
    timing: `cubic-bezier${showTiming}`,
  },
  {
    delay: page2ShowTime + page2ImgShowTime + page1HideTime * 0.5 + 600,
    duration: page2ContentShowTime,
    timing: `cubic-bezier${showTiming}`,
  }]
);

// Hide the second page's components

// Images

addMultipleTransition(
  [
    selectClass("p2-top"),
    selectClass("p2-bottom"),
    selectFirst(".p2-top > img"),
    selectFirst(".p2-bottom > img"),
  ],
  (_from, _) => _from == 1,
  {
    y: 100,
    opacity: 0,
  },
  [...Array(4)].map((_,i) =>
    {
      return {
        delay: 0,
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
  (_from, _) => _from == 1,
  {
    y: 100,
  },
  [{
    delay: page2ImgShowTime,
    duration: page2ContentShowTime,
    timing: `cubic-bezier${showTiming}`,
  }]
);

// Description
addMultipleTransition(
  selectAll(".content-description .TransLeft"),
  (_from, _) => _from == 1,
  {
    x: 100,
    opacity: 0,
  },
  [{
    delay: page2ImgShowTime + 200,
    duration: page2ContentShowTime,
    timing: `cubic-bezier${showTiming}`,
  }]
);

addMultipleTransition(
  selectAll(".content-description .TransRight"),
  (_from, _) => _from == 1,
  {
    x: -100,
    opacity: 0,
  },
  [{
    delay: page2ImgShowTime + 400,
    duration: page2ContentShowTime,
    timing: `cubic-bezier${showTiming}`,
  },
  {
    delay:  page2ImgShowTime + 600,
    duration: page2ContentShowTime,
    timing: `cubic-bezier${showTiming}`,
  }]
);

addTransition(page2, (_from, _) => _from == 1,
  {
    x: -100,
  },
  {
    delay: page2ImgShowTime + 600 + page2ContentShowTime,
    duration: page2ShowTime * 0.5,
    timing: "cubic-bezier(.65,.29,.54,0.9)",
  }
);



btn.onclick = function () {

  // runTransition(page2, 0);
  for (const el of transitionElements) {
    for (let i = 0, n = el.transitioners.length; i < n; i++)
      if (el.transitioners[i].predicate(fromPage, toPage))
        runTransition(el, i);
  }

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

  fromPage = 1;
  toPage = null;
};

moveDownBtn.onclick = function() {

  let newPage = fromPage + 1;

  if (fromPage == 0) {
    btn.onclick();
    return;
  }

  for (const el of transitionElements) {
    for (let i = 0, n = el.transitioners.length; i < n; i++)
      if (el.transitioners[i].predicate(fromPage, newPage))
        runTransition(el, i);
  }

  fromPage = newPage;
}
