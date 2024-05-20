function toggleNav() {
  console.log("toggling");
  var x = document.querySelector(".p0");
  if (x.classList.contains("responsive")) {
    x.classList.remove("responsive");
  } else {
    x.classList.add("responsive");
  }
}
