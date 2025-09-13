// This file handles all logic for the login.html page (Login & Sign Up)

// --- Step 1: Import necessary functions from the Firebase SDK ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// --- Step 2: Your Firebase Configuration ---
// This is the configuration you provided.
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
// --- Step 3: Initialize Firebase and its services ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- Step 4: Get references to all the HTML elements we need ---
const authForm = document.getElementById('auth-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitButton = document.getElementById('submit-button');
const toggleLink = document.getElementById('toggle-link');
const formTitle = document.getElementById('form-title');
const toggleText = document.getElementById('toggle-text');
const errorMessage = document.getElementById('error-message');

// A variable to track whether we are in "Sign Up" mode or "Login" mode
let isSignUpMode = false;

// --- Step 5: Function to handle toggling between Login and Sign Up ---
const toggleAuthMode = (e) => {
    if (e) e.preventDefault(); // Prevent the link from navigating if it was clicked
    isSignUpMode = !isSignUpMode; // Flip the mode

    // Update the UI based on the new mode
    if (isSignUpMode) {
        formTitle.textContent = 'Sign Up';
        submitButton.textContent = 'Sign Up';
        toggleText.innerHTML = 'Already have an account? <a href="#" id="toggle-link">Login</a>';
    } else {
        formTitle.textContent = 'Login';
        submitButton.textContent = 'Login';
        toggleText.innerHTML = 'Don\'t have an account? <a href="#" id="toggle-link">Sign Up</a>';
    }
    // We need to find the new link we just created and add the click listener to it
    document.getElementById('toggle-link').addEventListener('click', toggleAuthMode);
    errorMessage.textContent = ''; // Clear any previous errors
};

// Add the initial click listener
toggleLink.addEventListener('click', toggleAuthMode);


// --- Step 6: Add a submit listener to the main form ---
authForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from submitting the traditional way
    const email = emailInput.value;
    const password = passwordInput.value;
    errorMessage.textContent = ''; // Clear previous errors

    if (isSignUpMode) {
        // --- SIGN UP LOGIC ---
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // User was created successfully
                console.log('Successfully signed up:', userCredential.user);
                window.location.href = 'index.html'; // Redirect to the main page
            })
            .catch((error) => {
                // Handle errors (e.g., password too weak, email already in use)
                console.error('Sign up error:', error);
                errorMessage.textContent = error.message;
            });
    } else {
        // --- LOGIN LOGIC ---
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // User logged in successfully
                console.log('Successfully logged in:', userCredential.user);
                window.location.href = 'index.html'; // Redirect to the main page
            })
            .catch((error) => {
                // Handle errors (e.g., wrong password, user not found)
                console.error('Login error:', error);
                errorMessage.textContent = error.message;
            });
    }
});


// --- Step 7 (Bonus): Logic for updating UI on other pages ---
// This part updates the navigation links on pages like index.html
const userNav = document.querySelector('.user-nav');
if (userNav) {
    onAuthStateChanged(auth, user => {
        if (user) {
            // User is signed in
            userNav.innerHTML = `
                <a href="userprofilepage.html" class="nav-link">My Profile</a>
                <button id="logout-button" class="nav-link">Logout</button>
            `;
            const logoutButton = document.getElementById('logout-button');
            logoutButton.addEventListener('click', () => {
                auth.signOut().then(() => {
                    window.location.href = 'login.html';
                });
            });
        } else {
            // User is signed out
            userNav.innerHTML = `<a href="login.html" class="nav-link">Login</a>`;
        }
    });
}