// Hero Images Dynamic Implementation
// Fetches images from Are.na channel and displays them with pop-up animation

class HeroImages {
    constructor() {
        this.container = document.getElementById('heroImages');
        this.images = [];
        this.activeImages = new Set();
        this.initialized = false;

        // Configuration
        this.config = {
            arenaSlug: 'meme-things-first',
            arenaUser: 'rebecca-bertero',
            minInterval: 150,        // Very fast pop-ups!
            maxInterval: 300,        // Very fast!
            minDuration: 500,        // Short visibility
            maxDuration: 1000,       // Short visibility
            maxSimultaneous: 6,      // More images at once
            imageSize: {
                min: 150,
                max: 300
            }
        };
    }

    async init() {
        if (!this.container) {
            console.warn('Hero images container not found');
            return;
        }

        console.log('Loading images from Are.na...');

        try {
            await this.loadImagesFromArena();
            if (this.images.length > 0) {
                this.startAnimation();
                this.initialized = true;
                console.log(`Loaded ${this.images.length} images from Are.na`);
            } else {
                console.warn('No images found in Are.na channel');
            }
        } catch (error) {
            console.error('Error loading images from Are.na:', error);
        }
    }

    async loadImagesFromArena() {
        try {
            // Fetch channel data from Are.na API with per parameter to get more blocks
            const url = `https://api.are.na/v2/channels/${this.config.arenaSlug}?per=100`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Are.na API error: ${response.status}`);
            }

            const data = await response.json();

            // Extract image URLs from channel contents
            if (data.contents && Array.isArray(data.contents)) {
                this.images = data.contents
                    .filter(block => block.class === 'Image')
                    .map(block => ({
                        url: block.image.display.url,
                        title: block.title || '',
                        id: block.id
                    }));
            } else {
                console.warn('No contents array in Are.na response');
                this.images = [];
            }

        } catch (error) {
            console.error('Failed to load from Are.na:', error);

            // Fallback: use test images if API fails (development only)
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                this.useFallbackImages();
            } else {
                this.images = [];
            }
        }
    }

    useFallbackImages() {
        // Fallback placeholder images for testing
        this.images = [
            { url: 'https://via.placeholder.com/300x300/363635/c6c6c5?text=MEME+1', title: 'Test 1', id: 1 },
            { url: 'https://via.placeholder.com/400x300/363635/c6c6c5?text=MEME+2', title: 'Test 2', id: 2 },
            { url: 'https://via.placeholder.com/350x350/363635/c6c6c5?text=MEME+3', title: 'Test 3', id: 3 },
            { url: 'https://via.placeholder.com/300x400/363635/c6c6c5?text=MEME+4', title: 'Test 4', id: 4 }
        ];
        console.log('Loaded fallback images:', this.images.length);
    }

    startAnimation() {
        // Show first image quickly to indicate activity
        setTimeout(() => this.showRandomImage(), 300);

        // Start the regular loop
        setTimeout(() => this.scheduleNextPopup(), 600);
    }

    scheduleNextPopup() {
        if (!this.initialized) return;

        // Random interval between pop-ups
        const interval = this.randomBetween(
            this.config.minInterval,
            this.config.maxInterval
        );

        setTimeout(() => {
            this.showRandomImage();
            this.scheduleNextPopup(); // CRITICAL: Schedule next one
        }, interval);
    }

    showRandomImage() {
        // Don't show more than max simultaneous images
        if (this.activeImages.size >= this.config.maxSimultaneous) {
            return;
        }

        if (this.images.length === 0) {
            // No images available (e.g. API failed in production)
            return;
        }

        // Pick random image
        const randomImage = this.images[Math.floor(Math.random() * this.images.length)];

        // Create image element
        const img = document.createElement('img');
        img.src = randomImage.url;
        img.alt = randomImage.title;
        img.className = 'hero-popup-image';

        // Random size in viewport units (more reliable for positioning)
        // On mobile, allow images to take full viewport height; on desktop, limit to 40vh
        const isMobile = window.innerWidth <= 768;

        // Larger images on mobile as requested
        const minSize = isMobile ? 35 : 12;
        const maxSize = isMobile ? 55 : 25;
        const sizeVw = this.randomBetween(minSize, maxSize);

        // Maximum constraints to ensure images fit
        const maxWidthVw = isMobile ? 60 : 40; // Max 60vw on mobile
        const maxHeightVh = isMobile ? 50 : 40; // Mobile: 50vh to allow better positioning, Desktop: 40vh

        // Calculate safe positioning with generous padding to avoid border frame
        const padding = 2; // Reduced padding on mobile for more space
        // Use actual size for horizontal constraint to maximize space
        const maxLeft = Math.max(padding, 100 - sizeVw - padding);
        // Calculate max top to ensure images don't get cut off at bottom
        // Apply safe limit for both mobile and desktop
        const maxTopPercent = Math.max(padding, 100 - maxHeightVh - padding);
        const maxTop = maxTopPercent;

        // Define exclusion zone (small center area where title is)
        // On mobile, eliminate vertical exclusion to allow full distribution
        // Only keep horizontal exclusion to protect title sides
        let excludeLeft, excludeRight, excludeTop, excludeBottom;
        if (isMobile) {
            excludeLeft = 35;
            excludeRight = 65;
            excludeTop = -1;    // No vertical exclusion on mobile
            excludeBottom = 101; // No vertical exclusion on mobile
        } else {
            excludeLeft = 40;
            excludeRight = 60;
            excludeTop = 40;
            excludeBottom = 60;
        }

        let left, top;
        let attempts = 0;
        const maxAttempts = 10;

        // Try to find position outside exclusion zone
        do {
            left = this.randomBetween(padding, maxLeft);
            top = this.randomBetween(padding, maxTop);
            attempts++;

            // Check if position is outside exclusion zone (center)
            const isOutsideExclusionZone =
                left < excludeLeft ||
                left > excludeRight ||
                top < excludeTop ||
                top > excludeBottom;

            const inExclusionZone = !isOutsideExclusionZone;

            if (isOutsideExclusionZone || attempts >= maxAttempts) {
                break;
            }
        } while (attempts < maxAttempts);

        // Apply styles with viewport units for consistent sizing
        img.style.left = `${left}%`;
        img.style.top = `${top}%`;
        img.style.width = `${sizeVw}vw`;
        img.style.height = 'auto';
        img.style.maxWidth = `${maxWidthVw}vw`;
        img.style.maxHeight = `${maxHeightVh}vh`;

        // Add to container
        this.container.appendChild(img);
        this.activeImages.add(img);

        // Trigger animation (CSS will handle the pop-up effect)
        requestAnimationFrame(() => {
            img.classList.add('visible');
        });

        // Schedule removal
        const duration = this.randomBetween(
            this.config.minDuration,
            this.config.maxDuration
        );

        setTimeout(() => {
            this.hideImage(img);
        }, duration);
    }

    hideImage(img) {
        // Fade out
        img.classList.remove('visible');
        img.classList.add('hiding');

        // Remove from DOM after animation
        setTimeout(() => {
            if (img.parentNode) {
                img.parentNode.removeChild(img);
            }
            this.activeImages.delete(img);
        }, 400); // Match CSS transition duration
    }

    randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Method to stop animation (if needed)
    stop() {
        this.initialized = false;
        this.activeImages.forEach(img => this.hideImage(img));
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const heroImages = new HeroImages();
    heroImages.init();
});

// Export for external use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeroImages;
}
