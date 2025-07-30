
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ProgressReport() {
  const [currentTime, setCurrentTime] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const statusOptions = [
    { id: 'started', name: '開始', color: 'bg-blue-500', icon: 'ri-play-line' },
    { id: 'progress', name: '進行中', color: 'bg-orange-500', icon: 'ri-loader-line' },
    { id: 'paused', name: '一時停止', color: 'bg-yellow-500', icon: 'ri-pause-line' },
    { id: 'completed', name: '完了', color: 'bg-green-500', icon: 'ri-check-line' },
    { id: 'delayed', name: '遅延', color: 'bg-red-500', icon: 'ri-time-line' },
    { id: 'issue', name: '問題発生', color: 'bg-purple-500', icon: 'ri-error-warning-line' }
  ];

  const workSteps = [
    { id: 'step1', name: '準備作業', status: 'completed' },
    { id: 'step2', name: '基礎工事', status: 'progress' },
    { id: 'step3', name: '組立作業', status: 'pending' },
    { id: 'step4', name: '検査・確認', status: 'pending' },
    { id: 'step5', name: '清掃・片付け', status: 'pending' }
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

  const handleSubmit = () => {
    if (selectedStatus) {
      setIsSubmitting(true);
      // データ保存処理をシミュレート
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setSelectedStatus('');
        }, 2000);
      }, 1500);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'progress': return 'bg-blue-500';
      case 'pending': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return 'ri-check-line';
      case 'progress': return 'ri-loader-line';
      case 'pending': return 'ri-time-line';
      default: return 'ri-time-line';
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
        <h1 className="text-xl font-bold text-gray-800">進捗報告</h1>
        <div className="text-sm font-medium text-blue-600" suppressHydrationWarning={true}>{currentTime}</div>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* 作業ステップ */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">作業ステップ</h2>
          <div className="space-y-3">
            {workSteps.map((step, index) => (
              <div key={step.id} className="flex items-center p-3 rounded-lg bg-gray-50">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-4 ${getStatusColor(step.status)}`}>
                  <i className={`${getStatusIcon(step.status)} text-white text-sm`}></i>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{step.name}</div>
                </div>
                <div className="text-xs text-gray-500">
                  {index + 1}/{workSteps.length}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ステータス選択 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">現在のステータス</h2>
          <div className="grid grid-cols-2 gap-3">
            {statusOptions.map((status) => (
              <div
                key={status.id}
                onClick={() => setSelectedStatus(status.id)}
                className={`p-4 rounded-xl border-2 text-center cursor-pointer transition-all ${
                  selectedStatus === status.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className={`w-10 h-10 flex items-center justify-center mx-auto mb-2 rounded-full ${status.color}`}>
                  <i className={`${status.icon} text-white text-lg`}></i>
                </div>
                <div className="text-sm font-medium text-gray-700">{status.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 追加情報 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">コメント（任意）</h2>
          <textarea
            placeholder="作業の詳細や特記事項があれば入力してください..."
            rows={4}
            maxLength={500}
            className="w-full p-4 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:border-blue-500"
          />
          <div className="text-xs text-gray-500 mt-2 text-right">500文字以内</div>
        </div>

        {/* 送信ボタン */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <button
            onClick={handleSubmit}
            disabled={!selectedStatus || isSubmitting}
            className={`w-full py-6 rounded-xl text-xl font-bold transition-all ${
              !selectedStatus || isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                送信中...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <i className="ri-send-plane-fill text-2xl"></i>
                </div>
                進捗を報告
              </div>
            )}
          </button>
        </div>

        {/* 成功メッセージ */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center text-green-700">
              <div className="w-6 h-6 flex items-center justify-center mr-3">
                <i className="ri-check-line text-lg"></i>
              </div>
              <span className="font-medium text-sm">進捗が正常に報告されました！</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
