// Navigation functionality
document.addEventListener('DOMContentLoaded', function () {
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
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Add click event listeners to seance links
    seanceLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const seanceNumber = this.getAttribute('data-seance');
            showSeance(seanceNumber);
        });
    });

    // Initialize: show Accueil section by default
    showSection('accueil');

    // Mind Map Functionality
    const mindMapData = {
        central: {
            title: "Communication",
            icon: "fas fa-comments"
        },
        branches: [
            {
                id: "interpersonnelle",
                title: "Communication\ninterpersonnelle",
                icon: "fas fa-handshake",
                content: {
                    title: "Communication Interpersonnelle",
                    sections: [
                        {
                            title: "Fondamentaux",
                            points: ["Écoute active", "Reformulation", "Empathie", "Gestion de conflit", "Communication relationnelle"]
                        },
                        {
                            title: "Outils d'Analyse",
                            points: ["Matrice d’identité (Dilts): Environnement, Comportements, Capacités, Croyances, Mission", "Quadrant d’Ofman: Qualité, Piège, Défi, Allergie"]
                        },
                        {
                            title: "Postures & Assertivité",
                            points: ["Postures: Passif, Agressif, Manipulateur, Assertif", "Dire 'oui/non' clairement", "Formules: « Je ressens… », « Je propose… »"]
                        },
                        {
                            title: "Obstacles",
                            points: ["Jugements / préjugés", "Manque d’écoute", "Émotions non gérées", "Bruit / mauvais canal"]
                        }
                    ]
                }
            },
            {
                id: "intrapersonnelle",
                title: "Communication\nintrapersonnelle",
                icon: "fas fa-brain",
                content: {
                    title: "Communication Intrapersonnelle",
                    sections: [
                        {
                            title: "Dialogue intérieur",
                            points: ["Pensées", "Émotions", "Résilience"]
                        },
                        {
                            title: "Mini outils",
                            points: ["Reformulation interne", "Gestion du stress"]
                        }
                    ]
                }
            },
            {
                id: "excellence",
                title: "La matrice de\nl’excellence",
                icon: "fas fa-star",
                content: {
                    title: "La Matrice de l’Excellence",
                    sections: [
                        {
                            title: "Matrice de l’excellence",
                            points: ["Savoir (Connaissances)", "Savoir-faire (Compétences)", "Savoir-être (Attitudes)", "Objectif: progresser et performer"]
                        },
                        {
                            title: "Comportements",
                            points: ["Microcomportement", "Macrocomportement", "Réactions observables", "Lien direct avec l’impact relationnel"]
                        },
                        {
                            title: "Actions",
                            points: ["Proaction: prévenir / anticiper", "Réaction: subir / répondre à chaud", "Action: Agir concrètement"]
                        }
                    ]
                }
            },
            {
                id: "softskills",
                title: "Soft skills",
                icon: "fas fa-shapes",
                content: {
                    title: "Soft Skills & Compétences",
                    sections: [
                        {
                            title: "Compétences du 21ᵉ siècle",
                            points: ["Communication", "Collaboration", "Esprit critique", "Créativité", "Adaptabilité"]
                        },
                        {
                            title: "Index de computation",
                            points: ["Analyser : charge / effort mental", "Complexité des messages", "Clarté & simplification"]
                        }
                    ]
                }
            },
            {
                id: "professionnelle",
                title: "Communication\nprofessionnelle",
                icon: "fas fa-briefcase",
                content: {
                    title: "Communication Professionnelle",
                    sections: [
                        {
                            title: "Gestion d’équipe",
                            points: ["Rôles & coopération", "Feedback constructif", "Objectifs communs", "Lien avec l’excellence"]
                        },
                        {
                            title: "Situations difficiles (Patron abusif)",
                            points: ["Poser des limites", "Rester factuel", "Documenter / demander soutien", "Utiliser l’assertivité"]
                        }
                    ]
                }
            }
        ]
    };

    function initMindMap() {
        const container = document.getElementById('mind-map-container');
        const connectionsSvg = document.querySelector('.mind-map-connections');
        const detailsPanel = document.getElementById('mind-map-details');
        const detailsTitle = document.getElementById('details-title');
        const detailsBody = document.getElementById('details-body');
        const closeBtn = document.getElementById('close-details');

        if (!container) return;

        // Clear existing
        container.innerHTML = '';
        connectionsSvg.innerHTML = '';

        // Create Central Node
        const centralNode = document.createElement('div');
        centralNode.className = 'node central-node';
        centralNode.innerHTML = `
            <i class="${mindMapData.central.icon}"></i>
            <span>${mindMapData.central.title}</span>
        `;
        container.appendChild(centralNode);

        // Position Logic
        const radius = 220; // Distance from center
        const startAngle = -90; // Start at top
        const totalBranches = mindMapData.branches.length;
        const angleStep = 360 / totalBranches;

        mindMapData.branches.forEach((branch, index) => {
            const angle = startAngle + (index * angleStep);
            const radian = (angle * Math.PI) / 180;

            // Calculate percentage positions for responsiveness
            const x = 50 + (Math.cos(radian) * 35); // 35% from center
            const y = 50 + (Math.sin(radian) * 35); // 35% from center

            const node = document.createElement('div');
            node.className = 'node branch-node';
            node.innerHTML = `
                <i class="${branch.icon}"></i>
                <span>${branch.title.replace(/\n/g, '<br>')}</span>
            `;

            // Set position
            node.style.left = `${x}%`;
            node.style.top = `${y}%`;

            // Add interaction
            node.addEventListener('mouseenter', () => {
                showDetails(branch);
                highlightNode(node);
                highlightConnection(index);
            });

            node.addEventListener('mouseleave', () => {
                resetConnections();
            });

            container.appendChild(node);

            // Create Line
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('class', 'connection-line');
            line.setAttribute('data-index', index);
            connectionsSvg.appendChild(line);
        });

        // Update lines function
        function updateLines() {
            if (window.innerWidth <= 968) return; // Don't draw lines on mobile/vertical view

            const centralRect = centralNode.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            const centerX = centralRect.left + centralRect.width / 2 - containerRect.left;
            const centerY = centralRect.top + centralRect.height / 2 - containerRect.top;

            const branchNodes = document.querySelectorAll('.branch-node');
            const lines = document.querySelectorAll('.connection-line');

            branchNodes.forEach((node, index) => {
                const nodeRect = node.getBoundingClientRect();
                const nodeX = nodeRect.left + nodeRect.width / 2 - containerRect.left;
                const nodeY = nodeRect.top + nodeRect.height / 2 - containerRect.top;

                const line = lines[index];
                if (line) {
                    line.setAttribute('x1', centerX);
                    line.setAttribute('y1', centerY);
                    line.setAttribute('x2', nodeX);
                    line.setAttribute('y2', nodeY);
                }
            });
        }

        // Show details function
        function showDetails(branch) {
            detailsTitle.innerHTML = `<i class="${branch.icon}"></i> ${branch.content.title}`;

            let html = '<div class="details-grid">';
            branch.content.sections.forEach(section => {
                html += `
                    <div class="detail-card">
                        <h4>${section.title}</h4>
                        <ul>
                            ${section.points.map(point => `<li>${point}</li>`).join('')}
                        </ul>
                    </div>
                `;
            });
            html += '</div>';

            detailsBody.innerHTML = html;
            detailsPanel.classList.remove('hidden');

            // Scroll to details
            // detailsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        function highlightNode(activeNode) {
            document.querySelectorAll('.branch-node').forEach(n => n.classList.remove('active'));
            activeNode.classList.add('active');
        }

        function highlightConnection(index) {
            const lines = document.querySelectorAll('.connection-line');
            if (lines[index]) lines[index].classList.add('active');
        }

        function resetConnections() {
            document.querySelectorAll('.connection-line').forEach(l => l.classList.remove('active'));
        }

        // Close button
        closeBtn.addEventListener('click', () => {
            detailsPanel.classList.add('hidden');
            document.querySelectorAll('.branch-node').forEach(n => n.classList.remove('active'));
        });

        // Initialize lines
        // Wait for layout
        setTimeout(updateLines, 100);
        window.addEventListener('resize', updateLines);

        // Also update lines when tab becomes visible (in case it was hidden)
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateLines();
            }
        });
        observer.observe(document.getElementById('carte-mentale'));
    }

    initMindMap();
});

