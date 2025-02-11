// Random Jedi Cat Traits
const traits = {
    catImages: [
        'https://i.imgur.com/jedi_cat1.png', // Add your Jedi Cat image URLs
        'https://i.imgur.com/jedi_cat2.png',
    ],
    quotes: [
        "I AM THE SENATE",
        "May the Force HODL",
        "Rug Pull? Not Today, Sith.",
        "Solana TPS go brrrrr",
    ],
    backgrounds: [
        'url("https://i.imgur.com/space_bg.jpg")', // Starry background
        'url("https://i.imgur.com/solana_logo_bg.png")',
    ]
};

function generateRandomMeme() {
    const canvas = document.getElementById('memeCanvas');
    const ctx = canvas.getContext('2d');
    
    // Randomly pick traits
    const bg = traits.backgrounds[Math.floor(Math.random() * traits.backgrounds.length)];
    const catImg = new Image();
    catImg.src = traits.catImages[Math.floor(Math.random() * traits.catImages.length)];
    const text = traits.quotes[Math.floor(Math.random() * traits.quotes.length)];

    // Draw meme
    catImg.onload = function() {
        // Background
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Cat image
        ctx.drawImage(catImg, 100, 50, 400, 300);
        
        // Text
        ctx.fillStyle = '#FFD700';
        ctx.font = '40px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText(text, 300, 380);
    };
}

function downloadMeme() {
    const canvas = document.getElementById('memeCanvas');
    const link = document.createElement('a');
    link.download = 'jedi-cat-meme.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Live Meme Feed (Scrapes Reddit r/cryptocurrencymemes)
async function loadMemeFeed() {
    const response = await fetch('https://www.reddit.com/r/cryptocurrencymemes/hot.json?limit=9');
    const data = await response.json();
    const feed = document.getElementById('memeFeed');
    
    data.data.children.forEach(post => {
        if (post.data.url.includes('jpg') || post.data.url.includes('png')) {
            const img = document.createElement('img');
            img.src = post.data.url;
            feed.appendChild(img);
        }
    });
}

// Start
generateRandomMeme();
loadMemeFeed();