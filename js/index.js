document.addEventListener("DOMContentLoaded", () => {

    const isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return(
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows());
        }
    };
    
    if (isMobile.any()) {
        document.body.classList.add('touch');
    } else {
        document.body.classList.add('pc');
    }

    const menuIcon = document.querySelector('.menu-icon');

    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            menuIcon.parentElement.classList.toggle('active');
            document.body.classList.toggle('_lock');
        })
    }

    // scroll
    const menuLinks = document.querySelectorAll('.nav-item');

    if (menuLinks.length > 0) {
        menuLinks.forEach(link => link.addEventListener('click', scrollTosection))
    } 

    function scrollTosection (e) {
        const menuLink = e.target;
        
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header').offsetHeight;
            
            document.body.classList.remove('_lock');
            menuIcon.parentElement.classList.remove('active');
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
        }
        e.preventDefault();
    }
    
    // reg window
    const regWindow = document.querySelector('.reg'),
          reg = document.querySelector('.reg'),
          regCloseBtn = document.querySelector('.reg-form-close'),
          regForm = document.querySelector('.reg-form'),
          regInputUser = document.querySelector('._user'),
          signBtn = document.querySelector('.promo-sign');


    if (localStorage.getItem('regUser')) regactive(); 
    if (regCloseBtn) regCloseBtn.addEventListener('click', regClose);
    if (signBtn) {
        signBtn.addEventListener('click', () => { 
            regWindow.classList.add('active');
            menuIcon.parentElement.classList.remove('active');
            document.body.classList.add('_lock');
        });
    }
    if (regForm) {
        regForm.addEventListener('submit', (e)=> { 
            let user = regInputUser.value;
            regForm.reset();
            localStorage.setItem('regUser', user);
            regactive();
            regClose();
            e.preventDefault();
        });
    }
    if (reg) {
        reg.addEventListener('click', (e) => {
            const target = e.target 
            if(target == reg ){
                regClose();
            }
        })
    }

    function regClose(){
        regWindow.classList.remove('active'); 
        document.body.classList.remove('_lock');
    }
    
    function regactive(){
        if (localStorage.getItem('regUser')) {
            signBtn.innerHTML = localStorage.getItem('regUser');
            signBtn.style.backgroundColor = 'white';
            signBtn.style.color = 'black';
        }
    }

    //video
    const video = document.querySelector('.video'),
          play = document.querySelector('.promo-play');
    
    if (play) {
        play.addEventListener('click', () => {
            video.play(); 
            play.style.display = "none"; 
        });
    }

    // tabs
    const tabs = document.querySelectorAll(".tabs-item");
    
    if (tabs.length > 0) {
        tabs.forEach(elem => {
            elem.addEventListener("click", () => {
                tabs.forEach(otherItem => {
                    if (otherItem.classList.contains("tabs-item-active")) {
                        otherItem.classList.remove("tabs-item-active");
                    }
                })
                elem.classList.add("tabs-item-active")
            });
        });
    }

    // modal
    const modalWindow = document.querySelector('.popup'),
          btnWhite = document.querySelector('.promo-btn-white'),
          btnBlack =document.querySelector('.promo-btn-black'),
          closeModal = document.querySelector('.close-popup');

    if (btnWhite) btnWhite.addEventListener('click', modalOpen);
    if (btnBlack) btnBlack.addEventListener('click', modalOpen);
    if (closeModal) closeModal.addEventListener('click', modalClose);
    if (modalWindow) {
        modalWindow.addEventListener('click', (e) => {
            const target = e.target 
            if(target == modalWindow ){
                modalClose();
            }
        })
    }
    
    function modalOpen() {
        modalWindow.classList.add('popup-active');
        document.body.style.overflow = "hidden";
    }

    function modalClose() {
        modalWindow.classList.remove('popup-active');
        document.body.style.overflow = "";
    }
    
    // new comment
    const getCommentBtn = document.querySelector('.comment-btn'),
          commentWindow = document.querySelector('.get-comment'),
          commentForm = document.querySelector('.comment-form'),
          commentWrap = document.querySelector('.item-wrapper'),
          inputComment = document.querySelector('.comment-username'),
          textComment = document.querySelector('.comment-textarea'),
          closeFormComment = document.querySelector('.form-close');

    if (getCommentBtn) {
        getCommentBtn.addEventListener('click', () => {
            commentWindow.classList.add('active');
            commentWindow.classList.remove('hiden');
        });
    }
    if (commentWindow) {
        commentWindow.addEventListener('click', (e) => {
            const target = e.target;
            if(target == commentWindow){
                commentWindow.classList.remove("active")
            };
        });
    }
    if (closeFormComment) {
        closeFormComment.addEventListener('click', () => {
            commentWindow.classList.remove('active');
        });
    }
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
    
            comment.name = inputComment.value;
            comment.descr = textComment.value;
        
            commentForm.reset();
            commentWindow.classList.remove('active');
            showNewComment();
        });
    }

    let comment = {
        name: '',
        descr: '',
    };

    function  newComent (nameClass, name, descr, icon) {
        const comment = document.createElement('div');  
        
        comment.innerHTML = `                 
            <div class="comment-item">
                <div class="comment-icon" id="${icon}"></div>
                <div class="comment-content">
                    <div class="${nameClass}"> ${name}</div>
                    <div class="comment-text">${descr}</div>
                </div>
            </div>
        `; 
        return comment;
    }

    function showNewComment () {
        const parentComment = document.querySelector('.item-wrapper');
        parentComment.append(newComent('comment-name', comment.name, comment.descr, 'm', commentWrap));
    }

    // slider
    const slides = document.querySelectorAll(".slide-item"),  
          prev = document.querySelector(".arrow-prev"),  
          next = document.querySelector(".arrow-next"),  
          slidesWrapper = document.querySelector(".slider"),  
          slidesField = document.querySelector(".slides"),     
          width = parseInt(window.getComputedStyle(slidesWrapper).width); 

    let slideIndex = 1; 
    let offset = 0;  
    let autoSlide = setInterval( nextSlide, 5000);

    if (slides) slides.forEach(slide => slide.style.width = width );
    if (slidesField) {
        slidesField.style.width = 100 * slides.length + '%';   
        slidesField.style.transition = 'all 0.7s ease'; 
    }           
    if (next) {
        next.addEventListener('click', () => {
            nextSlide();
            clearInterval(autoSlide);
        });
    }
    if (prev) {
        prev.addEventListener('click', () => {
            prevSlide();
            clearInterval(autoSlide);
        });
    } 
    
    function prevSlide () {
        if(offset == 0){      
            offset = width * (slides.length -1);  
        }else{
            offset -= width; 
        }
        slidesField.style.transform = `translateX(-${offset}px)`;  
        
        if(slideIndex == 1){            
            slideIndex = slides.length;
        }else{
            slideIndex--;              
        }
    }
    
    function nextSlide () {
        if(offset == width * (slides.length -1)){      
            offset = 0;                       
        }else{
            offset += width;  
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        
        if(slideIndex == slides.length){          
            slideIndex = 1;
        }else{
            slideIndex++;                          
        }
    }

    // arrow scroll to top 
    const scrollArrow = document.querySelector('.scroll-arrow');

    if (scrollArrow) scrollArrow.addEventListener('click', scrollTosection);

    window.addEventListener('scroll', showScrollArrow);

    function showScrollArrow () {
        let scrollTop = window.scrollY;

        if ( scrollTop > 1400) {
            scrollArrow.classList.add('_show-arrow');
        } else {
            scrollArrow.classList.remove('_show-arrow');
        }
    }

});
