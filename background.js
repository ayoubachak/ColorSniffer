chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  let x = request.x;
  let y = request.y;
  
  // Get the color of the pixel at (x, y)
  let color = getColorAt(x, y);
  alert(x+" "+y)
  // Update the popup with the selected color
  document.getElementById("selected-color").style.backgroundColor = color;
});

function getColorAt(x, y) {
  let color;
  
  // Capture a screenshot of the current tab
  chrome.tabs.captureVisibleTab(null, {format: "png"}, function(dataUrl) {
    // Create an image element and set its src to the data URL
    let img = document.createElement("img");
    img.src = dataUrl;
    
    // Wait for the image to load, then get the pixel data
    img.addEventListener("load", function() {
      // Create a canvas element and draw the image on it
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      context.drawImage(img, 0, 0);
      
      // Get the ImageData object for the pixel at (x, y)
      let imageData = context.getImageData(x, y, 1, 1);
      
      // Get the color of the pixel as an RGBA array
      let pixel = imageData.data;
      
      // Convert the pixel to a hex string
      let hex = "#" + ("000000" + rgbToHex(pixel[0], pixel[1], pixel[2])).slice(-6);
      
      // Set the color variable to the hex string
      color = hex;
    });
  });
  
  // Return the color variable
  return color;
}

// Convert an RGB color to a hex string
function rgbToHex(r, g, b) {
  return ((r << 16) | (g << 8) | b).toString(16);
}

