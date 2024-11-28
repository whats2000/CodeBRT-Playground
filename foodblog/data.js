// Initial sample data
const initialFoodBlogData = [
    {
        id: 1,
        title: "Classic Italian Pizza",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600",
        description: "A delicious homemade pizza with a crispy crust, fresh tomato sauce, mozzarella cheese, and fresh basil. Learn the secrets of making the perfect Neapolitan-style pizza at home!",
        content: "Making the perfect pizza starts with the dough. Our recipe uses Type 00 flour, fresh yeast, and a long fermentation process to achieve that authentic Italian taste. The key is to let the dough rest for at least 24 hours..."
    },
    {
        id: 2,
        title: "Japanese Ramen",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600",
        description: "Rich and flavorful ramen with handmade noodles, chashu pork, and a perfectly seasoned broth. Discover the art of making authentic Japanese ramen from scratch.",
        content: "The heart of any great ramen is its broth. This recipe takes 12 hours to prepare the perfect tonkotsu broth, slowly simmering pork bones to extract maximum flavor..."
    },
    {
        id: 3,
        title: "Fresh Sushi Rolls",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600",
        description: "Learn how to make beautiful and delicious sushi rolls at home. From selecting the right fish to perfect rice preparation, we cover all the essentials.",
        content: "The foundation of great sushi is properly prepared rice. We'll teach you the exact ratio of rice to water, the proper amount of rice vinegar, and how to achieve that perfect sticky texture..."
    }
];

// Function to get data from localStorage or initialize with sample data
function getFoodBlogData() {
    const storedData = localStorage.getItem('foodBlogData');
    if (!storedData) {
        localStorage.setItem('foodBlogData', JSON.stringify(initialFoodBlogData));
        return initialFoodBlogData;
    }
    return JSON.parse(storedData);
}

// Function to save data to localStorage
function saveFoodBlogData(data) {
    localStorage.setItem('foodBlogData', JSON.stringify(data));
}

// Initialize the foodBlogData variable
let foodBlogData = getFoodBlogData();