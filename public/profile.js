// This file handles fetching and displaying data on the profile page

// --- Step 1: Import necessary functions from the Firebase SDK ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// --- Step 2: IMPORTANT! Paste your Firebase Configuration Here ---
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
const db = getFirestore(app);

// --- Step 4: Get references to the HTML elements on the page ---
const profileWelcome = document.getElementById('profile-welcome');
const resultsBody = document.getElementById('results-body');

// --- Step 5: Listen for changes in authentication state ---
onAuthStateChanged(auth, user => {
    if (user) {
        // If a user is logged in...
        // 1. Update the welcome message with their email
        if(profileWelcome) {
            profileWelcome.textContent = `Welcome, ${user.email}!`;
        }
        // 2. Call the function to fetch their test results from the database
        fetchTestResults(user.uid);
    } else {
        // If no user is logged in...
        // 1. Log a message to the console
        console.log("No user is logged in. Redirecting to login page...");
        // 2. Redirect the browser to the login page to protect this page
        window.location.href = 'login.html';
    }
});

/**
 * Fetches test results for a specific user from the Firestore database.
 * @param {string} userId - The unique ID of the currently logged-in user.
 */
async function fetchTestResults(userId) {
    if(!resultsBody) return; // Stop if the table element doesn't exist

    resultsBody.innerHTML = ''; // Clear the initial "Loading..." message

    // This query looks for all documents in the "testResults" collection 
    // where the 'userId' field is exactly equal to the logged-in user's ID.
    const resultsRef = collection(db, "testResults");
    const q = query(resultsRef, where("userId", "==", userId));
    
    try {
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            // If the query returns no documents, show a message
            resultsBody.innerHTML = `<tr><td colspan="3">You have not completed any tests yet.</td></tr>`;
            return;
        }

        // Loop through each result document found
        querySnapshot.forEach((doc) => {
            const result = doc.data();
            // Safely format the date, providing a fallback if it doesn't exist
            const date = result.dateTaken?.toDate().toLocaleDateString() || 'N/A'; 
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${result.testName || 'Unknown Test'}</td>
                <td>${result.score || 'N/A'}</td>
                <td>${date}</td>
            `;
            resultsBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error fetching test results: ", error);
        resultsBody.innerHTML = `<tr><td colspan="3">Could not load your test results. Please try again later.</td></tr>`;
    }
}

