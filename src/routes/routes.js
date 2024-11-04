const routes = {
    home: 'home/home.html',
    projects: 'projects/projects.html'
};

function loadContent() {
    const hash = window.location.hash.slice(1) || 'home';
    const route = routes[hash];

    if (route) {
        fetch(route)
            .then(response => response.text())
            .then(html => {
                document.getElementById('content').innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading page:', error);
                document.getElementById('content').innerHTML = '<p>Page not found.</p>';
            });
    }
}

// Load content on initial page load
window.addEventListener('load', loadContent);

// Update content when hash changes
window.addEventListener('hashchange', loadContent);