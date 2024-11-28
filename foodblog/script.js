// Display all blog posts when the page loads
window.onload = function() {
    displayBlogPosts(getFoodBlogData());
    setupAddPostForm();
};

// Function to search food
function searchFood() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredPosts = getFoodBlogData().filter(post => 
        post.title.toLowerCase().includes(searchTerm) || 
        post.description.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm)
    );
    displayBlogPosts(filteredPosts);
}

// Function to display blog posts
function displayBlogPosts(posts) {
    const blogPostsContainer = document.getElementById('blogPosts');
    blogPostsContainer.innerHTML = '';

    if (posts.length === 0) {
        blogPostsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'food-item';
        postElement.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <h2>${post.title}</h2>
            <p>${post.description}</p>
            <div class="content">${post.content}</div>
            <button onclick="deletePost(${post.id})" class="delete-btn">Delete Post</button>
        `;
        blogPostsContainer.appendChild(postElement);
    });
}

// Function to add a new blog post
function addNewPost(event) {
    event.preventDefault();
    
    const title = document.getElementById('newTitle').value;
    const image = document.getElementById('newImage').value;
    const description = document.getElementById('newDescription').value;
    const content = document.getElementById('newContent').value;

    const currentData = getFoodBlogData();
    const newPost = {
        id: Date.now(), // Use timestamp as unique ID
        title,
        image,
        description,
        content
    };

    currentData.push(newPost);
    saveFoodBlogData(currentData);
    displayBlogPosts(currentData);

    // Reset form
    document.getElementById('addPostForm').reset();
    document.getElementById('addPostModal').style.display = 'none';
}

// Function to delete a post
function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        const currentData = getFoodBlogData();
        const updatedData = currentData.filter(post => post.id !== postId);
        saveFoodBlogData(updatedData);
        displayBlogPosts(updatedData);
    }
}

// Function to setup the add post form
function setupAddPostForm() {
    const addButton = document.getElementById('showAddForm');
    const modal = document.getElementById('addPostModal');
    const closeButton = document.getElementsByClassName('close')[0];

    addButton.onclick = function() {
        modal.style.display = 'block';
    }

    closeButton.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// Event handler for Enter key in search input
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchFood();
    }
});