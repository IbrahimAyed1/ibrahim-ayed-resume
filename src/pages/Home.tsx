import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react'
import '../App.css'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getFirestoreDb, isFirebaseConfigured, missingFirebaseConfig } from '@/lib/firebase'
import {
  Menu,
  X,
  Globe,
  ShoppingCart,
  CalendarCheck,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  Code2,
  // Smartphone,
  Clock,
  ShieldCheck,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type ContactFormData = {
  name: string
  businessName: string
  email: string
  service: string
  message: string
}

const initialContactFormData: ContactFormData = {
  name: '',
  businessName: '',
  email: '',
  service: 'Business Website / Web App',
  message: '',
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay } }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Services', href: '#services' },
    // { label: 'Work', href: '#portfolio' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0A0A0F]/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E06C4F] flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">Ibrahim Ayed</span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-400 hover:text-[#E06C4F] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E06C4F] text-white text-sm font-medium hover:bg-[#d15f43] transition-colors"
            >
              Get a Quote <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <button
            type="button"
            className="lg:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#0A0A0F] border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-300 hover:text-[#E06C4F] py-2 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center py-3 rounded-lg bg-[#E06C4F] text-white font-medium"
              >
                Get a Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#0A0A0F]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#E06C4F_0%,_transparent_50%)] opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#2563eb_0%,_transparent_50%)] opacity-5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-6 bg-white/5 text-[#E06C4F] border-[#E06C4F]/30 hover:bg-white/10 px-4 py-1.5 text-sm">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" /> Web Developer in Muscat, Oman
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto"
          >
            Smart Digital Solutions for <span className="text-[#E06C4F]">Growing Businesses</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Freelance web developer based in Muscat. I build websites, web apps,
            e-commerce stores, booking systems, and business tools for businesses
            in Oman and worldwide.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#E06C4F] text-white font-semibold hover:bg-[#d15f43] transition-all hover:scale-105"
            >
              Start Your Project <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 text-white font-semibold border border-white/10 hover:bg-white/10 transition-all"
            >
              View Services <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-16 flex items-center justify-center gap-8 text-gray-400 text-sm"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#E06C4F]" /> Based in Muscat, building worldwide
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E06C4F]" /> Trusted by Growing Brands
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gray-600" />
      </div>
    </section>
  )
}

function ProblemSection() {
  const stats = [
    { icon: <Users className="w-6 h-6" />, value: '83%', label: 'of customers search online before buying' },
    { icon: <TrendingUp className="w-6 h-6" />, value: '2.5x', label: 'more growth when your digital tools support sales' },
    { icon: <Clock className="w-6 h-6" />, value: '24/7', label: 'your systems keep working after hours' },
  ]

  return (
    <section className="py-24 bg-[#0A0A0F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-white">
            No Smart System = <span className="text-[#E06C4F]">Missed Opportunities</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Your customers expect fast answers, simple actions, and smooth digital experiences. If your tools are slow or missing, growth gets harder.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className="bg-[#14141E] border-white/5 hover:border-[#E06C4F]/30 transition-colors h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#E06C4F]/10 flex items-center justify-center mx-auto mb-4 text-[#E06C4F]">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const services = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Websites & Web Apps',
      desc: 'Professional, fast, and mobile-friendly digital experiences that build trust and support real workflows.',
      features: ['Responsive Design', 'SEO Ready', 'Contact Forms', 'Custom Features'],
    },
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      title: 'E-Commerce',
      desc: 'Sell your products online with a secure store, payment integration, and easy product management.',
      features: ['Payment Integration', 'Product Catalog', 'Order Management', 'WhatsApp Orders'],
    },
    {
      icon: <CalendarCheck className="w-6 h-6" />,
      title: 'Booking Systems',
      desc: 'Let customers book appointments, tables, or services directly from your website.',
      features: ['Real-time Availability', 'SMS/Email Confirmations', 'Admin Dashboard', 'Calendar Sync'],
    },
  ]

  return (
    <section id="services" className="py-24 bg-[#0D0D14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4 bg-white/5 text-gray-300 border-white/10">Services</Badge>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-white">
            Built for <span className="text-[#E06C4F]">Growing Businesses</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-gray-400 max-w-2xl mx-auto">
            From e-commerce stores and booking systems to websites, web apps, and automation, I create digital solutions tailored to how your business actually works.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className="bg-[#14141E] border-white/5 hover:border-[#E06C4F]/30 transition-all hover:-translate-y-1 h-full">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E06C4F]/10 flex items-center justify-center mb-4 text-[#E06C4F]">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-[#E06C4F] shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  const steps = [
    { num: '01', title: 'Discovery Call', desc: 'We discuss your business, goals, and the digital solution you need.' },
    { num: '02', title: 'Design & Review', desc: 'I create a visual mockup. You review and request changes before any code is written.' },
    { num: '03', title: 'Build & Test', desc: 'Your solution is built with modern tech, fully tested on mobile and desktop.' },
    { num: '04', title: 'Launch & Support', desc: 'Go live with hosting setup included. I stay available for updates and support.' },
  ]

  return (
    <section className="py-24 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-white">
            Simple <span className="text-[#E06C4F]">4-Step</span> Process
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-gray-400 max-w-2xl mx-auto">
            No complicated jargon. No surprise fees. Just a straightforward path to your new digital solution.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="relative p-6 rounded-2xl bg-[#14141E] border border-white/5 h-full">
                <div className="text-4xl font-bold text-[#E06C4F]/20 mb-3">{step.num}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// function PortfolioSection() {
//   const projects = [
//     {
//       title: 'Al Noor Bakery',
//       category: 'E-Commerce',
//       desc: 'Online ordering for a local Muscat bakery with WhatsApp integration and daily menu updates.',
//       tags: ['Angular', 'Payment Integration', 'WhatsApp API'],
//       color: 'from-amber-500/20 to-orange-600/20',
//     },
//     {
//       title: 'Raha Fashion',
//       category: 'Business Website',
//       desc: 'Elegant catalog website for a boutique fashion store with Instagram feed and appointment booking.',
//       tags: ['Responsive', 'Instagram API', 'Booking System'],
//       color: 'from-pink-500/20 to-rose-600/20',
//     },
//     {
//       title: 'Pure Glow Cosmetics',
//       category: 'E-Commerce',
//       desc: 'Full online store with local bank payments, loyalty points, and delivery tracking for a cosmetics brand.',
//       tags: ['Angular', 'Bank Integration', 'Admin Dashboard'],
//       color: 'from-emerald-500/20 to-teal-600/20',
//     },
//   ]

//   return (
//     <section id="portfolio" className="py-24 bg-[#0D0D14]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: '-100px' }}
//           variants={staggerContainer}
//           className="text-center mb-16"
//         >
//           <motion.div variants={fadeInUp}>
//             <Badge className="mb-4 bg-white/5 text-gray-300 border-white/10">Portfolio</Badge>
//           </motion.div>
//           <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-white">
//             Work That <span className="text-[#E06C4F]">Speaks</span>
//           </motion.h2>
//           <motion.p variants={fadeInUp} className="mt-4 text-gray-400 max-w-2xl mx-auto">
//             Sample projects built for businesses like yours. Each one designed to drive real results.
//           </motion.p>
//         </motion.div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {projects.map((project, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.15 }}
//             >
//               <Card className="bg-[#14141E] border-white/5 overflow-hidden group hover:border-[#E06C4F]/30 transition-all h-full">
//                 <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
//                   <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
//                     <Smartphone className="w-8 h-8 text-white" />
//                   </div>
//                 </div>
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between mb-3">
//                     <h3 className="text-lg font-semibold text-white group-hover:text-[#E06C4F] transition-colors">
//                       {project.title}
//                     </h3>
//                     <Badge variant="outline" className="text-xs border-white/10 text-gray-400">
//                       {project.category}
//                     </Badge>
//                   </div>
//                   <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.desc}</p>
//                   <div className="flex flex-wrap gap-2">
//                     {project.tags.map((tag, j) => (
//                       <span key={j} className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-300">
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

function TestimonialsSection() {
  const testimonials = [
    {
      text: "We didn't have a website and were losing customers to competitors who did. Ibrahim built us a beautiful site with online ordering, and now 30% of our daily orders come through it.",
      name: 'Ahmed Al-Rashdi',
      role: 'Owner, Al Noor Bakery',
    },
    {
      text: "Professional, fast, and he actually understands how growing businesses work. The booking system he built saved us hours of phone calls every week.",
      name: 'Fatima Al-Balushi',
      role: 'Manager, Raha Fashion',
    },
  ]

  return (
    <section className="py-24 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-white">
            What Business Owners <span className="text-[#E06C4F]">Say</span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className="bg-[#14141E] border-white/5 h-full">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Zap key={s} className="w-4 h-4 text-[#E06C4F] fill-[#E06C4F]" />
                    ))}
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6">"{t.text}"</p>
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-sm text-gray-400">{t.role}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: '200',
      desc: 'Perfect for small businesses just getting online.',
      features: ['Single Page Website', 'Mobile Responsive', 'Contact Form', 'Google Maps', 'Social Links', '1 Revision Round'],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Business',
      price: '400',
      desc: 'For growing businesses that need more functionality.',
      features: ['Up to 5 Pages', 'Mobile Responsive', 'Contact & Quote Forms', 'Basic SEO Setup', 'Google Analytics', 'WhatsApp Integration', '3 Revision Rounds'],
      cta: 'Most Popular',
      popular: true,
    },
    {
      name: 'Growth',
      price: '700',
      desc: 'Full solution with e-commerce or booking features.',
      features: ['Up to 10 Pages', 'E-Commerce or Booking', 'Payment Integration', 'Admin Dashboard', 'Email/SMS Notifications', 'Speed Optimization', 'Unlimited Revisions'],
      cta: 'Start Building',
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-[#0D0D14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4 bg-white/5 text-gray-300 border-white/10">Pricing</Badge>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-white">
            Clear, <span className="text-[#E06C4F]">Honest</span> Pricing
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-gray-400 max-w-2xl mx-auto">
            No hidden fees. No surprises. You know exactly what you are paying for.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className={`relative h-full ${plan.popular ? 'border-[#E06C4F] bg-[#1a1514]' : 'bg-[#14141E] border-white/5'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#E06C4F] text-white border-none px-3">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                  {/* <div className="mt-4 mb-2">
                    <span className="text-sm text-gray-400">From</span>
                    <div>
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400 ml-1">OMR</span>
                    </div>
                  </div> */}
                  <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-[#E06C4F] shrink-0 mt-0.5" /> {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`block w-full text-center py-3 rounded-lg font-medium transition-colors ${
                      plan.popular
                        ? 'bg-[#E06C4F] text-white hover:bg-[#d15f43]'
                        : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {plan.cta}
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const faqs = [
    {
      q: 'I do not have a domain or hosting. Can you help?',
      a: 'Absolutely. I handle the technical setup including domain registration, hosting, and SSL certificate. You do not need to worry about any of that.',
    },
    {
      q: 'How long does it take to build a digital solution?',
      a: 'A Starter solution typically takes 1-2 weeks. Business and Growth packages take 3-4 weeks depending on features. I keep you updated throughout.',
    },
    {
      q: 'Can I update the solution myself after it is built?',
      a: 'Yes. I build with easy-to-manage systems. I will also give you a short training session so you can update text, images, and products on your own.',
    },
    {
      q: 'Do you offer payment in installments?',
      a: 'Yes. For Business and Growth packages, you can pay 50% upfront and 50% upon completion.',
    },
  ]

  return (
    <section className="py-24 bg-[#0A0A0F]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-white">
            Common <span className="text-[#E06C4F]">Questions</span>
          </motion.h2>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <div className="border-b border-white/5">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex items-center justify-between w-full py-5 text-left"
                >
                  <span className="text-white font-medium pr-4">{faq.q}</span>
                  {openIndex === i ? (
                    <ChevronUp className="w-5 h-5 text-[#E06C4F] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-gray-400 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>(initialContactFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus(null)

    if (!isFirebaseConfigured) {
      setStatus({
        type: 'error',
        message: `Firebase is not configured yet. Add these Vite env values: ${missingFirebaseConfig.join(', ')}.`,
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Dynamically import Firestore on first form submit, keeping it out of
      // the initial JS bundle. Subsequent submits reuse the cached modules.
      const [db, { addDoc, collection, serverTimestamp }] = await Promise.all([
        getFirestoreDb(),
        import('firebase/firestore'),
      ])

      if (!db) {
        throw new Error('Firestore is unavailable')
      }

      await addDoc(collection(db, 'contactMessages'), {
        ...formData,
        email: formData.email.trim().toLowerCase(),
        name: formData.name.trim(),
        businessName: formData.businessName.trim(),
        message: formData.message.trim(),
        source: 'website-contact-form',
        submittedAt: new Date().toISOString(),
        createdAt: serverTimestamp(),
      })

      setFormData(initialContactFormData)
      setStatus({
        type: 'success',
        message: 'Thanks, your message was sent successfully.',
      })
    } catch (error) {
      console.error('Failed to save contact message:', error)
      setStatus({
        type: 'error',
        message: 'Something went wrong while sending your message. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-[#0D0D14] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#E06C4F_0%,_transparent_60%)] opacity-5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4 bg-white/5 text-gray-300 border-white/10">Contact</Badge>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-white">
            Let Us <span className="text-[#E06C4F]">Talk</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Tell me about your business. I will reply within 24 hours with a free quote and honest advice.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#E06C4F]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">WhatsApp / Phone</div>
                    <a href="tel:+96890667053" className="text-white hover:text-[#E06C4F] transition-colors">
                      +968 90667053
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#E06C4F]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Email</div>
                    <a href="mailto:ibrahim@ibrahimayed.com" className="text-white hover:text-[#E06C4F] transition-colors">
                      ibrahim@ibrahimayed.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#E06C4F]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Location</div>
                    <div className="text-white">Muscat, available worldwide</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3">Quick Start</h3>
              <p className="text-gray-400 text-sm mb-4">
                Prefer WhatsApp? Send me a message and I will get back to you within a few hours.
              </p>
              <a
                // href="https://wa.me/+96890667053?text=Hello, I'm interested in your services."
                href="https://api.whatsapp.com/send?phone=96890667053&text=Hello%20I%20am%20interested%20in%20your%20services%F0%9F%A4%99"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-green-600/20 text-green-400 border border-green-600/30 hover:bg-green-600/30 transition-colors"
              >
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Card className="bg-[#14141E] border-white/5">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5" aria-labelledby="contact-form-heading">
                  <h3 id="contact-form-heading" className="sr-only">Contact form</h3>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm text-gray-300 mb-1.5">Name</label>
                      <Input
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        required
                        autoComplete="name"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#E06C4F]"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-business" className="block text-sm text-gray-300 mb-1.5">Business Name</label>
                      <Input
                        id="contact-business"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        placeholder="Your business"
                        autoComplete="organization"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#E06C4F]"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm text-gray-300 mb-1.5">Email</label>
                    <Input
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email"
                      placeholder="you@business.com"
                      required
                      autoComplete="email"
                      inputMode="email"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#E06C4F]"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-service" className="block text-sm text-gray-300 mb-1.5">Service Interested In</label>
                    <select
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white text-sm focus:border-[#E06C4F] focus:outline-none"
                    >
                      <option className="bg-[#14141E]">Business Website / Web App</option>
                      <option className="bg-[#14141E]">E-Commerce Store</option>
                      <option className="bg-[#14141E]">Booking System</option>
                      <option className="bg-[#14141E]">Something Else</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm text-gray-300 mb-1.5">Message</label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your business and what you need..."
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#E06C4F] min-h-[120px]"
                    />
                  </div>
                  {status && (
                    <p
                      role="status"
                      aria-live="polite"
                      className={`text-sm ${
                        status.type === 'success' ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {status.message}
                    </p>
                  )}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#E06C4F] hover:bg-[#d15f43] text-white py-6 text-base font-semibold disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#0A0A0F] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E06C4F] flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">Ibrahim Ayed</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#services" className="hover:text-[#E06C4F] transition-colors">Services</a>
            {/* <a href="#portfolio" className="hover:text-[#E06C4F] transition-colors">Work</a> */}
            <a href="#pricing" className="hover:text-[#E06C4F] transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-[#E06C4F] transition-colors">Contact</a>
          </div>

          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Ibrahim Ayed. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white font-sans">
      <Navbar />
      <Hero />
      <ProblemSection />
      <ServicesSection />
      <ProcessSection />
      {/* <PortfolioSection /> */}
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
