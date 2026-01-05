// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const seanceLinks = document.querySelectorAll('.seance-link');
    const seanceContents = document.querySelectorAll('.seance-content');

    // Séances navigation
    function showSeance(seanceNumber) {
        // Hide all seance contents
        seanceContents.forEach(content => {
            content.classList.remove('active');
        });

        // Show selected seance
        const targetSeance = document.getElementById(`seance-${seanceNumber}`);
        if (targetSeance) {
            targetSeance.classList.add('active');
        }

        // Update active seance link
        seanceLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-seance') === seanceNumber) {
                link.classList.add('active');
            }
        });
    }

    // Function to show a specific section
    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show the selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });

        // If seances section is shown, show first seance
        if (sectionId === 'seances') {
            showSeance('1');
        }

        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Add click event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Add click event listeners to seance links
    seanceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const seanceNumber = this.getAttribute('data-seance');
            showSeance(seanceNumber);
        });
    });

    // Initialize: show Accueil section by default
    showSection('accueil');
});

