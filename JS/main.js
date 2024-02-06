
let mainColors = localStorage.getItem("color-option");

if (mainColors !== null) {

    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color-option"));

};

let backgroundOption = true;

let backgroundInterval;

let backgroundLocalItem= localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {

    if (backgroundLocalItem === 'true') {

        backgroundOption = true;

    } else {

        backgroundOption = false;

    }

    document.querySelectorAll(".random_background span").forEach(element => {

        element.classList.remove("active");
    });
 
    if (backgroundLocalItem === 'true') {

        document.querySelector(".random_background .yes").classList.add("active");

    } else {

        document.querySelector(".random_background .no").classList.add("active");

    }
};

let spinIcon = document.querySelector(".setting_icon .fa-gear");

spinIcon.onclick = function () {

    this.classList.toggle("fa-spin");

    document.querySelector(".setting_box").classList.toggle("open");

};

const colorList = document.querySelectorAll(".colors_List li");

colorList.forEach(li => {

   li.addEventListener("click", (e) => {

    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

    localStorage.setItem("color-option", e.target.dataset.color);

    handelActive(e);

});

});

const randomBackground = document.querySelectorAll(".random_background span");

randomBackground.forEach(span => {

   span.addEventListener("click", (e) => {

    handelActive(e);

    if (e.target.dataset.background === "yes") {

        backgroundOption = true;

        randomizeImgs();

        localStorage.setItem("background_option", true);

    } else {

        backgroundOption = false;

        clearInterval(backgroundInterval);

        localStorage.setItem("background_option", false);
    }
    });

});

let landingPage = document.querySelector(".landing-page");

let imgArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"];

function randomizeImgs() {

    if(backgroundOption === true) {

        backgroundInterval = setInterval(() => {

           let randomNumber =  Math.floor(Math.random() * imgArray.length);

           landingPage.style.backgroundImage = 'url("img/'+imgArray[randomNumber] +'")';

        }, 10000);
    }
};
randomizeImgs();

let ourSkiils = document.querySelector(".skills");

window.onscroll = function () {

    let skillsOffsetTop = ourSkiils.offsetTop;

    let skillsOuterHeigth = ourSkiils.offsetHeight;

    let windowHeight = this.innerHeight;

    let WindowScrollTop  = this.pageYOffset;

    if (WindowScrollTop > (skillsOffsetTop + skillsOuterHeigth - windowHeight)) {

        let allSkills = document.querySelectorAll(".skills_box .skill_progress span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;

        });
    }
};

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {

        let overlay = document.createElement("div");

        overlay.className = 'popup_overlay';

         document.body.appendChild(overlay);

        let popupBox = document.createElement("div");

        popupBox.className = 'popup_box';

        if (img.alt !== null) {

            let imgHeading = document.createElement("h3");

            let imgText = document.createTextNode(img.alt);

            imgHeading.appendChild(imgText);

            popupBox.appendChild(imgHeading);
        }

        let popupImage = document.createElement("img");

        popupImage.src = img.src;

        popupBox.appendChild(popupImage);

        document.body.appendChild(popupBox);

        let spanClose = document.createElement("span");

        spanClose.className = 'close_button';

        let closeButton = document.createTextNode("X");

        spanClose.appendChild(closeButton);

        popupBox.appendChild(spanClose);

    });

});

document.addEventListener('click', (e) => {

    if (e.target.className === 'close_button') {

        e.target.parentNode.remove();
        
        document.querySelector(".popup_overlay").remove();
    }
});

const allBullets = document.querySelectorAll(".nav_bullets .bullet");

const allLinks = document.querySelectorAll(".links a");

function scrollToSomePage(elements) {

    elements.forEach(ele => {

        ele.addEventListener('click', (e) => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({ 

                behavior: "smooth" 

            });
        });
    });
}

scrollToSomePage(allBullets);
scrollToSomePage(allLinks);

function handelActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(ele => {

        ele.classList.remove("active"); 

    });

    ev.target.classList.add("active");
}

let bulletsOption = document.querySelectorAll(".bullets_option span");

let navBullets = document.querySelector(".nav_bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if(bulletLocalItem !== null) {
    bulletsOption.forEach(span => {

        span.classList.remove("active");
    });

    if (bulletLocalItem === 'block') {

         navBullets.style.display = 'block';

         document.querySelector(".bullets_option .yes").classList.add("active");
         
        } else {
            
        navBullets.style.display = 'none';

        document.querySelector(".bullets_option .no").classList.add("active");
    }

}

bulletsOption.forEach(e => {

    e.addEventListener('click', (e) => {

        if(e.target.dataset.display === 'show') {

            document.querySelector(".nav_bullets").style.display = 'block';

            localStorage.setItem("bullets_option", "block");
            
        } else {
            
            document.querySelector(".nav_bullets").style.display = 'none'
            
            localStorage.setItem("bullets_option", "none");
        }
        
        handelActive(e);
    });
    
});

 let resrtOptionsArr = ["background_option", "color-option", "bullets_option"];

document.querySelector(".reset_option").onclick =  () => {

    localStorage.removeItem("color-option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");

    window.location.reload();
};

let toggleBtn = document.querySelector(".toggle_menu");

let tlinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

    e.stopPropagation();

    this.classList.toggle("menu-active");

    tlinks.classList.toggle("open");
}

document.addEventListener("click", (e) => {


    if (e.target !== toggleBtn && e.target !== tlinks ) {
       
        if(tlinks.classList.contains("open")) {

            toggleBtn.classList.toggle("menu-active");

            tlinks.classList.toggle("open");
        }
    }
});

tlinks.onclick = function (e) {

    e.stopPropagation();
}




