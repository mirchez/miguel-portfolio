# Miguel Miranda Portfolio

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://miguel-miranda-portfolio.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC)](https://tailwindcss.com/)

My personal portfolio built with modern technologies and web development best practices.

🌐 [View Demo](https://miguel-miranda-portfolio.vercel.app/)

## 🚀 Features

- ⚡ **Optimized Performance** with Next.js 14 and Server Components
- 🎨 **Responsive Design** using TailwindCSS
- 🔄 **Smooth Animations** with Framer Motion
- 🌓 **Modern Design** with glassmorphism effects and particles
- 📧 **Functional Contact Form** with validation and notifications
- 🔍 **Search and Filter** projects with debouncing
- 📱 **Fully Responsive** across all devices

## 🛠️ Technologies Used

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Email**: Nodemailer
- **UI/UX**:
  - React Hot Toast
  - Lucide Icons
  - Particles
  - Custom Tilt Effect

## 📦 Main Dependencies

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "framer-motion": "^10.x",
    "tailwindcss": "^3.x",
    "react-hook-form": "^7.x",
    "zod": "^3.x",
    "nodemailer": "^6.x",
    "react-hot-toast": "^2.x",
    "lucide-react": "^0.x",
    "lodash": "^4.x"
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
│   └── data/          # Static data (projects)
├── public/            # Static files
└── styles/           # Global styles
```

## 🔍 Detailed Features

### Projects System

- Category filtering
- Debounced search
- Technology visualization
- Rotating featured project

### Contact Form

- Zod validation
- Toast notifications
- Nodemailer email sending
- Error handling

### Animations and UI

- Custom hover effects
- Entry/exit animations
- Background particles effect
- Card tilt effect

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

- **Modern Tech Stack**: Built with Next.js 14, TypeScript, and TailwindCSS
- **Performance**: Optimized with Server Components and dynamic imports
- **User Experience**: Smooth animations and intuitive interface
- **Maintainability**: Clean code structure and TypeScript integration
- **Accessibility**: Semantic HTML and keyboard navigation
- **SEO**: Meta tags and optimized content structure
- **Security**: Environment variables and secure form handling
