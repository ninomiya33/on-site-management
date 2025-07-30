'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Blueprint {
  id: number;
  title: string;
  category: string;
  date: string;
  status: string;
  version: string;
  description: string;
  priority: string;
}

export default function Blueprints() {
  const [currentTime, setCurrentTime] = useState('');
  const [selectedBlueprint, setSelectedBlueprint] = useState<Blueprint | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const blueprints = [
    {
      id: 1,
      title: 'A区画基礎工事図面',
      category: '基礎',
      date: '2024/01/15',
      status: 'active',
      version: 'v2.1',
      description: '基礎配筋及びコンクリート打設詳細図',
      priority: 'high'
    },
    {
      id: 2,
      title: '1階躯体配筋図',
      category: '躯体',
      date: '2024/01/18',
      status: 'active',
      version: 'v1.3',
      description: '1階部分の配筋詳細及び型枠位置図',
      priority: 'high'
    },
    {
      id: 3,
      title: '設備配管ルート図',
      category: '設備',
      date: '2024/01/20',
      status: 'draft',
      version: 'v1.0',
      description: '給排水・電気配管の施工ルート',
      priority: 'medium'
    },
    {
      id: 4,
      title: '仕上げ材割付図',
      category: '仕上げ',
      date: '2024/01/22',
      status: 'review',
      version: 'v0.8',
      description: 'タイル・クロス等の仕上げ材配置',
      priority: 'low'
    },
    {
      id: 5,
      title: '外構工事詳細図',
      category: '外構',
      date: '2024/01/25',
      status: 'active',
      version: 'v1.1',
      description: '駐車場・植栽・フェンス設置詳細',
      priority: 'medium'
    }
  ];

  const categories = ['全て', '基礎', '躯体', '設備', '仕上げ', '外構'];
  const [selectedCategory, setSelectedCategory] = useState('全て');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('ja-JP'));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'review': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '承認済み';
      case 'draft': return '草案';
      case 'review': return '確認中';
      default: return '不明';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const filteredBlueprints = blueprints.filter(blueprint => {
    const matchesCategory = selectedCategory === '全て' || blueprint.category === selectedCategory;
    const matchesSearch = blueprint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blueprint.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBlueprintView = (blueprint: Blueprint) => {
    setIsLoading(true);
    setSelectedBlueprint(blueprint);
    // PDFビューアーの読み込みをシミュレート
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          <div className="w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer border border-white/20">
            <i className="ri-arrow-left-line text-xl text-gray-600"></i>
          </div>
        </Link>
        <h1 className="text-xl font-bold text-gray-800">図面確認</h1>
        <div className="text-sm font-medium text-blue-600 bg-blue-100/60 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-200/50" suppressHydrationWarning={true}>{currentTime}</div>
      </div>

      <div className="max-w-4xl mx-auto">
        {selectedBlueprint ? (
          /* 図面ビューアー */
          <div className="space-y-6">
            {/* 図面ヘッダー */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedBlueprint.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <i className="ri-calendar-line mr-1"></i>
                      <span>{selectedBlueprint.date}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-git-branch-line mr-1"></i>
                      <span>{selectedBlueprint.version}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedBlueprint.status)}`}>
                      {getStatusText(selectedBlueprint.status)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBlueprint(null)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-xl transition-all cursor-pointer"
                >
                  <i className="ri-close-line text-xl text-gray-600"></i>
                </button>
              </div>
              <p className="text-gray-600">{selectedBlueprint.description}</p>
            </div>

            {/* 図面ビューアー */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6">
              {isLoading ? (
                <div className="aspect-[4/3] bg-gray-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-gray-600">図面を読み込み中...</div>
                  </div>
                </div>
              ) : (
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="ri-file-paper-fill text-3xl text-blue-600"></i>
                    </div>
                    <div className="text-lg font-bold text-gray-700 mb-2">{selectedBlueprint.title}</div>
                    <div className="text-sm text-gray-500">PDFビューアーがここに表示されます</div>
                  </div>
                </div>
              )}
              
              {/* ツールバー */}
              <div className="flex items-center justify-between mt-6 p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <button className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-100 rounded-xl shadow-sm transition-all cursor-pointer">
                    <i className="ri-zoom-in-line text-gray-600"></i>
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-100 rounded-xl shadow-sm transition-all cursor-pointer">
                    <i className="ri-zoom-out-line text-gray-600"></i>
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-100 rounded-xl shadow-sm transition-all cursor-pointer">
                    <i className="ri-fullscreen-line text-gray-600"></i>
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <Link href="/chat">
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap">
                      <i className="ri-chat-3-line mr-2"></i>
                      質問する
                    </button>
                  </Link>
                  <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap">
                    <i className="ri-download-line mr-2"></i>
                    ダウンロード
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* 図面一覧 */
          <div className="space-y-6">
            {/* 検索とフィルター */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6">
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="図面タイトルや説明で検索..."
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <i className="ri-search-line text-gray-400 text-lg"></i>
                  </div>
                </div>
              </div>
              
              {/* カテゴリーフィルター */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* 図面リスト */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBlueprints.map((blueprint) => (
                <div
                  key={blueprint.id}
                  onClick={() => handleBlueprintView(blueprint)}
                  className="group bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl border border-white/20 p-6 cursor-pointer transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <i className="ri-file-paper-line text-white text-xl"></i>
                    </div>
                    <div className={`flex items-center ${getPriorityColor(blueprint.priority)}`}>
                      <i className="ri-flag-line mr-1 text-sm"></i>
                      <span className="text-xs font-medium capitalize">{blueprint.priority}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {blueprint.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {blueprint.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span>{blueprint.date}</span>
                      <span>{blueprint.version}</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(blueprint.status)}`}>
                      {getStatusText(blueprint.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredBlueprints.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i className="ri-file-search-line text-3xl text-gray-400"></i>
                </div>
                <div className="text-lg font-medium text-gray-600 mb-2">図面が見つかりません</div>
                <div className="text-sm text-gray-500">検索条件を変更してお試しください</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}