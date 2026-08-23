const questions = {
  mern: [
    {
      category: "MERN",
      difficulty: "Easy",
      question: "What does MERN stand for, and what is the role of each layer?",
      hint: "Think client, server, database, and the runtime that runs JavaScript on the server.",
      sampleAnswer:
        "MERN is MongoDB, Express, React, and Node.js. MongoDB stores data, Express handles APIs, React is the UI, and Node.js runs JavaScript on the server.",
    },
    {
      category: "React",
      difficulty: "Easy",
      question: "What is the difference between state and props in React?",
      hint: "One is owned by the component, the other is passed from a parent.",
      sampleAnswer:
        "Props are read-only data passed from parent to child. State is data the component owns and can update, which triggers a re-render.",
    },
    {
      category: "React",
      difficulty: "Medium",
      question: "How do useEffect and the dependency array work?",
      hint: "Empty array vs no array vs listed values.",
      sampleAnswer:
        "useEffect runs after render. [] means run once on mount. [value] re-runs when value changes. No array runs after every render. Return a cleanup function to unsubscribe or clear timers.",
    },
    {
      category: "React",
      difficulty: "Medium",
      question: "What is the virtual DOM, and why does React use it?",
      hint: "Diffing before touching the real DOM.",
      sampleAnswer:
        "The virtual DOM is a lightweight JS copy of the UI. React diffs it with the previous tree and updates only what changed in the real DOM, which is faster than rewriting the whole page.",
    },
    {
      category: "Node",
      difficulty: "Easy",
      question: "What is the event loop in Node.js?",
      hint: "Non-blocking I/O and the call stack vs callback queue.",
      sampleAnswer:
        "Node is single-threaded for JS. The event loop takes finished async work (I/O, timers) from queues and runs their callbacks when the call stack is empty, so the server can handle many requests without blocking.",
    },
    {
      category: "Express",
      difficulty: "Medium",
      question: "What is middleware in Express, and how does next() work?",
      hint: "Functions in a pipeline: req, res, next.",
      sampleAnswer:
        "Middleware is a function (req, res, next) that can read/modify the request, send a response, or call next() to pass control. Used for auth, CORS, JSON parsing, and logging.",
    },
    {
      category: "MongoDB",
      difficulty: "Easy",
      question: "What is the difference between SQL and MongoDB?",
      hint: "Tables vs documents, schema flexibility.",
      sampleAnswer:
        "SQL uses tables, rows, and joins with a fixed schema. MongoDB stores JSON-like documents in collections, is schema-flexible, and is a common fit for JS apps because objects map easily to documents.",
    },
    {
      category: "MongoDB",
      difficulty: "Medium",
      question: "What are Mongoose schemas and models used for?",
      hint: "Shape of data vs the constructor you query with.",
      sampleAnswer:
        "A schema defines fields, types, and validation. A model is compiled from the schema and is what you use to create, find, update, and delete documents in a collection.",
    },
    {
      category: "Node",
      difficulty: "Medium",
      question: "How would you structure REST APIs for a job tracker (CRUD)?",
      hint: "Resources, HTTP methods, status codes.",
      sampleAnswer:
        "Use /api/applications. POST to create, GET to list/read, PATCH/PUT to update, DELETE to remove. Return 201 on create, 404 if missing, and validate body fields like company and role.",
    },
    {
      category: "React",
      difficulty: "Hard",
      question: "How do you lift state up, and when would you use Context instead?",
      hint: "Sibling sharing vs prop drilling across many levels.",
      sampleAnswer:
        "Lift state to the nearest common parent and pass it down as props. Use Context when many distant components need the same data (theme, auth) and prop drilling becomes noisy. Avoid Context for high-frequency updates.",
    },
    {
      category: "MERN",
      difficulty: "Medium",
      question: "How do you connect a React frontend to an Express API?",
      hint: "fetch/axios, CORS, and Vite proxy.",
      sampleAnswer:
        "The UI calls API routes with fetch. In dev, Vite can proxy /api to localhost:5000. Enable CORS on Express. Keep the API base URL in an env variable for production.",
    },
    {
      category: "MERN",
      difficulty: "Hard",
      question: "How would you handle auth in a MERN app for this tracker?",
      hint: "JWT or session, hashed passwords, protected routes.",
      sampleAnswer:
        "Hash passwords with bcrypt, issue a JWT after login, send it in an Authorization header, and verify it in middleware before application routes. Store the token in httpOnly cookies when possible to reduce XSS risk.",
    },
  ],
  react: [
    {
      category: "React",
      difficulty: "Easy",
      question: "What is a component, and what is the difference between function and class components?",
      hint: "UI building blocks; hooks vs this.state.",
      sampleAnswer:
        "A component is a reusable UI piece. Function components use hooks like useState. Class components use this.state and lifecycle methods. New code almost always uses functions.",
    },
    {
      category: "React",
      difficulty: "Medium",
      question: "What are keys in lists, and why are they important?",
      hint: "Identity during reconciliation.",
      sampleAnswer:
        "Keys help React match list items between renders. Use a stable id, not the array index if the list can reorder, or you get bugs and extra re-renders.",
    },
    {
      category: "React",
      difficulty: "Medium",
      question: "Controlled vs uncontrolled inputs?",
      hint: "value + onChange vs ref / defaultValue.",
      sampleAnswer:
        "Controlled inputs take value from React state. Uncontrolled inputs keep value in the DOM and you read it with a ref. Forms in apps like this tracker are usually controlled so you can validate easily.",
    },
    {
      category: "React",
      difficulty: "Hard",
      question: "When would you use useMemo or useCallback?",
      hint: "Referential equality and expensive calc — not by default.",
      sampleAnswer:
        "useMemo caches an expensive result. useCallback caches a function reference so memoized children do not re-render for no reason. Do not wrap everything; profile first.",
    },
    {
      category: "React",
      difficulty: "Medium",
      question: "What is lifting state, and how does it relate to this job tracker UI?",
      hint: "Navbar page vs table data.",
      sampleAnswer:
        "Shared data lives in a common parent. For example, applications should live in App or a store so Dashboard stats and the table stay in sync after adding a job.",
    },
  ],
  node: [
    {
      category: "Node",
      difficulty: "Easy",
      question: "What is npm, and what is the difference between dependencies and devDependencies?",
      hint: "Runtime vs tools.",
      sampleAnswer:
        "npm installs packages. dependencies are needed to run the app (express, mongoose). devDependencies are for development (nodemon, vite).",
    },
    {
      category: "Node",
      difficulty: "Medium",
      question: "How does require/import differ, and what is type module?",
      hint: "CommonJS vs ESM.",
      sampleAnswer:
        "CommonJS uses require/module.exports. ESM uses import/export. package.json type module makes .js files ESM, which this backend already uses.",
    },
    {
      category: "Node",
      difficulty: "Medium",
      question: "How do you handle errors in async Express routes?",
      hint: "try/catch and a central error middleware.",
      sampleAnswer:
        "Wrap async handlers in try/catch or a wrapper, call next(err), and use error-handling middleware (err, req, res, next) to send a consistent JSON error without crashing the process.",
    },
    {
      category: "Node",
      difficulty: "Hard",
      question: "What is the difference between process.nextTick, setImmediate, and setTimeout(fn, 0)?",
      hint: "Microtasks vs check phase vs timers.",
      sampleAnswer:
        "nextTick runs before the event loop continues. setTimeout(0) is a timer. setImmediate runs on the check phase. Interviews want you to know nextTick can starve the loop if used carelessly.",
    },
  ],
  mongodb: [
    {
      category: "MongoDB",
      difficulty: "Easy",
      question: "What is a document, collection, and database in MongoDB?",
      hint: "JSON row, table, database.",
      sampleAnswer:
        "A document is one JSON-like record. A collection is a group of documents. A database holds collections. Example: Application documents in an applications collection.",
    },
    {
      category: "MongoDB",
      difficulty: "Medium",
      question: "What is indexing, and when would you add an index?",
      hint: "Query speed vs write cost.",
      sampleAnswer:
        "An index is a lookup structure. Index fields you filter/sort on often (status, appliedDate). Too many indexes slow writes. Unique index on email for users.",
    },
    {
      category: "MongoDB",
      difficulty: "Medium",
      question: "Explain populate in Mongoose.",
      hint: "Like a join using ObjectId refs.",
      sampleAnswer:
        "If Application stores user: ObjectId ref User, populate replaces that id with the user document in a query so you can show the owner without a second manual find.",
    },
  ],
  javascript: [
    {
      category: "JavaScript",
      difficulty: "Easy",
      question: "What is the difference between let, const, and var?",
      hint: "Scope and reassignment.",
      sampleAnswer:
        "var is function-scoped and hoisted. let and const are block-scoped. const cannot be reassigned. Prefer const, then let. Avoid var.",
    },
    {
      category: "JavaScript",
      difficulty: "Medium",
      question: "Explain closures with a short example.",
      hint: "Inner function remembers outer variables.",
      sampleAnswer:
        "A closure is a function that remembers variables from its outer scope after that outer function has returned. Example: a counter function that keeps count private.",
    },
    {
      category: "JavaScript",
      difficulty: "Medium",
      question: "What is the difference between == and ===?",
      hint: "Coercion.",
      sampleAnswer:
        "== compares after type coercion. === compares value and type. Always use === in interviews and production unless you have a rare reason not to.",
    },
    {
      category: "JavaScript",
      difficulty: "Hard",
      question: "How do promises and async/await relate to callbacks?",
      hint: "Pyramid of doom vs linear async code.",
      sampleAnswer:
        "Callbacks can nest deeply. Promises represent a future value with then/catch. async/await is syntax over promises so async code reads like sync code, still using the event loop.",
    },
  ],
  dsa: [
    {
      category: "DSA",
      difficulty: "Easy",
      question: "What is the time complexity of searching in an unsorted array vs a hash map?",
      hint: "O(n) vs average O(1).",
      sampleAnswer:
        "Unsorted array search is O(n). A hash map lookup is average O(1). That is why counting frequencies with a Map is common in intern interviews.",
    },
    {
      category: "DSA",
      difficulty: "Medium",
      question: "How do you reverse a string or detect a palindrome?",
      hint: "Two pointers or split/reverse/join.",
      sampleAnswer:
        "Two pointers from start and end, swap or compare until they meet. Palindrome: ignore case and non-letters, then check the string equals its reverse.",
    },
    {
      category: "DSA",
      difficulty: "Medium",
      question: "Explain stack vs queue with a real example.",
      hint: "LIFO vs FIFO.",
      sampleAnswer:
        "Stack is last-in first-out: browser back button, undo, call stack. Queue is first-in first-out: printer jobs, request handling, BFS.",
    },
    {
      category: "DSA",
      difficulty: "Hard",
      question: "How would you find duplicates in an array of job applications?",
      hint: "Set of company+role keys.",
      sampleAnswer:
        "Build a Set of a composite key like company|role (normalized lowercase). If add() fails or has() is true, it is a duplicate. Time O(n), extra space O(n).",
    },
  ],
  hr: [
    {
      category: "HR",
      difficulty: "Easy",
      question: "Tell me about yourself.",
      hint: "Present → past → future, 60–90 seconds, tie to the role.",
      sampleAnswer:
        "I am a developer focused on MERN. I have built a job application tracker with React, Express, and MongoDB. I enjoy turning messy job-hunt data into a simple workflow. I want this intern role to ship real features with a team.",
    },
    {
      category: "HR",
      difficulty: "Easy",
      question: "Why do you want to intern here?",
      hint: "Company + role + what you will learn, not only salary.",
      sampleAnswer:
        "Pick 1–2 real things about the company (product, stack, users). Connect them to your projects. End with how you will contribute in the first month.",
    },
    {
      category: "HR",
      difficulty: "Medium",
      question: "Tell me about a project you built. What was hard?",
      hint: "STAR: Situation, Task, Action, Result.",
      sampleAnswer:
        "Situation: needed one place for job applications. Task: CRUD + stats UI. Action: designed schema, React table, Express API. Result: can filter by status and see interview counts. Hard part: keeping UI and API in sync — I added a shared data layer.",
    },
    {
      category: "HR",
      difficulty: "Medium",
      question: "Where do you see yourself in 2 years?",
      hint: "Growth, not a CEO speech.",
      sampleAnswer:
        "I want to be a confident full-stack engineer who can own a feature from schema to UI, write clearer code, and mentor newer interns. This role is the step for production habits.",
    },
    {
      category: "HR",
      difficulty: "Hard",
      question: "Describe a time you failed or got stuck. What did you do?",
      hint: "Honest bug + what you changed in your process.",
      sampleAnswer:
        "Pick a real bug (CORS, env, infinite useEffect). Explain how you debugged (logs, docs, isolate). End with a habit you kept: smaller PRs, error handling, or writing the API contract first.",
    },
  ],
  sql: [
    {
      category: "SQL",
      difficulty: "Easy",
      question: "What is the difference between WHERE and HAVING?",
      hint: "Row filter vs group filter.",
      sampleAnswer:
        "WHERE filters rows before grouping. HAVING filters after GROUP BY, so you can say HAVING COUNT(*) > 3.",
    },
    {
      category: "SQL",
      difficulty: "Medium",
      question: "INNER JOIN vs LEFT JOIN?",
      hint: "Matching rows vs keep left side.",
      sampleAnswer:
        "INNER JOIN returns only matching rows. LEFT JOIN returns all left rows and NULLs on the right if there is no match — useful for applications with no interviews yet.",
    },
  ],
  git: [
    {
      category: "Git",
      difficulty: "Easy",
      question: "What is the difference between git pull and git fetch?",
      hint: "Download vs download + merge.",
      sampleAnswer:
        "fetch downloads remote commits but does not change your branch. pull is fetch plus merge (or rebase), which updates your current branch.",
    },
    {
      category: "Git",
      difficulty: "Medium",
      question: "What is a merge conflict and how do you resolve it?",
      hint: "Same lines changed on two branches.",
      sampleAnswer:
        "Git cannot auto-combine both changes. You open the file, keep the correct code, remove conflict markers, then add and commit. Talk to the teammate if the intent is unclear.",
    },
  ],
};

const topicMatchers = [
  { id: "mern", labels: ["mern", "full stack", "fullstack", "mean"] },
  { id: "react", labels: ["react", "frontend", "front end", "jsx", "hooks"] },
  { id: "node", labels: ["node", "nodejs", "node.js", "backend", "express"] },
  { id: "mongodb", labels: ["mongo", "mongodb", "mongoose", "nosql"] },
  { id: "javascript", labels: ["javascript", "js", "es6", "closure"] },
  { id: "dsa", labels: ["dsa", "algorithm", "data structure", "coding round", "leetcode"] },
  { id: "hr", labels: ["hr", "behavioral", "tell me about yourself", "soft skill"] },
  { id: "sql", labels: ["sql", "mysql", "postgres", "join"] },
  { id: "git", labels: ["git", "github", "version control"] },
];

export function resolveTopic(query) {
  const q = query.toLowerCase();
  const hit = topicMatchers.find(({ labels }) => labels.some((label) => q.includes(label)));
  return hit?.id ?? null;
}

export function getBankQuestions(query) {
  const topic = resolveTopic(query);
  if (!topic) return null;

  const list = questions[topic];
  return {
    topic,
    topicLabel: topic.toUpperCase(),
    questions: list.map((item, index) => ({
      id: `${topic}-${index + 1}`,
      ...item,
    })),
  };
}

export const quickTopics = [
  "MERN stack interview questions",
  "React interview questions",
  "Node.js interview questions",
  "MongoDB interview questions",
  "DSA interview questions",
  "HR round questions",
];
