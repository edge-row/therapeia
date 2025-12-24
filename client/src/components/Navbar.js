class Navbar {
    constructor(container) {
        this.container = container;
        this.routes = [
            { name: 'Home', route: 'home', file: 'index.html' },
            { name: 'About', route: 'about', file: 'src/pages/about.html' }
        ];
    }

    getBasePath() {
        const path = window.location.pathname;
        if (path.includes('/src/pages/')) {
            return '../../';
        }
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

    render() {
        const basePath = this.getBasePath();
        const homePath = basePath === '../../' ? '../../index.html' : 'index.html';
        const aboutPath = basePath === '../../' ? 'about.html' : 'src/pages/about.html';
        const logoPath = this.getLogoPath();

        console.log('Logo path:', logoPath, 'Current path:', window.location.pathname);

        this.container.innerHTML = `
            <header class="bg-white shadow-sm" style="height: 5vh;">
                <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-16">
                        <div class="flex items-center space-x-3">
                            <img src="${logoPath}" alt="Therapeía Logo" class="h-8 w-8 object-contain" onerror="console.error('Failed to load logo from:', '${logoPath}'); this.style.display='none'">
                            <h1 class="text-2xl font-display font-bold text-gray-900">Therapeía</h1>
                        </div>
                        <div class="hidden md:flex space-x-8">
                            <a href="${homePath}" data-route="home" class="text-gray-700 hover:text-gray-900">Home</a>
                            <a href="${aboutPath}" data-route="about" class="text-gray-700 hover:text-gray-900">About</a>
                        </div>
                    </div>
                </nav>
            </header>
        `;
    }
}

