# 🏥 Doctor Appointment System

A modern, responsive web application for managing doctor appointments built with Next.js 13, TypeScript, and Tailwind CSS.

## ✨ Features

- 📅 **Interactive Calendar** - View and manage appointments by date
- 👨‍⚕️ **Doctor Management** - Add, edit, and manage doctor profiles
- 🕐 **Schedule Management** - Flexible appointment scheduling system
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎨 **Modern UI** - Clean interface with shadcn/ui components
- ⚡ **Real-time Updates** - Instant appointment status updates

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd "final doctor appointment"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Built With

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **State Management**: React Context API

## 📁 Project Structure

```
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Navigation.tsx    # App navigation
│   ├── DoctorSchedule.tsx # Doctor scheduling
│   └── CalendarView.tsx  # Calendar interface
├── context/              # React context providers
├── data/                 # Mock data
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── types/                # TypeScript type definitions
```

## 🎯 Core Functionality

### Appointment Management
- Create new appointments
- Edit existing appointments
- Cancel appointments
- View appointment history

### Doctor Management
- Add new doctors
- Manage doctor schedules
- Set availability hours
- Specialty assignments

### Calendar Features
- Monthly/weekly view
- Date-specific appointment filtering
- Visual appointment indicators
- Quick appointment creation

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
npx vercel
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

The app uses Tailwind CSS for styling. Customize the theme in:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - Global styles

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Made with ❤️ for better healthcare management**
