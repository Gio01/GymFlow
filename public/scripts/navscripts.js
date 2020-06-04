//functionality for the collapsing of the sidebar
$(".hamburger").click(function () {
  $(".wrapper").toggleClass("collapse");
});

//Makes the top_nav bar sticky 
window.onscroll = function() {sticky()};

   var navbar = document.getElementById("top_nav");
   var stick = navbar.offsetTop;

   function sticky(){
     if(window.pageYOffset >= stick){
       navbar.classList.add("sticky")
     }
     else{
       navbar.classList.remove("sticky");
     }
}
