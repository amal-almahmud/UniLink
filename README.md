# UniLink


## About UniLink
UniLink is a platform designed to connect KFUPM students with university opportunities and suitable teammates. Students can explore and save opportunities, find or create teams, and track their applications and invitations in one organized place. It also enables team leaders to manage members and applications, while authorized publishers can share academic, research, and extracurricular opportunities with students.

## Phase 4: Frontend Development

Phase 4 focuses on implementing the user interface using React. The current version uses sample data for demonstrating the interface and interactions. Backend and database integration are not included in this phase.

## Features

- User registration and login
- Forgot and reset password pages
- Student dashboard
- Notifications
- Student profile and settings
- Browse and save opportunities
- Find or create a team
- Manage team applications and members
- Publish university opportunities
- Responsive interface for different screen sizes

## Technologies Used

- React
- Vite
- JavaScript
- CSS
- React Router
- Lucide React

## Installation

1. Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

2. Open the project directory:

```bash
cd UniLink
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL displayed in the terminal.

## Production Build

To verify that the project builds successfully:

```bash
npm run build
```

## Project Structure

```text
UniLink/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── common/
│   ├── layouts/
│   ├── pages/
│   │   ├── auth/
│   │   ├── opportunityPublisher/
│   │   ├── shared/
│   │   ├── teamLeader/
│   │   └── teamSeeker/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── README.md
```


## Testing

The frontend was tested by:

- Running the Vite development server
- Opening and reviewing all available pages
- Testing navigation links and buttons
- Checking the browser console for errors
- Running the production build command

## Team Members

- Amal Almahmud
- Daniah Aljufri
- Sara Almulhim
- Sara Almugbel


## Notes

- This repository currently contains the Phase 4 frontend implementation.
- The application uses sample data until backend integration is completed.
- Some features may be represented as interactive frontend prototypes.