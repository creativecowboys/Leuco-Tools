import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  User, 
  ShoppingCart, 
  ChevronRight, 
  Menu, 
  X, 
  ArrowRight, 
  Settings, 
  Wrench, 
  Zap, 
  ShieldCheck,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const LeucoLogo = () => (
  <div className="flex items-center gap-2 font-extrabold text-2xl tracking-tighter">
    <div className="bg-leuco-purple text-white p-1 rounded-sm">LEUCO</div>
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'PRODUCTS', items: ['Saw Blades', 'CNC Tooling', 'Through-Feed', 'Hand Tools'] },
    { name: 'SOLUTIONS', items: ['Furniture', 'Flooring', 'Construction', 'Aerospace'] },
    { name: 'SERVICE', items: ['Re-sharpening', 'Consulting', 'Technical Support'] },
    { name: 'COMPANY', items: ['About Us', 'Careers', 'Locations', 'News'] },
  ];

  const systems = [
    {
      title: 'HP+ SPIRALS',
      subtitle: 'HIGH PERFORMANCE CUTTING',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
      color: 'bg-leuco-purple'
    },
    {
      title: 'DIAMOND TOOLING',
      subtitle: 'MAXIMUM DURABILITY',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800',
      color: 'bg-leuco-black'
    },
    {
      title: 'SAW BLADES',
      subtitle: 'PRECISION CUTTING',
      image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=800',
      color: 'bg-leuco-purple'
    }
  ];

  const featuredTools = [
    {
      id: 1,
      name: 'HP+ Mortise Compression Spiral',
      category: 'CNC TOOLING',
      image: 'https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?auto=format&fit=crop&q=80&w=400',
      price: '$124.99'
    },
    {
      id: 2,
      name: 'G5-System Saw Blade',
      category: 'SAWING',
      image: 'https://images.unsplash.com/photo-1572916118970-fb5c8a1cb3d1?auto=format&fit=crop&q=80&w=400',
      price: '$89.50'
    },
    {
      id: 3,
      name: 'p-System Jointing Cutter',
      category: 'THROUGH-FEED',
      image: 'https://images.unsplash.com/photo-1516216628859-9bccecab13ca?auto=format&fit=crop&q=80&w=400',
      price: '$345.00'
    },
    {
      id: 4,
      name: 'Diamond Shank Cutter',
      category: 'CNC TOOLING',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=400',
      price: '$210.00'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Utility Nav */}
      <div className="bg-leuco-black text-white text-[10px] font-bold tracking-widest py-2 px-4 md:px-12 flex justify-between items-center border-b border-white/10">
        <div className="flex gap-6">
          <a href="#" className="hover:text-leuco-purple transition-colors">WHERE TO BUY</a>
          <a href="#" className="hover:text-leuco-purple transition-colors">RE-SHARPENING</a>
          <a href="#" className="hover:text-leuco-purple transition-colors">EDUCATION</a>
        </div>
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-1 cursor-pointer hover:text-leuco-purple transition-colors">
            <Globe size={12} />
            <span>EN / US</span>
          </div>
          <a href="#" className="hover:text-leuco-purple transition-colors">CONTACT</a>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-xl py-2' : 'bg-white py-4'} border-b border-gray-100`}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-12">
            <LeucoLogo />
            <div className="hidden lg:flex gap-8">
              {navLinks.map((link) => (
                <div key={link.name} className="group relative py-4">
                  <button className="text-sm font-extrabold tracking-tight hover:text-leuco-purple transition-colors flex items-center gap-1">
                    {link.name}
                  </button>
                  <div className="absolute top-full left-0 w-48 bg-white shadow-2xl border-t-2 border-leuco-purple opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-4">
                    {link.items.map(item => (
                      <a key={item} href="#" className="block px-6 py-2 text-xs font-bold hover:bg-gray-50 hover:text-leuco-purple">
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center bg-gray-100 rounded-sm px-3 py-2 w-64">
              <Search size={18} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search tools, parts..." 
                className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2 font-medium"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User size={22} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <ShoppingCart size={22} />
                <span className="absolute top-0 right-0 bg-leuco-purple text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
              </button>
              <button 
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 z-[60] bg-white lg:hidden"
          >
            <div className="p-6 flex justify-between items-center border-b">
              <LeucoLogo />
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={28} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {navLinks.map(link => (
                <div key={link.name} className="space-y-4">
                  <h3 className="text-xl font-black text-leuco-purple">{link.name}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {link.items.map(item => (
                      <a key={item} href="#" className="text-sm font-bold text-gray-600">{item}</a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[85vh] bg-leuco-black overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-40"
            alt="Industrial Tooling"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-leuco-black via-leuco-black/60 to-transparent" />
        </div>
        
        <div className="relative h-full max-w-[1440px] mx-auto px-4 md:px-12 flex flex-col justify-center items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">
              NEW HP+ SPIRALS LINE
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter">
              NEVER A DULL <br />
              <span className="text-leuco-purple">MOMENT.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 font-medium max-w-lg">
              Introducing the next generation of high-performance spirals. Engineered for maximum precision and tool life in the most demanding materials.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-leuco-purple hover:bg-white hover:text-leuco-purple text-white font-black px-10 py-5 transition-all duration-300 flex items-center gap-3 group">
                SHOP THE LINE <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-leuco-black font-black px-10 py-5 transition-all duration-300">
                LEARN MORE
              </button>
            </div>
          </motion.div>
        </div>

        {/* Hero Stats */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-md border-t border-white/10 hidden md:block">
          <div className="max-w-[1440px] mx-auto grid grid-cols-4 divide-x divide-white/10">
            {[
              { label: 'TOOL LIFE', value: '+40%', icon: Zap },
              { label: 'PRECISION', value: '0.001mm', icon: ShieldCheck },
              { label: 'SERVICE', value: '24H TURN', icon: Wrench },
              { label: 'GLOBAL', value: '80+ LOC', icon: Globe },
            ].map((stat, i) => (
              <div key={i} className="p-8 flex items-center gap-4">
                <stat.icon className="text-leuco-purple" size={32} />
                <div>
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Systems Grid - Milwaukee Style */}
      <section className="py-24 px-4 md:px-12 max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black tracking-tighter mb-2 uppercase">Explore the Systems</h2>
            <div className="h-1.5 w-24 bg-leuco-purple" />
          </div>
          <a href="#" className="font-black text-sm flex items-center gap-2 hover:text-leuco-purple transition-colors">
            VIEW ALL SYSTEMS <ChevronRight size={20} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {systems.map((system, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group relative h-[500px] overflow-hidden cursor-pointer bg-gray-100"
            >
              <img 
                src={system.image} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={system.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-leuco-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-10">
                <div className="text-leuco-purple font-black text-xs tracking-widest mb-2">{system.subtitle}</div>
                <h3 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter leading-none">{system.title}</h3>
                <button className="bg-white text-leuco-black font-black text-xs px-6 py-3 group-hover:bg-leuco-purple group-hover:text-white transition-colors">
                  EXPLORE SYSTEM
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black tracking-tighter mb-2 uppercase">Featured Tooling</h2>
              <div className="h-1.5 w-24 bg-leuco-purple" />
            </div>
            <div className="flex gap-2">
              <button className="p-3 border border-gray-300 hover:bg-white transition-colors"><ChevronRight size={20} className="rotate-180" /></button>
              <button className="p-3 border border-gray-300 hover:bg-white transition-colors"><ChevronRight size={20} /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredTools.map((tool) => (
              <div key={tool.id} className="bg-white p-6 group cursor-pointer hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-leuco-purple/20">
                <div className="relative aspect-square mb-6 overflow-hidden bg-gray-50">
                  <img 
                    src={tool.image} 
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                    alt={tool.name}
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white shadow-md rounded-full hover:text-leuco-purple">
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
                <div className="text-[10px] font-black text-leuco-purple tracking-widest mb-1 uppercase">{tool.category}</div>
                <h4 className="text-lg font-black leading-tight mb-4 group-hover:text-leuco-purple transition-colors">{tool.name}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-black">{tool.price}</span>
                  <button className="text-xs font-black flex items-center gap-1 hover:text-leuco-purple">
                    VIEW DETAILS <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service & Education Banner */}
      <section className="py-24 px-4 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-leuco-black p-12 relative overflow-hidden group">
            <div className="relative z-10">
              <Wrench className="text-leuco-purple mb-6" size={48} />
              <h3 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Re-Sharpening Service</h3>
              <p className="text-gray-400 mb-8 font-medium max-w-md">
                Our world-class service centers restore your tools to original manufacturer specifications using advanced CNC grinding technology.
              </p>
              <button className="bg-leuco-purple text-white font-black px-8 py-4 flex items-center gap-2 group-hover:bg-white group-hover:text-leuco-purple transition-all">
                BOOK SERVICE <ArrowRight size={18} />
              </button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          </div>

          <div className="bg-leuco-purple p-12 relative overflow-hidden group">
            <div className="relative z-10">
              <Settings className="text-white mb-6" size={48} />
              <h3 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Leuco Academy</h3>
              <p className="text-white/80 mb-8 font-medium max-w-md">
                Master your craft with our technical training programs. From basic tooling knowledge to advanced CNC optimization.
              </p>
              <button className="bg-white text-leuco-purple font-black px-8 py-4 flex items-center gap-2 group-hover:bg-leuco-black group-hover:text-white transition-all">
                EXPLORE COURSES <ArrowRight size={18} />
              </button>
            </div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full -mr-32 -mb-32 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-leuco-black text-white pt-24 pb-12 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
            <div className="lg:col-span-2 space-y-8">
              <LeucoLogo />
              <p className="text-gray-400 font-medium max-w-sm">
                North America’s highest quality precision tooling and re-sharpening service provider for over 40 years.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-leuco-purple transition-colors">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone size={18} className="text-leuco-purple" />
                  <span className="font-bold">+1 (800) 433-0771</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail size={18} className="text-leuco-purple" />
                  <span className="font-bold">info@leuco.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin size={18} className="text-leuco-purple" />
                  <span className="font-bold">Horicon, Wisconsin, USA</span>
                </div>
              </div>
            </div>

            {[
              { title: 'PRODUCTS', links: ['Saw Blades', 'CNC Tooling', 'Through-Feed', 'Hand Tools', 'Custom Tooling'] },
              { title: 'SUPPORT', links: ['Contact Us', 'Where to Buy', 'Technical Data', 'Safety Manuals', 'Warranty'] },
              { title: 'COMPANY', links: ['About LEUCO', 'Careers', 'Sustainability', 'Global Locations', 'News'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-sm font-black tracking-widest mb-8 uppercase text-leuco-purple">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 font-bold text-sm hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-500 text-xs font-bold">
              © 2026 LEUCO TOOL CORPORATION. ALL RIGHTS RESERVED.
            </div>
            <div className="flex gap-8 text-gray-500 text-xs font-bold">
              <a href="#" className="hover:text-white">PRIVACY POLICY</a>
              <a href="#" className="hover:text-white">TERMS OF SERVICE</a>
              <a href="#" className="hover:text-white">SITEMAP</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
