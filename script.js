document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. THEME MANAGER (DARK / LIGHT MODE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = themeToggleBtn.querySelector('.sun-icon');
    const moonIcon = themeToggleBtn.querySelector('.moon-icon');
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const setWordTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
            localStorage.setItem('theme', 'light');
        }
    };
    
    // Initial Setting
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        setWordTheme('dark');
    } else {
        setWordTheme('light');
    }
    
    // Toggle Listener
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            setWordTheme('light');
        } else {
            setWordTheme('dark');
        }
    });

    /* ==========================================================================
       2. HR ACCORDION ACCESSIBILITY & BEHAVIOR
       ========================================================================== */
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const isActive = accordionItem.classList.contains('active');
            
            // Close other items if desired (Optional - comment out if you want multiple open)
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== accordionItem) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                }
            });
            
            // Toggle current item
            if (isActive) {
                accordionItem.classList.remove('active');
                accordionContent.style.maxHeight = null;
            } else {
                accordionItem.classList.add('active');
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
            }
        });
    });

    /* ==========================================================================
       3. SEARCH FILTER FOR HR QUESTIONS
       ========================================================================== */
    const hrSearchInput = document.getElementById('hr-search');
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (hrSearchInput) {
        hrSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            accordionItems.forEach(item => {
                const headerText = item.querySelector('.accordion-header span').textContent.toLowerCase();
                const contentText = item.querySelector('.accordion-content p').textContent.toLowerCase();
                
                if (headerText.includes(query) || contentText.includes(query)) {
                    item.style.display = ''; // Reset display
                } else {
                    item.style.display = 'none'; // Hide
                }
            });
        });
    }

    /* ==========================================================================
       4. PRINT HOOK (PDF EXPORT TRIGGER)
       ========================================================================== */
    const printBtn = document.getElementById('print-btn');
    printBtn.addEventListener('click', () => {
        // Open all accordions before printing so they display in full in the PDF
        accordionItems.forEach(item => {
            item.classList.add('active');
            const content = item.querySelector('.accordion-content');
            content.style.maxHeight = 'none';
        });
        
        // Let UI update, then trigger print
        setTimeout(() => {
            window.print();
            
            // Reset accordions back to closed state post-print
            accordionItems.forEach(item => {
                item.classList.remove('active');
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = null;
            });
        }, 300);
    });
});
