function addTransitionProperties(obj, props) {
  obj.transitionProperies = obj.transitionProperies || {
    transitionDuration       : "0ms",
    transitionTimingFunction : "ease",
    transitionProperty       : "all",
    transitionDelay          : "0ms",
  };
  for (const prop in props)
    obj.transitionProperies[prop] = props[prop];
};


function parseTargetStyle(stylies) {
  const transformProperties = {
    x       : "translateX",
    y       : "translateY",
    scalex  : "scaleX",
    scalex  : "scaleY",
    rotatex : "rotateX",
    rotatex : "rotateY",
    skewx   : "skewX",
    skewy   : "skewY",
  };

  let transformStylies = []
      , result = {};

  for (const style in stylies) {
    let value = stylies[style];
    if (style in transformProperties) {
      if (style == "x" || style == "y")
        value = "" + value + "%";
      else if (style.startsWith("rotate") || style.startsWith("skew"))
        value = "" + value + "deg";
      transformStylies.push(`${transformProperties[style]}(${value})`);
    }
    else {
      result[style] = ""+value;
    }
  }

  result.transform = transformStylies.length ? transformStylies.join(" ") : "none";
  return result;
}

function initTransition (obj, targetStyle) {
  let parsedTargetStyle = parseTargetStyle(targetStyle);
  for (const style in parsedTargetStyle) {
    obj.style[style] = parsedTargetStyle[style];
  }
};

function initMultipleTransition (objArr, targetStyle) {
  for (let i = 0; i < objArr.length; i++)
    initTransition(objArr[i], targetStyle)
};


function addTransition(obj, predicate, targetStyle, options) {
  // add default transition properties
  addTransitionProperties(obj);

  // add target style for transition
  let transitioner = {};

  transitioner.predicate = predicate;
  transitioner.targetStyle = parseTargetStyle(targetStyle);

  // add custom options for transitioner's option
  transitioner.options = {};
  for (const option in options) {
    let value = options[option];
    if (option == "delay")
      transitioner.options.transitionDelay = "" + value + "ms";
    else if (option == "duration")
      transitioner.options.transitionDuration = "" + value + "ms";
    else if (option == "timing")
      transitioner.options.transitionTimingFunction = value;
    else if (option == "props")
      transitioner.options.transitionProperty = value;
    else
      console.log("Unknown transition property: ", option);
  };

  // add transitioner to object's transitioners
  obj.transitioners = obj.transitioners || [];
  obj.transitioners.push(transitioner);
};

function addMultipleTransition (objArr, predicate, targetStyle, optionArr) {
  for (let indexObject = 0; indexObject < objArr.length; indexObject++) {
    addTransition(objArr[indexObject],
      predicate, targetStyle, optionArr[+(indexObject % optionArr.length)]);
  }
}

function runTransition (obj, transitionIndex) {
  for (const prop of ["transitionProperty", "transitionDelay",
              "transitionDuration", "transitionTimingFunction"]) {
    obj.style[prop] = obj.transitioners[transitionIndex].options[prop] || obj.transitionProperies[prop];
  }

  for (const style in obj.transitioners[transitionIndex].targetStyle) {
    obj.style[style] = obj.transitioners[transitionIndex].targetStyle[style];
  }
}

