export const SkeletonLoader = ({ className = "", variant = "default" }) => {
  const baseClasses = "animate-pulse bg-slate-300 dark:bg-slate-700 rounded skeleton"
  
  const variants = {
    default: "h-4 w-full",
    circle: "h-12 w-12 rounded-full",
    rectangle: "h-32 w-full",
    text: "h-4 w-3/4",
    title: "h-8 w-1/2",
    subtitle: "h-6 w-2/3",
    button: "h-10 w-24",
    card: "h-48 w-full",
    avatar: "h-16 w-16 rounded-full",
    line: "h-3 w-full"
  }

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`}></div>
  )
}

// Componente específico para skeleton de texto
export const SkeletonText = ({ lines = 3, className = "" }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonLoader 
          key={index} 
          variant={index === 0 ? "text" : "line"} 
          className={index === 0 ? "" : "w-5/6"}
        />
      ))}
    </div>
  )
}

// Componente específico para skeleton de cards
export const SkeletonCard = ({ className = "" }) => {
  return (
    <div className={`glass-effect p-6 rounded-lg ${className}`}>
      <div className="space-y-4">
        <SkeletonLoader variant="title" />
        <SkeletonLoader variant="subtitle" />
        <SkeletonText lines={2} />
        <div className="flex space-x-2">
          <SkeletonLoader variant="button" className="h-6 w-16" />
          <SkeletonLoader variant="button" className="h-6 w-20" />
        </div>
      </div>
    </div>
  )
}

// Componente específico para skeleton de proyecto
export const SkeletonProject = ({ className = "" }) => {
  return (
    <div className={`glass-effect rounded-lg overflow-hidden ${className}`}>
      <SkeletonLoader variant="rectangle" className="h-48" />
      <div className="p-6 space-y-4">
        <SkeletonLoader variant="title" />
        <SkeletonLoader variant="subtitle" className="h-4 w-1/3" />
        <SkeletonText lines={3} />
        <div className="flex flex-wrap gap-2">
          <SkeletonLoader variant="button" className="h-6 w-16" />
          <SkeletonLoader variant="button" className="h-6 w-20" />
          <SkeletonLoader variant="button" className="h-6 w-14" />
        </div>
        <div className="flex space-x-4">
          <SkeletonLoader variant="button" className="h-8 w-20" />
          <SkeletonLoader variant="button" className="h-8 w-24" />
        </div>
      </div>
    </div>
  )
}

// Componente específico para skeleton de skills
export const SkeletonSkill = ({ className = "" }) => {
  return (
    <div className={`glass-effect p-6 rounded-lg ${className}`}>
      <SkeletonLoader variant="title" className="mb-6" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4 p-3 rounded-lg">
            <SkeletonLoader variant="circle" className="h-8 w-8" />
            <SkeletonLoader variant="text" className="h-5 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  )
}

// Componente específico para skeleton de contacto
export const SkeletonContact = ({ className = "" }) => {
  return (
    <div className={`glass-effect p-8 rounded-lg ${className}`}>
      <div className="space-y-6">
        <div>
          <SkeletonLoader variant="line" className="h-4 w-24 mb-2" />
          <SkeletonLoader variant="text" className="h-4 w-32" />
        </div>
        <div>
          <SkeletonLoader variant="line" className="h-4 w-20 mb-2" />
          <SkeletonLoader variant="text" className="h-4 w-40" />
        </div>
        <div>
          <SkeletonLoader variant="line" className="h-4 w-16 mb-2" />
          <SkeletonLoader variant="text" className="h-4 w-28" />
        </div>
        <div className="flex space-x-4">
          <SkeletonLoader variant="circle" className="h-12 w-12" />
          <SkeletonLoader variant="circle" className="h-12 w-12" />
          <SkeletonLoader variant="circle" className="h-12 w-12" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoader
