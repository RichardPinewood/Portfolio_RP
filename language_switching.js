document.addEventListener('DOMContentLoaded', () => {
    const languageDropdownItems = document.querySelectorAll('.dropdown-item');
    const languageDropdown = document.getElementById('languageDropdown');
    const currentLang = localStorage.getItem('language') || 'en';
    loadLanguage(currentLang);
    
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
