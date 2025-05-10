# Remind-Me: Task Management Application

A full-stack to-do list application built with Next.js, TypeScript, and SQLite. Designed for simplicity and productivity.

## Features

- Create, update, and delete tasks with due dates
- User authentication via Clerk.js
- Persistent data storage using SQLite with Prisma ORM
- Responsive UI with Tailwind CSS

## Technologies Used

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: Clerk.js

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Clerk.js account (for authentication)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dwi4122/remind-me.git
  ``
2. Install dependencies:
```bash

npm install
```
3. Set up environment variables:

    Create a .env file based on .env.example

    Add your Clerk.js credentials

4. Run the development server:
```bash

npm run dev
```

## Project Structure

remind-me/
  - components/      # React components
  
  - lib/             # Utility functions
  
  - pages/           # Next.js routes
  
  - prisma/          # Database schema
  
  - styles/          # Global styles
  
  - types/           # TypeScript interfaces
  

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss proposed changes.

