window.addEventListener('load', () => {
    const loader = document.getElementById('hacker-loader');
    const terminal = document.getElementById('terminal-content');

    // HANG BETÖLTÉSE
    const typeSound = new Audio('typing3.mp3'); 
    typeSound.volume = 0.3; // Hangerő (0.0 - 1.0) - ne legyen túl hangos!
    typeSound.playbackRate = 2.0; // Kicsit gyorsítunk a hangon, hogy techisebb legyen

    // SESSION ELLENŐRZÉS (Hogy csak egyszer fusson)
    if (sessionStorage.getItem('introPlayed')) {
        loader.style.display = 'none';
        return; 
    }

   const messages = [
    "CYBERSHIELD Kernel v4.1.0-release [LTS]",
    "Rendszer-indítási idő: " + new Date().toLocaleString('hu-HU'),
    " ",
    "CPU ellenőrzése: AMD Ryzen 5 2026-X @ 5.4GHz... OK",
    "Memória ellenőrzése: 8192MB ECC DDR4... OK",
    "Lokalizált alrendszerek inicializálása (HU_hu)... Kész.",
    " ",
    "C:\\Users\\Admin-PC> start security_audit.sh",
    "--------------------------------------------------",
    "MEM_SCAN: 0x0045FF12 elemzése... Rejtett folyamat azonosítva.",
    "NET_MAP: Helyi hálózati csomópontok feltérképezése [192.168.0.1/24]",
    "NODE_01: Aktív [Tűzfal észlelve]",
    "NODE_01: auth_module_v2 megkerülése... [8%... 45%... 89%]",
    "NODE_01: HOZZÁFÉRÉS MEGADVA. Token: 4f82-a912-bc03",
    " ",
    "TŰZFAL_ÁLLAPOT: Megszállva.",
    "TITKOSÍTÁS: AES-256 kézfogás létrejött.",
    "CSOMAG_SZIFFROZÓ: Bejövő forgalom rögzítése...",
    "SEBZHETŐSÉG_VIZSGÁLAT: 80-as, 443-as port nyitva. Injektálás...",
    " ",
    "ROOT_HOZZÁFÉRÉS: 'Admin_Root' felhasználó azonosítva.",
    "ÁLLAPOT: Rendszer sikeresen feltörve.",
    "--------------------------------------------------",
    "Betöltés befejezése: CyberShield Interfész v2026",
    "INDÍTÁS..."
];

    let lineIndex = 0;
    let charIndex = 0;

    function typeChar() {
        if (lineIndex < messages.length) {
            if (charIndex === 0) {
                terminal.innerHTML += "<br>> ";
            }

            terminal.innerHTML += messages[lineIndex].charAt(charIndex);
            loader.scrollTop = loader.scrollHeight;
            
            // --- HANG LEJÁTSZÁSA ---
            // Csak minden 2. vagy 3. karakternél szólaljon meg, hogy ne legyen "zajkása"
            // és csak akkor, ha a böngésző engedi (try-catch blokk a hibák ellen)
            if (charIndex % 3 === 0) { 
                const soundClone = typeSound.cloneNode(); // Többszörözés, hogy átfedésben is szólhasson
                soundClone.volume = 0.2;
                soundClone.play().catch(error => {
                    // Ha a böngésző letiltja az autoplay-t, itt némán elkapjuk a hibát
                    console.log("A böngésző letiltotta a hangot (Autoplay Policy).");
                });
            }

            charIndex++;

            if (charIndex < messages[lineIndex].length) {
                // Gyors gépelés
                setTimeout(typeChar, Math.random() * 2 + 1); 
            } else {
                charIndex = 0;
                lineIndex++;
                // Sor végén szünet
                setTimeout(typeChar, 50); 
            }
        } else {
            // VÉGE
            sessionStorage.setItem('introPlayed', 'true');
            setTimeout(() => {
                loader.classList.add('loader-fade-out');
                setTimeout(() => loader.style.display = 'none', 800);
            }, 1200);
        }
    }

    // Indítás
    setTimeout(typeChar, 200);

});
