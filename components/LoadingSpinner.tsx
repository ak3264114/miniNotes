interface LoadingSpinnerProps {
    fullScreen?: boolean;
  }
  
  export default function LoadingSpinner({ fullScreen = false }: LoadingSpinnerProps) {
    if (fullScreen) {
      return (
        <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-solid rounded-full"></div>
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Loading...</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="flex justify-center py-12">
        <div className="relative">
          <div className="w-10 h-10 border-4 border-blue-200 border-solid rounded-full"></div>
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
      </div>
    );
  }