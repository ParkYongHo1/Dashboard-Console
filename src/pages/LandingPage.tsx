// pages/landing/LandingPage.tsx
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Zap, Shield, ChevronDown } from "lucide-react";
import { Footer } from "@/widgets/footer/ui/Footer";

const LandingPage = () => {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-[52px] font-bold text-gray-900 leading-tight tracking-tight mb-6">
            데이터를 한눈에,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">인사이트는 한순간에</span>
          </h1>

          <p className="text-[18px] text-gray-500 leading-relaxed mb-10">
            복잡한 데이터를 직관적인 시각화로 바꿔드려요.
            <br />
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link to="/login" className="group inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all hover:gap-3">
              시작하기
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button onClick={scrollToFeatures} className="absolute bottom-10 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-300" />
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-[40px] font-bold text-gray-900 mb-4">왜 DataFlow인가요?</h2>
            <p className="text-[17px] text-gray-500">데이터 분석의 새로운 기준을 제시합니다</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-3xl hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-[20px] font-bold text-gray-900 mb-3">실시간 시각화</h3>
              <p className="text-[15px] text-gray-500 leading-relaxed">데이터가 변경되면 차트도 즉시 업데이트돼요. 항상 최신 정보를 확인하세요.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-3xl hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-[20px] font-bold text-gray-900 mb-3">빠른 설정</h3>
              <p className="text-[15px] text-gray-500 leading-relaxed">복잡한 설정 없이 5분 만에 대시보드를 만들 수 있어요. 드래그 앤 드롭으로 간편하게.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-3xl hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-[20px] font-bold text-gray-900 mb-3">안전한 데이터</h3>
              <p className="text-[15px] text-gray-500 leading-relaxed">기업 수준의 보안으로 데이터를 안전하게 보호해요. 걱정 없이 사용하세요.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      {/* Preview Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-gray-900 mb-4">직관적인 대시보드</h2>
            <p className="text-[17px] text-gray-500">복잡함은 줄이고, 인사이트는 높이고</p>
          </div>

          {/* Mock Dashboard */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            {/* Window Controls */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>

            {/* Header Bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg" />
                <span className="font-semibold text-gray-900">통계 대시보드</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-500">
                  <span>2024.01.01 ~ 2024.12.28</span>
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">그룹항목 통계</h3>
                    <p className="text-sm text-gray-500">SCENARIONAME 기준</p>
                  </div>
                  <div className="px-3 py-1.5 bg-white rounded-lg text-sm text-gray-600 border border-gray-200">scenarioname ▾</div>
                </div>

                <div className="flex justify-center py-6">
                  <div className="relative w-40 h-40">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="12" strokeDasharray="150 251.2" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#60A5FA" strokeWidth="12" strokeDasharray="60 251.2" strokeDashoffset="-150" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#A78BFA" strokeWidth="12" strokeDasharray="41.2 251.2" strokeDashoffset="-210" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">총 1,234건</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span className="text-gray-600">스마트레터</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                    <span className="text-gray-600">실효예고</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                    <span className="text-gray-600">해피콜</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">집계항목 통계</h3>
                    <p className="text-sm text-gray-500">SUCCESS_COUNT 기준</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="px-3 py-1.5 bg-white rounded-lg text-sm text-gray-600 border border-gray-200">scenarioname ▾</div>
                    <div className="px-3 py-1.5 bg-white rounded-lg text-sm text-gray-600 border border-gray-200">success_count ▾</div>
                  </div>
                </div>

                <div className="flex justify-center py-6">
                  <div className="relative w-40 h-40">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#10B981" strokeWidth="12" strokeDasharray="120 251.2" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#34D399" strokeWidth="12" strokeDasharray="80 251.2" strokeDashoffset="-120" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#6EE7B7" strokeWidth="12" strokeDasharray="51.2 251.2" strokeDashoffset="-200" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">총 892건</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-gray-600">성공</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-gray-600">대기</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                    <span className="text-gray-600">실패</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">교차 분석표</h3>
                  <p className="text-sm text-gray-500">SCENARIONAME 기준 × 모든 집계항목</p>
                </div>
                <div className="px-3 py-1.5 bg-white rounded-lg text-sm text-gray-600 border border-gray-200">scenarioname ▾</div>
              </div>

              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">그룹 / 집계</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">SUCCESS</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">FAIL</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">PENDING</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 bg-gray-200">합계</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50">스마트레터</td>
                      <td className="px-4 py-3 text-center text-gray-700">
                        423 <span className="text-gray-400 text-xs">(58.2%)</span>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-700">
                        89 <span className="text-gray-400 text-xs">(12.3%)</span>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-700">
                        214 <span className="text-gray-400 text-xs">(29.5%)</span>
                      </td>
                      <td className="px-4 py-3 text-center font-semibold text-gray-900 bg-gray-50">726</td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50">실효예고</td>
                      <td className="px-4 py-3 text-center text-gray-700">
                        312 <span className="text-gray-400 text-xs">(62.4%)</span>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-700">
                        45 <span className="text-gray-400 text-xs">(9.0%)</span>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-700">
                        143 <span className="text-gray-400 text-xs">(28.6%)</span>
                      </td>
                      <td className="px-4 py-3 text-center font-semibold text-gray-900 bg-gray-50">500</td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50">해피콜</td>
                      <td className="px-4 py-3 text-center text-gray-700">
                        157 <span className="text-gray-400 text-xs">(55.3%)</span>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-700">
                        38 <span className="text-gray-400 text-xs">(13.4%)</span>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-700">
                        89 <span className="text-gray-400 text-xs">(31.3%)</span>
                      </td>
                      <td className="px-4 py-3 text-center font-semibold text-gray-900 bg-gray-50">284</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-gray-200 bg-gray-100">
                      <td className="px-4 py-3 font-semibold text-gray-900">합계</td>
                      <td className="px-4 py-3 text-center font-semibold text-gray-900">892</td>
                      <td className="px-4 py-3 text-center font-semibold text-gray-900">172</td>
                      <td className="px-4 py-3 text-center font-semibold text-gray-900">446</td>
                      <td className="px-4 py-3 text-center font-bold text-gray-900 bg-gray-200">1,510</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-32 px-6 bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[40px] font-bold text-white mb-4">지금 바로 시작하세요</h2>
          <Link to="/login" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-gray-900 font-semibold text-lg rounded-2xl hover:bg-gray-100 transition-colors">
            시작하기
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
