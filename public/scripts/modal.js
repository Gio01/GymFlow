// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// Bio

var biomodal = document.getElementById("bioModal");

// Get the button that opens the modal
var bbutton = document.getElementById("bio-button");

// Get the <span> element that closes the modal
var spanb = document.getElementsByClassName("closeB")[0];

// When the user clicks the button, open the modal 
bbutton.onclick = function() {
  biomodal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanb.onclick = function() {
  biomodal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == bmodal) {
    biomodal.style.display = "none";
  }
}

// Fitness Profile

var fmodal = document.getElementById("fitnessModal");

// Get the button that opens the modal
var fbutton = document.getElementById("fitness-button");

// Get the <span> element that closes the modal
var spanf = document.getElementsByClassName("closeF")[0];

// When the user clicks the button, open the modal 
fbutton.onclick = function() {
  fmodal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanf.onclick = function() {
  fmodal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == fmodal) {
    fmodal.style.display = "none";
  }
}
