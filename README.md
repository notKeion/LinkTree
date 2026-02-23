<div align="center" id="top" className="mb-10">
<img src="./public/assets/logo.webp" alt="icon" width="150" height="150" />

&#xa0;

  <img src="./public/banner.png" alt="preview" />

<a href="https://jj-linktri.vercel.app/">Demo</a>

</div>

# Fullstack Linktri Clone

This project is a fullstack clone of Linktree built with Next.js, Tailwind CSS, and MongoDB. It allows users to create a personalized page with links to their content across the internet, customize their profile, and view analytics on their links.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Authentication**: Secure login and registration system.
- **Hero Form Registration**: Enhanced registration form with real-time validation.
- **User Panel**: A dashboard for users to customize their profile, manage links, and view analytics.
  - **Sidebar**: Easy navigation within the user panel.
  - **Basic Profile Info**: Users can update their basic information like name, bio, and profile picture.
  - **Buttons**: Customizable buttons for social media and other links.
  - **Links**: Users can add, edit, and organize links that appear on their public page.
- **Public Page**: A personalized public page for each user, showcasing their profile info, links, and buttons.
- **Analytics**: Insights on how many clicks each link receives.
- **Deployment**: Guide on deploying the project to production.

## Technology Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: NextAuth
- **Deployment**: Vercel, MongoDB Atlas

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/jeffjiang13/Linktree.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a `.env.local` file and add your MongoDB URI and NextAuth URL
   ```sh
   MONGO_URI=your_mongodb_uri # This can be obtained from MongoDB Atlas after creating a cluster and database.
   NEXTAUTH_URL=http://localhost:3000

   # Google OAuth credentials (for Google authentication)
   GOOGLE_CLIENT_ID="your_google_client_id" # This can be obtained from the Google Cloud Console after creating a project and OAuth 2.0 credentials.
   GOOGLE_CLIENT_SECRET="your_google_client_secret" # This can also be obtained from the Google Cloud
   ```
   Ensure when you create the google auth credentials, you set the authorized redirect URI to: 
   - `http://localhost:3000/api/auth/callback/google` for local development.
   - `https://your-deployment-url/api/auth/callback/google` for production. 

4. Run the development server
   ```sh
   npm run dev
   ```

## Project Structure

- `pages/api`: Backend logic and API routes.
- `pages`: Frontend pages and components.
- `components`: Reusable UI components.
- `models`: Mongoose models for MongoDB.
- `styles`: Global styles and Tailwind configuration.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

## License

Distributed under the MIT License. See `LICENSE` for more information.
