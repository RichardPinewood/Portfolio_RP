document.addEventListener('DOMContentLoaded', () => {
    const languageDropdownItems = document.querySelectorAll('.dropdown-item');
    const languageDropdown = document.getElementById('languageDropdown');
    const currentLang = localStorage.getItem('language') || 'en';
    loadLanguage(currentLang);
    
    const style = document.createElement('style');
    style.textContent = `
        .dropdown-toggle[aria-expanded="true"] {
            color: transparent !important;
        }
        .dropdown-toggle[aria-expanded="true"]:after {
            color: #00CCFF !important;
        }
    `;
    document.head.appendChild(style);

    languageDropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();  
            const selectedLang = e.target.getAttribute('data-lang');
            localStorage.setItem('language', selectedLang);
            loadLanguage(selectedLang);
            
        });
    });

    function loadLanguage(language) {
        const langFile = language === 'en' ? 'english.json' : 'portuguese.json';
        fetch(langFile)
            .then(response => response.json())
            .then(data => updateContent(data))
            .catch(error => console.error('Error loading language file:', error));
    }

    function updateContent(translations) {
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[key]) {
                if (element.tagName === "INPUT" && element.hasAttribute("placeholder")) {
                    element.setAttribute("placeholder", translations[key]); 
                } else {
                    element.textContent = translations[key]; 
                }
            }
        });

        const downloadButton = document.querySelector('[data-key="downloadCV"]');
        if (downloadButton && translations['cvLink']) {
            downloadButton.href = translations['cvLink'];
        }
    }
});
