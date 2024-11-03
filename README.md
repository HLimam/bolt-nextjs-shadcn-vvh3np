# MentHunt - IT Mentorship Platform

MentHunt is a modern platform connecting experienced IT professionals with aspiring developers for mentorship, guidance, and career growth.

## Features

- 🤝 Connect with experienced IT mentors
- 📚 Structured mentorship programs
- 💬 Real-time chat system
- 📅 Session scheduling and management
- 🎯 Progress tracking
- 🌐 Global mentor network
- 💰 Secure payment processing
- 📱 Responsive design
- 🔔 Real-time notifications

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Auth:** NextAuth.js v5
- **Database:** PostgreSQL with Prisma ORM
- **Real-time:** Socket.IO
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Forms:** React Hook Form + Zod
- **State Management:** React Context
- **Icons:** Lucide Icons
- **Server:** Custom WebSocket server for real-time features

## Prerequisites

- Node.js 18+ 
- PostgreSQL
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/menthunt?schema=public"
NEXTAUTH_SECRET="your-nextauth-secret-key-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# WebSocket Server
NEXT_PUBLIC_SOCKET_URL="http://localhost:3000"
PORT=3000

# OAuth Providers (Optional)
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/menthunt.git
cd menthunt
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

4. Start the development servers:
```bash
npm run dev
```

This will start both:
- Next.js development server at `http://localhost:3000`
- WebSocket server for real-time features (chat, notifications)

## Project Structure

```
├── app/                  # Next.js app router pages
├── components/          # Reusable components
├── lib/                 # Utility functions and configurations
├── prisma/             # Database schema and migrations
├── public/             # Static assets
├── server.ts           # WebSocket server for real-time features
├── src/
│   ├── application/    # Application logic and use cases
│   ├── domain/        # Domain models and interfaces
│   ├── infrastructure/# Repository implementations
│   └── providers/     # React Context providers
└── types/              # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start both Next.js and WebSocket servers
- `npm run dev:next` - Start Next.js development server only
- `npm run dev:server` - Start WebSocket server only
- `npm run build` - Build for production
- `npm start` - Start production servers
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## WebSocket Server Features

The custom WebSocket server (`server.ts`) handles:
- Real-time chat messaging
- Live notifications
- User presence (online/offline status)
- Typing indicators
- Session updates
- Real-time application status updates

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@menthunt.com or join our Discord community.