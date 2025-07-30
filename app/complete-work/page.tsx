
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CompleteWork() {
  const [currentTime, setCurrentTime] = useState('');
  const [workQuality, setWorkQuality] = useState('');
  const [finalNotes, setFinalNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const qualityRatings = [
    { id: 'excellent', name: '優秀', icon: 'ri-star-fill', color: 'bg-gradient-to-br from-green-400 to-green-600' },
    { id: 'good', name: '良好', icon: 'ri-thumb-up-fill', color: 'bg-gradient-to-br from-blue-400 to-blue-600' },
    { id: 'average', name: '標準', icon: 'ri-checkbox-circle-fill', color: 'bg-gradient-to-br from-yellow-400 to-yellow-600' },
    { id: 'needs-improvement', name: '要改善', icon: 'ri-error-warning-fill', color: 'bg-gradient-to-br from-orange-400 to-orange-600' }
  ];

  const workSummary = {
    startTime: '09:00',
    endTime: '17:30',
    totalHours: '8.5時間',
    completedTasks: 5,
    totalTasks: 5,
    issues: 0
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('ja-JP'));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleComplete = () => {
    if (workQuality) {
      setIsSubmitting(true);
      // データ送信をシミュレート
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          <div className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer backdrop-blur-sm border border-gray-100">
            <i className="ri-arrow-left-line text-xl text-gray-600"></i>
          </div>
        </Link>
        <h1 className="text-xl font-bold text-gray-800">作業完了</h1>
        <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full" suppressHydrationWarning={true}>{currentTime}</div>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {showSuccess ? (
          /* 完了画面 */
          <div className="text-center py-12">
            <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600 rounded-3xl mx-auto mb-6 shadow-lg">
              <i className="ri-check-line text-5xl text-white"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">作業完了！</h2>
            <p className="text-gray-600 mb-8">お疲れさまでした。<br/>作業報告が正常に送信されました。</p>
            
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">本日の作業サマリー</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">作業時間</span>
                  <span className="font-medium">{workSummary.startTime} - {workSummary.endTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">総作業時間</span>
                  <span className="font-medium">{workSummary.totalHours}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">完了タスク</span>
                  <span className="font-medium">{workSummary.completedTasks}/{workSummary.totalTasks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">問題報告</span>
                  <span className="font-medium">{workSummary.issues}件</span>
                </div>
              </div>
            </div>

            <Link href="/">
              <div className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl font-bold transition-all cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap">
                ホームに戻る
              </div>
            </Link>
          </div>
        ) : (
          <>
            {/* 作業サマリー */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">本日の作業サマリー</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{workSummary.totalHours}</div>
                  <div className="text-sm text-gray-600">作業時間</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{workSummary.completedTasks}/{workSummary.totalTasks}</div>
                  <div className="text-sm text-gray-600">完了タスク</div>
                </div>
              </div>
            </div>

            {/* 作業品質評価 */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">作業品質の自己評価</h2>
              <div className="grid grid-cols-2 gap-3">
                {qualityRatings.map((rating) => (
                  <div
                    key={rating.id}
                    onClick={() => setWorkQuality(rating.id)}
                    className={`p-4 rounded-2xl border-2 text-center cursor-pointer transition-all transform hover:-translate-y-1 hover:shadow-lg ${
                      workQuality === rating.id
                        ? 'border-blue-500 bg-blue-50 shadow-md scale-105'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className={`w-10 h-10 flex items-center justify-center mx-auto mb-2 rounded-2xl ${rating.color} shadow-sm`}>
                      <i className={`${rating.icon} text-white text-lg`}></i>
                    </div>
                    <div className="text-sm font-medium text-gray-700">{rating.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 最終コメント */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">最終コメント（任意）</h2>
              <textarea
                value={finalNotes}
                onChange={(e) => setFinalNotes(e.target.value)}
                placeholder="本日の作業で気づいた点、改善提案、明日への引き継ぎ事項などを記入してください..."
                rows={4}
                maxLength={500}
                className="w-full p-4 border border-gray-200 rounded-2xl text-sm resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <div className="text-xs text-gray-500 mt-2 text-right">{finalNotes.length}/500文字</div>
            </div>

            {/* チェックリスト */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">作業終了前チェック</h2>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border border-green-200">
                  <div className="w-6 h-6 flex items-center justify-center mr-3">
                    <i className="ri-check-line text-green-600 text-lg"></i>
                  </div>
                  <span className="text-sm text-gray-700">現場の清掃・片付け完了</span>
                </div>
                <div className="flex items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border border-green-200">
                  <div className="w-6 h-6 flex items-center justify-center mr-3">
                    <i className="ri-check-line text-green-600 text-lg"></i>
                  </div>
                  <span className="text-sm text-gray-700">工具・機材の点検・収納完了</span>
                </div>
                <div className="flex items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border border-green-200">
                  <div className="w-6 h-6 flex items-center justify-center mr-3">
                    <i className="ri-check-line text-green-600 text-lg"></i>
                  </div>
                  <span className="text-sm text-gray-700">安全確認・施錠完了</span>
                </div>
              </div>
            </div>

            {/* 完了ボタン */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <button
                onClick={handleComplete}
                disabled={!workQuality || isSubmitting}
                className={`w-full py-6 rounded-2xl text-xl font-bold transition-all transform whitespace-nowrap ${
                  !workQuality || isSubmitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    完了処理中...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 flex items-center justify-center mr-3">
                      <i className="ri-checkbox-circle-fill text-2xl"></i>
                    </div>
                    作業完了
                  </div>
                )}
              </button>
              
              {!workQuality && (
                <p className="text-center text-red-500 text-sm mt-3">
                  作業品質の自己評価を選択してください
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
