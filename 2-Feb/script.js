function openCode(evt, langName) {
    const tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    const tablinks = document.getElementsByClassName("tab-link");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    const selectedTab = document.getElementById(langName);
    if (selectedTab) {
        selectedTab.style.display = "block";
        selectedTab.classList.add("active");
    }
    
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add("active");
    }
}

function copyCode(button) {
    const pre = button.parentElement.nextElementSibling;
    const code = pre.querySelector('code');
    const text = code.innerText;

    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.innerText;
        button.innerText = "Copied!";
        setTimeout(() => {
            button.innerText = originalText;
        }, 2000);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Initialize first tab
    const firstTab = document.querySelector(".tab-link");
    if (firstTab) {
        firstTab.click();
    }
});
