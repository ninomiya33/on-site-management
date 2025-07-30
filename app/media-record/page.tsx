
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MediaRecord() {
  const [currentTime, setCurrentTime] = useState('');
  const [recordingAudio, setRecordingAudio] = useState(false);
  const [recordedAudios, setRecordedAudios] = useState<string[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('ja-JP'));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePhotoCapture = () => {
    setIsProcessing(true);
    // 写真撮影処理をシミュレート
    setTimeout(() => {
      const newPhoto = `photo_${Date.now()}.jpg`;
      setPhotos(prev => [...prev, newPhoto]);
      setIsProcessing(false);
    }, 1000);
  };

  const handleAudioRecord = () => {
    if (recordingAudio) {
      // 録音停止
      setRecordingAudio(false);
      const newAudio = `audio_${Date.now()}.wav`;
      setRecordedAudios(prev => [...prev, newAudio]);
    } else {
      // 録音開始
      setRecordingAudio(true);
    }
  };

  const deletePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const deleteAudio = (index: number) => {
    setRecordedAudios(prev => prev.filter((_, i) => i !== index));
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
        <h1 className="text-xl font-bold text-gray-800">写真・音声記録</h1>
        <div className="text-sm font-medium text-blue-600" suppressHydrationWarning={true}>{currentTime}</div>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* 撮影・録音ボタン */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handlePhotoCapture}
              disabled={isProcessing}
              className="flex flex-col items-center p-6 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all cursor-pointer disabled:bg-gray-400"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-3">
                {isProcessing ? (
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <i className="ri-camera-fill text-3xl"></i>
                )}
              </div>
              <span className="font-bold">写真撮影</span>
            </button>

            <button
              onClick={handleAudioRecord}
              className={`flex flex-col items-center p-6 rounded-xl transition-all cursor-pointer ${
                recordingAudio 
                  ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-3">
                <i className={recordingAudio ? "ri-stop-fill text-3xl" : "ri-mic-fill text-3xl"}></i>
              </div>
              <span className="font-bold">{recordingAudio ? '録音停止' : '音声録音'}</span>
            </button>
          </div>

          {recordingAudio && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg text-center">
              <div className="flex items-center justify-center text-red-600 mb-2">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                <span className="font-medium text-sm">録音中...</span>
              </div>
              <div className="text-xs text-red-500">タップで録音停止</div>
            </div>
          )}
        </div>

        {/* 撮影した写真一覧 */}
        {photos.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">撮影した写真</h2>
            <div className="grid grid-cols-2 gap-3">
              {photos.map((photo, index) => (
                <div key={index} className="relative">
                  <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                    <i className="ri-image-line text-4xl text-gray-400"></i>
                  </div>
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => deletePhoto(index)}
                      className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-all cursor-pointer"
                    >
                      <i className="ri-close-line text-sm"></i>
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 text-center">{photo}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 録音した音声一覧 */}
        {recordedAudios.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">録音した音声</h2>
            <div className="space-y-3">
              {recordedAudios.map((audio, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-full mr-4">
                    <i className="ri-volume-up-line text-purple-600"></i>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 text-sm">{audio}</div>
                    <div className="text-xs text-gray-500">音声ファイル</div>
                  </div>
                  <button
                    onClick={() => deleteAudio(index)}
                    className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-full transition-all cursor-pointer"
                  >
                    <i className="ri-delete-bin-line text-sm"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 使用方法 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="w-6 h-6 flex items-center justify-center mr-3 text-blue-600">
              <i className="ri-information-line text-lg"></i>
            </div>
            <div>
              <h3 className="font-bold text-blue-800 text-sm mb-2">使用方法</h3>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• 写真撮影：現場の状況を記録</li>
                <li>• 音声録音：詳細な説明や気付きを記録</li>
                <li>• 記録データは自動でタイムスタンプ付きで保存</li>
                <li>• GPS位置情報も同時に記録されます</li>
              </ul>
            </div>
          </div>
        </div>

        {/* アップロードボタン */}
        {(photos.length > 0 || recordedAudios.length > 0) && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <button className="w-full py-6 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xl font-bold transition-all cursor-pointer">
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <i className="ri-upload-cloud-fill text-2xl"></i>
                </div>
                記録をアップロード
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
