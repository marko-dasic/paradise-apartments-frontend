var isRuned = true;

if(isRuned)
{
  var parent = document.querySelector('.splitview'),
  topPanel = parent.querySelector('.top'),
  handle = parent.querySelector('.handle'),
  skewHack = 0,
  delta = 0;

  // If the parent has .skewed class, set the skewHack var.
  if (parent.className.indexOf('skewed') != -1) {
  skewHack = 1000;
  }

  parent.addEventListener('mousemove', function(event) {
    // Get the delta between the mouse position and center point.
    delta = (event.clientX - window.innerWidth / 2) * 0.5;

    // Move the handle.
    handle.style.left = event.clientX + delta + 'px';

    // Adjust the top panel width.
    topPanel.style.width = event.clientX + skewHack + delta + 'px';
  });
  isRuned = false;
}

function coverBelgrade() {



  // You can change global variables here:
  var radius = 240; // how big of the radius
  var autoRotate = true; // auto rotate or not
  var rotateSpeed = -60; // unit: seconds/360 degrees
  // var imgWidth = 180; 
  // var imgHeight = 255;
  let x =  window.innerWidth;
  // let y = 0.185 * x
  //let z = 0.273 * x
  let y = 0.190 * x
  let z = 0.171 * x
  var imgWidth = y; 
  var imgHeight = z;
  if(imgWidth > 180) imgWidth = 180;
  if(imgHeight > 255) imgHeight = 255;

  // Link of background music - set 'null' if you dont want to play background music
  var bgMusicURL = null
  var bgMusicControls = false; // Show UI music control

  /*
      NOTE:
        + imgWidth, imgHeight will work for video
        + if imgWidth, imgHeight too small, play/pause button in <video> will be hidden
        + Music link are taken from: https://hoangtran0410.github.io/Visualyze-design-your-own-/?theme=HauMaster&playlist=1&song=1&background=28
        + Custom from code in tiktok video  https://www.facebook.com/J2TEAM.ManhTuan/videos/1353367338135935/
  */


  // ===================== start =======================
  // animation start after 1000 miliseconds
  setTimeout(init, 1000);

  var odrag = document.getElementById('drag-container');
  var ospin = document.getElementById('spin-container');
  var aImg = ospin.getElementsByClassName('img');
  // var aVid = ospin.getElementsByTagName('video');
  var aEle = [...aImg]; // combine 2 arrays

  // Size of images
  ospin.style.width = imgWidth + "px";
  ospin.style.height = imgHeight + "px";

  // Size of ground - depend on radius
  var ground = document.getElementById('ground');
  ground.style.width = radius * 3 + "px";
  ground.style.height = radius * 3 + "px";

  function init(delayTime) {
      // aEle[0].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + 300 + "px)";
      // aEle[0].style.transform = "translateY(-140%) translateX(0px) rotate(0deg)";
      // aEle[1].style.transform = "translateY(-90%) translateX(140%) rotate(0deg)";
      // aEle[2].style.transform = "translateY(-90%) translateX(-140%) rotate(-0deg)";

      // aEle[3].style.transform = "translateY(160%) translateX(0px) rotate(0deg)";
      // aEle[4].style.transform = "translateY(90%) translateX(140%) rotate(0deg)";
      // aEle[5].style.transform = "translateY(90%) translateX(-140%) rotate(-0deg)";

    for (var i = 0; i < aEle.length; i++) {
      aEle[i].style.transition = "transform 1s";
      aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
    }
  }

  var interval;

  function applyTranform(obj) {
    // Constrain the angle of camera (between 0 and 180)
    if(tY > 180) tY = 180;
    if(tY < 0) tY = 0;

    // Apply the angle
    obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
    // currentPositions = getCurrentRotation(obj);
    // console.log("tX",tX);
    // console.log("x",currentPositions.rotateX);
    // init(1);
    // var endX = currentPositions.rotateX + 300;
    // clearInterval(interval);

    // interval = setInterval(()=>{

    //   currentPositions = getCurrentRotation(obj);
    //   x = currentPositions.rotateX;
    //   if(tX > x) x++;
    //   else if (x == endX)
    //   {
    //     clearInterval(interval);
    //     console.log("kraj intervala")
    //   }
    //   else x--; 
    //   obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (x) + "deg)";
    // },50);
  }

  function getCurrentRotation(obj) {
    const computedStyle = window.getComputedStyle(obj);
    const transformValue = computedStyle.getPropertyValue('transform');
  
    // Parsirajte vrednosti rotacije iz matrice transformacije
    const matrixValues = transformValue.match(/matrix.*\((.+)\)/)[1].split(', ');
    const rotateX = Math.atan2(parseFloat(matrixValues[1]), parseFloat(matrixValues[0])) * (180 / Math.PI);
    const rotateY = Math.atan2(parseFloat(matrixValues[5]), parseFloat(matrixValues[4])) * (180 / Math.PI);
  
    return { rotateX, rotateY };
  }

  function playSpin(yes) {
    ospin.style.animationPlayState = (yes?'running':'paused');
  }

  var sX, sY, nX, nY, desX = 0,
      desY = 0,
      tX = 0,
      tY = 10;

  // auto spin
  if (autoRotate) {
    var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
    ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
  }



  // setup events

  // document.addEventListener("pointerdown", function (e){
  //   clearInterval(odrag.timer);
  //   e = e || window.event;
  //   var sX = e.clientX ,
  //       sY = e.clientY;

  //   this.onpointermove = function (e) {
  //     e = e || window.event;
  //     var nX = e.clientX + 200, // ova linja koda uvecava razmak koji predje krug kada se gleda na telefonu (problematicno!)
  //         nY = e.clientY;
  //     desX = nX - sX;
  //     desY = nY - sY;
  //     tX += desX * 0.1;
  //     tY += desY * 0.1;
  //     applyTranform(odrag);
  //     sX = nX;
  //     sY = nY;
  //   };

  //   this.onpointerup = function (e) {
  //     odrag.timer = setInterval(function () {
  //       desX *= 0.95;
  //       desY *= 0.95;
  //       tX += desX * 0.1;
  //       tY += desY * 0.1;
  //       applyTranform(odrag);
  //       playSpin(false);
  //       if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
  //         clearInterval(odrag.timer);
  //         playSpin(true);
  //       }
  //     }, 17);

  //     this.onpointermove = this.onpointerup = null;
  //   };

  //   return false;
  // });

  // document.onmousewheel = function(e) {
  //   e = e || window.event;
  //   var d = e.wheelDelta / 20 || -e.detail;
  //   radius += d;
  //   init(1);
  // };

  setTimeout(()=>{
      $('.base').clone().addClass('overlay').appendTo('.landing');
      $('.cta').hover(function() {
        $('.overlay').toggleClass('over');
      });
      
      /*--------------------
      Codepen Preview Tile
      --------------------*/
      setTimeout(function() {
        $('.overlay').addClass('over').delay(600).queue(function() {
          $(this).removeClass("over").dequeue();
        });
      }, 400)
  },1000)

  $(".custom-carousel").owlCarousel({
      autoWidth: true,
      loop: true
  });
  $(document).ready(function () {
        addEventToShowCarousle();

   
  });

  function addEventToShowCarousle(){
    $(".custom-carousel .item").click(function () {
      $(".item").off("click");
      $(".custom-carousel .item").not($(this)).removeClass("active");
      $(this).toggleClass("active");
      addEventToShowCarousle();
      console.log("proslo")

  });
  }

  /*abotu Belgrade section */
    var parent = document.querySelector('.splitview'),
        topPanel = parent.querySelector('.top'),
        handle = parent.querySelector('.handle'),
        skewHack = 0,
        delta = 0;

    // If the parent has .skewed class, set the skewHack var.
    if (parent.className.indexOf('skewed') != -1) {
        skewHack = 1000;
    }

    parent.addEventListener('mosuemove', function(event) {
      alert("USO")
        // Get the delta between the mouse position and center point.
        delta = (event.clientX - window.innerWidth / 2) * 0.5;

        // Move the handle.
        handle.style.left = event.clientX + delta + 'px';

        // Adjust the top panel width.
        topPanel.style.width = event.clientX + skewHack + delta + 'px';
    });
}
  /*abotu Belgrade section */
  var parent = document.querySelector('.splitview'),
  topPanel = parent.querySelector('.top'),
  handle = parent.querySelector('.handle'),
  skewHack = 0,
  delta = 0;
// If the parent has .skewed class, set the skewHack var.
if (parent.className.indexOf('skewed') != -1) {
  skewHack = 1000;
}
// parent.addEventListener('pointermove', function(event) {
//   // Get the delta between the mouse position and center point.
//   delta = (event.clientX - window.innerWidth / 2) * 0.5;

//   // Move the handle.
//   handle.style.left = event.clientX + delta + 'px';

//   // Adjust the top panel width.
//   topPanel.style.width = event.clientX + skewHack + delta + 'px';

// });
parent.addEventListener('touchmove', function(events) {
  // Get the delta between the mouse position and center point.
  var event = events.touches[0];

  delta = (event.clientX - window.innerWidth / 2) * 0.5;

  // Move the handle.
  handle.style.left = event.clientX + delta + 'px';

  // Adjust the top panel width.
  topPanel.style.width = event.clientX + skewHack + delta + 'px';

});
coverBelgrade();


