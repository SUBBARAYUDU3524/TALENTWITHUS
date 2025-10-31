import React from 'react';
import Link from 'next/link';
import { 
  FaArrowRight, 
  FaChartLine, 
  FaUsers, 
  FaClock, 
  FaIndustry, 
  FaMobile, 
  FaCloud, 
  FaShieldAlt, 
  FaLaptopCode, 
  FaCheck,
  FaCreditCard,
  FaShoppingCart,
  FaHeartbeat,
  FaTshirt ,
  FaDatabase,
  FaServer,
  FaGlobe,
  FaLock
} from 'react-icons/fa';

const caseStudies = [
  {
    id: 1,
    title: "Digital Transformation for Financial Services",
    client: "Global Finance Corp",
    industry: "Banking & Finance",
    duration: "6 Months",
    results: "40% increase in digital engagement",
    challenge: "Legacy systems hindering customer experience and operational efficiency in a competitive digital banking landscape.",
    solution: "Implemented a modern microservices architecture with React frontend and cloud-native backend, enabling seamless digital banking experiences.",
    outcome: "Enhanced customer satisfaction by 35% and reduced operational costs by 25% while improving system scalability.",
    image: "/case-studies/finance-digital.jpg",
    tags: ["Digital Transformation", "Cloud Migration", "React", "Microservices"],
    metrics: [
      { value: "40%", label: "Digital Engagement" },
      { value: "35%", label: "Customer Satisfaction" },
      { value: "25%", label: "Cost Reduction" }
    ],
    bgGradient: "from-blue-500 to-blue-700",
    icon: <FaCreditCard className="w-8 h-8" />
  },
  {
    id: 2,
    title: "E-commerce Platform Scaling Solution",
    client: "StyleRetail Inc",
    industry: "Retail & E-commerce",
    duration: "4 Months",
    results: "300% traffic handling capacity",
    challenge: "Existing platform unable to handle seasonal traffic spikes, leading to downtime during peak sales periods.",
    solution: "Developed a scalable cloud infrastructure with load balancing, CDN integration, and optimized database architecture.",
    outcome: "Achieved zero downtime during Black Friday sales while handling 3x more concurrent users than previous year.",
    image: "/case-studies/ecommerce-scaling.jpg",
    tags: ["Scalability", "Cloud Infrastructure", "Performance", "E-commerce"],
    metrics: [
      { value: "300%", label: "Traffic Capacity" },
      { value: "0", label: "Downtime" },
      { value: "60%", label: "Faster Load Times" }
    ],
    bgGradient: "from-green-500 to-green-700",
    icon: <FaShoppingCart className="w-8 h-8" />
  },
  {
    id: 3,
    title: "Healthcare Data Management System",
    client: "MediCare Solutions",
    industry: "Healthcare",
    duration: "8 Months",
    results: "HIPAA compliant data handling",
    challenge: "Need for secure, compliant patient data management while improving accessibility for healthcare providers.",
    solution: "Built a secure healthcare platform with end-to-end encryption, audit trails, and HIPAA-compliant data storage.",
    outcome: "Streamlined patient data access for providers while maintaining highest security standards and regulatory compliance.",
    image: "/case-studies/healthcare-data.jpg",
    tags: ["Healthcare", "Security", "Compliance", "Data Management"],
    metrics: [
      { value: "100%", label: "HIPAA Compliance" },
      { value: "50%", label: "Faster Data Access" },
      { value: "99.9%", label: "System Uptime" }
    ],
    bgGradient: "from-purple-500 to-purple-700",
    icon: <FaHeartbeat className="w-8 h-8" />
  },
  {
    id: 4,
    title: "Mobile-First Retail Experience",
    client: "UrbanStyle Brands",
    industry: "Fashion Retail",
    duration: "5 Months",
    results: "200% mobile conversion growth",
    challenge: "Declining mobile sales due to poor user experience and slow performance on mobile devices.",
    solution: "Created a Progressive Web App (PWA) with optimized mobile experience, offline capabilities, and push notifications.",
    outcome: "Significantly improved mobile conversion rates and customer retention while reducing bounce rates.",
    image: "/case-studies/mobile-retail.jpg",
    tags: ["Mobile First", "PWA", "User Experience", "Retail"],
    metrics: [
      { value: "200%", label: "Mobile Conversion" },
      { value: "45%", label: "Lower Bounce Rate" },
      { value: "3.5x", label: "Faster Load Time" }
    ],
    bgGradient: "from-orange-500 to-orange-700",
    icon: <FaTshirt  className="w-8 h-8" />
  },
  {
    id: 5,
    title: "Enterprise Cloud Migration",
    client: "TechInnovate Solutions",
    industry: "Technology",
    duration: "7 Months",
    results: "60% infrastructure cost savings",
    challenge: "On-premise infrastructure causing high maintenance costs and limited scalability for growing tech company.",
    solution: "Migrated entire infrastructure to cloud with containerization, auto-scaling, and DevOps implementation.",
    outcome: "Achieved significant cost savings while improving deployment speed and system reliability.",
    image: "/case-studies/cloud-migration.jpg",
    tags: ["Cloud Migration", "DevOps", "Containerization", "Infrastructure"],
    metrics: [
      { value: "60%", label: "Cost Savings" },
      { value: "80%", label: "Faster Deployment" },
      { value: "99.95%", label: "Uptime" }
    ],
    bgGradient: "from-cyan-500 to-cyan-700",
    icon: <FaCloud className="w-8 h-8" />
  },
  {
    id: 6,
    title: "Cybersecurity Platform Implementation",
    client: "SecureNet Systems",
    industry: "Security",
    duration: "5 Months",
    results: "Zero security breaches",
    challenge: "Increasing cybersecurity threats requiring robust protection systems for sensitive enterprise data.",
    solution: "Implemented comprehensive security platform with real-time monitoring, threat detection, and automated response systems.",
    outcome: "Maintained perfect security record while improving threat detection and response times significantly.",
    image: "/case-studies/cybersecurity.jpg",
    tags: ["Cybersecurity", "Threat Detection", "Monitoring", "Compliance"],
    metrics: [
      { value: "0", label: "Security Breaches" },
      { value: "90%", label: "Faster Detection" },
      { value: "100%", label: "Compliance" }
    ],
    bgGradient: "from-red-500 to-red-700",
    icon: <FaLock className="w-8 h-8" />
  }
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Case Studies
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            Discover how we've helped businesses transform their digital presence and achieve remarkable results
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300">50+</div>
              <div className="text-blue-200">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300">95%</div>
              <div className="text-blue-200">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300">40%</div>
              <div className="text-blue-200">Average Growth</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Case Studies
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real-world solutions delivering measurable business impact across industries
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study) => (
              <div
                key={study.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="lg:flex">
                  {/* Image Section - Left Side */}
                  <div className={`lg:w-2/5 bg-gradient-to-br ${study.bgGradient} p-8 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10 text-center text-white">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        {study.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{study.client}</h3>
                      <div className="font-semibold opacity-90">{study.industry}</div>
                      <div className="mt-4 flex justify-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                          <div className="text-sm opacity-90">Success Story</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                  </div>

                  {/* Content Section - Right Side */}
                  <div className="lg:w-3/5 p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {study.title}
                    </h3>

                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <FaClock className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Duration</div>
                          <div className="text-gray-600">{study.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FaChartLine className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Key Result</div>
                          <div className="text-gray-600 font-medium">{study.results}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <FaIndustry className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Industry</div>
                          <div className="text-gray-600">{study.industry}</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          The Challenge
                        </h4>
                        <p className="text-gray-600 leading-relaxed">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Our Solution
                        </h4>
                        <p className="text-gray-600 leading-relaxed">{study.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Business Outcome
                        </h4>
                        <p className="text-gray-600 leading-relaxed">{study.outcome}</p>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-4 text-center">Key Metrics Achieved</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {study.metrics.map((metric, index) => (
                          <div key={index} className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{metric.value}</div>
                            <div className="text-sm text-gray-600 font-medium">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FaCheck className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Write Your <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Success Story</span>?
          </h2>
          
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join the ranks of successful businesses that have transformed their digital presence with our expert solutions. 
            Let's create your next success story together.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-200 font-medium">Successful Projects</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-blue-200 font-medium">Client Satisfaction</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">40%</div>
              <div className="text-blue-200 font-medium">Average ROI</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contactUs"
              className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold px-10 py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl inline-flex items-center gap-3 text-lg"
            >
              Start Your Project
              <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link
              href="/whatwedo"
              className="group border-2 border-white/30 hover:border-white bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-3 text-lg"
            >
              Explore Services
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Trust Indicator */}
          <div className="mt-10 pt-8 border-t border-white/20">
            <p className="text-blue-200 text-sm font-medium">
              Trusted by 100+ companies worldwide • 24/7 Support • 100% Satisfaction Guarantee
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;