// Force scroll to top on page load/reload
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    // Second ensuring attempt after DOM is ready
    window.scrollTo(0, 0);

    // Some browsers need a tiny delay to override scroll position
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);

    /* -----------------------------------------------------
       FOOTNOTE SYSTEM
       ----------------------------------------------------- */

    // Footnote data - bilingual text for each footnote number
    const footnoteData = {
        '1': {
            en: 'Corrain, Lucia, & Pamela Gallicchio. “Semiotica plastica e interpretazione tematica. Per un\'analisi della parodia in pittura”. <i>E/C</i>, 13, 24 (2019): 1-14; De Sario, Pietro. <i>Ricerche sulla parodia in Aristofane</i>. PhD Thesis, Università Ca\' Foscari Venezia, 2017.',
            it: 'Corrain, Lucia, & Pamela Gallicchio. “Semiotica plastica e interpretazione tematica. Per un\'analisi della parodia in pittura”. <i>E/C</i>, 13, 24 (2019): 1-14; De Sario, Pietro. <i>Ricerche sulla parodia in Aristofane</i>. PhD Thesis, Università Ca\' Foscari Venezia, 2017.'
        },
        '2': {
            en: 'Garland, Ken. <i>First Things First</i>. Goodwin Press, 1964.',
            it: 'Garland, Ken. <i>First Things First</i>. Goodwin Press, 1964.'
        },
        '3': {
            en: 'Poynor, Rick. First Things First Revisited. <i>Emigre</i>, 51, 1999.',
            it: 'Poynor, Rick. First Things First Revisited. <i>Emigre</i>, 51, 1999.'
        },
        '4': {
            en: 'First Things First 2000, <i>Adbusters</i>, 58, 1999.',
            it: 'First Things First 2000, <i>Adbusters</i>, 58, 1999.'
        },
        '5': {
            en: 'Laranjo, Francisco. <i>Design as criticism: methods for a critical graphic design practice</i>. PhD Thesis, University of the Arts London, 2017.',
            it: 'Laranjo, Francisco. <i>Design as criticism: methods for a critical graphic design practice</i>. PhD Thesis, University of the Arts London, 2017.'
        },
        '6': {
            en: 'Cfr. Abdulla, Danah. <i>Design Otherwise: Transforming Design Education in the Arab Region</i>. Bloomsbury Visual Arts, 2025; Mareis, Claudia, & Nina Paim (eds.). <i>Design struggles: Intersecting histories, pedagogies, and perspectives</i>. Valiz, 2021.',
            it: 'Cfr. Abdulla, Danah. <i>Design Otherwise: Transforming Design Education in the Arab Region</i>. Bloomsbury Visual Arts, 2025; Mareis, Claudia, & Nina Paim (a c. di). <i>Design struggles: Intersecting histories, pedagogies, and perspectives</i>. Valiz, 2021.'
        },
        '7': {
            en: 'The term “autopoiesis” is used in a particularly relevant way by design historian Maddalena Dalla Mura in her essay “The Relationship of Graphic Designers with Exhibiting and Curating”. <i>Graphisme en France</i>, 24, 2018, pp. 28-41. Dalla Mura in turn takes up the use of the concept as it appears in Rob Giampietro, “School Days” in Blauvelt, Andrew & Lupton Ellen (eds.). <i>Graphic Design: Now in Production</i>, pp. 212-221 Walker Art Centre/Cooper-Hewitt, 2011.',
            it: 'Il termine “autopoiesi” è impiegato in modo particolarmente pertinente dalla storica del design Maddalena Dalla Mura nel saggio “The Relationship of Graphic Designers with Exhibiting and Curating”. <i>Graphisme en France</i>, 24, 2018,pp. 28-41. Dalla Mura riprende a sua volta l\'uso del concetto così come compare in Rob Giampietro, “School Days”, in Blauvelt, Andrew & Lupton, Ellen (eds.). <i>Graphic Design: Now in Production</i>, pp. 212-221 Walker Art Center/Cooper-Hewitt, 2011.'
        },
        '8': {
            en: '<a href="https://linedandunlined.com/archive/school-days/" target="_blank" rel="noopener noreferrer">https://linedandunlined.com/archive/school-days/</a>. Orig. in Blauvelt, Andrew & Lupton, Ellen. <i>Graphic Design: Now in Production</i>, pp. 212-221. Walker Art Center/Cooper-Hewitt, 2011. Giampietro, Rob. <i>School Days</i>. Lined & Unlined, 2012.',
            it: '<a href="https://linedandunlined.com/archive/school-days/" target="_blank" rel="noopener noreferrer">https://linedandunlined.com/archive/school-days/</a>. Orig. in Blauvelt, Andrew & Lupton, Ellen. <i>Graphic Design: Now in Production</i>, pp. 212-221. Walker Art Center/Cooper-Hewitt, 2011. Giampietro, Rob. <i>School Days</i>. Lined & Unlined, 2012.'
        },
        '9': {
            en: 'The quote is taken from a T-shirt designed by Afonso de Matos as part of his thesis project <i>Who Can Afford To Be Critical? What Can Criticality Afford?</i>, developed for the MA in Information Design at the Design Academy Eindhoven. The full text reads: “Inside of me there are two wolves... One is graduating from a critical design school; the other one is unemployed.',
            it: 'La citazione riprende la stampa di una maglietta realizzata da Afonso de Matos all\'interno del progetto di tesi <i>Who Can Afford To Be Critical? What Can Criticality Afford?</i>, sviluppato per il MA in Information Design della Design Academy Eindhoven. Il testo completo riporta “Inside of me there are two wolves... One is graduating from a critical design school; the other one is unemployed”.'
        },
        '10': {
            en: 'Van Toorn, Jan. “Deschooling and learning in design education.” In Frascara, Jorge. <i>User-Centred Graphic Design: Mass Communication And Social Change.</i> CRC Press, 1997, pp. 126-129.',
            it: 'Van Toorn, Jan. “Deschooling and learning in design education.” In Frascara, Jorge. <i>User-Centred Graphic Design: Mass Communication And Social Change.</i> CRC Press, 1997, pp. 126-129.'
        },
        '11': {
            en: 'Cfr. Lorusso, Silvio. “No Problem: Design School as Promise.” <i>Institute of Network Cultures,</i> 2020. <a href="https://networkcultures.org/entreprecariat/no-problem-design/" target="_blank" rel="noopener noreferrer">https://networkcultures.org/entreprecariat/no-problem-design/</a>.',
            it: 'Cfr. Lorusso, Silvio. “No Problem: Design School as Promise.” <i>Institute of Network Cultures,</i> 2020. <a href="https://networkcultures.org/entreprecariat/no-problem-design/" target="_blank" rel="noopener noreferrer">https://networkcultures.org/entreprecariat/no-problem-design/</a>.'
        },
        '12': {
            en: 'The quote refers to the documentary “Het nuove ontwerplandschap” (“The new design landscape” 2016) by Erwin Slegers, head of the graphic design department at HKU University of the Arts in Utrecht, the Netherlands. The film shows a series of conversations with professionals in the field focusing on possible new perspectives in design.',
            it: 'La citazione fa riferimento al documentario “Het nuove ontwerplandschap” (“Il nuovo paesaggio del design”, 2016) a cura di Erwin Slegers, capo di dipartimento di graphic design presso la HKU University of the Arts a Utrecht, in Olanda. Il film mostra una serie di conversazioni con professionistx del settore incentrate su possibili nuove prospettive del design.'
        },
        '13': {
            en: 'Salvia, Mattia. <i>Interregno. Iconografie del XXI secolo</i>. Nero, 2022.',
            it: 'Salvia, Mattia. <i>Interregno. Iconografie del XXI secolo</i>. Nero, 2022.'
        },
        '14': {
            en: 'Cfr. Piata, Anna. “When metaphor becomes a joke: Metaphor Journeys from political ads to internet memes”. <i>Journal of Pragmatics</i>, 106, 2016, pp. 39-56; Scott, Kate. “Memes as multimodal metaphors: a relevance theory analysis”. <i>Pragmatics and Cognition</i>, 28(2), 2021.',
            it: 'Cfr. Piata, Anna. “When metaphor becomes a joke: Metaphor Journeys from political ads to internet memes”. <i>Journal of Pragmatics</i>, 106, 2016, pp. 39-56; Scott, Kate. “Memes as multimodal metaphors: a relevance theory analysis”. <i>Pragmatics and Cognition</i>, 28(2), 2021.'
        },
        '15': {
            en: 'Nieubuurt, Joshua. Internet memes: Leaflet propaganda of the digital age. <i>Frontiers in Communication</i>, 5, 2021, pp.1-14. <a href="https://doi.org/10.3389/fcomm.2020.547065" target="_blank" rel="noopener noreferrer">https://doi.org/10.3389/fcomm.2020.547065</a>.',
            it: 'Nieubuurt, Joshua. Internet memes: Leaflet propaganda of the digital age. <i>Frontiers in Communication</i>, 5, 2021, pp.1-14. <a href="https://doi.org/10.3389/fcomm.2020.547065" target="_blank" rel="noopener noreferrer">https://doi.org/10.3389/fcomm.2020.547065</a>.'
        },
        '16': {
            en: 'Bühler, Melanie. Tortured Disney, False Truths and Conflicted Memes: Institutional Critique in the Age of Networked Capitalism. <i>Arts of the Working Class</i>, 2022. <a href="https://artsoftheworkingclass.org/text/tortured-disney-false-truths-and-conflicted-memes" target="_blank" rel="noopener noreferrer">https://artsoftheworkingclass.org/text/tortured-disney-false-truths-and-conflicted-memes</a>.',
            it: 'Bühler, Melanie. Tortured Disney, False Truths and Conflicted Memes: Institutional Critique in the Age of Networked Capitalism. <i>Arts of the Working Class</i>, 2022. <a href="https://artsoftheworkingclass.org/text/tortured-disney-false-truths-and-conflicted-memes" target="_blank" rel="noopener noreferrer">https://artsoftheworkingclass.org/text/tortured-disney-false-truths-and-conflicted-memes</a>.'
        },
        '17': {
            en: 'Pepi, Mike. The Meme Accounts Upending the Art World\'s Class System. <i>Frieze Magazine</i>, (211), 2020.',
            it: 'Pepi, Mike. The Meme Accounts Upending the Art World\'s Class System. <i>Frieze Magazine</i>, (211), 2020.'
        },
        '18': {
            en: 'Galip, Idil. Propaganda, Digital Diplomacy, Meme Wars: How Digital Confrontation Is Shaping the New World Order. In Ferrari, Aldo & Eleonora Tafuro Ambrosetti (eds.), <i>Multipolarity After Ukraine. Old Wine in New Bottles?</i>, pp. 95-112. Ledizioni LediPublishing, 2023.',
            it: 'Galip, Idil. Propaganda, Digital Diplomacy, Meme Wars: How Digital Confrontation Is Shaping the New World Order. In Ferrari, Aldo & Eleonora Tafuro Ambrosetti (a c. di), <i>Multipolarity After Ukraine. Old Wine in New Bottles?</i>, pp. 95-112. Ledizioni LediPublishing, 2023.'
        },
        '19': {
            en: 'The text refers to an image entitled “A typical interaction with Dank Lloyd Wright\'s collective” taken from the article: Comoglio, Giovanni. “Sono i meme la nuova frontiera delal critica in architettura?” <i>Domusweb</i>, 2020. <a href="https://www.domusweb.it/it/architettura/gallery/2020/07/09/meme-o-non-e-successo.html" target="_blank" rel="noopener noreferrer">https://www.domusweb.it/it/architettura/gallery/2020/07/09/meme-o-non-e-successo.html</a>.',
            it: 'Il testo si riferisce a un\'immagine intitolata “Una interazione tipo con il collettivo di Dank Lloyd Wright” tratta dall\'articolo: Comoglio, Giovanni. “Sono i meme la nuova frontiera della critica in architettura?” <i>Domusweb</i>, 2020. <a href="https://www.domusweb.it/it/architettura/gallery/2020/07/09/meme-o-non-e-successo.html" target="_blank" rel="noopener noreferrer">https://www.domusweb.it/it/architettura/gallery/2020/07/09/meme-o-non-e-successo.html</a>.'
        },
        '20': {
            en: 'Lorusso, Silvio. <i>What Design Can\'t Do. Essays on Design and Disillusion</i>. Set Margins\', 2023.',
            it: 'Lorusso, Silvio. <i>What Design Can\'t Do. Essays on Design and Disillusion</i>. Set Margins\', 2023.'
        },
        '21': {
            en: 'Lorusso, Silvio. May the Bridges We Burn Light the Way”: Five Questions to a Dutch Design School\'s Meme Page. Interview with @wdka.teachermemes. <i>Other Worlds</i>, 2021. <a href="https://buttondown.com/otherworlds/archive/ow-3-may-the-bridges-we-burn-light-the-way-five/" target="_blank" rel="noopener noreferrer">https://buttondown.com/otherworlds/archive/ow-3-may-the-bridges-we-burn-light-the-way-five/</a>.',
            it: 'Lorusso, Silvio. May the Bridges We Burn Light the Way”: Five Questions to a Dutch Design School\'s Meme Page. Interview with @wdka.teachermemes. <i>Other Worlds</i>, 2021. <a href="https://buttondown.com/otherworlds/archive/ow-3-may-the-bridges-we-burn-light-the-way-five/" target="_blank" rel="noopener noreferrer">https://buttondown.com/otherworlds/archive/ow-3-may-the-bridges-we-burn-light-the-way-five/</a>.'
        }
    };

    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'footnote-popup';
    popup.innerHTML = `
        <div class="footnote-popup-content">
            <button class="footnote-popup-close" aria-label="Close">×</button>
            <div class="footnote-popup-number"></div>
            <p class="footnote-popup-text"></p>
        </div>
    `;
    document.body.appendChild(popup);

    // Get elements
    const closeBtn = popup.querySelector('.footnote-popup-close');
    const numberEl = popup.querySelector('.footnote-popup-number');
    const textEl = popup.querySelector('.footnote-popup-text');

    // Function to open popup
    function openFootnote(number, lang, linkElement) {
        // Use the passed language, or fallback to English if not provided
        const safeLang = lang || 'en';

        // Retrieve text based on number and language
        let text = '';
        if (footnoteData[number]) {
            text = footnoteData[number][safeLang] || footnoteData[number]['en'] || 'Text not available.';
        } else {
            text = `Testo segnaposto per la nota ${number}.`;
        }

        numberEl.textContent = number; // Just show number like "1", "2"
        textEl.innerHTML = text; // Use innerHTML to allow simple formatting if needed

        // Add language class for styling
        popup.classList.remove('lang-en', 'lang-it');
        popup.classList.add(`lang-${safeLang}`);

        // Position popup next to the footnote number
        if (linkElement) {
            const rect = linkElement.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

            // Mobile check (matching CSS breakpoint)
            if (window.innerWidth <= 768) {
                // Position below the text, centered horizontally (approx 10vw margin)
                popup.style.position = 'absolute';
                popup.style.left = '10vw'; 
                popup.style.top = `${rect.bottom + scrollTop + 10}px`;
            } else {
                // Desktop: Position to the right of the footnote number
                popup.style.position = 'absolute';
                popup.style.left = `${rect.right + scrollLeft + 10}px`; 
                popup.style.top = `${rect.top + scrollTop}px`;
            }
        }

        popup.classList.add('active');
    }

    // Function to close popup
    function closeFootnote() {
        popup.classList.remove('active');
    }

    // Track which footnote is currently open
    let currentOpenFootnote = null;

    // Add click handlers to all footnote links
    document.querySelectorAll('.footnote').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent document click from immediately closing

            const number = link.textContent.trim();

            // Determine language based on parent container
            let lang = 'en'; // Default
            if (link.closest('.lang-it')) {
                lang = 'it';
            } else if (link.closest('.lang-en')) {
                lang = 'en';
            }

            // Toggle behavior: if clicking the same footnote, close it
            if (currentOpenFootnote === link && popup.classList.contains('active')) {
                closeFootnote();
                currentOpenFootnote = null;
            } else {
                // Open the clicked footnote
                currentOpenFootnote = link;
                openFootnote(number, lang, link);
            }
        });
    });

    // Close footnote when clicking outside
    document.addEventListener('click', (e) => {
        // Check if click is outside both the popup and any footnote link
        if (!popup.contains(e.target) && !e.target.closest('.footnote')) {
            if (popup.classList.contains('active')) {
                closeFootnote();
                currentOpenFootnote = null;
            }
        }
    });

    // Close on close button click (still useful for accessibility)
    closeBtn.addEventListener('click', closeFootnote);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeFootnote();
            currentOpenFootnote = null;
        }
    });

    /* -----------------------------------------------------
           SCROLL TO TOP
           ----------------------------------------------------- */
    const mybutton = document.getElementById("scroll_top");
    const menuContainer = document.querySelector(".hamburger-menu");

    if (mybutton) {
        window.onscroll = function () {
            scrollFunction();
        };
    }

    function scrollFunction() {
        // Calculate the threshold: when user scrolls past the hero section
        // Hero section is 100vh, so we show elements when scrolled past that
        const heroHeight = window.innerHeight; // 100vh
        const scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;

        // Show menu and scroll-to-top after hero section
        if (scrollPosition > heroHeight) {
            if (menuContainer) {
                menuContainer.classList.add("visible");
            }

            mybutton.style.display = "block";
            // Use setTimeout to allow display:block to apply before changing opacity for transition
            setTimeout(() => {
                mybutton.style.opacity = "1";
            }, 10);
        } else {
            if (menuContainer) {
                menuContainer.classList.remove("visible");
            }

            mybutton.style.opacity = "0";
            // Wait for transition to finish before hiding
            setTimeout(() => {
                if (scrollPosition <= heroHeight) {
                    mybutton.style.display = "none";
                }
            }, 300);
        }
    }

    window.topFunction = function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    /* -----------------------------------------------------
       HAMBURGER MENU
       ----------------------------------------------------- */
    const menuToggle = document.querySelector(".menu-toggle");
    const menuLinks = document.querySelectorAll(".menu-link");

    if (menuToggle && menuContainer) {
        menuToggle.addEventListener("click", () => {
            menuContainer.classList.toggle("open");
        });
    }

    menuLinks.forEach((link) => {
        link.addEventListener("click", () => {
            menuContainer.classList.remove("open");
        });
    });
});

