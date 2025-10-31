"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FaCheck, 
  FaTimes, 
  FaArrowRight, 
  FaStar,
  FaRocket,
  FaUsers,
  FaCrown,
  FaShieldAlt ,
  FaClock,
  FaHeadset,
  FaCog,
  FaChartLine,
  FaDatabase,
  FaMobile,
  FaCloud,
  FaLock
} from 'react-icons/fa';

const pricingPlans = [
  {
    id: 1,
    name: "Starter",
    description: "Perfect for small businesses and startups",
    price: "$4,999",
    duration: "project based",
    popular: false,
    icon: <FaRocket className="w-8 h-8" />,
    gradient: "from-blue-500 to-blue-600",
    features: [
      { name: "Responsive Website", included: true },
      { name: "Up to 5 Pages", included: true },
      { name: "Basic SEO Setup", included: true },
      { name: "Contact Form", included: true },
      { name: "1 Month Support", included: true },
      { name: "E-commerce Functionality", included: false },
      { name: "Custom Web Application", included: false },
      { name: "Advanced Analytics", included: false },
      { name: "Dedicated Project Manager", included: false },
      { name: "Priority Support", included: false }
    ],
    buttonText: "Get Started",
    buttonVariant: "outline"
  },
  {
    id: 2,
    name: "Professional",
    description: "Ideal for growing businesses with advanced needs",
    price: "$12,999",
    duration: "project based",
    popular: true,
    icon: <FaUsers className="w-8 h-8" />,
    gradient: "from-purple-500 to-purple-600",
    features: [
      { name: "Custom Web Application", included: true },
      { name: "Up to 15 Pages", included: true },
      { name: "Advanced SEO Setup", included: true },
      { name: "E-commerce Functionality", included: true },
      { name: "3 Months Support", included: true },
      { name: "Dedicated Project Manager", included: true },
      { name: "API Integration", included: true },
      { name: "Basic Analytics Dashboard", included: true },
      { name: "Mobile App (Additional)", included: false },
      { name: "Enterprise Security", included: false }
    ],
    buttonText: "Choose Professional",
    buttonVariant: "primary"
  },
  {
    id: 3,
    name: "Enterprise",
    description: "Complete solutions for large organizations",
    price: "Custom",
    duration: "tailored to needs",
    popular: false,
    icon: <FaCrown className="w-8 h-8" />,
    gradient: "from-orange-500 to-orange-600",
    features: [
      { name: "Complex Web Applications", included: true },
      { name: "Unlimited Pages", included: true },
      { name: "Enterprise SEO Strategy", included: true },
      { name: "Advanced E-commerce", included: true },
      { name: "6 Months Support", included: true },
      { name: "Dedicated Project Team", included: true },
      { name: "Multiple API Integrations", included: true },
      { name: "Advanced Analytics & Reporting", included: true },
      { name: "Mobile App Development", included: true },
      { name: "Enterprise-grade Security", included: true }
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline"
  }
];

const services = [
  {
    name: "Web Development",
    description: "Custom websites and web applications built with modern technologies",
    startingAt: "$4,999",
    icon: <FaCog className="w-6 h-6" />,
    features: ["React/Next.js", "Responsive Design", "SEO Optimized", "Fast Performance"]
  },
  {
    name: "Mobile Development",
    description: "Cross-platform mobile applications for iOS and Android",
    startingAt: "$8,999",
    icon: <FaMobile className="w-6 h-6" />,
    features: ["React Native", "iOS & Android", "Offline Capability", "App Store Deployment"]
  },
  {
    name: "E-commerce Solutions",
    description: "Complete online store development with payment integration",
    startingAt: "$6,999",
    icon: <FaChartLine className="w-6 h-6" />,
    features: ["Shopping Cart", "Payment Gateway", "Inventory Management", "Order Tracking"]
  },
  {
    name: "Cloud & DevOps",
    description: "Cloud infrastructure setup and deployment automation",
    startingAt: "$3,999",
    icon: <FaCloud className="w-6 h-6" />,
    features: ["AWS/Azure/GCP", "CI/CD Pipeline", "Auto Scaling", "Monitoring"]
  }
];

const faqs = [
  {
    question: "What's included in the project price?",
    answer: "All our project prices include design, development, testing, deployment, and a specified support period. We provide detailed breakdowns in our proposals."
  },
  {
    question: "Do you offer ongoing maintenance?",
    answer: "Yes, we offer flexible maintenance plans starting at $299/month for updates, security patches, and technical support."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary by complexity: Starter (4-6 weeks), Professional (8-12 weeks), Enterprise (12+ weeks). We provide detailed timelines in our proposals."
  },
  {
    question: "Can we start with a smaller package and upgrade later?",
    answer: "Absolutely! We design our solutions to be scalable. Many clients start with a smaller package and expand as their business grows."
  },
  {
    question: "Do you provide hosting and domain services?",
    answer: "We can help you set up hosting and domain services, which are billed separately based on your requirements and traffic needs."
  }
];

const Page = () => {
  const [billingCycle, setBillingCycle] = useState('project');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Transparent Pricing
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            Custom solutions with clear, predictable pricing. No hidden fees, no surprises.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300">50+</div>
              <div className="text-blue-200">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300">95%</div>
              <div className="text-blue-200">On Budget Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300">100%</div>
              <div className="text-blue-200">Transparent Pricing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Project-Based Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fixed-price projects with clear deliverables. Perfect for businesses that want predictable costs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg border-2 ${
                  plan.popular ? 'border-purple-500 shadow-2xl transform scale-105' : 'border-gray-200'
                } transition-all duration-300 hover:shadow-xl`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <FaStar className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className={`bg-gradient-to-r ${plan.gradient} p-8 text-white rounded-t-2xl text-center`}>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-white/90 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-white/80">/{plan.duration}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        {feature.included ? (
                          <FaCheck className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <FaTimes className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href="/contact"
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-center transition-all duration-300 ${
                      plan.popular
                        ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                    } inline-flex items-center justify-center gap-2`}
                  >
                    {plan.buttonText}
                    <FaArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Service-Specific Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Starting prices for specific services. Final costs depend on project requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-blue-600 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <div className="text-2xl font-bold text-blue-600 mb-4">
                  Starting at {service.startingAt}
                </div>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <FaCheck className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="w-full bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 py-3 px-4 rounded-lg font-semibold text-center transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  Get Quote
                  <FaArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Pricing Model?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fixed Pricing</h3>
              <p className="text-gray-600">
                No surprise costs. You know exactly what you're paying for upfront.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Clear Timelines</h3>
              <p className="text-gray-600">
                Realistic project timelines with regular progress updates.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt  className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Guarantee</h3>
              <p className="text-gray-600">
                We stand behind our work with comprehensive testing and support.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeadset className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Dedicated Support</h3>
              <p className="text-gray-600">
                Ongoing support and maintenance to keep your project running smoothly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about our pricing and process
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your project requirements and provide you with a detailed, no-obligation quote.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center gap-3"
            >
              Get Free Quote
              <FaArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/case-studies"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-3"
            >
              View Our Work
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t border-white/20">
            <p className="text-blue-200 text-sm">
              No hidden fees • Detailed proposals • Flexible payment options • 100% satisfaction guarantee
            </p>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Page;