# Role-Based Ticketing System

A full-stack MERN application for managing support tickets with role-based access. Administrators can view and update all support tickets, while standard users can only view and create their own tickets.

## Features

- **User Registration & Login:** Users can sign up and log in.
- **Role-Based Access:** Admins have access to an admin dashboard; standard users have a user dashboard.
- **Ticket Management:** Users can create new support tickets, and admins can update ticket statuses.
- **Responsive UI:** Built with React and styled using Tailwind CSS for a modern look.
- **JWT Authentication:** Secure authentication with JSON Web Tokens.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Bcrypt
- **Deployment:** Render/Heroku for backend & Netlify/Vercel for frontend


## Live Demo <a name="live-demo"></a>

To see this project's live demo, please click [here](https://role-based-ticketing.netlify.app/).

---

## Setup & Installation

### Prerequisites

- Node.js (>= 14.x)
- npm / yarn
- MongoDB Atlas account or local MongoDB instance

### Clone the Repository

```bash
git clone https://github.com/Besufekad-HAZ/Role-Based-Ticketing-System.git
cd Role-Based-Ticketing-System
```

Backend Setup

 1.Navigate to the backend folder:

 ```bash
  cd backend
 ```

 2.Install dependencies:

 ```bash
  cd backend
 ```

 3.Create a .env file in the backend root with the following (update with your own secrets if needed):

 ```bash
  MONGODB_URI=...
  JWT_SECRET=
  PORT=5000
 ```

 4.Start the backend server:

  ```bash
  npm start
  ```

## Frontend Setup

 1.Navigate to the frontend folder:

  ```bash
  cd ../frontend
  ```

 2.Install dependencies:

  ```bash
  npm install
  ```

3.Start the React development server:

 ```bash
  npm run dev
  ```

The app will typically run on http://localhost:5173

4.Important: Update the API base URL in your Axios instance (located in /src/services/api.js) when deploying:

```bash
const instance = axios.create({
  baseURL: "http://localhost:5000/api", // Update this to your deployed backend URL
});
```

## Deployment

### Backend Deployment

You can deploy your backend using Render or [Heroku]:

- Push your backend code to GitHub.
- Create a new Node web service on Render/Heroku.
- Set the build command (npm install) and start command (node server.js or npm start).
- Add your environment variables through the provider’s dashboard.

### Frontend Deployment

Deploy your frontend using Netlify or Vercel:

- Push your frontend repository to GitHub.
- Connect your repository to Netlify or Vercel.
- Set the build command (npm run build) and publish directory (build).
- Update the API base URL in your Axios configuration so the frontend points to your deployed backend.


## 🤝 Contributing <a name="contributing"></a>

_Contributions, issues, and feature requests are welcome!_

_Feel free to check the [issues page](https://github.com/Besufekad-HAZ/Chat-App/issues)._

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ❤️ Show your support <a name="️support"></a>

_If you like this project, please give it a ⭐️ !_

## 📝 License <a name="license"></a>

_This project is [MIT](./LICENSE) licensed._

## 🙏 Acknowledgments <a name="acknowledgments"></a>
Built with ❤️ using the MERN stack.
Tailwind CSS for modern UI styling.
