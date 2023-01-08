// Set the cursor to a cross when the button is clicked
document.getElementById("color-picker-button").addEventListener("click", function(event) {
  document.body.style.cursor = "crosshair";
});

// Send a message to the background script with the pixel values when the user clicks on the webpage
document.addEventListener("mousemove", function(event) {
  let x = event.clientX;
  let y = event.clientY;
  chrome.runtime.sendMessage({x: x, y: y});
});


console.log("testing")
console.warn("This is a warning message");
console.error("This is an error message");
