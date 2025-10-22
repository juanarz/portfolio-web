import { SkeletonLoader, SkeletonText, SkeletonCard, SkeletonProject, SkeletonSkill, SkeletonContact } from './SkeletonLoader'
import ProgressBar from './ProgressBar'
import LoadingMessages from './LoadingMessages'

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <ProgressBar duration={3000} />
      </div>
      {/* Navbar Skeleton */}
      <nav className="fixed top-0 w-full z-40 bg-slate-100/80 dark:bg-dark-bg/80 backdrop-filter backdrop-blur-16px">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <SkeletonLoader variant="title" className="h-8 w-16" />
            <div className="hidden sm:flex items-center space-x-8">
              {Array.from({ length: 5 }).map((_, index) => (
                <SkeletonLoader key={index} variant="text" className="h-4 w-16" />
              ))}
              <SkeletonLoader variant="circle" className="h-8 w-8" />
            </div>
            <SkeletonLoader variant="circle" className="h-8 w-8 sm:hidden" />
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section Skeleton */}
        <section className="min-h-screen flex items-center justify-center px-4 pt-16">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Loading Messages */}
            <LoadingMessages />
            {/* Profile Picture */}
            <SkeletonLoader variant="avatar" className="h-32 w-32 sm:h-56 sm:w-56 mx-auto" />
            
            {/* Greeting */}
            <SkeletonLoader variant="text" className="h-5 w-32 mx-auto" />
            
            {/* Name */}
            <SkeletonLoader variant="title" className="h-16 w-64 mx-auto" />
            
            {/* Title */}
            <SkeletonLoader variant="subtitle" className="h-12 w-80 mx-auto" />
            
            {/* Description */}
            <SkeletonText lines={3} className="max-w-2xl mx-auto" />
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SkeletonLoader variant="button" className="h-12 w-32" />
              <SkeletonLoader variant="button" className="h-12 w-32" />
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonLoader key={index} variant="circle" className="h-6 w-6" />
              ))}
            </div>
            
            {/* Scroll Indicator */}
            <SkeletonLoader variant="circle" className="h-6 w-6 mx-auto" />
          </div>
        </section>

        {/* About Section Skeleton */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-16">
              <SkeletonLoader variant="title" className="h-10 w-48 mx-auto mb-4" />
              <SkeletonLoader variant="line" className="h-1 w-20 mx-auto" />
            </div>

            {/* Content */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="space-y-4">
                <SkeletonText lines={4} />
              </div>

              {/* Features Grid */}
              <div className="grid gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="mt-20">
              <div className="text-center mb-12">
                <SkeletonLoader variant="title" className="h-8 w-40 mx-auto mb-4" />
                <SkeletonLoader variant="line" className="h-1 w-16 mx-auto" />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {Array.from({ length: 2 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section Skeleton */}
        <section className="py-20 px-4 bg-slate-100/50 dark:bg-dark-card/30">
          <div className="max-w-6xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-16">
              <SkeletonLoader variant="title" className="h-10 w-48 mx-auto mb-4" />
              <SkeletonLoader variant="line" className="h-1 w-20 mx-auto" />
            </div>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonSkill key={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section Skeleton */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-16">
              <SkeletonLoader variant="title" className="h-10 w-56 mx-auto mb-4" />
              <SkeletonLoader variant="line" className="h-1 w-20 mx-auto" />
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonProject key={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section Skeleton */}
        <section className="py-20 px-4 bg-slate-100/50 dark:bg-dark-card/30">
          <div className="max-w-6xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-16">
              <SkeletonLoader variant="title" className="h-10 w-48 mx-auto mb-4" />
              <SkeletonLoader variant="line" className="h-1 w-20 mx-auto mb-4" />
              <SkeletonLoader variant="text" className="h-5 w-64 mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <SkeletonLoader variant="subtitle" className="h-6 w-48 mb-6" />
                  <div className="space-y-4">
                    {Array.from({ length: 2 }).map((_, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <SkeletonLoader variant="circle" className="h-12 w-12" />
                        <div>
                          <SkeletonLoader variant="line" className="h-3 w-16 mb-1" />
                          <SkeletonLoader variant="text" className="h-4 w-32" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <SkeletonLoader variant="subtitle" className="h-6 w-32 mb-6" />
                  <div className="flex space-x-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <SkeletonLoader key={index} variant="circle" className="h-12 w-12" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <SkeletonContact />
            </div>
          </div>
        </section>
      </main>

      {/* Footer Skeleton */}
      <footer className="py-8 px-4 border-t border-slate-300 dark:border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <SkeletonLoader variant="text" className="h-4 w-64 mx-auto" />
            <SkeletonLoader variant="line" className="h-3 w-32 mx-auto mt-2" />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LoadingScreen
