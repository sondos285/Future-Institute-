document.addEventListener("DOMContentLoaded", () => {

    const navLinks = document.querySelectorAll("nav ul li a, .btn-main");
    
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            
            if (targetId.startsWith("#")) {
                e.preventDefault(); 
                
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerHeight = document.querySelector("header").offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    const animatedElements = document.querySelectorAll(".container, .office-box");
    
    const observerOptions = {
        root: null, 
        threshold: 0.15, 
        rootMargin: "0px"
    };

    const appearanceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);


    animatedElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(40px)";
        element.style.transition = "all 0.6s ease-out";
        appearanceObserver.observe(element);
    });

    const courseButtons = document.querySelectorAll(".course-card button, .course-card .btn");

    courseButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            
            const courseTitle = button.closest(".course-card").querySelector("h3")?.innerText || "هذا الكورس";
            
            const alertBox = document.createElement("div");
            alertBox.innerHTML = `
                <div style="font-size: 45px; margin-bottom: 12px; color: #007bff;">👏✨</div>
                <p style="margin: 0; font-weight: bold; font-size: 18px; color: #004085;">أحسنت الاختيار!</p>
                <p style="margin: 8px 0 0 0; color: #495057; font-size: 15px;">لقد اخترت كورس: <span style="color: #007bff; font-weight: bold;">${courseTitle}</span></p>
            `;

            Object.assign(alertBox.style, {
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(0.7)",
                backgroundColor: "#ffffff", 
                border: "3px solid #007bff",
                padding: "25px 45px",
                borderRadius: "16px",
                boxShadow: "0px 12px 35px rgba(0, 123, 255, 0.25)",   
                textAlign: "center",
                zIndex: "9999",
                direction: "rtl",
                fontFamily: "sans-serif",
                opacity: "0",
                transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"    
            });

            
            const overlay = document.createElement("div");
            Object.assign(overlay.style, {
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 32, 96, 0.3)", // خلفية داكنة مائلة للأزرق الشفاف
                zIndex: "9998",
                opacity: "0",
                transition: "opacity 0.3s ease-in-out"
            });

            document.body.appendChild(overlay);
            document.body.appendChild(alertBox);

            
            setTimeout(() => {
                alertBox.style.opacity = "1";
                alertBox.style.transform = "translate(-50%, -50%) scale(1)";
                overlay.style.opacity = "1";
            }, 10);

            setTimeout(() => {
                alertBox.style.opacity = "0";
                alertBox.style.transform = "translate(-50%, -50%) scale(0.7)";
                overlay.style.opacity = "0";
                
                setTimeout(() => {
                    alertBox.remove();
                    overlay.remove();
                }, 300);
            }, 3000);
        });
    });
});
