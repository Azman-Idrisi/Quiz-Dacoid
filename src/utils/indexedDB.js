export const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("QuizHistoryDB", 1);
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("quizzes")) {
          db.createObjectStore("quizzes", { keyPath: "id", autoIncrement: true });
        }
      };
  
      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (event) => reject(event.target.error);
    });
  };
  
  export const saveQuizResult = async (quiz) => {
    const db = await openDB();
    const tx = db.transaction("quizzes", "readwrite");
    const store = tx.objectStore("quizzes");
    store.add(quiz);
    return tx.complete;
  };
  
  export const getQuizHistory = async () => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("quizzes", "readonly");
      const store = tx.objectStore("quizzes");
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };
  
  
  export const clearQuizHistory = async () => {
    const db = await openDB();
    const tx = db.transaction("quizzes", "readwrite");
    const store = tx.objectStore("quizzes");
    store.clear();
    return tx.complete;
  };
  