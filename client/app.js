class API {
    constructor(baseURL = 'http://localhost:8080') {
        this.baseURL = baseURL;
    }

    async get(endpoint) {
        const response = await fetch(`${this.baseURL}${endpoint}`);
        return response.json();
    }

    async post(endpoint, data) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    }
}

class App {
    constructor() {
        this.api = new API();
        this.navbar = null;
    }

    init() {
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }

        const navbarContainer = document.getElementById('navbar');
        if (navbarContainer) {
            this.navbar = new Navbar(navbarContainer);
            this.navbar.render();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

