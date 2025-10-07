'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
const sidebarCloseBtn = document.querySelector('[data-sidebar-close]');

// sidebar toggle functionality for mobile with background scroll lock
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
  if (window.matchMedia('(max-width: 768px)').matches) {
    if (sidebar.classList.contains('active')) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }
});

// sidebar close button for mobile overlay
if (sidebarCloseBtn) {
  sidebarCloseBtn.addEventListener('click', function () {
    sidebar.classList.remove('active');
    document.body.classList.remove('no-scroll');
    window.scrollTo(0, 0);
  });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// Initialize contact info toggle after DOM and navigation are set up
(() => {
  const contactToggleBtn = document.querySelector('[data-contact-toggle]');
  const contactContent = document.querySelector('[data-contact-content]');
  const contactCloseBtn = document.querySelector('[data-contact-close]');

  if (!contactToggleBtn || !contactContent) return;

  const setCollapsed = (collapsed) => {
    if (collapsed) {
      contactContent.classList.add('is-collapsed');
      contactContent.classList.remove('is-open');
      contactToggleBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    } else {
      contactContent.classList.remove('is-collapsed');
      contactContent.classList.add('is-open');
      contactToggleBtn.setAttribute('aria-expanded', 'true');
      if (window.matchMedia('(max-width: 768px)').matches) {
        document.body.classList.add('no-scroll');
      }
    }
  };

  const applyByViewport = () => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  applyByViewport();
  window.addEventListener('resize', applyByViewport);

  contactToggleBtn.addEventListener('click', () => {
    const isExpanded = contactToggleBtn.getAttribute('aria-expanded') === 'true';
    setCollapsed(isExpanded);
  });

  if (contactCloseBtn) {
    contactCloseBtn.addEventListener('click', () => {
      setCollapsed(true);
    });
  }
})();

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    // Remove active class from all pages and nav links
    for (let j = 0; j < pages.length; j++) {
      pages[j].classList.remove("active");
    }
    for (let j = 0; j < navigationLinks.length; j++) {
      navigationLinks[j].classList.remove("active");
    }

// (moved below) Mobile toggle for contact info section

    // Add active class to clicked nav link
    this.classList.add("active");

    // Find and activate corresponding page
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        window.scrollTo(0, 0);
        break;
      }
    }

  });
}