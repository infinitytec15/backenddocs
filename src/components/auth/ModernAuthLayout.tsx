import { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function ModernAuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 text-gray-900 flex flex-col">
      {/* Modern navigation with glassmorphism */}
      <header className="fixed top-0 z-50 w-full bg-white/70 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link
              to="/"
              className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Tempo
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Features
            </Link>
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Documentation
            </Link>
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Support
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome to Tempo
            </h2>
            <p className="mt-3 text-gray-600">
              Your document management solution
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {children}
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Protected by industry-leading security practices</p>
          </div>
        </div>
      </main>
    </div>
  );
}
