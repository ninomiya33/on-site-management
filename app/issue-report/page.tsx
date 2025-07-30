
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function IssueReport() {
  const [currentTime, setCurrentTime] = useState('');
  const [selectedIssue, setSelectedIssue] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const issueTypes = [
    { id: 'safety', name: '安全上の問題', icon: 'ri-shield-line', color: 'bg-red-500' },
    { id: 'equipment', name: '機器・工具の故障', icon: 'ri-tools-line', color: 'bg-orange-500' },
    { id: 'material', name: '材料不足・不良', icon: 'ri-box-line', color: 'bg-yellow-500' },
    { id: 'weather', name: '天候による影響', icon: 'ri-cloudy-line', color: 'bg-blue-500' },
    { id: 'quality', name: '品質上の問題', icon: 'ri-error-warning-line', color: 'bg-purple-500' },
    { id: 'other', name: 'その他', icon: 'ri-more-line', color: 'bg-gray-500' }
  ];

  const priorityLevels = [
    { id: 'urgent', name: '緊急', color: 'bg-red-600', icon: 'ri-error-warning-fill' },
    { id: 'high', name: '高', color: 'bg-orange-500', icon: 'ri-alert-fill' },
    { id: 'medium', name: '中', color: 'bg-yellow-500', icon: 'ri-information-fill' },
    { id: 'low', name: '低', color: 'bg-blue-500', icon: 'ri-question-fill' }
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
    if (selectedIssue && selectedPriority) {
      setIsSubmitting(true);
      // データ送信をシミュレート
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setSelectedIssue('');
          setSelectedPriority('');
          setDescription('');
        }, 3000);
      }, 1500);
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
        <h1 className="text-xl font-bold text-gray-800">問題報告</h1>
        <div className="text-sm font-medium text-blue-600" suppressHydrationWarning={true}>{currentTime}</div>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* 緊急時の連絡先 */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center text-red-700 mb-2">
            <div className="w-6 h-6 flex items-center justify-center mr-3">
              <i className="ri-phone-fill text-lg"></i>
            </div>
            <span className="font-bold text-sm">緊急時の連絡先</span>
          </div>
          <div className="text-xs text-red-600 ml-9">
            現場責任者: 090-1234-5678<br/>
            本社: 03-1234-5678
          </div>
        </div>

        {/* 問題の種類 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">問題の種類</h2>
          <div className="grid grid-cols-2 gap-3">
            {issueTypes.map((issue) => (
              <div
                key={issue.id}
                onClick={() => setSelectedIssue(issue.id)}
                className={`p-4 rounded-xl border-2 text-center cursor-pointer transition-all ${
                  selectedIssue === issue.id
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className={`w-10 h-10 flex items-center justify-center mx-auto mb-2 rounded-full ${issue.color}`}>
                  <i className={`${issue.icon} text-white text-lg`}></i>
                </div>
                <div className="text-sm font-medium text-gray-700">{issue.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 優先度 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">優先度</h2>
          <div className="grid grid-cols-4 gap-2">
            {priorityLevels.map((priority) => (
              <div
                key={priority.id}
                onClick={() => setSelectedPriority(priority.id)}
                className={`p-3 rounded-xl border-2 text-center cursor-pointer transition-all ${
                  selectedPriority === priority.id
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className={`w-8 h-8 flex items-center justify-center mx-auto mb-1 rounded-full ${priority.color}`}>
                  <i className={`${priority.icon} text-white text-sm`}></i>
                </div>
                <div className="text-xs font-medium text-gray-700">{priority.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 詳細説明 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">詳細説明</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="問題の詳細、発生状況、対応状況などを入力してください..."
            rows={5}
            maxLength={500}
            className="w-full p-4 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:border-red-500"
          />
          <div className="flex justify-between items-center mt-2">
            <div className="text-xs text-red-500">※ 詳細な説明があると迅速な対応が可能です</div>
            <div className="text-xs text-gray-500">{description.length}/500</div>
          </div>
        </div>

        {/* 写真・音声追加 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">証拠資料（任意）</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/media-record">
              <div className="flex flex-col items-center p-4 border border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
                <div className="w-8 h-8 flex items-center justify-center mb-2">
                  <i className="ri-camera-line text-2xl text-gray-400"></i>
                </div>
                <span className="text-sm text-gray-600">写真追加</span>
              </div>
            </Link>
            <Link href="/media-record">
              <div className="flex flex-col items-center p-4 border border-dashed border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all cursor-pointer">
                <div className="w-8 h-8 flex items-center justify-center mb-2">
                  <i className="ri-mic-line text-2xl text-gray-400"></i>
                </div>
                <span className="text-sm text-gray-600">音声追加</span>
              </div>
            </Link>
          </div>
        </div>

        {/* 送信ボタン */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <button
            onClick={handleSubmit}
            disabled={!selectedIssue || !selectedPriority || isSubmitting}
            className={`w-full py-6 rounded-xl text-xl font-bold transition-all ${
              !selectedIssue || !selectedPriority || isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600 text-white cursor-pointer'
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
                  <i className="ri-alarm-warning-fill text-2xl"></i>
                </div>
                問題を報告
              </div>
            )}
          </button>
          
          {(!selectedIssue || !selectedPriority) && (
            <p className="text-center text-red-500 text-sm mt-3">
              問題の種類と優先度を選択してください
            </p>
          )}
        </div>

        {/* 成功メッセージ */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center text-green-700 mb-2">
              <div className="w-6 h-6 flex items-center justify-center mr-3">
                <i className="ri-check-line text-lg"></i>
              </div>
              <span className="font-medium text-sm">問題報告が送信されました！</span>
            </div>
            <div className="text-xs text-green-600 ml-9">
              担当者に通知が送られ、速やかに対応いたします。
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
