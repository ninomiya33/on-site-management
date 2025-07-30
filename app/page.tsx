
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [location, setLocation] = useState('位置情報を取得中...');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('ja-JP'));
      setCurrentDate(now.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // GPS位置情報を取得
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`緯度: ${position.coords.latitude.toFixed(4)}, 経度: ${position.coords.longitude.toFixed(4)}`);
        },
        () => {
          setLocation('位置情報の取得に失敗');
        }
      );
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      {/* ヘッダー */}
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6 mb-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <i className="ri-tools-fill text-white text-2xl"></i>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">現場報告システム</h1>
          <div className="text-2xl font-bold text-blue-600 mb-1" suppressHydrationWarning={true}>{currentTime}</div>
          <div className="text-sm text-gray-600 mb-2" suppressHydrationWarning={true}>{currentDate}</div>
          <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            <i className="ri-map-pin-line mr-1"></i>
            {location}
          </div>
        </div>
      </div>

      {/* メインメニュー */}
      <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
        {/* 作業開始 */}
        <Link href="/start-work">
          <div className="group relative bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 hover:from-emerald-500 hover:via-green-600 hover:to-teal-700 text-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-white/20">
            <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-play-circle-fill text-4xl"></i>
              </div>
              <div className="text-2xl font-bold mb-2">作業開始</div>
              <div className="text-sm opacity-90">現場作業をスタート</div>
            </div>
          </div>
        </Link>

        {/* 進捗報告 */}
        <Link href="/progress-report">
          <div className="group relative bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 hover:from-blue-500 hover:via-blue-600 hover:to-indigo-700 text-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-white/20">
            <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-clipboard-line text-4xl"></i>
              </div>
              <div className="text-2xl font-bold mb-2">進捗報告</div>
              <div className="text-sm opacity-90">作業状況を記録</div>
            </div>
          </div>
        </Link>

        {/* 写真・音声記録 */}
        <Link href="/media-record">
          <div className="group relative bg-gradient-to-br from-purple-400 via-violet-500 to-purple-600 hover:from-purple-500 hover:via-violet-600 hover:to-purple-700 text-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-white/20">
            <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-camera-line text-4xl"></i>
              </div>
              <div className="text-2xl font-bold mb-2">写真・音声</div>
              <div className="text-sm opacity-90">記録を残す</div>
            </div>
          </div>
        </Link>

        {/* 問題報告 */}
        <Link href="/issue-report">
          <div className="group relative bg-gradient-to-br from-red-400 via-rose-500 to-pink-600 hover:from-red-500 hover:via-rose-600 hover:to-pink-700 text-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-white/20">
            <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-error-warning-line text-4xl"></i>
              </div>
              <div className="text-2xl font-bold mb-2">問題報告</div>
              <div className="text-sm opacity-90">トラブル・異常</div>
            </div>
          </div>
        </Link>

        {/* 作業完了 */}
        <Link href="/complete-work">
          <div className="group relative bg-gradient-to-br from-gray-600 via-slate-700 to-gray-800 hover:from-gray-700 hover:via-slate-800 hover:to-gray-900 text-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-white/20">
            <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-checkbox-circle-line text-4xl"></i>
              </div>
              <div className="text-2xl font-bold mb-2">作業完了</div>
              <div className="text-sm opacity-90">作業を終了</div>
            </div>
          </div>
        </Link>

        {/* 図面確認 */}
        <Link href="/blueprints">
          <div className="group relative bg-gradient-to-br from-cyan-400 via-teal-500 to-blue-600 hover:from-cyan-500 hover:via-teal-600 hover:to-blue-700 text-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-white/20">
            <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-file-paper-line text-4xl"></i>
              </div>
              <div className="text-2xl font-bold mb-2">図面確認</div>
              <div className="text-sm opacity-90">設計図・仕様書</div>
            </div>
          </div>
        </Link>

        {/* チャット連絡 */}
        <Link href="/chat">
          <div className="group relative bg-gradient-to-br from-pink-400 via-rose-500 to-red-600 hover:from-pink-500 hover:via-rose-600 hover:to-red-700 text-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-white/20">
            <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-chat-3-line text-4xl"></i>
              </div>
              <div className="text-2xl font-bold mb-2">チャット</div>
              <div className="text-sm opacity-90">工務店との連絡</div>
            </div>
          </div>
        </Link>
      </div>

      {/* 今日の作業状況 */}
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6 mt-8 max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
            <i className="ri-bar-chart-box-line text-white text-lg"></i>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">今日の作業状況</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-green-100 rounded-2xl border border-green-200/50 shadow-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full mr-3 shadow-sm"></div>
              <span className="text-sm font-semibold text-gray-700">完了済み</span>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-br from-emerald-500 to-green-600 bg-clip-text text-transparent">3件</div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl border border-blue-200/50 shadow-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mr-3 shadow-sm"></div>
              <span className="text-sm font-semibold text-gray-700">作業中</span>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-indigo-600 bg-clip-text text-transparent">1件</div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-rose-100 rounded-2xl border border-red-200/50 shadow-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-br from-red-400 to-rose-500 rounded-full mr-3 shadow-sm"></div>
              <span className="text-sm font-semibold text-gray-700">問題あり</span>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-br from-red-500 to-rose-600 bg-clip-text text-transparent">0件</div>
          </div>
        </div>
      </div>
    </div>
  );
}
