# 🌌 Parallel Me

### Explore the Life You Could Have Lived.

**Parallel Me** is an interactive web application that helps users explore different life possibilities by creating scenarios and comparing potential outcomes. It offers a simple way to imagine alternative decisions, reflect on personal goals, and discover how different choices might shape the future.

---

## ✨ Features

- 🏠 **Home Page** — A welcoming introduction to the Parallel Me experience.
- 📊 **Personal Dashboard** — View and manage your saved life scenarios in one place.
- ✍️ **Create Scenarios** — Build alternative life situations and explore different possibilities.
- ⚖️ **Compare Scenarios** — Compare outcomes to better understand the differences between your choices.
- 📈 **Results & Insights** — Explore scenario results, including happiness and productivity indicators.
- 🔍 **Search & Filter** — Find scenarios quickly and organize them based on your preferences.
- ↕️ **Sorting Options** — Organize scenarios for easier navigation.
- 💾 **Local Storage** — Keep your scenarios saved in your browser.
- 📤 **Backup & Restore** — Export your scenarios and import them later.
- 🔔 **Toast Notifications** — Receive feedback when performing important actions.
- 📱 **Responsive Design** — Enjoy a user-friendly interface across different screen sizes.

---

## 🛠️ Built With

- **React** — Building interactive user interfaces.
- **React Router DOM** — Navigation between application pages.
- **JavaScript (ES6+)** — Application logic and interactions.
- **HTML5** — Application structure.
- **CSS3** — Styling and layout.
- **Local Storage API** — Saving scenarios locally in the browser.
- **Vite** — Development server and build tool.

---

## 📂 Project Structure

```text
parallel-me/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── CreateScenario.jsx
│   │   ├── Compare.jsx
│   │   ├── About.jsx
│   │   └── Profile.jsx
│   ├── utils/
│   │   └── scenarioBackup.js
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── index.html
├── package.json
└── README.md
```

*Note: The structure above is illustrative. Your actual folders and filenames may differ.*

---

## 🚀 Getting Started

Follow these steps to run Parallel Me on your computer.

### 1. Clone the Repository

```bash
git clone https://github.com/nayrasharaky/parallel-me.git
```

### 2. Open the Project Folder

```bash
cd parallel-me
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open the Application

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

---

## 💾 Data Storage & Backup

Parallel Me uses the browser's **Local Storage** to save scenarios locally.

- Saved scenarios can remain available when you revisit the application in the same browser.
- Export your scenarios to create a backup.
- Import a previously exported backup to restore your data.
- Clearing browser storage may remove locally saved scenarios.

**Important:** Local Storage is browser-specific and is not cloud synchronization. Keep a backup of important scenarios.

---

## 🎯 Project Goals

Parallel Me was created to demonstrate how a modern React application can combine interactive user interfaces, client-side routing, data management, scenario comparison, and backup functionality in one project.

The project focuses on:

- Improving decision-making through alternative scenarios.
- Encouraging self-reflection and exploration of possibilities.
- Practicing reusable React components and state management.
- Building a complete, organized, and user-friendly web application.

---

## 🔮 Future Improvements

- User authentication and personal accounts.
- Cloud database integration for persistent online storage.
- AI-powered scenario suggestions.
- More advanced comparison charts and analytics.
- Sharing scenarios with other users.
- Personalized recommendations based on user goals.

---

## 👩‍💻 Author

**Nayra Sharaky**

GitHub: [@nayrasharaky](https://github.com/nayrasharaky)

---

## 📄 License

This project was developed for educational and portfolio purposes.
