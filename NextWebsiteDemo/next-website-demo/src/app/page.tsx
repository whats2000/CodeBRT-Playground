import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                智慧永續<br />ESG 解決方案
              </h1>
              <p className="text-xl text-blue-100">
                協助企業建立永續發展策略，落實 ESG 管理，實現企業永續價值
              </p>
              <div className="space-x-4">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  了解更多
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                  聯絡我們
                </button>
              </div>
            </div>
            <div className="relative h-[500px]">
              <Image
                src="/globe.svg"
                alt="ESG Globe"
                fill
                priority
                className="object-contain brightness-0 invert"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">我們的服務</h2>
            <p className="text-gray-600">
              提供全方位的 ESG 解決方案，協助企業達成永續發展目標
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'ESG 報告書撰寫',
                description: '專業團隊協助企業完成符合國際標準的永續報告書，確保報告品質與合規性',
                icon: '/file.svg',
              },
              {
                title: '永續管理系統',
                description: '建置完整的 ESG 管理平台，實現數據自動化收集與分析，提升管理效率',
                icon: '/window.svg',
              },
              {
                title: '永續策略諮詢',
                description: '提供專業的永續發展策略建議，協助企業制定具體可行的永續發展路徑',
                icon: '/globe.svg',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-16 w-16 mb-6">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">為什麼選擇我們？</h2>
              <p className="text-gray-600">
                我們擁有豐富的 ESG 顧問經驗，協助過多家上市櫃公司完成永續報告書，
                並提供客製化的永續管理解決方案。我們的專業團隊將為您：
              </p>
              <ul className="space-y-4">
                {[
                  '提供完整的永續發展策略規劃',
                  '協助建立系統化的 ESG 管理流程',
                  '確保永續報告符合國際標準要求',
                  '持續追蹤與改善永續績效表現'
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-2">15+</h3>
                <p className="text-gray-600">專業顧問</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-2">100+</h3>
                <p className="text-gray-600">成功案例</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-2">98%</h3>
                <p className="text-gray-600">客戶滿意度</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-2">24/7</h3>
                <p className="text-gray-600">專業支援</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-blue-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">開始您的永續之旅</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              立即與我們聯繫，了解如何為您的企業打造最適合的永續發展方案。
              我們的專業團隊將為您提供最完整的諮詢服務。
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              預約諮詢
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}