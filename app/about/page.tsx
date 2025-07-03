'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import Image from 'next/image';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FaRocket, FaHandshake, FaLightbulb, FaUsers } from 'react-icons/fa';
import { IconType } from 'react-icons';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Animated section component
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

const AnimatedSection = ({ children, className = '' }: AnimatedSectionProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeIn}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// Value card component
interface ValueCardProps {
  icon: IconType;
  title: string;
  description: string;
}

const ValueCard = ({ icon: Icon, title, description }: ValueCardProps) => (
  <motion.div 
    variants={fadeIn}
    className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
  >
    <div className="bg-indigo-100 p-3 rounded-full mb-4">
      <Icon className="text-indigo-600 text-2xl" />
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

// Team member component
interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
}

const TeamMember = ({ name, role, image }: TeamMemberProps) => (
  <motion.div 
    variants={fadeIn}
    className="flex flex-col items-center"
  >
    <div className="relative w-48 h-48 rounded-full overflow-hidden mb-4">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover"
      />
    </div>
    <h3 className="text-xl font-bold">{name}</h3>
    <p className="text-gray-600">{role}</p>
  </motion.div>
);

export default function AboutPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About CareerStarter</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Transforming career journeys through AI-powered guidance and tools that empower individuals to reach their full potential.
          </p>
        </div>
      </AnimatedSection>
      
      {/* Our Story */}
      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                CareerStarter was born from a simple observation: finding the right career path and presenting yourself effectively to employers is challenging for many individuals.
              </p>
              <p className="text-gray-600 mb-4">
                Founded in 2023, we set out to create an AI-powered platform that removes the guesswork from career development and provides personalized guidance to help people discover and pursue careers they love.
              </p>
              <p className="text-gray-600">
                Today, CareerStarter is empowering thousands of job seekers with cutting-edge tools that analyze their unique skills, experiences, and aspirations to guide them toward fulfilling career paths.
              </p>
            </div>
            <div className="md:w-1/2 relative h-80 w-full rounded-xl overflow-hidden shadow-xl">
              <Image
                src="https://placehold.co/1200x800/indigo/white?text=Team+Collaboration"
                alt="Team working together"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Our Vision & Mission */}
      <AnimatedSection className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-12">Our Vision & Mission</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="bg-indigo-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
                <FaRocket className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600">
                A world where everyone can discover and pursue careers that align with their true potential, passion, and purpose.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="bg-indigo-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
                <FaLightbulb className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To democratize career development by providing accessible, personalized, and AI-powered tools that guide individuals through every step of their career journey.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Our Values */}
      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6">Our Values</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-12">
            These core principles guide everything we do at CareerStarter, from product development to customer interactions.
          </p>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <ValueCard 
              icon={FaUsers}
              title="People First"
              description="We prioritize the unique needs, aspirations, and wellbeing of the individuals we serve."
            />
            <ValueCard 
              icon={FaLightbulb}
              title="Innovation"
              description="We constantly push boundaries to develop cutting-edge solutions that transform career development."
            />
            <ValueCard 
              icon={FaHandshake}
              title="Trust & Transparency"
              description="We build relationships based on honesty, clear communication, and ethical practices."
            />
            <ValueCard 
              icon={FaRocket}
              title="Excellence"
              description="We strive for the highest quality in everything we do, continuously improving our products and services."
            />
          </motion.div>
        </div>
      </AnimatedSection>
      
      {/* Leadership Team */}
      <AnimatedSection className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6">Our Leadership Team</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-12">
            Meet the passionate experts dedicated to helping you achieve your career goals.
          </p>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            <TeamMember 
              name="Sarah Johnson"
              role="Founder & CEO"
              image="https://placehold.co/400x400/indigo/white?text=Sarah+J"
            />
            <TeamMember 
              name="Michael Chen"
              role="CTO"
              image="https://placehold.co/400x400/indigo/white?text=Michael+C"
            />
            <TeamMember 
              name="Lisa Rodriguez"
              role="Head of Career Development"
              image="https://placehold.co/400x400/indigo/white?text=Lisa+R"
            />
          </motion.div>
        </div>
      </AnimatedSection>
      
      {/* Join Our Journey */}
      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Be part of our mission to transform career development with AI. Whether you&apos;re a job seeker looking to advance your career or a potential team member, we&apos;d love to connect with you.
          </p>
          <a href="/signup" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors">
            Get Started Today
          </a>
        </div>
      </AnimatedSection>
    </div>
  );
} 