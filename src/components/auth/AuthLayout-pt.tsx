import { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function AuthLayoutPt({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navegação estilo Apple */}
      <header className="fixed top-0 z-50 w-full bg-[rgba(255,255,255,0.8)] backdrop-blur-md border-b border-[#f5f5f7]/30">
        <div className="max-w-[980px] mx-auto flex h-12 items-center justify-between px-4">
          <div className="flex items-center">
            <Link
              to="/"
              className="font-medium text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              DocSafe Brasil
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-7 text-sm font-light">
            <Link
              to="/funcionalidades"
              className="hover:text-blue-600 transition-colors"
            >
              Funcionalidades
            </Link>
            <Link
              to="/beneficios"
              className="hover:text-blue-600 transition-colors"
            >
              Planos
            </Link>
            <Link
              to="/gamificacao"
              className="hover:text-blue-600 transition-colors"
            >
              Gamificação
            </Link>
            <Link
              to="/contato"
              className="hover:text-blue-600 transition-colors"
            >
              Suporte
            </Link>
          </nav>
        </div>
      </header>

      <div className="min-h-screen flex items-center justify-center pt-12">
        <div className="max-w-md w-full px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              DocSafe Brasil
            </h2>
            <p className="text-xl font-medium text-gray-500 mt-2">
              Entre para acessar sua conta
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
