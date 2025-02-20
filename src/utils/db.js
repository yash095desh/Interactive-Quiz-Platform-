import { openDB } from "idb";

// Open (or create) the IndexedDB database named "quiz-db"
const dbPromise = openDB("quiz-db", 1, {
    upgrade(db) {
        // Create an object store named "quizHistory" with an auto-incrementing key
        db.createObjectStore("quizHistory", { keyPath: "id", autoIncrement: true });
    }
});

// Saves a quiz attempt to IndexedDB.
// Prevents saving duplicate attempts on the same date.

export const saveAttempt = async (attempt) => {
    const db = await dbPromise;
    
    // Retrieve all existing quiz attempts
    const existingAttempts = await db.getAll("quizHistory");

    // Check if an attempt with the same date already exists
    const isDuplicate = existingAttempts.some(a => a.date === attempt.date);

    if (!isDuplicate) {
        await db.add("quizHistory", attempt);
        console.log("Attempt saved successfully.");
    } else {
        console.log("Duplicate attempt detected. Not saving.");
    }
};

// Retrieves all saved quiz attempts from IndexedDB.

export const getAttempts = async () => {
    const db = await dbPromise;
    return db.getAll("quizHistory");
};
