
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function StartWork() {
  const [currentTime, setCurrentTime] = useState('');
  const [workStarted, setWorkStarted] = useState(false);
  const [selectedWork, setSelectedWork] = useState('');

  const workTypes = [
    { id: 'construction', name: '建設作業', icon: 'ri-building-line' },
    { id: 'maintenance', name: 'メンテナンス', icon: 'ri-tools-line' },
    { id: 'inspection', name: '点検作業', icon: 'ri-search-line' },
    { id: 'repair', name: '修理作業', icon: 'ri-hammer-line' },
    { id: 'cleaning', name: '清掃作業', icon: 'ri-brush-line' },
    { id: 'other', name: 'その他', icon: 'ri-more-line' }
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('ja-JP'));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStartWork = () => {
    if (selectedWork) {
      setWorkStarted(true);
      // ここで実際のデータ保存処理を実装
      setTimeout(() => {
        setWorkStarted(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm cursor-pointer">
            <i className="ri-arrow-left-line text-xl text-gray-600"></i>
          </div>
        </Link>
        <h1 className="text-xl font-bold text-gray-800">作業開始</h1>
        <div className="text-sm font-medium text-blue-600" suppressHydrationWarning={true}>{currentTime}</div>
      </div>

      <div className="max-w-md mx-auto">
        {/* 作業種類選択 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">作業種類を選択</h2>
          <div className="grid grid-cols-2 gap-3">
            {workTypes.map((work) => (
              <div
                key={work.id}
                onClick={() => setSelectedWork(work.id)}
                className={`p-4 rounded-xl border-2 text-center cursor-pointer transition-all ${
                  selectedWork === work.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
                  <i className={`${work.icon} text-2xl`}></i>
                </div>
                <div className="text-sm font-medium">{work.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 開始ボタン */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <button
            onClick={handleStartWork}
            disabled={!selectedWork || workStarted}
            className={`w-full py-6 rounded-xl text-xl font-bold transition-all ${
              !selectedWork || workStarted
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
            }`}
          >
            {workStarted ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                開始中...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <i className="ri-play-circle-fill text-2xl"></i>
                </div>
                作業開始
              </div>
            )}
          </button>
          
          {!selectedWork && (
            <p className="text-center text-red-500 text-sm mt-3">作業種類を選択してください</p>
          )}
        </div>

        {/* 注意事項 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <div className="flex items-start">
            <div className="w-6 h-6 flex items-center justify-center mr-3 text-yellow-600">
              <i className="ri-information-line text-lg"></i>
            </div>
            <div>
              <h3 className="font-bold text-yellow-800 text-sm mb-1">注意事項</h3>
              <ul className="text-xs text-yellow-700 space-y-1">
                <li>• 安全装備を必ず着用してください</li>
                <li>• 作業開始時刻が自動で記録されます</li>
                <li>• GPS位置情報も同時に保存されます</li>
              </ul>
            </div>
          </div>
        </div>

        {workStarted && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
            <div className="flex items-center text-green-700">
              <div className="w-6 h-6 flex items-center justify-center mr-3">
                <i className="ri-check-line text-lg"></i>
              </div>
              <span className="font-medium text-sm">作業が開始されました！</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
