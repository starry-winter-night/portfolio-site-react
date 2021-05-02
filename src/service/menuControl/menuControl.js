(() => {
  showMobileMenuBar();

  function showMobileMenuBar() {
    const btn = document.querySelector(".aside__menu__btn");
    const icon = document.querySelector(".aside__menu__btn i");
    const aside = document.querySelector(".aside");
    const menu = document.querySelector(".aside__menu");

    document.addEventListener("click", (e) => {
      if (btn === e.target || icon === e.target) {
        aside.classList.toggle("active");
        menu.classList.toggle("active");
      } else if (menu === e.target || e.target.dataset.id) {
        aside.classList.add("active");
        menu.classList.add("active");
      } else {
        aside.classList.remove("active");
        menu.classList.remove("active");
      }
    });
  }


})();
