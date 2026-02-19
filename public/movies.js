const API_KEY = CONFIG.OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

const categories = {
    'india': 'India',
    'action': 'Action',
    'tv': 'Netflix'
};

async function fetchMovies(search) {
    try {
        const response = await fetch(`${BASE_URL}?s=${search}&apikey=${API_KEY}`);
        const data = await response.json();
        return data.Search || [];
    } catch (error) {
        console.error(`Error fetching movies for ${search}:`, error);
        return [];
    }
}

function createMovieCard(movie, index) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.style.backgroundImage = `url(${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x280?text=No+Poster'})`;

    // Add "Top 10" badge to the first 2 movies in each row
    if (index < 2) {
        const badge = document.createElement('div');
        badge.className = 'badge-top10';
        badge.innerText = 'Top 10';
        card.appendChild(badge);
    }

    // Add "Recently Added" badge to every 3rd movie
    if (index % 3 === 0) {
        const recentBadge = document.createElement('div');
        recentBadge.className = 'badge-recent';
        recentBadge.innerText = 'Recently added';
        card.appendChild(recentBadge);
    }

    const title = document.createElement('div');
    title.className = 'movie-title';
    title.innerText = movie.Title;
    card.appendChild(title);

    return card;
}

async function populateRow(id, search) {
    const row = document.getElementById(id);
    const movies = await fetchMovies(search);

    movies.forEach((movie, index) => {
        const card = createMovieCard(movie, index);
        row.appendChild(card);
    });

    // If it's the first row, set one as the hero
    if (id === 'row-india' && movies.length > 0) {
        setHeroMovie(movies[0]);
    }
}

function setHeroMovie(movie) {
    const hero = document.querySelector('.hero');
    hero.style.backgroundImage = `linear-gradient(to top, #141414 0%, transparent 50%), linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 60%), url(${movie.Poster})`;
    document.getElementById('heroTitle').innerText = movie.Title;
    document.getElementById('heroDesc').innerText = `Directed by OMDB Search. Released in ${movie.Year}. A must-watch masterpiece featuring ${movie.Title}.`;
}

// Scroll Handling
document.querySelectorAll('.row').forEach(rowDiv => {
    const container = rowDiv.querySelector('.scroll-container');
    const prevBtn = rowDiv.querySelector('.handlePrev');
    const nextBtn = rowDiv.querySelector('.handleNext');

    if (prevBtn && nextBtn && container) {
        prevBtn.addEventListener('click', () => {
            container.scrollLeft -= 500;
        });
        nextBtn.addEventListener('click', () => {
            container.scrollLeft += 500;
        });
    }
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#141414';
    } else {
        navbar.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.7) 10%, transparent)';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateRow('row-india', 'India');
    populateRow('row-action', 'Action');
    populateRow('row-tv', 'Super');
});
