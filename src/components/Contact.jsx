import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";

const contactSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().matches(/^[0-9+\-\s()]+$/, "Invalid phone number").required("Phone number is required"),
  subject: yup.string().required("Subject is required"),
  message: yup.string().min(10, "Message must be at least 10 characters").required("Message is required"),
});

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm({
    resolver: yupResolver(contactSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Contact form data:", data);
      
      // Show success message
      setIsSubmitted(true);
      reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar/>
      <div className="min-h-screen flex pt-20 items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-10 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
            <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          </div>
        </div>

        <div className="relative w-full max-w-2xl">
          {/* Success Message */}
          {isSubmitted && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-green-300 font-medium">Thank you! Your message has been sent successfully.</p>
              </div>
            </div>
          )}

          {/* Glassmorphism card */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 transition-all duration-500 hover:bg-white/15">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Get In Touch</h2>
              <p className="text-gray-300 text-sm">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="relative">
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Full Name"
                    className={`w-full px-4 py-4 bg-white/10 backdrop-blur-sm border rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 ${
                      errors.name ? 'border-red-400' : 'border-white/20'
                    }`}
                    onBlur={() => trigger('name')}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-2 ml-1 animate-pulse">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="relative">
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Email Address"
                    className={`w-full px-4 py-4 bg-white/10 backdrop-blur-sm border rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 ${
                      errors.email ? 'border-red-400' : 'border-white/20'
                    }`}
                    onBlur={() => trigger('email')}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-2 ml-1 animate-pulse">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Field */}
                <div className="relative">
                  <input
                    type="tel"
                    {...register("phone")}
                    placeholder="Phone Number"
                    className={`w-full px-4 py-4 bg-white/10 backdrop-blur-sm border rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 ${
                      errors.phone ? 'border-red-400' : 'border-white/20'
                    }`}
                    onBlur={() => trigger('phone')}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-2 ml-1 animate-pulse">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div className="relative">
                  <select
                    {...register("subject")}
                    className={`w-full px-4 py-4 bg-white/10 backdrop-blur-sm border rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 ${
                      errors.subject ? 'border-red-400' : 'border-white/20'
                    }`}
                    onBlur={() => trigger('subject')}
                  >
                    <option value="" className="bg-gray-800 text-gray-300">Select Subject</option>
                    <option value="general" className="bg-gray-800 text-white">General Inquiry</option>
                    <option value="support" className="bg-gray-800 text-white">Technical Support</option>
                    <option value="business" className="bg-gray-800 text-white">Business Partnership</option>
                    <option value="feedback" className="bg-gray-800 text-white">Feedback</option>
                    <option value="other" className="bg-gray-800 text-white">Other</option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-400 text-sm mt-2 ml-1 animate-pulse">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div className="relative">
                <textarea
                  {...register("message")}
                  placeholder="Your Message"
                  rows="5"
                  className={`w-full px-4 py-4 bg-white/10 backdrop-blur-sm border rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none ${
                    errors.message ? 'border-red-400' : 'border-white/20'
                  }`}
                  onBlur={() => trigger('message')}
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-2 ml-1 animate-pulse">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending Message...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Message
                  </div>
                )}
              </button>
            </form>

           
          </div>
        </div>
      </div>
      <FooterSection/>
    </>
  );
}