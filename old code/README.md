# NextZen AI Strategix - IT Consulting Website

A modern, premium IT consulting website built with Next.js 14, TypeScript, and cutting-edge animation libraries featuring smooth scrolling and interactive elements.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Smooth Animations**: Powered by Framer Motion, GSAP, and Lenis smooth scroll
- **Fully Responsive**: Optimized for all devices from mobile to desktop
- **Premium UI/UX**: Inspired by top IT consulting firms with gradient backgrounds and modern design
- **SEO Optimized**: Built with Next.js App Router for optimal performance
- **Interactive Components**: Hover effects, scroll animations, and micro-interactions

## 📦 Technologies

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: 
  - Framer Motion (Component animations)
  - GSAP (Advanced scroll animations)
  - Lenis (Smooth scrolling)
- **Icons**: Lucide React
- **UI Components**: Swiper (Carousels)
- **Scroll Detection**: React Intersection Observer

## 🛠️ Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Run development server**:
```bash
npm run dev
```

3. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts and providers
│   ├── page.tsx            # Main homepage
│   └── globals.css         # Global styles and Tailwind
├── components/
│   ├── SmoothScrollProvider.tsx  # Lenis smooth scroll wrapper
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section with animations
│   ├── Services.tsx        # Services showcase
│   ├── About.tsx           # About company section
│   ├── Expertise.tsx       # Technical expertise/skills
│   ├── CaseStudies.tsx     # Client success stories
│   ├── Testimonials.tsx    # Client testimonials
│   ├── Contact.tsx         # Contact form and info
│   └── Footer.tsx          # Footer with links
```

## 🎨 Key Features

### Smooth Scrolling
Implemented using Lenis for buttery-smooth scroll experience across all sections.

### Advanced Animations
- **Framer Motion**: Component-level animations and transitions
- **GSAP**: Scroll-triggered animations and complex sequences
- **Intersection Observer**: Trigger animations when elements enter viewport

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Adaptive layouts and typography

### Custom Theme
- Primary colors: Blue gradient
- Accent colors: Purple/Pink gradient
- Custom animations: fade-in, slide-up, scale-in, float
- Gradient backgrounds and effects

## 🚀 Build & Deploy

### Build for production:
```bash
npm run build
```

### Start production server:
```bash
npm start
```

### Lint code:
```bash
npm run lint
```

## 📝 Customization

### Update Colors
Edit `tailwind.config.ts` to modify the color scheme:
```typescript
colors: {
  primary: { /* your colors */ },
  accent: { /* your colors */ },
}
```

### Modify Content
- **Hero Section**: Edit `src/components/Hero.tsx`
- **Services**: Update service data in `src/components/Services.tsx`
- **Contact Info**: Change contact details in `src/components/Contact.tsx`

### Add New Sections
1. Create component in `src/components/`
2. Import in `src/app/page.tsx`
3. Add to navigation in `src/components/Header.tsx`

## 🌟 Performance

- **Lighthouse Score**: Optimized for 90+ scores
- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Components load on scroll

## 📧 Contact

For any inquiries about NextZen AI Strategix:
- Email: info@nextzenai.com
- Phone: +1 (555) 123-4567
- Location: San Francisco, CA

## 📄 License

This project is created for NextZen AI Strategix. All rights reserved.

## 🙏 Acknowledgments

- Design inspiration from leading IT consulting firms
- Animation libraries: Framer Motion, GSAP, Lenis
- UI components: Tailwind CSS, Lucide Icons
- Framework: Next.js by Vercel

---

**Built with ❤️ by the NextZen AI Strategix team**
