# Miguel Miranda Portfolio

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://miguel-miranda-portfolio.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC)](https://tailwindcss.com/)

My personal portfolio built with modern technologies and web development best practices.

🌐 [View Demo](https://miguel-miranda-portfolio.vercel.app/)

## 🚀 Features

- ⚡ **Optimized Performance** with Next.js 15 and Turbopack
- 🎨 **Responsive Design** using TailwindCSS 4
- 🔄 **Smooth Animations** with Framer Motion and Anime.js
- 🌓 **Modern Design** with glassmorphism effects and particles
- 📧 **Functional Contact Form** with validation and notifications
- 🔍 **Search and Filter** projects with debouncing
- 📱 **Fully Responsive** across all devices
- ✍️ **Typewriter Effect** for dynamic text animations
- 🎭 **Advanced Animations** with custom CSS animations

## 🛠️ Technologies Used

- **Framework**: Next.js 15
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 4
- **Animations**: Framer Motion + Anime.js
- **Forms**: React Hook Form + Zod
- **Email**: Nodemailer
- **UI/UX**:
  - React Hot Toast
  - Lucide Icons
  - Particles
  - Custom Tilt Effect
  - Typewriter Effect
  - Custom CSS Animations

## 📦 Main Dependencies

```json
{
  "dependencies": {
    "next": "15.3.1",
    "react": "19.0.0",
    "framer-motion": "^12.7.5",
    "tailwindcss": "^4",
    "react-hook-form": "^7.56.1",
    "zod": "^3.24.3",
    "nodemailer": "^6.10.1",
    "react-hot-toast": "^2.5.2",
    "lucide-react": "^0.503.0",
    "lodash": "^4.17.21",
    "animejs": "^4.0.2",
    "react-simple-typewriter": "^5.0.1"
  }
}
```

## 🚀 Installation and Usage

1. **Clone the repository**

   ```bash
   git clone <your-repository>
   cd miguel-portfolio
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the project root:

   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```

   Note: For Gmail, you need to use an "App Password"

4. **Start development server**

   ```bash
   pnpm dev
   ```

5. **Build for production**
   ```bash
   pnpm build
   pnpm start
   ```

## 📁 Project Structure

```
miguel-portfolio/
├── app/
│   ├── components/     # Reusable components
│   ├── actions/        # Server Actions
│   ├── lib/           # Utilities and helpers
│   ├── hooks/         # Custom React hooks
│   ├── store/         # State management
│   ├── types/         # TypeScript types
│   ├── data/          # Static data (projects)
│   ├── (Home)/        # Home page components
│   ├── (projects)/    # Projects page components
│   └── (contact)/     # Contact page components
├── public/            # Static files
└── styles/           # Global styles
```

## 🔍 Detailed Features

### Projects System

- Category filtering
- Debounced search
- Technology visualization
- Rotating featured project
- Smooth transitions and animations

### Contact Form

- Zod validation
- Toast notifications
- Nodemailer email sending
- Error handling
- Loading states

### Animations and UI

- Custom hover effects
- Entry/exit animations
- Background particles effect
- Card tilt effect
- Typewriter text animations
- Custom CSS animations
- Smooth page transitions

## 📱 Responsive Design

The portfolio is optimized for:

- 📱 Mobile (< 640px)
- 📱 Tablet (640px - 1024px)
- 💻 Desktop (> 1024px)

## 🤝 Contributing

Contributions are welcome. Please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Miguel Miranda**

- Portfolio: [miguel-miranda-portfolio.vercel.app](https://miguel-miranda-portfolio.vercel.app/)
- GitHub: [@mirchez](https://github.com/mirchez)
- LinkedIn: [Miguel Miranda](https://linkedin.com/in/mirchez)

## 🌟 Key Features

- **Modern Tech Stack**: Built with Next.js 15, TypeScript 5, and TailwindCSS 4
- **Performance**: Optimized with Turbopack and Server Components
- **User Experience**: Smooth animations and intuitive interface
- **Maintainability**: Clean code structure and TypeScript integration
- **Accessibility**: Semantic HTML and keyboard navigation
- **SEO**: Meta tags and optimized content structure
- **Security**: Environment variables and secure form handling
- **Animations**: Advanced animations with Framer Motion and Anime.js
