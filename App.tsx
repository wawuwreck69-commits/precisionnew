import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Droplets, 
  Thermometer, 
  Wind, 
  Shield, 
  Star, 
  Award, 
  Clock, 
  MapPin, 
  ArrowRight,
  Menu, 
  X,
  Sparkles,
  ChevronDown,
  Hammer,
  Waves,
  Maximize2,
  Mail,
  CheckCircle2
} from 'lucide-react';
import { ServiceCardProps, Testimonial } from './types.ts';
import { PolicyPage } from './src/components/PolicyPage';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ease-in-out ${isScrolled && !isMenuOpen ? 'bg-linen/95 border-b border-champagne/20 py-4 sm:py-5 shadow-sm backdrop-blur-md' : 'bg-transparent py-6 sm:py-8'}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center relative z-[110]">
        <div className="flex flex-col cursor-pointer group lg:w-1/3" onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); setIsMenuOpen(false); }}>
          <span className={`text-2xl sm:text-3xl font-serif tracking-[0.15em] transition-colors duration-500 leading-none ${isScrolled && !isMenuOpen ? 'text-onyx' : 'text-white'}`}>PRECISION</span>
          <span className={`text-[9px] sm:text-[11px] uppercase tracking-[0.25em] font-sans font-bold transition-colors duration-500 mt-1 sm:mt-1.5 ${isScrolled && !isMenuOpen ? 'text-slate' : 'text-white/60'}`}>Kelowna • West Kelowna</span>
        </div>

        <div className="hidden lg:flex items-center justify-center space-x-10 xl:space-x-12 lg:w-1/3">
          {['Services', 'About', 'Gallery', 'Reviews'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className={`text-[12px] xl:text-[13px] uppercase tracking-[0.2em] font-semibold transition-all hover:text-champagne ${isScrolled && !isMenuOpen ? 'text-onyx' : 'text-white'}`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-end space-x-3 sm:space-x-6 lg:w-1/3">
          <a 
            href="tel:2505513471" 
            className={`hidden xl:flex items-center gap-2 text-[13px] uppercase tracking-widest font-bold transition-colors ${isScrolled && !isMenuOpen ? 'text-onyx' : 'text-white'}`}
          >
            <Phone size={16} className="text-champagne" /> 250.551.3471
          </a>
          <button 
            onClick={() => scrollTo('contact')}
            className={`px-5 py-3 sm:px-8 sm:py-3.5 text-[10px] sm:text-[12px] uppercase tracking-[0.2em] font-bold border transition-all duration-500 whitespace-nowrap ${
              isScrolled && !isMenuOpen
              ? 'bg-onyx text-linen border-onyx hover:bg-transparent hover:text-onyx' 
              : 'bg-white text-onyx border-white hover:bg-transparent hover:text-white'
            }`}
          >
            Book Now
          </button>
          <button className="lg:hidden p-1 sm:p-2 -mr-1 sm:-mr-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="text-white" size={28} /> : <Menu className={isScrolled && !isMenuOpen ? 'text-onyx' : 'text-white'} size={28} />}
          </button>
        </div>
      </div>

      <div className={`fixed inset-0 bg-onyx z-[90] transition-transform duration-700 ease-in-out lg:hidden flex flex-col justify-center items-center px-6 md:px-12 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         <div className="flex flex-col space-y-6 md:space-y-8 text-center w-full max-w-sm">
            {['Services', 'About', 'Gallery', 'Reviews', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-3xl md:text-4xl font-serif text-linen hover:text-champagne transition-colors"
              >
                {item}
              </button>
            ))}
            <div className="pt-6 md:pt-8 flex flex-col items-center gap-6 border-t border-white/10 mt-6 md:mt-8">
              <a href="tel:2505513471" className="text-champagne text-lg md:text-xl font-sans tracking-widest font-light flex items-center gap-3">
                <Phone size={18} /> 250.551.3471
              </a>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 hover:text-white transition-colors flex items-center gap-2 mt-4"
              >
                <X size={14} /> Close Menu
              </button>
            </div>
         </div>
      </div>
    </nav>
  );
};

const ServiceItem: React.FC<ServiceCardProps> = ({ title, description, tags, onClick }) => (
  <div className="group py-8 md:py-12 border-b border-champagne/20 transition-all duration-500 hover:pl-0 md:hover:pl-4 cursor-pointer" onClick={onClick}>
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
      <div className="max-w-xl">
        <h3 className="text-2xl md:text-3xl font-serif mb-4 group-hover:text-champagne transition-colors">{title}</h3>
        <p className="text-slate font-light leading-relaxed mb-6">{description}</p>
        <div className="flex flex-wrap gap-4">
          {tags.map(tag => (
            <span key={tag} className="text-[9px] tracking-[0.2em] uppercase text-onyx/40 font-bold">{tag}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4 text-onyx/30 group-hover:text-onyx transition-colors">
        <span className="text-[10px] uppercase tracking-widest font-bold">View Details</span>
        <ArrowRight size={20} className="transition-transform duration-500 group-hover:translate-x-2" />
      </div>
    </div>
  </div>
);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category?: string;
  description: string;
  image?: string;
  tags?: string[];
}

const DetailModal: React.FC<ModalProps> = ({ isOpen, onClose, title, category, description, image, tags }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-12">
      <div className="absolute inset-0 bg-onyx/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md text-onyx hover:text-champagne transition-colors rounded-full"
        >
          <X size={20} />
        </button>
        
        {image && (
          <div className="w-full md:w-1/2 h-64 md:h-auto relative">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className={`p-8 md:p-12 flex flex-col justify-center ${image ? 'w-full md:w-1/2' : 'w-full'}`}>
          {category && <span className="text-[10px] uppercase tracking-[0.4em] text-champagne font-bold mb-4 block">{category}</span>}
          <h3 className="text-3xl md:text-4xl font-serif text-onyx mb-6">{title}</h3>
          
          <div className="prose prose-sm md:prose-base text-slate font-light leading-relaxed mb-8">
            {description.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4">{paragraph}</p>
            ))}
          </div>
          
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-8">
              {tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-linen text-[9px] tracking-[0.2em] uppercase text-onyx/60 font-bold">{tag}</span>
              ))}
            </div>
          )}
          
          <button 
            onClick={() => {
              onClose();
              setTimeout(() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}), 300);
            }}
            className="inline-block w-full sm:w-auto px-8 py-4 bg-onyx text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-champagne transition-colors text-center"
          >
            Request Service
          </button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formError, setFormError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'terms'>('home');
  const [modalContent, setModalContent] = useState<Omit<ModalProps, 'isOpen' | 'onClose'> | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Plumbing Repair',
    message: ''
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setFormError(null);

    try {
      // Use Web3Forms for simple, reliable form submission
      const formDataObj = new FormData();
      formDataObj.append('access_key', '73480fab-6a89-4f2a-956f-28576730fade');
      formDataObj.append('name', formData.name);
      formDataObj.append('phone', formData.phone);
      formDataObj.append('service', formData.service);
      formDataObj.append('message', formData.message);
      formDataObj.append('subject', 'New Service Request from Website');
      formDataObj.append('from_name', 'Precision Plumbing Contact Form');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataObj
      });

      const result = await response.json();

      if (result.success) {
        setFormState('success');
        setFormData({ name: '', phone: '', service: 'Plumbing Repair', message: '' });
      } else {
        throw new Error(result.message || 'Web3Forms submission failed');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormError(String(error ?? 'Unknown error'));

      // Fallback: open email client
      const subject = encodeURIComponent('New Service Request from Website');
      const body = encodeURIComponent(`
Name: ${formData.name}
Phone: ${formData.phone}
Service: ${formData.service}
Message: ${formData.message}
      `.trim());
      window.open(`mailto:sanjadsamin2001@gmail.com?subject=${subject}&body=${body}`, '_blank');

      setFormState('idle');
    }

    // Reset status back to idle after a pause
    setTimeout(() => setFormState('idle'), 5000);
  };

  const galleryImages = [
    { 
      url: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2070&auto=format&fit=crop", 
      title: "Commercial Plumbing", 
      category: "Installation",
      description: "We provide comprehensive commercial plumbing installation services for businesses of all sizes. Our team ensures that all piping, fixtures, and systems are installed to code and designed for maximum efficiency and longevity.",
      tags: ["COMMERCIAL", "INSTALLATION", "PIPING"]
    },
    { 
      url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop", 
      title: "Residential", 
      category: "Installation",
      description: "Expert residential plumbing services tailored to your home's unique needs. From new construction rough-ins to custom bathroom renovations, we deliver high-quality workmanship that you can rely on for years to come.",
      tags: ["RESIDENTIAL", "RENOVATION", "NEW CONSTRUCTION"]
    },
    { 
      url: "/timur-shakerzianov-wzIjLL4KB-4-unsplash.jpg", 
      title: "Water System Maintenance", 
      category: "Service",
      description: "Regular maintenance is key to preventing costly plumbing emergencies. Our water system maintenance services include thorough inspections, pressure testing, and preventative repairs to keep your home's water flowing smoothly.",
      tags: ["MAINTENANCE", "INSPECTION", "PREVENTION"]
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Deepak Garg",
      location: "Kelowna",
      text: "I had an excellent experience with Carson. He responded quickly and was able to complete the work the same day. The job was done efficiently and professionally, his pricing was very reasonable, and he went above and beyond to ensure everything was done properly. It’s rare to find someone this reliable and responsive — highly recommend!",
      rating: 5,
      image: "/garg.png"
    },
    {
      name: "Leesa Garnett",
      location: "Kelowna",
      text: "Great experience! Nice, fast and very friendly 😊",
      rating: 5,
      image: "/leesa.png"
    },
    {
      name: "Amy Payne",
      location: "Kelowna",
      text: "We had a wonderful experience with Precision Plumbing & Heating. The owner was extremely knowledgeable, professional, and very personable. He took the time to explain everything clearly and made us feel confident in the work being done. It’s clear he takes pride in his work and truly cares about his customers. We would highly recommend this company and will definitely use him again!",
      rating: 5,
      image: "/amy.png"
    }
  ];

  return (
    <div className="font-sans">
      {currentPage === 'privacy' && (
        <PolicyPage 
          title="Privacy Policy" 
          onClose={() => setCurrentPage('home')}
          content={
            <div className="space-y-6">
              <p>At Precision Plumbing & Heating Ltd, we value your privacy. This policy outlines how we collect, use, and protect your personal information.</p>
              <h3 className="text-xl font-serif text-onyx">Information We Collect</h3>
              <p>We collect information you provide directly to us, such as your name, phone number, and email address when you contact us.</p>
              <h3 className="text-xl font-serif text-onyx">How We Use Your Information</h3>
              <p>We use your information to provide our services, communicate with you, and improve our website experience.</p>
              <h3 className="text-xl font-serif text-onyx">Data Security</h3>
              <p>We take reasonable measures to protect your information from unauthorized access or disclosure.</p>
            </div>
          }
        />
      )}
      {currentPage === 'terms' && (
        <PolicyPage 
          title="Terms of Service" 
          onClose={() => setCurrentPage('home')}
          content={
            <div className="space-y-6">
              <p>By using our website and services, you agree to these Terms of Service.</p>
              <h3 className="text-xl font-serif text-onyx">Service Agreement</h3>
              <p>We strive to provide reliable plumbing and heating services. All work is performed by qualified technicians.</p>
              <h3 className="text-xl font-serif text-onyx">Limitation of Liability</h3>
              <p>Precision Plumbing & Heating Ltd is not liable for any indirect or consequential damages arising from our services.</p>
              <h3 className="text-xl font-serif text-onyx">Governing Law</h3>
              <p>These terms are governed by the laws of British Columbia, Canada.</p>
            </div>
          }
        />
      )}

      <Nav />

      <DetailModal 
        isOpen={!!modalContent} 
        onClose={() => setModalContent(null)} 
        {...(modalContent || { title: '', description: '' })} 
      />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[500px] md:min-h-[800px] flex items-end pb-24 md:pb-0 md:items-center overflow-hidden bg-onyx">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" 
            alt="Reliable Plumbing Service" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-transparent"></div>
        </div>
        
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 pt-24 md:pt-32">
          <div className="max-w-4xl space-y-8 md:space-y-12">
            <div className="space-y-4">
               <p className="text-champagne text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.5em] font-bold">Locally Owned & Operated • Red Seal Certified</p>
               <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-serif text-linen leading-[0.9]">
                  Reliable Plumbing <br /> <span className="italic font-light">Solutions.</span>
               </h1>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 md:gap-12">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}
                className="group relative w-full sm:w-auto px-8 md:px-12 py-4 sm:py-5 bg-white text-onyx font-bold text-[11px] sm:text-[12px] uppercase tracking-[0.3em] overflow-hidden transition-all duration-700 hover:text-white text-center"
              >
                <span className="relative z-10">Get a Free Quote</span>
                <div className="absolute inset-0 bg-onyx translate-y-full transition-transform duration-500 group-hover:translate-y-0"></div>
              </button>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-8 sm:w-12 h-[1px] bg-champagne"></div>
                <p className="text-linen/50 text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold max-w-[150px] sm:max-w-none">Same Day Service Whenever Possible</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-4 text-linen/30 animate-bounce cursor-pointer z-20" onClick={() => document.getElementById('services')?.scrollIntoView({behavior:'smooth'})}>
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Services</span>
          <ChevronDown size={16} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-linen relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="space-y-8 md:space-y-12">
            <span className="text-[10px] uppercase tracking-[0.4em] text-champagne font-bold">About Precision</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-onyx leading-tight">Dependable service you can trust.</h2>
            <div className="space-y-6">
              <p className="text-onyx text-xl font-medium leading-relaxed">
                Precision Plumbing & Heating Ltd is a locally owned and operated plumbing company serving Kelowna and West Kelowna.
              </p>
              <p className="text-slate text-lg font-light leading-relaxed">
                We specialize in plumbing repairs, drain service, water heaters, fixture installations, emergency plumbing services and poly-B replacements. We are fully licensed and insured, offering honest pricing, fast response times, and same day service whenever possible.
              </p>
              <p className="text-slate text-lg font-light leading-relaxed italic border-l-2 border-champagne pl-6">
                Our goal is to provide reliable, high quality plumbing solutions and dependable service you can trust for any job, large or small.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 pt-8">
              <div className="space-y-4">
                <Shield className="text-champagne" size={32} strokeWidth={1} />
                <h4 className="text-xs uppercase tracking-widest font-bold">Fully Licensed</h4>
                <p className="text-slate text-sm font-light">Complete insurance and licensing for your peace of mind.</p>
              </div>
              <div className="space-y-4">
                <Award className="text-champagne" size={32} strokeWidth={1} />
                <h4 className="text-xs uppercase tracking-widest font-bold">Red Seal Quality</h4>
                <p className="text-slate text-sm font-light">Expert workmanship backed by industry-standard certification.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
               <img 
                 src="/image.png" 
                 alt="Precision Plumbing & Heating LTD. Owner" 
                 className="w-full h-full object-cover object-[center_20%]"
               />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-onyx p-12 text-linen space-y-2 hidden xl:block shadow-2xl">
               <p className="text-xl font-serif">"Excellent work."</p>
               <p className="text-[9px] uppercase tracking-widest font-bold opacity-50">Local Kelowna Resident</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 md:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-6 md:gap-8">
            <div className="space-y-4">
               <span className="text-[10px] uppercase tracking-[0.4em] text-champagne font-bold">Our Specialties</span>
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-onyx">Professional Plumbing & Heating.</h2>
            </div>
            <p className="text-slate max-w-sm font-light">Honest pricing and same day service whenever possible for any job, large or small.</p>
          </div>
          
          <div className="flex flex-col">
            <ServiceItem 
              title="Plumbing Repairs & Fixtures"
              description="From leaky faucets to full fixture installations, we handle every repair with precision and care."
              tags={['LEAKS', 'FAUCETS', 'TOILETS', 'INSTALLATION']}
              onClick={() => setModalContent({
                title: "Plumbing Repairs & Fixtures",
                category: "Service & Repair",
                description: "Whether you're dealing with a stubborn leak, a running toilet, or looking to upgrade your bathroom fixtures, our expert technicians are here to help.\n\nWe diagnose issues quickly and provide lasting solutions using high-quality parts. Our services include faucet repair and replacement, toilet installation, sink plumbing, shower valve replacements, and general pipe repairs. We pride ourselves on leaving your home clean and your plumbing working perfectly.",
                tags: ['LEAKS', 'FAUCETS', 'TOILETS', 'INSTALLATION', 'REPAIRS'],
                image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop"
              })}
            />
            <ServiceItem 
              title="Water Heaters"
              description="Specialized service and replacement for hot water tanks and tankless heaters."
              tags={['WATER HEATERS', 'TANKLESS', 'MAINTENANCE']}
              onClick={() => setModalContent({
                title: "Water Heaters",
                category: "Installation & Service",
                description: "Never run out of hot water again. We offer comprehensive water heater services, including traditional hot water tank replacements, repairs, and routine maintenance to extend the life of your unit.\n\nLooking for an upgrade? We also specialize in high-efficiency tankless water heater installations, providing you with endless hot water on demand while reducing your energy bills. Our technicians will assess your household's needs and recommend the perfect system for you.",
                tags: ['WATER HEATERS', 'TANKLESS', 'MAINTENANCE', 'INSTALLATION'],
                image: "/timur-shakerzianov-wzIjLL4KB-4-unsplash.jpg"
              })}
            />
            <ServiceItem 
              title="Drain Service & Poly-B"
              description="Reliable drain cleaning and expert Poly-B pipe replacement to protect your home from future leaks."
              tags={['DRAIN CLEANING', 'POLY-B REPLACEMENT', 'RE-PIPING']}
              onClick={() => setModalContent({
                title: "Drain Service & Poly-B",
                category: "Specialty Services",
                description: "Slow or clogged drains can disrupt your entire household. We utilize advanced drain cleaning techniques to clear blockages safely and effectively, restoring proper flow to your sinks, tubs, and main lines.\n\nAdditionally, we are experts in Poly-B (polybutylene) pipe replacement. If your home was built between the late 70s and late 90s, it may have these failure-prone pipes. We provide complete home re-piping services with minimal disruption, replacing old Poly-B with durable, modern PEX piping to protect your home from catastrophic water damage.",
                tags: ['DRAIN CLEANING', 'POLY-B REPLACEMENT', 'RE-PIPING', 'CLOGS'],
                image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2070&auto=format&fit=crop"
              })}
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 md:py-32 bg-linen/30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12 md:mb-20 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-champagne font-bold">Project Portfolio</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-onyx">Precision in Action.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, i) => (
              <div 
                key={i} 
                className="group relative aspect-square overflow-hidden bg-onyx cursor-pointer"
                onClick={() => setModalContent({
                  title: img.title,
                  category: img.category,
                  description: img.description,
                  tags: img.tags,
                  image: img.url
                })}
              >
                <img 
                  src={img.url} 
                  alt={img.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx/95 via-transparent to-transparent opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-champagne text-[10px] uppercase tracking-widest font-bold mb-2">{img.category}</span>
                  <h4 className="text-white font-serif text-2xl">{img.title}</h4>
                  <div className="mt-4 flex items-center gap-2 text-white/50 text-[9px] uppercase tracking-widest font-bold">
                    <Maximize2 size={12} /> View Details
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 md:py-32 bg-linen">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-12 md:mb-24 text-center space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-champagne font-bold">Client Feedback</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-onyx">Dependable Service You Can Trust.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="flex flex-col justify-between space-y-8 p-8 border border-champagne/10 bg-white shadow-sm h-full">
                <div className="space-y-6">
                  <div className="flex gap-1 text-champagne">
                     {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-onyx font-serif text-lg italic leading-relaxed">"{t.text}"</p>
                </div>
                <div>
                   <div className="flex items-center gap-3 mb-2">
                     {t.image && (
                       <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                     )}
                     <div>
                       <h4 className="text-[11px] uppercase tracking-widest font-bold text-onyx">{t.name}</h4>
                       <p className="text-[9px] uppercase tracking-[0.2em] text-slate font-medium">{t.location}, BC</p>
                     </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-onyx text-linen pt-20 pb-10 md:pt-32 md:pb-16 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-32">
          <div className="space-y-10 md:space-y-16">
             <div className="space-y-4 md:space-y-6">
                <span className="text-[10px] uppercase tracking-[0.4em] text-champagne font-bold">Contact Us</span>
                <h2 className="text-5xl md:text-6xl lg:text-8xl font-serif">Get in <br className="hidden sm:block" /> Touch.</h2>
                <p className="text-linen/50 text-lg md:text-xl font-light max-w-md">Contact us for any plumbing job, large or small. Same day service available.</p>
             </div>
             
             <div className="space-y-6 md:space-y-10">
                <div className="flex items-start gap-4 sm:gap-6 md:gap-8 group">
                   <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center border border-white/10 group-hover:border-champagne transition-colors">
                      <Phone size={18} className="text-champagne sm:w-5 sm:h-5" />
                   </div>
                   <div>
                      <p className="text-linen/30 text-[9px] uppercase tracking-widest font-bold mb-1 sm:mb-2">Call for Service</p>
                      <a href="tel:2505513471" className="text-xl sm:text-2xl md:text-3xl font-serif hover:text-champagne transition-colors">250.551.3471</a>
                   </div>
                </div>
                <div className="flex items-start gap-4 sm:gap-6 md:gap-8 group">
                   <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center border border-white/10 group-hover:border-champagne transition-colors">
                      <Mail size={18} className="text-champagne sm:w-5 sm:h-5" />
                   </div>
                   <div className="break-all">
                      <p className="text-linen/30 text-[9px] uppercase tracking-widest font-bold mb-1 sm:mb-2">Email Us</p>
                      <a href="mailto:sanjadsamin2001@gmail.com" className="text-lg sm:text-xl md:text-2xl font-serif hover:text-champagne transition-colors">sanjadsamin2001@gmail.com</a>
                   </div>
                </div>
                <div className="flex items-start gap-4 sm:gap-6 md:gap-8 group">
                   <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center border border-white/10 group-hover:border-champagne transition-colors">
                      <MapPin size={18} className="text-champagne sm:w-5 sm:h-5" />
                   </div>
                   <div>
                      <p className="text-linen/30 text-[9px] uppercase tracking-widest font-bold mb-1 sm:mb-2">Location</p>
                      <p className="text-base sm:text-lg md:text-xl font-serif">Serving Kelowna & West Kelowna, BC</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="relative">
            {formState === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12 md:py-20 bg-white/5 border border-white/10 backdrop-blur-sm">
                <CheckCircle2 size={64} className="text-champagne animate-pulse" />
                <div className="space-y-2">
                  <h3 className="text-3xl font-serif text-linen">Request Received</h3>
                  <p className="text-linen/50 font-light">We'll be in touch with you shortly.</p>
                </div>
                <button 
                  onClick={() => setFormState('idle')}
                  className="text-[10px] uppercase tracking-widest font-bold text-champagne hover:text-linen transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-8 md:space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-linen/40">Name</label>
                      <input 
                        name="name"
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-champagne transition-colors" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-linen/40">Phone</label>
                      <input 
                        name="phone"
                        required
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-champagne transition-colors" 
                      />
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-linen/40">Service Required</label>
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-champagne transition-colors appearance-none"
                    >
                      <option className="bg-onyx">Plumbing Repair</option>
                      <option className="bg-onyx">Drain Cleaning</option>
                      <option className="bg-onyx">Water Heater Service</option>
                      <option className="bg-onyx">Poly-B Replacement</option>
                      <option className="bg-onyx">Emergency Service</option>
                    </select>
                </div>
                <div className="space-y-3">
                    <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-linen/40">How can we help?</label>
                    <textarea 
                      name="message"
                      required
                      rows={3} 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-champagne transition-colors resize-none"
                    ></textarea>
                </div>

                {formError ? (
                  <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-rose-200">
                    <p className="text-sm font-semibold">Submission issue detected</p>
                    <p className="text-xs">{formError}</p>
                    <p className="text-xs mt-2">Your email client has opened with the form data. Please send the email to complete submission.</p>
                  </div>
                ) : null}

                <button 
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full py-6 bg-white text-onyx text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-champagne transition-all duration-500 shadow-2xl disabled:opacity-50"
                >
                  {formState === 'submitting' ? 'Sending...' : 'Send Request'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full h-[300px] md:h-[450px] mt-20 md:mt-32 grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82253.1384021245!2d-119.56066164506836!3d49.88795191632766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537d8cb699c406d5%3A0x88e2e27439003605!2sKelowna%2C%20BC!5e0!3m2!1sen!2sca!4v1708600000000!5m2!1sen!2sca" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Precision Plumbing & Heating Kelowna Service Area"
          ></iframe>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 mt-12 md:pt-24 md:mt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 text-[9px] uppercase tracking-[0.2em] font-bold text-linen/20">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center md:text-left">
             <span className="text-linen/40">PRECISION PLUMBING & HEATING LTD</span>
             <span>© 2026 Kelowna, BC.</span>
          </div>
          <div className="flex gap-8 md:gap-12">
            <button onClick={() => setCurrentPage('privacy')} className="hover:text-champagne transition-colors">Privacy Policy</button>
            <button onClick={() => setCurrentPage('terms')} className="hover:text-champagne transition-colors">Terms of Service</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;