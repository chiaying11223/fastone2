// main_c.js - Category Tab Filtering Logic for Version C

document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab-btn");
    const cards = document.querySelectorAll(".game-card");

    if (tabs.length > 0 && cards.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                // 1. Remove active class from all tabs
                tabs.forEach(t => t.classList.remove("active"));
                // 2. Add active class to clicked tab
                tab.classList.add("active");

                const category = tab.getAttribute("data-category");

                // 3. Filter Cards
                cards.forEach(card => {
                    const cardCat = card.getAttribute("data-category");

                    if (category === "all" || cardCat === category) {
                        card.style.display = "block";
                        // Subtle fade-in animation
                        card.style.opacity = "0";
                        setTimeout(() => {
                            card.style.opacity = "1";
                            card.style.transform = "translateY(0)";
                        }, 50);
                    } else {
                        card.style.display = "none";
                        card.style.transform = "translateY(10px)";
                    }
                });
            });
        });
    }

    // =========================================
    // 1. GAME DATA DICTIONARY
    // =========================================
    const gameDetails = {
        "LUCKY JAGUAR": {
            desc: "Enter the jungle with the Jaguar and seek hidden Aztec gold.",
            maxWin: "8,888 X", volatility: "HIGH 🌶️🌶️🌶️🌶️", type: "Slot",
            features: ["● Aztec temple free games", "● Jaguar Roar multiplier", "● Cascading wins mechanism"],
            paylines: "243 WAYS", publishTime: "2024.08",
            gallery: [
                "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600",
                "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=600"
            ]
        },
        "MONEY POT": {
            desc: "Spin the golden pot for a chance to trigger the progressive jackpot.",
            maxWin: "10,000 X", volatility: "LOW-MED 🌶️🌶️", type: "Slot",
            features: ["● 3x3 reels, 3 paylines", "● God of Wealth feature", "● Lock&Respin"],
            paylines: "3 LINES", publishTime: "2024.10",
            gallery: [
                "https://images.unsplash.com/photo-1518893883960-45c65b4f7943?q=80&w=600",
                "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?q=80&w=600"
            ]
        },
        "FORTUNE ZOMBIE": {
            desc: "Survive the apocalypse! Shoot zombie bosses to win big prizes.",
            maxWin: "500 X", volatility: "MEDIUM 🌶️🌶️🌶️", type: "Fishing",
            features: ["● Weapon drops mechanism", "● Kill Boss score multiplier", "● Special laser weapon"],
            paylines: "Not Applicable", publishTime: "2024.09",
            gallery: [
                "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600",
                "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=600"
            ]
        },
        "TEXAS HOLD'EM": {
            desc: "Ultimate Texas Hold'em. Battle one-on-one with the dealer.",
            maxWin: "500 X", volatility: "MEDIUM 🌶️🌶️🌶️", type: "Card",
            features: ["● 1-on-1 gameplay with dealer", "● Live tension peaking", "● Side-bet bonuses payout"],
            paylines: "Not Applicable", publishTime: "2024.11",
            gallery: [
                "https://images.unsplash.com/photo-1518893883960-45c65b4f7943?q=80&w=600",
                "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?q=80&w=600"
            ]
        }
    };

    // =========================================
    // 2. DEMO OVERLAY INTERACTIONS
    // =========================================
    const demoOverlay = document.getElementById("demoOverlay");
    const demoBackBtn = document.getElementById("demoBackBtn");
    const demoStartBtn = document.getElementById("demoStartBtn");
    const demoStartOverlay = document.getElementById("demoStartOverlay");
    const interactiveArea = document.getElementById("interactiveArea");
    const spinBtn = document.getElementById("spinBtn");
    const winMessage = document.getElementById("winMessage");
    const gameFrame = document.getElementById("gameFrame");
    const playButtons = document.querySelectorAll(".btn-play");

    playButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".game-card");
            const title = card.querySelector("h3").innerText.trim().toUpperCase();
            const imgSrc = card.querySelector("img").src;
            const data = gameDetails[title];

            // Populate Info
            document.getElementById("demoGameTitle").innerText = title;
            document.getElementById("demoGameTitleFrame").innerText = title;
            document.getElementById("demoGameBanner").src = imgSrc;
            document.getElementById("demoGameLogo").src = imgSrc;

            if (data) {
                document.getElementById("demoGameMaxWin").innerText = data.maxWin;
                document.getElementById("demoGameVolatility").innerText = data.volatility.split(" ")[0];
                document.getElementById("demoGameType").innerText = data.type;
                document.getElementById("demoSpecs").innerHTML = data.features.join("<br>");
                document.getElementById("demoPaylines").innerText = data.paylines;
                document.getElementById("demoPublishTime").innerText = data.publishTime;

                // Gallery
                const galleryGrid = document.querySelector(".gallery-grid");
                galleryGrid.innerHTML = data.gallery.map((img, idx) => `
                    <div class="gallery-item" onclick="openLightbox(${idx})">
                        <img src="${img}" alt="Screen ${idx+1}">
                    </div>
                `).join("");
                window.currentGallery = data.gallery;
            }

            // Reset Sub-views
            demoStartOverlay.style.display = "flex";
            interactiveArea.style.display = "none";
            winMessage.innerText = "";

            // Show Overlay
            demoOverlay.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    // Close Demo
    demoBackBtn.addEventListener("click", () => {
        demoOverlay.classList.remove("active");
        document.body.style.overflow = "auto";
        gameFrame.classList.remove("fullscreen-frame");
    });

    // Start Interactive Mode
    demoStartBtn.addEventListener("click", () => {
        demoStartOverlay.style.display = "none";
        interactiveArea.style.display = "flex";
    });

    // Fullscreen Toggle
    document.getElementById("frameFsBtn").addEventListener("click", (e) => {
        e.stopPropagation();
        gameFrame.classList.toggle("fullscreen-frame");
    });

    // Slot Interaction
    const emojis = ["🍒", "🍋", "🔔", "⭐", "💎", "7️⃣"];
    let spinning = false;

    spinBtn.addEventListener("click", () => {
        if (spinning) return;
        spinning = true;
        winMessage.innerText = "Spinning...";
        const reels = [document.getElementById("reel1"), document.getElementById("reel2"), document.getElementById("reel3")];
        
        const interval = setInterval(() => {
            reels.forEach(r => r.innerText = emojis[Math.floor(Math.random() * emojis.length)]);
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            spinning = false;
            const res = [emojis[Math.floor(Math.random() * emojis.length)], emojis[Math.floor(Math.random() * emojis.length)], emojis[Math.floor(Math.random() * emojis.length)]];
            reels.forEach((r, i) => r.innerText = res[i]);

            if (res[0] === res[1] && res[1] === res[2]) winMessage.innerText = "BIG WIN! 🎉";
            else if (res[0] === res[1] || res[1] === res[2] || res[0] === res[2]) winMessage.innerText = "Small Win! 👍";
            else winMessage.innerText = "Try again!";
        }, 1500);
    });

    // =========================================
    // 3. LIGHTBOX LOGIC
    // =========================================
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    let currentIdx = 0;

    window.openLightbox = (index) => {
        currentIdx = index;
        lightboxImg.src = window.currentGallery[currentIdx];
        lightbox.classList.add("active");
    };

    document.getElementById("closeLightbox").addEventListener("click", () => lightbox.classList.remove("active"));
    document.getElementById("lightboxPrev").addEventListener("click", () => {
        currentIdx = (currentIdx - 1 + window.currentGallery.length) % window.currentGallery.length;
        lightboxImg.src = window.currentGallery[currentIdx];
    });
    document.getElementById("lightboxNext").addEventListener("click", () => {
        currentIdx = (currentIdx + 1) % window.currentGallery.length;
        lightboxImg.src = window.currentGallery[currentIdx];
    });

});
