const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");

function switchMode(mode) {
  nav.style.backgroundColor =
    mode.toLowerCase() === "dark" ? "rgb(0 0 0 / 50%)" : "rgb(225 225 225 / 50%)";
  textBox.style.backgroundColor =
    mode.toLowerCase() === "dark" ? "rgb(225 225 225 / 50%)" : "rgb(0 0 0 / 50%)";
  toggleIcon.children[0].textContent = `${mode} mode`;
  mode.toLowerCase() === 'dark' ? toggleIcon.children[1].classList.replace("fa-sun", "fa-moon") : toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
  image1.src = `img/undraw_proud_coder_${mode.toLowerCase()}.svg`;
  image2.src = `img/undraw_feeling_proud_${mode.toLowerCase()}.svg`;
  image3.src = `img/undraw_conceptual_idea_${mode.toLowerCase()}.svg`;
}

const switchTheme = (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem('theme', 'dark')
    switchMode("Dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem('theme', 'light')
    switchMode("Light");
  }
};

toggleSwitch.addEventListener("change", switchTheme);


const currnetTheme = localStorage.getItem('theme')
if(currnetTheme) {
    document.documentElement.setAttribute("data-theme", currnetTheme);

    if(currnetTheme === 'dark'){
        toggleSwitch.checked = true;
        switchMode('Dark')
    }
}