let debug = false;
const showTime = "0.7", hideTime = "1";
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
  return "translate" + (d % 2 == 0 ? "y" : "x") + `(${d == 0 || d == 3 ? "50" : "-50"}%)`;
};

const showedPosition = d => {
  return "translate" + (d % 2 == 0 ? "y" : "x") + `(${d == 0 || d == 3 ? "-4" : "4"}%)`;
};

if (!debug) {
  [0,1,2,3].forEach(d => {
    for (let i = 0; i < wrps[d].length; i++) {
      wrps[d][i].style.transform = initialPosition(d, true);
    }
    for (let i = 0; i < imgs[d].length; i++) {
      imgs[d][i].style.transform = initialPosition(d, false);
    }
  });
}

console.log(imgs);
btn.onclick = function () {

  // console.log(page2.style.zIndex, menu.style.zIndex);
  // this.style.display = "none";
  page2.style.display = "grid";
  page2.style.transform = "translateX(0)";
  page2.style.transition = "transform 2s cubic-bezier(.65,.29,.54,0.9)";
  explore.style.opacity = "0";

  // setTimeout(function () {
    searchBtn.src = "./images/search-black.svg";
    moreBtn.src = "./images/more-black.svg";
  // }, 1350);

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
  setTimeout(function() {
    [0, 1, 2, 3].forEach(d => {
      for (let i = 0; i < wrps[d].length; i++) {
        wrps[d][i].style.transform  = showedPosition(d);
        wrps[d][i].style.transition = `transform ${showTime}s cubic-bezier${showTiming}`;
      }
      for (let i = 0; i < imgs[d].length; i++) {
        imgs[d][i].style.transform  = "none";
        imgs[d][i].style.transition = `transform ${showTime * 2}s cubic-bezier${showTiming}`;
      }
    });
    let inners = document.getElementsByClassName("inner-text");
    for (const inner of inners)
      inner.style.transform = "none";


    console.log(this.style.display);
  }, 2000);
}
