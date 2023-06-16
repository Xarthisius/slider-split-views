var a1, a2;
A.init.then(() => {
  a1 = A.aladin('#al1', {
    reticleColor: "rgb(0, 0, 0)",
    fov: 90,
    cooFrame: 'equatorial',
    target: "00:00:00.0 -56:45:00.0",
    fullScreen: false,
    survey: 'P/DES-DR2/ColorIRG',
    projection: "ZEA",
    showProjectionControl: true,
    showCooGridControl: false,
    showSimbadPointerControl: false,
    showCooGrid: false,
    showContextMenu: true,
    showZoomControl: true
  });
  a1.setFovRange(0.01, 175);
  //a1.gotoRaDec(297.87, 25.96);
  a1.setBaseImageLayer("P/DES-DR2/ColorIRG");
  a2 = A.aladin('#al2', {
    fov: 90, 
    cooFrame: 'equatorial',
    projection: "ZEA",
    target: "00:00:00.0 -56:45:00.0",
    fullScreen: false,
    survey: 'P/PanSTARRS/DR1/color-z-zg-g',
    showFrameControl: false,
    showFullscreenControl: false,
    showZoomControl: true,
    showGotoControl: false}
  );
  a2.setFovRange(0.01, 175);

  //View.CALLBACKS_THROTTLE_TIME = 30;
  a1.on('positionChanged', function(params) {
      a2.gotoRaDec(params.ra, params.dec);
  });
  a2.on('positionChanged', function(params) {
      a1.gotoRaDec(params.ra, params.dec);
  });
  a1.on('zoomChanged', function(fov) {
  if (Math.abs(a2.getFov()[0] - fov) / fov > 0.01) {
          a2.setFoV(fov);
      }
  });
  a2.on('zoomChanged', function(fov) {
      if (Math.abs(a1.getFov()[0] - fov) / fov > 0.01) {
          a1.setFoV(fov);
      }
  });
  a2.on('click', function(params) {
      console.log(params);
  });
  $("a.zoomPlus").each(function() {
      $(this).on('click', function(e) {
          a1.increaseZoom();
          a2.increaseZoom();
          e.preventDefault();
          return false;
      });
  });
  $("a.zoomMinus").each(function() {
      $(this).on('click', function(e) {
          a1.decreaseZoom();
          a2.decreaseZoom();
          e.preventDefault();
          return false;
      });
  });
  setTimeout(function() {
      $(".twentytwenty-container").twentytwenty({default_offset_pct: 0.5, no_overlay: true});
  }, 300);
});
