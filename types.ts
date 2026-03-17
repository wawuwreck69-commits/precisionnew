
// Fix: Import React to resolve "Cannot find namespace 'React'" error
import React from 'react';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  tags: string[];
  onClick?: () => void;
}

export interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
  image?: string;
}