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

Exact dependency versions are available in `package.json`.

## Installation

1. Clone the repository: 

```bash
git clone https://github.com/amal-almahmud/UniLink.git
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


## Usage

1. Start the application using `npm run dev`.
2. Open the local URL displayed in the terminal.
3. Use a KFUPM university email to test the login and registration forms.
4. Navigate between the Team Seeker, Team Leader, and Opportunity Publisher areas from the dashboard.
5. Test forms, dropdown menus, buttons, validation messages, and navigation links.



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
├── AI_USAGE.md
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


## Team Members and Roles

- Amal Almahmud — Authentication, shared pages, reusable components, routing, and integration
- Daniah Aljufri — Team Leader pages and interactions
- Sara Almugbel — Team Seeker pages and interactions
- Sara Almulhim — Opportunity Publisher pages and interactions


## Figma Reference

The frontend implementation was developed based on the UniLink Figma prototype.

- [View the UniLink Figma prototype](https://www.figma.com/make/zHkBNT7qbisBhUq4T4j5DQ/UniLink-Prototype-Development?t=ycZocVSHWSlreaYb-20&fullscreen=1)


## Notes

- This repository currently contains the Phase 4 frontend implementation.
- The application uses sample data until backend integration is completed.
- Some features may be represented as interactive frontend prototypes.