Sure! Below is a sample README file with instructions on how to set up and run the application locally.

---

# Quiz App

This is a simple Quiz application built with Next.js and Tailwind CSS. It supports Google authentication using NextAuth.js and includes both dark and light modes.

## Features

- 10 static quiz questions with four multiple-choice answers each.
- Immediate feedback on the correctness of answers.
- Tracking and display of user's score at the end of the quiz.
- Dark and light mode support.
- Google authentication using NextAuth.js.

## Getting Started

These instructions will help you set up and run the project locally.

### Prerequisites

- Node.js and npm installed on your machine. You can download and install them from [nodejs.org](https://nodejs.org/).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/quiz-app.git
   cd quiz-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root of the project and add the following environment variables. Replace the placeholder values with your actual values.

   ```plaintext
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_generated_secret
   ```

   To generate a secret, you can use OpenSSL:

   ```bash
   openssl rand -base64 32
   ```

4. **Set up Google OAuth credentials:**

   - Go to [Google Cloud Console](https://console.cloud.google.com/).
   - Navigate to "APIs & Services" > "Credentials".
   - Create an OAuth 2.0 Client ID.
   - Configure the consent screen and set the application type to "Web application".
   - Add `http://localhost:3000` to "Authorized JavaScript origins".
   - Add `http://localhost:3000/api/auth/callback/google` to "Authorized redirect URIs".
   - Save your Client ID and Client Secret and add them to your `.env.local` file as shown above.

### Running the Application

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Open your browser and visit:**

   ```
   http://localhost:3000
   ```

3. **Sign in with Google:**

   Click the "Sign in with Google" button to authenticate using your Google account.

4. **Take the Quiz:**

   Once signed in, you can start the quiz and see your score at the end.

### Deploying on Vercel

To deploy your application on Vercel:

1. **Push your code to GitHub (or any other Git repository).**

2. **Import your project to Vercel:**

   - Go to [Vercel](https://vercel.com/).
   - Click on "New Project" and import your repository.
   - During the import, Vercel will detect the environment variables from your `.env.local` file. Make sure to add these environment variables in Vercel as well:
     - `GOOGLE_CLIENT_ID`: your Google Client ID
     - `GOOGLE_CLIENT_SECRET`: your Google Client Secret
     - `NEXTAUTH_URL`: `https://your-vercel-app.vercel.app` (replace with your actual Vercel URL)
     - `NEXTAUTH_SECRET`: your generated secret

3. **Deploy the project.**

4. **Access your deployed application:**

   Visit `https://your-vercel-app.vercel.app` to see your live application.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to modify the instructions based on your specific setup and repository details.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
