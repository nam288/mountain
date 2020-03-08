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


let wrps = ['Down', 'Left', 'Up', 'Right'].map(
  d => document.getElementsByClassName(`WrpTrans${d}`));

let imgs = ['Up', 'Right', 'Down', 'Left'].map(
  d => document.getElementsByClassName(`ImgTrans${d}`));

const initialPosition = (d, wrp) => {
  if (wrp)
    return "translate" + (d % 2 == 0 ? "y" : "x") + `(${d == 0 || d == 3 ? "-100" : "100"}%)`;
  return "translate" + (d % 2 == 0 ? "y" : "x") + `(${d == 0 || d == 3 ? "100" : "-100"}%)`;
};

const showedPosition = d => {
  return "translate" + (d % 2 == 0 ? "y" : "x") + `(${d == 0 || d == 3 ? "0" : "0"}%)`;
};

const setDelayTime = () => {
  var delayDivs = document.querySelectorAll('div[class*="delayTime_"]');
  for (const div of delayDivs) {
    for (const cls of div.classList) {
      let match = /^delayTime_(\d+)$/.exec(cls);
      if (match === null) continue;
      console.log(match);
      let delayTime = match[1];
      div.style.transitionDelay = `${delayTime}ms`;
    }
  }
  console.log(delayDivs);
};

const setTransitionDuration = () => {
  var delayDivs = document.querySelectorAll('div[class*="transDuration_"]');
  for (const div of delayDivs) {
    for (const cls of div.classList) {
      let match = /^transDuration_(\d+)$/.exec(cls);
      if (match === null) continue;
      let transitionDuration = match[1];
      div.style.transitionDuration = `${transitionDuration}ms`;
    }
  }
};



if (!debug) {
  [0,1,2,3].forEach(d => {
    for (let i = 0; i < wrps[d].length; i++) {
      wrps[d][i].style.overflow = "hidden";
      wrps[d][i].style.transform = initialPosition(d, true);
    }
    for (let i = 0; i < imgs[d].length; i++) {
      imgs[d][i].style.transform = initialPosition(d, false);
    }
  });
}


btn.onclick = function () {


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


  // show new components's content

  // set transition properties
  [0, 1, 2, 3].forEach(d => {
    for (let i = 0; i < wrps[d].length; i++) {
      wrps[d][i].style.transition = `transform ${showTime}ms cubic-bezier${showTiming} 1100ms`;
    }

    for (let i = 0; i < imgs[d].length; i++) {
      imgs[d][i].style.transition = `transform ${showTime * 1.5}ms cubic-bezier${showTiming} 1100ms`;
    }
  });

  setDelayTime();
  setTransitionDuration();

  // transition
  [0, 1, 2, 3].forEach(d => {
    for (let i = 0; i < wrps[d].length; i++) {
      wrps[d][i].style.transform  = showedPosition(d);
    }

    for (let i = 0; i < imgs[d].length; i++) {
      imgs[d][i].style.transform  = "none";
    }
  });


}
