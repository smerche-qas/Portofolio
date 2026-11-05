const pieces = [...document.querySelectorAll(".piece")];
        const buttons = [...document.querySelectorAll(".filters button")];

        // Swap the striped placeholder for the real image once it loads
        pieces.forEach(p => {
            const art = p.querySelector(".art"), img = art.querySelector("img");
            const ok = () => art.classList.add("loaded");
            const fail = () => art.classList.add("empty");
            if (img.complete) (img.naturalWidth ? ok : fail)();
            img.addEventListener("load", ok);
            img.addEventListener("error", fail);
        });

        // Filtering
        buttons.forEach(b => b.addEventListener("click", () => {
            buttons.forEach(x => x.setAttribute("aria-pressed", x === b));
            pieces.forEach(p => p.hidden = b.dataset.filter !== "all" && p.dataset.cat !== b.dataset.filter);
        }));

        // Lightbox
        const lb = document.getElementById("lightbox"), lbImg = document.getElementById("lb-img");
        let current = 0, opener = null;
        const visible = () => pieces.filter(p => !p.hidden);

        function show(i) {
            const list = visible(); current = (i + list.length) % list.length;
            const p = list[current];
            lbImg.src = p.querySelector("img").src;
            lbImg.alt = p.querySelector("img").alt;
            document.getElementById("lb-title").textContent = p.querySelector("h2").textContent;
            document.getElementById("lb-meta").textContent = p.querySelector("figcaption p").textContent;
        }
        function open(p) {
            opener = p.querySelector(".frame");
            show(visible().indexOf(p));
            lb.classList.add("open"); document.body.style.overflow = "hidden";
            lb.querySelector(".lb-close").focus();
        }
        function close() {
            lb.classList.remove("open"); document.body.style.overflow = "";
            if (opener) opener.focus();
        }
        pieces.forEach(p => p.querySelector(".frame").addEventListener("click", () => open(p)));
        lb.querySelector(".lb-close").addEventListener("click", close);
        lb.querySelector(".lb-prev").addEventListener("click", () => show(current - 1));
        lb.querySelector(".lb-next").addEventListener("click", () => show(current + 1));
        lb.addEventListener("click", e => { if (e.target === lb) close(); });
        document.addEventListener("keydown", e => {
            if (!lb.classList.contains("open")) return;
            if (e.key === "Escape") close();
            if (e.key === "ArrowLeft") show(current - 1);
            if (e.key === "ArrowRight") show(current + 1);
        });