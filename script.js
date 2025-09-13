// Live Search Filter Functionality

// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // 1. Get references to the HTML elements we need
    const searchBar = document.getElementById('search-bar');
    const examCards = document.querySelectorAll('.exam-card');

    // 2. Add an 'input' event listener to the search bar
    //    This event fires every time the user types, pastes, or deletes text.
    searchBar.addEventListener('input', (event) => {
        
        // Get the user's search query, convert it to lower case for case-insensitive matching
        const searchQuery = event.target.value.toLowerCase();

        // 3. Loop through all the exam cards to see which ones match the search
        examCards.forEach(card => {
            
            // Get the text content of the card's title (the h3 element)
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            
            // Check if the card's title includes the search query
            const isMatch = cardTitle.includes(searchQuery);

            // 4. Show or hide the card based on whether it's a match
            //    If it's a match, display it as 'flex' (its original display style).
            //    If not, hide it completely with 'none'.
            card.style.display = isMatch ? 'flex' : 'none';
        });
    });

    console.log("Exam Portal script with search functionality loaded successfully!");

});

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4uPj8zmk3z97IxCplEvXKtkfdAXaKJpI",
  authDomain: "testmydoc-86c5f.firebaseapp.com",
  projectId: "testmydoc-86c5f",
  storageBucket: "testmydoc-86c5f.firebasestorage.app",
  messagingSenderId: "929877160424",
  appId: "1:929877160424:web:4fe16c75114acaf0c2b45d",
  measurementId: "G-1TML3N0PZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);