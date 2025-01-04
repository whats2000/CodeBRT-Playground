import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-50 shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center justify-between w-full">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                ESG Smart Guide
              </Link>
            </div>
            <div className="hidden sm:flex sm:space-x-8">
              <Link 
                href="/about"
                className="text-gray-600 hover:text-blue-600 hover:border-blue-600 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium transition-colors duration-200"
              >
                關於我們
              </Link>
              <Link 
                href="/services"
                className="text-gray-600 hover:text-blue-600 hover:border-blue-600 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium transition-colors duration-200"
              >
                服務項目
              </Link>
              <Link 
                href="/contact"
                className="text-gray-600 hover:text-blue-600 hover:border-blue-600 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium transition-colors duration-200"
              >
                聯絡我們
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;