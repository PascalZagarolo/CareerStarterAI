# CareerStarter AI 🚀

CareerStarter is an AI-powered platform designed to help you discover your ideal career path, create perfect resumes, and get personalized roadmaps for your professional journey.

![CareerStarter Banner](https://placehold.co/1200x400/indigo/white?text=CareerStarter+AI)

## ✨ Features

- **Career Path Finder**: Discover careers aligned with your skills, interests, and values
- **AI Resume Builder**: Create professionally designed resumes tailored to specific job descriptions
  - **Profile Picture Upload**: Add a professional profile picture to your resume with drag-and-drop functionality
  - **Multiple Templates**: Choose from various professional templates (Classic, Modern, Creative, Executive, Startup)
  - **Custom Color Schemes**: Personalize your resume with different color combinations
- **Cover Letter Generator**: Generate personalized cover letters in seconds
- **Personalized Roadmaps**: Get step-by-step guidance on how to transition into your desired career
- **Skills Analysis**: Identify skill gaps and get recommendations on how to fill them

## 🛠️ Technology Stack

- **Framework**: Next.js 15
- **Frontend**: React 19, TailwindCSS 4, Framer Motion
- **Authentication**: Supabase Auth
- **Database**: Supabase
- **Payments**: Stripe
- **AI Integration**: OpenAI API

## 📋 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn
- Supabase account
- OpenAI API key
- Stripe account (for payment processing)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/careerstarter-ai.git
cd careerstarter-ai
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with your environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
OPENAI_API_KEY=your-openai-api-key
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🚀 Deployment

The project is configured to be deployed on Vercel. Connect your GitHub repository to Vercel and it will automatically deploy your application.

## 📖 Project Structure

```
careerstarter-ai/
├── app/                  # App router structure
│   ├── (auth)/           # Authentication pages (login, signup)
│   ├── (dashboard)/      # Dashboard and user features
│   ├── (features)/       # Feature pages
│   ├── about/            # About page
│   ├── api/              # API routes
│   ├── page.tsx          # Landing page
│   └── layout.tsx        # Root layout
├── public/               # Static assets
├── src/                  # Source files
├── next.config.ts        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Project dependencies
```

## 💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

For any questions or feedback, please reach out at support@careerstarter.de
