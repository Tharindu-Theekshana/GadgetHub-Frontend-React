import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import FooterSection from '../components/FooterSection'
import CategoriesSection from '../components/CategoriesSection'

export default function Home() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <CategoriesSection/>
    <FooterSection/>
    </>
  )
}
