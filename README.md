# Academic Path Recommendation Engine

An AI-powered web application that provides personalized academic pathway recommendations based on user qualifications, experience, profession, and career aspirations.

## Features

- **AI-Powered Recommendations**: Uses Groq's Llama 3.3 70b model to generate personalized academic path suggestions
- **User Profile Form**: Collects comprehensive user information including:
  - Full name and email
  - Highest qualification (10th, 12th, Diploma, Bachelor's, Master's, PhD)
  - Years of experience
  - Current profession
  - Career goals
- **Email Notifications**: Sends recommendations via email using Resend
- **Submission Tracking**: Stores all submissions in Supabase database
- **Responsive Design**: Mobile-friendly interface with modern styling
- **Real-time Results**: Displays recommendations instantly with detailed reasoning

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- CORS

### Database & Services
- Supabase (Database)
- Groq SDK (AI recommendations)
- Resend (Email service)

## Project Structure

```
academic-path-recommendation/
├── frontend/
│   ├── css/
│   │   ├── style.css
│   │   └── responsiveness.css
│   ├── js/
│   │   ├── api.js
│   │   ├── form.js
│   │   └── submission.js
│   ├── index.html
│   └── Submissions.html
└── server/
    ├── controllers/
    │   ├── recommendationController.js
    │   └── submissionController.js
    ├── database/
    │   └── supabaseClient.js
    ├── routes/
    │   ├── recommendationRoutes.js
    │   └── submissionRoutes.js
    ├── services/
    │   ├── aiservice.js
    │   └── emailService.js
    ├── utils/
    │   └── promptTemplate.js
    ├── .env
    ├── package.json
    └── server.js
```

## Prerequisites

- Node.js
- npm
- Supabase account
- Groq API key
- Resend API key

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd academic-path-recommendation
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5000
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-anon-key
GROQ_API_KEY=your-groq-api-key
RESEND_API_KEY=your-resend-api-key
```

### 4. Set up Supabase database

Create a table named `submissions` in your Supabase project with the following schema:

```sql
CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    fullname TEXT,
    email TEXT,
    qualification TEXT,
    experience INTEGER,
    profession TEXT,
    career_goal TEXT,
    recommendation TEXT,
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Running the Application

### Start the backend server

```bash
cd server
node server.js
```

The server will run on `http://localhost:5000`

### Serve the frontend

You can use any static file server to serve the frontend. For example, using Live Server in VS Code or Python:

```bash
# Using Python 3
cd frontend
python -m http.server 5500
```

The frontend will be available at `http://localhost:5500`

## API Endpoints

### POST /api/recommendations

Generates an academic path recommendation based on user profile.

**Request Body:**
```json
{
    "fullname": "Santhosh Kumar",
    "email": "santhosh@gmail.com",
    "qualification": "Bachelor's Degree",
    "experience": 2,
    "profession": "Software Engineer",
    "careerGoal": "AI Engineer"
}
```

**Response:**
```json
{
    "recommendation": "Master's in Artificial Intelligence",
    "reason": "Based on your background..."
}
```

### GET /api/submissions

Retrieves all submissions from the database.

**Response:**
```json
[
    {
        "id": 1,
        "fullname": "Santhosh Kumar",
        "email": "santhosh@gmail.com",
        "qualification": "Bachelor's Degree",
        "experience": 2,
        "profession": "Software Engineer",
        "career_goal": "AI Engineer",
        "recommendation": "Master's in Artificial Intelligence",
        "reason": "Based on your background...",
        "created_at": "2025-01-01T00:00:00Z"
    }
]
```

## Configuration

### CORS Configuration

The server is configured to accept requests from:
- `https://academic-path-recommendation-engine.vercel.app`
- `http://localhost:5500`
- `http://127.0.0.1:5500`

To add more origins, modify the `cors` configuration in `server/server.js`.

### AI Model Configuration

The AI service uses Groq's `llama-3.3-70b-versatile` model with:
- Temperature: 0.5
- Max tokens: 1024
- Response format: JSON

To modify these settings, edit `server/services/aiservice.js`.

## Deployment

### Backend Deployment

1. Deploy the Node.js server to a platform like:
   - Render

2. Ensure all environment variables are configured in the deployment platform

### Frontend Deployment

1. Deploy the frontend to:
   - Vercel

2. Update the API endpoint in `frontend/js/api.js` to point to your deployed backend URL
