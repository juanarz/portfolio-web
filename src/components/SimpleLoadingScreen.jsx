const SimpleLoadingScreen = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-8"></div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
          Cargando Portafolio...
        </h2>
        <p className="text-slate-600 dark:text-gray-400">
          Preparando contenido
        </p>
      </div>
    </div>
  )
}

export default SimpleLoadingScreen
