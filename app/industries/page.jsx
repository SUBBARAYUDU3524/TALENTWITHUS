import React from 'react';
import Link from 'next/link';
import { 
  FaArrowRight, 
  FaChartLine, 
  FaUsers, 
  FaMobile, 
  FaCloud, 
  FaShieldAlt, 
  FaLaptopCode, 
  FaCreditCard,
  FaShoppingCart,
  FaHeartbeat,
  FaShirt,
  FaIndustry,
  FaGraduationCap,
  FaCar,
  FaUtensils,
  FaPlane,
  FaHome,
  FaFilm,
  FaSeedling,
  FaTruck,
  FaCog,
  FaCheckCircle
} from 'react-icons/fa';

const industries = [
  {
    id: 1,
    name: "Finance & Banking",
    description: "Digital transformation, secure banking platforms, fintech solutions, and regulatory compliance systems for financial institutions.",
    icon: <FaCreditCard className="w-8 h-8" />,
    gradient: "from-blue-500 to-blue-700",
    projects: 24,
    highlights: ["Digital Banking", "Payment Systems", "Risk Management", "Regulatory Compliance"],
    caseStudy: "Global Finance Corp Digital Transformation"
  },
  {
    id: 2,
    name: "Healthcare & Life Sciences",
    description: "HIPAA-compliant solutions, electronic health records, telemedicine platforms, and healthcare data management systems.",
    icon: <FaHeartbeat className="w-8 h-8" />,
    gradient: "from-green-500 to-green-700",
    projects: 18,
    highlights: ["EHR Systems", "Telemedicine", "Patient Portals", "Medical Analytics"],
    caseStudy: "MediCare Solutions Data Platform"
  },
  {
    id: 3,
    name: "Retail & E-commerce",
    description: "Scalable e-commerce platforms, inventory management, customer experience solutions, and omnichannel retail systems.",
    icon: <FaShoppingCart className="w-8 h-8" />,
    gradient: "from-purple-500 to-purple-700",
    projects: 32,
    highlights: ["E-commerce Platforms", "Inventory Management", "Customer Analytics", "Mobile Commerce"],
    caseStudy: "StyleRetail Inc Scaling Solution"
  },
  {
    id: 4,
    name: "Technology & SaaS",
    description: "Cloud-native applications, SaaS platforms, DevOps solutions, and enterprise software development.",
    icon: <FaLaptopCode className="w-8 h-8" />,
    gradient: "from-cyan-500 to-cyan-700",
    projects: 28,
    highlights: ["SaaS Platforms", "Cloud Migration", "DevOps", "Enterprise Software"],
    caseStudy: "TechInnovate Cloud Migration"
  },
  {
    id: 5,
    name: "Manufacturing & Industry 4.0",
    description: "IoT solutions, supply chain optimization, predictive maintenance, and industrial automation systems.",
    icon: <FaIndustry className="w-8 h-8" />,
    gradient: "from-orange-500 to-orange-700",
    projects: 15,
    highlights: ["IoT Solutions", "Supply Chain", "Predictive Maintenance", "Automation"],
    caseStudy: "Manufacturing IoT Implementation"
  },
  {
    id: 6,
    name: "Education & EdTech",
    description: "Learning management systems, virtual classrooms, educational apps, and institutional management platforms.",
    icon: <FaGraduationCap className="w-8 h-8" />,
    gradient: "from-indigo-500 to-indigo-700",
    projects: 12,
    highlights: ["LMS Platforms", "Virtual Learning", "Student Portals", "Educational Apps"],
    caseStudy: "University Learning Platform"
  },
  {
    id: 7,
    name: "Transportation & Logistics",
    description: "Fleet management, logistics optimization, real-time tracking, and supply chain visibility solutions.",
    icon: <FaTruck className="w-8 h-8" />,
    gradient: "from-teal-500 to-teal-700",
    projects: 14,
    highlights: ["Fleet Management", "Route Optimization", "Real-time Tracking", "Supply Chain"],
    caseStudy: "Logistics Optimization System"
  },
  {
    id: 8,
    name: "Real Estate & PropTech",
    description: "Property management systems, real estate platforms, virtual tours, and smart building solutions.",
    icon: <FaHome className="w-8 h-8" />,
    gradient: "from-amber-500 to-amber-700",
    projects: 16,
    highlights: ["Property Management", "Virtual Tours", "Smart Buildings", "Real Estate Platforms"],
    caseStudy: "Real Estate Digital Platform"
  },
  {
    id: 9,
    name: "Hospitality & Travel",
    description: "Booking systems, hotel management, travel platforms, and customer experience solutions for hospitality.",
    icon: <FaPlane className="w-8 h-8" />,
    gradient: "from-pink-500 to-pink-700",
    projects: 11,
    highlights: ["Booking Systems", "Hotel Management", "Travel Platforms", "Customer Experience"],
    caseStudy: "Hotel Chain Management System"
  },
  {
    id: 10,
    name: "Food & Beverage",
    description: "Restaurant management, delivery platforms, inventory systems, and customer engagement solutions.",
    icon: <FaUtensils className="w-8 h-8" />,
    gradient: "from-red-500 to-red-700",
    projects: 13,
    highlights: ["Restaurant Management", "Delivery Platforms", "Inventory Systems", "Customer Apps"],
    caseStudy: "Restaurant Chain Digital Transformation"
  },
  {
    id: 11,
    name: "Media & Entertainment",
    description: "Streaming platforms, content management, digital publishing, and media distribution systems.",
    icon: <FaFilm className="w-8 h-8" />,
    gradient: "from-violet-500 to-violet-700",
    projects: 9,
    highlights: ["Streaming Platforms", "Content Management", "Digital Publishing", "Media Distribution"],
    caseStudy: "Media Company Platform Upgrade"
  },
  {
    id: 12,
    name: "Energy & Utilities",
    description: "Smart grid solutions, energy management, utility billing, and sustainability monitoring systems.",
    icon: <FaCog className="w-8 h-8" />,
    gradient: "from-emerald-500 to-emerald-700",
    projects: 8,
    highlights: ["Smart Grid", "Energy Management", "Utility Billing", "Sustainability"],
    caseStudy: "Energy Management System"
  }
];

const industryStats = [
  { number: "200+", label: "Projects Delivered" },
  { number: "50+", label: "Industry Partners" },
  { number: "95%", label: "Client Satisfaction" },
  { number: "15+", label: "Industries Served" }
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Industries We Serve
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            Tailored digital solutions for diverse sectors, driving innovation and growth across industries
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {industryStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-300 mb-2">{stat.number}</div>
                <div className="text-blue-200 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Industry Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Deep domain knowledge combined with technical excellence to deliver impactful solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {industries.map((industry) => (
              <div
                key={industry.id}
                className="group bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                {/* Header with Gradient */}
                <div className={`bg-gradient-to-br ${industry.gradient} p-6 text-white text-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      {industry.icon}
                    </div>
                    <h3 className="text-xl font-bold">{industry.name}</h3>
                    <div className="text-white/90 text-sm mt-1">{industry.projects}+ Projects</div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {industry.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 mb-4">
                    {industry.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Case Study Link */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500 mb-2">Featured Case Study:</div>
                    <div className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors cursor-pointer">
                      {industry.caseStudy}
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Industry Specialization Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Deep industry knowledge leads to better solutions and faster results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaChartLine className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Domain Expertise</h3>
              <p className="text-gray-600">
                Deep understanding of industry-specific challenges, regulations, and opportunities
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Proven Methodologies</h3>
              <p className="text-gray-600">
                Industry-tested approaches that deliver measurable results and ROI
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMobile className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Best Practices</h3>
              <p className="text-gray-600">
                Implementation of industry standards and compliance requirements
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCloud className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Faster Time-to-Market</h3>
              <p className="text-gray-600">
                Accelerated development through industry-specific templates and components
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Don't See Your Industry?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our adaptable approach and technical expertise allow us to deliver exceptional results across any sector. 
            Let's discuss how we can help your industry-specific challenges.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contactUs"
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center gap-3"
            >
              Discuss Your Project
              <FaArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/case-studies"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-3"
            >
              View Case Studies
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t border-white/20">
            <p className="text-blue-200 text-sm">
              Custom solutions for unique industry challenges • Compliance and security expertise • Scalable architectures
            </p>
          </div>
        </div>
      </section>
    </div>
  ); 
};

export default Page;