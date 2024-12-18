// Sample movie data (in a real application, this would come from an API)
const movies = [
    { id: 1, title: "The Matrix", rating: 8.7, poster: "./image/matrix.jpeg", genre: "Sci-Fi", description: "A computer programmer discovers a fantastical world of rebels fighting against powerful computers who have constructed his entire reality with a system called the Matrix." },
    { id: 2, title: "Inception", rating: 8.8, poster: "./image/sci.jpeg", genre: "Sci-Fi", description: "A thief who enters the dreams of others to steal secrets from their subconscious is offered a chance to regain his old life in exchange for a task considered to be impossible: inception." },
    { id: 3, title: "Interstellar", rating: 8.6, poster: "./image/interstellar.jpeg", genre: "Sci-Fi", description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival." },
    { id: 4, title: "The Dark Knight", rating: 9.0, poster: "./image/dark-knight.jpeg", genre: "Action", description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice." },
    { id: 5, title: "Pulp Fiction", rating: 8.9, poster: "./image/pulp-fiction.jpeg", genre: "Drama", description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption." },
    { id: 6, title: "Forrest Gump", rating: 8.8, poster: "./image/forrest-gump.jpeg", genre: "Drama", description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart." },
    { id: 7, title: "The Shawshank Redemption", rating: 9.3, poster: "./image/shawshank.jpeg", genre: "Drama", description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency." },
    { id: 8, title: "The Godfather", rating: 9.2, poster: "./image/godfather.jpeg", genre: "Romance", description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son." },
    { id: 9, title: "The Matrix", rating: 8.7, poster: "./image/matrix.jpeg", genre: "Sci-Fi", description: "A computer programmer discovers a fantastical world of rebels fighting against powerful computers who have constructed his entire reality with a system called the Matrix." },
    { id: 10, title: "Inception", rating: 8.8, poster: "./image/sci.jpeg", genre: "Romance", description: "A thief who enters the dreams of others to steal secrets from their subconscious is offered a chance to regain his old life in exchange for a task considered to be impossible: inception." },
    { id: 11, title: "Interstellar", rating: 8.6, poster: "./image/interstellar.jpeg", genre: "Action", description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival." },
    { id: 12, title: "The Dark Knight", rating: 9.0, poster: "./image/dark-knight.jpeg", genre: "Action", description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice." },
    { id: 13, title: "Pulp Fiction", rating: 8.9, poster: "./image/pulp-fiction.jpeg", genre: "Horror", description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption." },
    { id: 14, title: "Forrest Gump", rating: 8.8, poster: "./image/forrest-gump.jpeg", genre: "Comedy", description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart." },
    { id: 15, title: "The Shawshank Redemption", rating: 9.3, poster: "./image/shawshank.jpeg", genre: "Comedy", description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency." },
    { id: 16, title: "The Godfather", rating: 9.2, poster: "./image/godfather.jpeg", genre: "Drama", description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son." },
];

// Function to create a movie item element
function createMovieItem(movie) {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');
    movieItem.setAttribute('data-id', movie.id);
    movieItem.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <span class="movie-rating">★ ${movie.rating.toFixed(1)}</span>
        </div>
    `;
    return movieItem;
}

// Function to populate movie grids
function populateMovieGrid(selector, movieList, start = 0, limit = 4) {
    const grid = document.querySelector(selector);
    const fragment = document.createDocumentFragment();
    
    // Slice the movie list with the given start and limit
    const moviesToShow = movieList.slice(start, start + limit);
    
    // Create and append movie items
    moviesToShow.forEach(movie => {
        fragment.appendChild(createMovieItem(movie));
    });
    
    grid.appendChild(fragment);
}

// Infinite scrolling (Load More functionality)
function setupLoadMore(buttonId, gridSelector, movieList) {
    let currentIndex = 4;
    const loadMoreButton = document.getElementById(buttonId);
    
    loadMoreButton.addEventListener('click', () => {
        // Populate the grid with the next set of movies
        populateMovieGrid(gridSelector, movieList, currentIndex, 4);
        
        // Increment the current index
        currentIndex += 4;
        
        // Hide the load more button if we've shown all movies
        if (currentIndex >= movieList.length) {
            loadMoreButton.style.display = 'none';
        }
    });
}

// Initialize movie grids
populateMovieGrid('#trendingMovies', movies.slice(0, 4));
populateMovieGrid('#topRatedMovies', movies.slice(4, 8));

// Setup Load More functionality
setupLoadMore('loadMoreTrending', '#trendingMovies', movies.slice(0, 4));
setupLoadMore('loadMoreTopRated', '#topRatedMovies', movies.slice(4));

// Search functionality
const searchForm = document.querySelector('.search-container');
const searchInput = searchForm.querySelector('input');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.toLowerCase();
    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm) ||
        movie.genre.toLowerCase().includes(searchTerm)
    );
    
    // Clear existing movies
    document.querySelectorAll('.movie-grid').forEach(grid => {
        grid.innerHTML = '';
    });

    // Populate with search results
    populateMovieGrid('#trendingMovies', filteredMovies);
    document.getElementById('loadMoreTrending').style.display = 'none';
    document.getElementById('loadMoreTopRated').style.display = 'none';
});

// Modal functionality
const modal = document.getElementById('movieModal');
const modalContent = document.getElementById('movieDetails');
const closeModal = document.getElementsByClassName('close')[0];


function openModal(movie) {
    modalContent.innerHTML = `
        <div class="modal-header">
            <img src="${movie.poster}" alt="${movie.title} poster" class="modal-poster">
            <div class="modal-header-info">
                <h2>${movie.title}</h2>
                <div class="modal-rating-genre">
                    <span class="modal-rating">★ ${movie.rating.toFixed(1)}</span>
                    <span class="modal-genre">${movie.genre.toUpperCase()}</span>
                </div>
            </div>
        </div>
        <div class="modal-body">
            <h3>Synopsis</h3>
            <p>${movie.description}</p>
        </div>
    `;
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

closeModal.onclick = function() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Add click event listeners to movie items
document.querySelectorAll('.movie-grid').forEach(grid => {
    grid.addEventListener('click', (e) => {
        const movieItem = e.target.closest('.movie-item');
        if (movieItem) {
            const movieId = parseInt(movieItem.getAttribute('data-id'));
            const movie = movies.find(m => m.id === movieId);
            if (movie) {
                openModal(movie);
            }
        }
    });
});

// Category filtering
document.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const category = e.target.getAttribute('data-category');
        const filteredMovies = movies.filter(movie => movie.genre.toLowerCase() === category);
        
        document.querySelectorAll('.movie-grid').forEach(grid => {
            grid.innerHTML = '';
        });

        populateMovieGrid('#trendingMovies', filteredMovies);
        document.getElementById('loadMoreTrending').style.display = 'none';
        document.getElementById('loadMoreTopRated').style.display = 'none';
    });
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                image.src = image.getAttribute('data-src');
                image.classList.remove('lazy-load-placeholder');
                imageObserver.unobserve(image);
            }
        });
    });

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });
} else {
    // Fallback for browsers that don't support IntersectionObserver
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(image => {
        image.src = image.getAttribute('data-src');
        image.classList.remove('lazy-load-placeholder');
    });
}

// Accessibility improvements
document.querySelectorAll('.movie-item').forEach(item => {
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const movieId = parseInt(item.getAttribute('data-id'));
            const movie = movies.find(m => m.id === movieId);
            if (movie) {
                openModal(movie);
            }
        }
    });
});

// Simple form validation for newsletter
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    if (emailInput.value.includes('@') && emailInput.value.includes('.')) {
        alert('Thank you for subscribing!');
        emailInput.value = '';
    } else {
        alert('Please enter a valid email address.');
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
        // Separate the movies for trending and top-rated sections
        const trendingMovies = movies.slice(0, 8);
        const topRatedMovies = movies.slice(8);
    
        // Populate initial movie grids
        populateMovieGrid('#trendingMovies', trendingMovies, 0, 4);
        populateMovieGrid('#topRatedMovies', topRatedMovies, 0, 4);
    
        // Setup Load More functionality
        setupLoadMore('loadMoreTrending', '#trendingMovies', trendingMovies);
        setupLoadMore('loadMoreTopRated', '#topRatedMovies', topRatedMovies);
});

