class Navbar {
    constructor(container) {
        this.container = container;
        this.routes = [
            { name: 'Home', route: 'home', file: 'index.html' },
            { name: 'About', route: 'about', file: 'about.html' },
            { name: 'Login', route: 'login', file: 'login.html' }
        ];
    }

    getBasePath() {
        return './';
    }

    getLogoPath() {
        const path = window.location.pathname;
        const pathParts = path.split('/').filter(p => p);
        const htmlFileIndex = pathParts.findIndex(p => p.includes('.html'));
        
        if (htmlFileIndex > 0) {
            const depth = htmlFileIndex;
            return '../'.repeat(depth) + 'assets/logo.png';
        }
        
        return 'assets/logo.png';
    }

    getCurrentRoute() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop() || 'index.html';
        
        if (path === '/' || path === '/index.html' || fileName === 'index.html') {
            return 'home';
        }
        if (path.includes('about') || fileName === 'about.html') {
            return 'about';
        }
        if (path.includes('login') || fileName === 'login.html') {
            return 'login';
        }
        if (path.includes('register') || fileName === 'register.html') {
            return 'register';
        }
        return 'home';
    }

    updateActiveLink() {
        const currentRoute = this.getCurrentRoute();
        const navLinks = document.querySelectorAll('nav a[data-route]');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const routeAttr = link.getAttribute('data-route');
            if (routeAttr && routeAttr === currentRoute) {
                link.classList.add('active');
            }
        });
    }

    render() {
        const homePath = 'index.html';
        const aboutPath = 'about.html';
        const loginPath = 'login.html';
        const logoPath = this.getLogoPath();

        this.container.innerHTML = `
            <header class="bg-white shadow-sm animate-slide-in-down" style="height: 5vh;">
                <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-16">
                        <a href="${homePath}" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                            <img src="${logoPath}" alt="Therapeía Logo" class="h-8 w-8 object-contain" onerror="console.error('Failed to load logo from:', '${logoPath}'); this.style.display='none'">
                            <h1 class="text-2xl font-display font-bold text-gray-900">Therapeía</h1>
                        </a>
                        <div class="hidden md:flex space-x-8">
                            <a href="${homePath}" data-route="home" class="text-gray-700 hover:text-gray-900 transition-all duration-300">Home</a>
                            <a href="${aboutPath}" data-route="about" class="text-gray-700 hover:text-gray-900 transition-all duration-300">About</a>
                            <a href="${loginPath}" data-route="login" class="text-gray-700 hover:text-gray-900 transition-all duration-300">Login</a>
                        </div>
                    </div>
                </nav>
            </header>
        `;
        
        // Update active link after rendering
        setTimeout(() => this.updateActiveLink(), 0);
    }
}

