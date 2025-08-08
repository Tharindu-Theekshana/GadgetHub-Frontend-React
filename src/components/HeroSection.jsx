import { useState, useEffect } from 'react';
import { ArrowDown, ChevronRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9ImdyaWQiIG9wYWNpdHk9IjAuMDUiPgo8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIi8+CjwvZz4KPHN2Zz4K')] opacity-20"></div>

      {/* Floating tech particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Binary code rain effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400/20 text-xs font-mono animate-binary-rain"
            style={{
              left: `${i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '8s'
            }}
          >
            {Array.from({length: 20}, () => Math.random() > 0.5 ? '1' : '0').join('')}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Zap className="w-4 h-4 text-yellow-400 mr-2 animate-pulse" />
              <span className="text-sm font-medium text-white">New arrivals daily</span>
            </div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Your Tech
                <span className="block bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                  Paradise
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
                Discover cutting-edge gadgets, premium electronics, and innovative tech solutions. 
                All in one place, with unbeatable prices and lightning-fast delivery.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex">
              <button onClick={()=> {navigate("/products")}} className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 hover:from-cyan-400 hover:to-blue-500 hover:shadow-2xl hover:shadow-cyan-500/25 hover:-translate-y-1 relative overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative flex items-center justify-center">
                  Shop Now
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>

          {/* Right Content - Modern Tech Animation */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Central tech hub */}
            <div className="relative flex items-center justify-center">
              
              {/* Main central circle */}
              <div className="relative w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 rounded-full backdrop-blur-xl border border-white/30 shadow-2xl animate-pulse-slow">
                
                {/* Inner glowing core */}
                <div className="absolute inset-4 bg-gradient-to-br from-cyan-300/30 to-blue-500/30 rounded-full animate-spin-slow">
                  <div className="absolute inset-4 bg-gradient-to-br from-white/20 to-transparent rounded-full flex items-center justify-center">
                    <div className="text-4xl animate-float">🚀</div>
                  </div>
                </div>

                {/* Orbiting tech icons */}
                <div className="absolute inset-0 animate-spin" style={{animationDuration: '20s'}}>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg">
                    📱
                  </div>
                </div>
                
                <div className="absolute inset-0 animate-spin-reverse" style={{animationDuration: '25s'}}>
                  <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full flex items-center justify-center text-white shadow-lg">
                    💻
                  </div>
                </div>
                
                <div className="absolute inset-0 animate-spin" style={{animationDuration: '30s'}}>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-green-400 to-teal-600 rounded-full flex items-center justify-center text-white shadow-lg">
                    🎧
                  </div>
                </div>
                
                <div className="absolute inset-0 animate-spin-reverse" style={{animationDuration: '22s'}}>
                  <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full flex items-center justify-center text-white shadow-lg">
                    ⌚
                  </div>
                </div>
              </div>

              {/* Connection lines */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-px bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent animate-pulse"
                    style={{
                      height: '200px',
                      left: '50%',
                      top: '50%',
                      transform: `rotate(${i * 45}deg) translateY(-100px)`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </div>

              {/* Floating data packets */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-cyan-400 rounded-sm animate-data-flow"
                  style={{
                    left: `${30 + i * 15}%`,
                    top: `${20 + i * 10}%`,
                    animationDelay: `${i * 0.8}s`,
                    animationDuration: '4s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className={`mt-20 md:mt-[-15px] text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-gray-400 mb-6">Trusted by over 100K+ customers worldwide</p>
          <div className="flex justify-center items-center md:space-x-12 space-x-5 opacity-60">
            <div className="md:text-2xl text-lg font-bold hover:text-cyan-400 transition-colors cursor-pointer">Apple</div>
            <div className="md:text-2xl text-lg font-bold hover:text-cyan-400 transition-colors cursor-pointer">Samsung</div>
            <div className="md:text-2xl text-lg font-bold hover:text-cyan-400 transition-colors cursor-pointer">Sony</div>
            <div className="md:text-2xl text-lg font-bold hover:text-cyan-400 transition-colors cursor-pointer">Microsoft</div>
          </div>
        </div>
        <div className='absolute bottom-13 transform left-1/2 -translate-x-1/2 md:flex hidden flex-col items-center animate-bounce z-20'>
          <span className='text-sm text-gray-400 mb-2 font-medium'>Scroll</span>
          <ArrowDown className='h-5 w-5 text-gray-400'/>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-particle {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
          50% { 
            transform: translateY(-10px) translateX(-10px);
            opacity: 0.5;
          }
          75% { 
            transform: translateY(-30px) translateX(5px);
            opacity: 0.8;
          }
        }
        
        @keyframes binary-rain {
          0% { 
            transform: translateY(-100px);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.3);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 40px rgba(34, 211, 238, 0.6);
            transform: scale(1.05);
          }
        }
        
        @keyframes data-flow {
          0% { 
            transform: translateX(0) translateY(0) scale(1);
            opacity: 0;
          }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { 
            transform: translateX(200px) translateY(-100px) scale(0);
            opacity: 0;
          }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-particle {
          animation: float-particle linear infinite;
        }
        
        .animate-binary-rain {
          animation: binary-rain linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-data-flow {
          animation: data-flow linear infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}