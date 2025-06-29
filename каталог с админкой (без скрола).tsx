import React, { useState, useEffect } from 'react';
import { Play, Search, Plus, Minus, X, QrCode, Copy, Check, Settings, Monitor, DollarSign, Info, Calendar, Users, TrendingUp, BarChart3, Eye, EyeOff, Trash2, Edit3, Save } from 'lucide-react';

const WorkingGameCatalog = () => {
  // Data states
  const [games, setGames] = useState([]);
  const [gameInstances, setGameInstances] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [gameHours, setGameHours] = useState({});

  // Payment states
  const [selectedGame, setSelectedGame] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [copied, setCopied] = useState(false);
  
  // Game access states
  const [showGameAccess, setShowGameAccess] = useState(false);
  const [gameAccessData, setGameAccessData] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [hasActiveRental, setHasActiveRental] = useState(false);
  
  // Extend time states
  const [showExtendTime, setShowExtendTime] = useState(false);
  const [extendHours, setExtendHours] = useState(1);
  const [extendPaymentData, setExtendPaymentData] = useState(null);
  
  // Admin states
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminPasswordError, setAdminPasswordError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Admin panel states
  const [activeTab, setActiveTab] = useState('analytics');
  const [showPasswords, setShowPasswords] = useState({});
  const [editingClub, setEditingClub] = useState(false);
  const [editingComputer, setEditingComputer] = useState(null);
  const [deletingComputer, setDeletingComputer] = useState(null);
  const [periodType, setPeriodType] = useState('preset');
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [customDateFrom, setCustomDateFrom] = useState('');
  const [customDateTo, setCustomDateTo] = useState('');
  const [clubInfo, setClubInfo] = useState({
    name: 'GAMING CLUB VIETNAM',
    address: '123 Nguyen Hue, Hue City, Vietnam',
    phone: '+84 234 567 890',
    bankName: 'VietinBank',
    accountNo: '1234567890123456',
    accountName: 'GAMING CLUB VIETNAM',
    workingHours: '8:00 - 23:00'
  });

  // Mock data for computers
  const [computers, setComputers] = useState([
    { id: 1, name: 'PC-001', status: 'occupied', game: 'Counter-Strike 2', timeLeft: '45 минут', login: 'gaming_pc1', password: 'pass123' },
    { id: 2, name: 'PC-002', status: 'available', game: null, timeLeft: null, login: 'gaming_pc2', password: 'pass456' },
    { id: 3, name: 'PC-003', status: 'occupied', game: 'Dota 2', timeLeft: '1ч 23м', login: 'gaming_pc3', password: 'pass789' },
    { id: 4, name: 'PC-004', status: 'maintenance', game: null, timeLeft: null, login: 'gaming_pc4', password: 'pass000' },
    { id: 5, name: 'PC-005', status: 'available', game: null, timeLeft: null, login: 'gaming_pc5', password: 'pass111' },
    { id: 6, name: 'PC-006', status: 'occupied', game: 'GTA V', timeLeft: '2ч 15м', login: 'gaming_pc6', password: 'pass222' }
  ]);

  // Mock analytics data
  const analyticsData = {
    today: { revenue: 2340, orders: 27, avgSession: 2.5 },
    week: { revenue: 16800, orders: 184, avgSession: 2.8 },
    month: { revenue: 68200, orders: 756, avgSession: 2.6 },
    custom: { revenue: 0, orders: 0, avgSession: 0 },
    computerRevenue: {
      'PC-001': { today: 480, week: 3200, month: 12800, custom: 0 },
      'PC-002': { today: 360, week: 2800, month: 11200, custom: 0 },
      'PC-003': { today: 520, week: 3600, month: 14400, custom: 0 },
      'PC-004': { today: 120, week: 800, month: 3200, custom: 0 },
      'PC-005': { today: 440, week: 3100, month: 12400, custom: 0 },
      'PC-006': { today: 420, week: 3300, month: 14200, custom: 0 }
    },
    popularGames: [
      { name: 'Counter-Strike 2', sessions: 45, revenue: 5400 },
      { name: 'Dota 2', sessions: 38, revenue: 3800 },
      { name: 'Valorant', sessions: 32, revenue: 3520 },
      { name: 'League of Legends', sessions: 28, revenue: 2800 },
      { name: 'GTA V', sessions: 25, revenue: 3500 }
    ]
  };
  
  const ADMIN_PASSWORD = 'admin123';

  // Mock data
  const mockGames = [
    {
      GameID: "game-001",
      name: "Counter-Strike 2",
      Platform: "Steam",
      Genres: "FPS",
      price: 120,
      ImageURL: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop"
    },
    {
      GameID: "game-002", 
      name: "Dota 2",
      Platform: "Steam",
      Genres: "MOBA",
      price: 100,
      ImageURL: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop"
    },
    {
      GameID: "game-003",
      name: "Valorant", 
      Platform: "Riot Games",
      Genres: "FPS",
      price: 110,
      ImageURL: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop"
    },
    {
      GameID: "game-004",
      name: "League of Legends",
      Platform: "Riot Games", 
      Genres: "MOBA",
      price: 100,
      ImageURL: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop"
    },
    {
      GameID: "game-005",
      name: "GTA V",
      Platform: "Epic Games",
      Genres: "Action",
      price: 140,
      ImageURL: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop"
    }
  ];

  const mockGameInstances = [
    { id: "gi-001", game_id: "game-001", status: "available" },
    { id: "gi-002", game_id: "game-001", status: "occupied" },
    { id: "gi-003", game_id: "game-002", status: "available" },
    { id: "gi-004", game_id: "game-003", status: "maintenance" },
    { id: "gi-005", game_id: "game-004", status: "available" },
    { id: "gi-006", game_id: "game-005", status: "available" }
  ];

  // Load data and restore active rental
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGames(mockGames);
      setGameInstances(mockGameInstances);
      setLoading(false);
    };
    loadData();
  }, []);

  // Game availability functions
  const isGameAvailable = (gameId) => {
    const availableInstances = gameInstances.filter(
      instance => instance.game_id === gameId && instance.status === 'available'
    );
    return availableInstances.length > 0;
  };

  const getAvailableInstancesCount = (gameId) => {
    return gameInstances.filter(
      instance => instance.game_id === gameId && instance.status === 'available'
    ).length;
  };

  // Hours management
  const handleHoursChange = (gameId, increment) => {
    const currentHours = gameHours[gameId] || 1;
    const newHours = Math.max(1, Math.min(12, currentHours + increment));
    setGameHours(prev => ({
      ...prev,
      [gameId]: newHours
    }));
  };

  const getGameHours = (gameId) => {
    return gameHours[gameId] || 1;
  };

  // Genres
  const genres = ['all', ...new Set(mockGames.map(game => game.Genres))];

  // Filter and sort games
  useEffect(() => {
    let filtered = [...games];

    if (searchQuery) {
      filtered = filtered.filter(game => 
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenre !== 'all') {
      filtered = filtered.filter(game => game.Genres === selectedGenre);
    }

    if (showAvailableOnly) {
      filtered = filtered.filter(game => isGameAvailable(game.GameID));
    }

    switch (sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'availability':
        filtered.sort((a, b) => getAvailableInstancesCount(b.GameID) - getAvailableInstancesCount(a.GameID));
        break;
      default:
        break;
    }

    setFilteredGames(filtered);
  }, [games, gameInstances, searchQuery, selectedGenre, sortBy, showAvailableOnly]);

  // Payment functions
  const handlePlayClick = async (game) => {
    const selectedHours = getGameHours(game.GameID);
    setSelectedGame(game);
    setShowPayment(true);
    generatePaymentData(game, selectedHours);
  };

  const generatePaymentData = (game, selectedHours) => {
    const totalAmount = game.price * selectedHours;
    const orderId = `order_${Date.now()}`;
    
    const bankId = "970415";
    const accountNo = "1234567890123456";
    const template = "compact2";
    const amount = totalAmount;
    const description = `Thanh toan game ${game.name} ${selectedHours}h`;
    const accountName = "GAMING CLUB VIETNAM";

    const vietQrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${amount}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(accountName)}`;

    setPaymentData({
      qrUrl: vietQrUrl,
      amount: totalAmount,
      orderId,
      bankName: "VietinBank",
      accountNo: accountNo,
      accountName: accountName,
      description: description,
      game: game.name,
      gameId: game.GameID,
      hours: selectedHours
    });
  };

  const createOrder = async () => {
    const mockOrderData = {
      id: paymentData.orderId,
      game_title: paymentData.game,
      platform: selectedGame.Platform,
      gi_login: `Game_1_State_1_Type_1`,
      gi_password: '1234567890',
      gi_one_time_code: null,
      hours: paymentData.hours,
      created_at: new Date()
    };
    
    setGameAccessData(mockOrderData);
    setTimeRemaining(paymentData.hours * 60 * 60);
    setShowPayment(false);
    setShowGameAccess(true);
    setHasActiveRental(true);
    
    setTimeout(() => {
      const oneTimeCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      setGameAccessData(prev => ({
        ...prev,
        gi_one_time_code: oneTimeCode
      }));
    }, 2000);
  };

  const closePayment = () => {
    setShowPayment(false);
    setSelectedGame(null);
    setPaymentData(null);
  };

  const closeGameAccess = () => {
    setShowGameAccess(false);
  };

  const endRental = () => {
    setShowGameAccess(false);
    setGameAccessData(null);
    setTimeRemaining(0);
    setHasActiveRental(false);
  };

  const openGameAccess = () => {
    if (gameAccessData && hasActiveRental) {
      setShowGameAccess(true);
    }
  };

  const handleExtendTime = () => {
    setShowExtendTime(true);
    generateExtendPaymentData();
  };

  const generateExtendPaymentData = () => {
    const gamePrice = selectedGame?.price || 120;
    const totalAmount = gamePrice * extendHours;
    const orderId = `extend_${gameAccessData.id}_${Date.now()}`;
    
    const bankId = "970415";
    const accountNo = "1234567890123456";
    const template = "compact2";
    const amount = totalAmount;
    const description = `Gia han game ${gameAccessData.game_title} ${extendHours}h`;
    const accountName = "GAMING CLUB VIETNAM";

    const vietQrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${amount}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(accountName)}`;

    setExtendPaymentData({
      qrUrl: vietQrUrl,
      amount: totalAmount,
      orderId,
      bankName: "VietinBank",
      accountNo: accountNo,
      accountName: accountName,
      description: description,
      hours: extendHours,
      originalOrderId: gameAccessData.id
    });
  };

  const handleExtendHoursChange = (increment) => {
    const newHours = Math.max(1, Math.min(12, extendHours + increment));
    setExtendHours(newHours);
  };

  const confirmExtendPayment = async () => {
    const additionalSeconds = extendHours * 60 * 60;
    setTimeRemaining(prev => prev + additionalSeconds);
    setGameAccessData(prev => ({
      ...prev,
      hours: prev.hours + extendHours
    }));
    
    setShowExtendTime(false);
    setExtendPaymentData(null);
    alert(`Время продлено на ${extendHours} часов!`);
  };

  const closeExtendTime = () => {
    setShowExtendTime(false);
    setExtendPaymentData(null);
    setExtendHours(1);
  };

  useEffect(() => {
    if (showExtendTime) {
      generateExtendPaymentData();
    }
  }, [extendHours]);

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setShowAdminLogin(false);
      setAdminPassword('');
      setAdminPasswordError('');
      setIsAdmin(true);
      setShowAdminPanel(true);
    } else {
      setAdminPasswordError('Неверный пароль');
    }
  };

  const closeAdminLogin = () => {
    setShowAdminLogin(false);
    setAdminPassword('');
    setAdminPasswordError('');
  };

  const closeAdminPanel = () => {
    setShowAdminPanel(false);
    setIsAdmin(false);
  };

  // Get current period data
  const getCurrentPeriodData = () => {
    if (periodType === 'custom') {
      const daysDiff = customDateFrom && customDateTo ? 
        Math.ceil((new Date(customDateTo) - new Date(customDateFrom)) / (1000 * 60 * 60 * 24)) : 0;
      const mockRevenue = daysDiff * 2500;
      const mockOrders = daysDiff * 30;
      
      return {
        revenue: mockRevenue,
        orders: mockOrders,
        avgSession: 2.7,
        period: `${customDateFrom} - ${customDateTo}`
      };
    }
    
    const data = analyticsData[selectedPeriod];
    let periodText = '';
    switch(selectedPeriod) {
      case 'today': periodText = 'Сегодня'; break;
      case 'week': periodText = 'За неделю'; break;
      case 'month': periodText = 'За месяц'; break;
    }
    
    return { ...data, period: periodText };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-500/20 text-green-400';
      case 'occupied': return 'bg-blue-500/20 text-blue-400';
      case 'maintenance': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Свободен';
      case 'occupied': return 'Занят';
      case 'maintenance': return 'Обслуживание';
      default: return 'Неизвестно';
    }
  };

  const togglePasswordVisibility = (computerId) => {
    setShowPasswords(prev => ({
      ...prev,
      [computerId]: !prev[computerId]
    }));
  };

  const handleEditComputer = (computer) => {
    setEditingComputer({ ...computer });
  };

  const saveComputerChanges = () => {
    if (editingComputer) {
      setComputers(prev => prev.map(pc => 
        pc.id === editingComputer.id ? editingComputer : pc
      ));
      setEditingComputer(null);
    }
  };

  const addNewComputer = () => {
    const newId = Math.max(...computers.map(pc => pc.id)) + 1;
    const newComputer = {
      id: newId,
      name: `PC-${String(newId).padStart(3, '0')}`,
      status: 'available',
      game: null,
      timeLeft: null,
      login: `gaming_pc${newId}`,
      password: 'newpass123'
    };
    setComputers(prev => [...prev, newComputer]);
  };

  const deleteComputer = (computerId) => {
    const computer = computers.find(pc => pc.id === computerId);
    setDeletingComputer(computer);
  };

  const confirmDelete = () => {
    if (deletingComputer) {
      setComputers(prev => prev.filter(pc => pc.id !== deletingComputer.id));
      setDeletingComputer(null);
    }
  };

  const cancelDelete = () => {
    setDeletingComputer(null);
  };

  const saveClubInfo = () => {
    setEditingClub(false);
  };

  // Таймер обратного отсчета
  useEffect(() => {
    let timer;
    if (hasActiveRental && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setShowGameAccess(false);
            setGameAccessData(null);
            setHasActiveRental(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [hasActiveRental, timeRemaining]);

  // Форматирование времени
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getGenreColor = (genre) => {
    const colors = {
      'FPS': 'bg-red-500/20 text-red-400',
      'MOBA': 'bg-blue-500/20 text-blue-400',
      'Action': 'bg-orange-500/20 text-orange-400',
      'Sports': 'bg-green-500/20 text-green-400',
      'RPG': 'bg-purple-500/20 text-purple-400'
    };
    return colors[genre] || 'bg-gray-500/20 text-gray-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <div className="text-lg">Загрузка игр из Supabase...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Play className="w-8 h-8 text-blue-400" />
              <h1 className="text-xl font-bold">Каталог игр</h1>
              <span className="text-sm text-gray-400 ml-4">{filteredGames.length} результатов</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAdminLogin(true)}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors cursor-pointer"
                title="Панель администратора"
              >
                <Settings className="w-5 h-5 text-gray-300" />
              </button>
              <div className="text-sm text-gray-400">
                Подключено к Supabase
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gray-800 rounded-lg p-2 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="relative" style={{width: '200px'}}>
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск игры..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none text-sm"
              />
            </div>

            <div className="flex-1"></div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Жанр:</span>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="all">Все жанры</option>
                {genres.slice(1).map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Сортировка:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="name">По алфавиту</option>
                <option value="availability">По доступности</option>
                <option value="price_low">Цена ↑</option>
                <option value="price_high">Цена ↓</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Доступные:</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showAvailableOnly}
                  onChange={(e) => setShowAvailableOnly(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-11 h-6 rounded-full transition-colors ${
                  showAvailableOnly ? 'bg-blue-600' : 'bg-gray-600'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                    showAvailableOnly ? 'translate-x-5' : 'translate-x-0.5'
                  } mt-0.5`}></div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="flex flex-wrap gap-4 justify-center">
          {filteredGames.map(game => {
            const availableCount = getAvailableInstancesCount(game.GameID);
            const isAvailable = availableCount > 0;
            const currentHours = getGameHours(game.GameID);
            
            return (
              <div key={game.GameID} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors flex-shrink-0"
                   style={{width: '320px', minWidth: '280px', maxWidth: '380px'}}>
                <div className="relative h-48 bg-gray-700">
                  <img 
                    src={game.ImageURL} 
                    alt={game.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {!isAvailable && (
                    <div className="absolute top-0 left-0 right-0 bg-red-500/30 text-red-400 text-center font-medium text-sm"
                         style={{height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      Скоро будет доступна
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGenreColor(game.Genres)}`}>
                      {game.Genres}
                    </span>
                    <span className="px-2 py-1 rounded text-xs bg-gray-700 text-gray-300">
                      {game.Platform}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3">{game.name}</h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-green-400">{game.price}₫/час</div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">Часов:</span>
                      <button 
                        onClick={() => handleHoursChange(game.GameID, -1)}
                        className="bg-gray-700 hover:bg-gray-600 text-white w-6 h-6 rounded flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-white font-medium w-6 text-center text-sm">{currentHours}</span>
                      <button 
                        onClick={() => handleHoursChange(game.GameID, 1)}
                        className="bg-gray-700 hover:bg-gray-600 text-white w-6 h-6 rounded flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-semibold text-white">
                        Итого: {game.price * currentHours}₫
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handlePlayClick(game)}
                    disabled={!isAvailable}
                    className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                      isAvailable 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Play className="w-4 h-4" />
                    {isAvailable ? 'Играть' : 'Недоступно'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">Игры не найдены</div>
            <div className="text-gray-500 text-sm">Попробуйте изменить фильтры или поисковый запрос</div>
          </div>
        )}
      </div>

      {/* Active Rental Bottom Bar */}
      {hasActiveRental && gameAccessData && !showGameAccess && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 shadow-lg z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-medium">{gameAccessData.game_title}</div>
                  <div className="text-gray-400 text-sm">{gameAccessData.platform}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-white font-mono text-lg font-bold">
                    {formatTime(timeRemaining)}
                  </div>
                  <div className="text-gray-400 text-xs">осталось</div>
                </div>

                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${Math.max(5, (timeRemaining / (gameAccessData.hours * 60 * 60)) * 100)}%` 
                    }}
                  ></div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExtendTime}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Продлить
                  </button>
                  <button
                    onClick={openGameAccess}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Открыть
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {hasActiveRental && gameAccessData && !showGameAccess && (
        <div className="h-20"></div>
      )}

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-w-sm w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Вход в панель администратора</h3>
              <button 
                onClick={closeAdminLogin}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Пароль администратора
                  </label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="Введите пароль"
                    autoFocus
                  />
                  {adminPasswordError && (
                    <p className="text-red-400 text-sm mt-2">{adminPasswordError}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={closeAdminLogin}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-medium"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={handleAdminLogin}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
                  >
                    Войти
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Panel Modal */}
      {showAdminPanel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-w-6xl w-full h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-700 flex-shrink-0">
              <h3 className="text-xl font-semibold text-white">Панель администратора</h3>
              <button 
                onClick={closeAdminPanel}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              {/* Admin Panel Content */}
              <div className="max-w-6xl mx-auto">
                {/* Tabs */}
                <div className="flex space-x-1 bg-gray-700 rounded-lg p-1 mb-6">
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                      activeTab === 'analytics' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-600'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    Аналитика
                  </button>
                  <button
                    onClick={() => setActiveTab('computers')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                      activeTab === 'computers' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-600'
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                    Компьютеры
                  </button>
                  <button
                    onClick={() => setActiveTab('club')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                      activeTab === 'club' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-600'
                    }`}
                  >
                    <Info className="w-4 h-4" />
                    Информация о клубе
                  </button>
                </div>

                {/* Analytics Tab */}
                {activeTab === 'analytics' && (
                  <div className="space-y-6">
                    {/* Period Selector */}
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center gap-6">
                        {/* Period Type Toggle */}
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="periodType"
                              value="preset"
                              checked={periodType === 'preset'}
                              onChange={(e) => setPeriodType(e.target.value)}
                              className="text-blue-600"
                            />
                            <span className="text-white">Период</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="periodType"
                              value="custom"
                              checked={periodType === 'custom'}
                              onChange={(e) => setPeriodType(e.target.value)}
                              className="text-blue-600"
                            />
                            <span className="text-white">Произвольные даты</span>
                          </label>
                        </div>

                        {/* Preset Period Buttons */}
                        {periodType === 'preset' && (
                          <div className="flex space-x-1 bg-gray-600 rounded-lg p-1">
                            <button
                              onClick={() => setSelectedPeriod('today')}
                              className={`px-4 py-2 rounded-md text-sm transition-colors ${
                                selectedPeriod === 'today' 
                                  ? 'bg-blue-600 text-white' 
                                  : 'text-gray-300 hover:text-white hover:bg-gray-500'
                              }`}
                            >
                              24ч
                            </button>
                            <button
                              onClick={() => setSelectedPeriod('week')}
                              className={`px-4 py-2 rounded-md text-sm transition-colors ${
                                selectedPeriod === 'week' 
                                  ? 'bg-blue-600 text-white' 
                                  : 'text-gray-300 hover:text-white hover:bg-gray-500'
                              }`}
                            >
                              7д
                            </button>
                            <button
                              onClick={() => setSelectedPeriod('month')}
                              className={`px-4 py-2 rounded-md text-sm transition-colors ${
                                selectedPeriod === 'month' 
                                  ? 'bg-blue-600 text-white' 
                                  : 'text-gray-300 hover:text-white hover:bg-gray-500'
                              }`}
                            >
                              30д
                            </button>
                          </div>
                        )}

                        {/* Custom Date Inputs */}
                        {periodType === 'custom' && (
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400 text-sm">С:</span>
                              <input
                                type="date"
                                value={customDateFrom}
                                onChange={(e) => setCustomDateFrom(e.target.value)}
                                className="bg-gray-600 border border-gray-500 rounded px-3 py-1 text-white text-sm"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400 text-sm">По:</span>
                              <input
                                type="date"
                                value={customDateTo}
                                onChange={(e) => setCustomDateTo(e.target.value)}
                                className="bg-gray-600 border border-gray-500 rounded px-3 py-1 text-white text-sm"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-3 gap-6">
                      <div className="bg-gray-700 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-400 text-sm">{getCurrentPeriodData().period}</p>
                            <p className="text-2xl font-bold text-green-400">{getCurrentPeriodData().revenue.toLocaleString()}₫</p>
                            <p className="text-gray-400 text-sm">{getCurrentPeriodData().orders} заказов</p>
                          </div>
                          <DollarSign className="w-8 h-8 text-green-400" />
                        </div>
                      </div>
                      
                      <div className="bg-gray-700 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-400 text-sm">Средняя сессия</p>
                            <p className="text-2xl font-bold text-blue-400">{getCurrentPeriodData().avgSession}ч</p>
                            <p className="text-gray-400 text-sm">За выбранный период</p>
                          </div>
                          <Users className="w-8 h-8 text-blue-400" />
                        </div>
                      </div>
                      
                      <div className="bg-gray-700 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-400 text-sm">Доход на заказ</p>
                            <p className="text-2xl font-bold text-purple-400">
                              {getCurrentPeriodData().orders > 0 ? Math.round(getCurrentPeriodData().revenue / getCurrentPeriodData().orders) : 0}₫
                            </p>
                            <p className="text-gray-400 text-sm">Средний чек</p>
                          </div>
                          <TrendingUp className="w-8 h-8 text-purple-400" />
                        </div>
                      </div>
                    </div>

                    {/* Computer Revenue */}
                    <div className="bg-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Доходность по компьютерам</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-600">
                              <th className="text-left py-3">Компьютер</th>
                              <th className="text-right py-3">{getCurrentPeriodData().period}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(analyticsData.computerRevenue).map(([pcName, revenue]) => {
                              let currentRevenue = 0;
                              if (periodType === 'custom') {
                                currentRevenue = revenue.custom || Math.floor(Math.random() * 5000) + 1000;
                              } else {
                                currentRevenue = revenue[selectedPeriod] || 0;
                              }
                              
                              return (
                                <tr key={pcName} className="border-b border-gray-600">
                                  <td className="py-3 font-medium">{pcName}</td>
                                  <td className="text-right py-3 text-green-400">{currentRevenue.toLocaleString()}₫</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Popular Games */}
                    <div className="bg-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Популярные игры</h3>
                      <div className="space-y-3">
                        {analyticsData.popularGames.map((game, index) => (
                          <div key={game.name} className="flex items-center justify-between p-3 bg-gray-600 rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-gray-400 font-bold">#{index + 1}</span>
                              <span className="font-medium">{game.name}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-green-400 font-semibold">{game.revenue}₫</div>
                              <div className="text-gray-400 text-sm">{game.sessions} сессий</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Computers Tab */}
                {activeTab === 'computers' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">Управление компьютерами</h3>
                      <button
                        onClick={addNewComputer}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Добавить ПК
                      </button>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-white">{computers.length}</div>
                        <div className="text-gray-400 text-sm">Всего ПК</div>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-400">
                          {computers.filter(pc => pc.status === 'available').length}
                        </div>
                        <div className="text-gray-400 text-sm">Свободно</div>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-400">
                          {computers.filter(pc => pc.status === 'occupied').length}
                        </div>
                        <div className="text-gray-400 text-sm">Занято</div>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-orange-400">
                          {computers.filter(pc => pc.status === 'maintenance').length}
                        </div>
                        <div className="text-gray-400 text-sm">На обслуживании</div>
                      </div>
                    </div>

                    {/* Computers Table */}
                    <div className="bg-gray-700 rounded-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-600">
                            <tr>
                              <th className="text-left py-4 px-6 font-medium text-gray-300">Компьютер</th>
                              <th className="text-center py-4 px-6 font-medium text-gray-300">Статус</th>
                              <th className="text-left py-4 px-6 font-medium text-gray-300">Текущая игра</th>
                              <th className="text-center py-4 px-6 font-medium text-gray-300">Время</th>
                              <th className="text-left py-4 px-6 font-medium text-gray-300">Логин</th>
                              <th className="text-center py-4 px-6 font-medium text-gray-300">Пароль</th>
                              <th className="text-center py-4 px-6 font-medium text-gray-300">Действия</th>
                            </tr>
                          </thead>
                          <tbody>
                            {computers.map((computer, index) => (
                              <tr key={computer.id} className="border-b border-gray-600 hover:bg-gray-600/50 transition-colors">
                                <td className="py-4 px-6">
                                  <div className="flex items-center gap-3">
                                    <Monitor className="w-5 h-5 text-blue-400" />
                                    <span className="font-medium text-white">{computer.name}</span>
                                  </div>
                                </td>
                                
                                <td className="py-4 px-6 text-center">
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(computer.status)}`}>
                                    {getStatusText(computer.status)}
                                  </span>
                                </td>
                                
                                <td className="py-4 px-6">
                                  {computer.game ? (
                                    <span className="text-white">{computer.game}</span>
                                  ) : (
                                    <span className="text-gray-500">—</span>
                                  )}
                                </td>
                                
                                <td className="py-4 px-6 text-center">
                                  {computer.timeLeft ? (
                                    <span className="text-blue-400 font-mono text-sm">{computer.timeLeft}</span>
                                  ) : (
                                    <span className="text-gray-500">—</span>
                                  )}
                                </td>
                                
                                <td className="py-4 px-6">
                                  <span className="font-mono text-sm text-gray-300">{computer.login}</span>
                                </td>
                                
                                <td className="py-4 px-6 text-center">
                                  <div className="flex items-center justify-center gap-2">
                                    <span className="font-mono text-sm text-gray-300">
                                      {showPasswords[computer.id] ? computer.password : '••••••••'}
                                    </span>
                                    <button
                                      onClick={() => togglePasswordVisibility(computer.id)}
                                      className="text-gray-400 hover:text-white transition-colors"
                                    >
                                      {showPasswords[computer.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                  </div>
                                </td>
                                
                                <td className="py-4 px-6">
                                  <div className="flex items-center justify-center gap-2">
                                    <button
                                      onClick={() => handleEditComputer(computer)}
                                      className="text-blue-400 hover:text-blue-300 transition-colors p-1"
                                      title="Редактировать"
                                    >
                                      <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => deleteComputer(computer.id)}
                                      disabled={computer.status === 'occupied'}
                                      className={`transition-colors p-1 ${
                                        computer.status === 'occupied' 
                                          ? 'text-gray-600 cursor-not-allowed' 
                                          : 'text-red-400 hover:text-red-300'
                                      }`}
                                      title={computer.status === 'occupied' ? 'Нельзя удалить занятый компьютер' : 'Удалить'}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Club Info Tab */}
                {activeTab === 'club' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">Информация о клубе</h3>
                      {!editingClub ? (
                        <button
                          onClick={() => setEditingClub(true)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                          <Edit3 className="w-4 h-4" />
                          Редактировать
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingClub(false)}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                          >
                            Отмена
                          </button>
                          <button
                            onClick={saveClubInfo}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                          >
                            <Save className="w-4 h-4" />
                            Сохранить
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-700 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-4">Основная информация</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Название клуба</label>
                            {editingClub ? (
                              <input
                                type="text"
                                value={clubInfo.name}
                                onChange={(e) => setClubInfo(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white"
                              />
                            ) : (
                              <p className="text-white">{clubInfo.name}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Адрес</label>
                            {editingClub ? (
                              <textarea
                                value={clubInfo.address}
                                onChange={(e) => setClubInfo(prev => ({ ...prev, address: e.target.value }))}
                                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white h-20"
                              />
                            ) : (
                              <p className="text-white">{clubInfo.address}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Телефон</label>
                            {editingClub ? (
                              <input
                                type="text"
                                value={clubInfo.phone}
                                onChange={(e) => setClubInfo(prev => ({ ...prev, phone: e.target.value }))}
                                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white"
                              />
                            ) : (
                              <p className="text-white">{clubInfo.phone}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Часы работы</label>
                            {editingClub ? (
                              <input
                                type="text"
                                value={clubInfo.workingHours}
                                onChange={(e) => setClubInfo(prev => ({ ...prev, workingHours: e.target.value }))}
                                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white"
                              />
                            ) : (
                              <p className="text-white">{clubInfo.workingHours}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-700 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-4">Банковские реквизиты</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Банк</label>
                            {editingClub ? (
                              <input
                                type="text"
                                value={clubInfo.bankName}
                                onChange={(e) => setClubInfo(prev => ({ ...prev, bankName: e.target.value }))}
                                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white"
                              />
                            ) : (
                              <p className="text-white">{clubInfo.bankName}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Номер счета</label>
                            {editingClub ? (
                              <input
                                type="text"
                                value={clubInfo.accountNo}
                                onChange={(e) => setClubInfo(prev => ({ ...prev, accountNo: e.target.value }))}
                                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white font-mono"
                              />
                            ) : (
                              <p className="text-white font-mono">{clubInfo.accountNo}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Имя получателя</label>
                            {editingClub ? (
                              <input
                                type="text"
                                value={clubInfo.accountName}
                                onChange={(e) => setClubInfo(prev => ({ ...prev, accountName: e.target.value }))}
                                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white"
                              />
                            ) : (
                              <p className="text-white">{clubInfo.accountName}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && paymentData && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 py-8 px-4 overflow-y-auto">
          <div className="bg-gray-800 rounded-lg max-w-md w-full min-h-[calc(100vh-4rem)] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-700 flex-shrink-0">
              <h3 className="text-xl font-semibold text-white">Оплата аренды</h3>
              <button 
                onClick={closePayment}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-lg font-medium text-white mb-3">Детали заказа</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Игра:</span>
                    <span className="text-white">{paymentData.game}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Время:</span>
                    <span className="text-white">{paymentData.hours} часов</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Цена за час:</span>
                    <span className="text-white">{selectedGame.price}₫</span>
                  </div>
                  <div className="border-t border-gray-600 pt-2 mt-2">
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-white">Итого:</span>
                      <span className="text-green-400">{paymentData.amount}₫</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-lg font-medium text-white mb-4 flex items-center justify-center gap-2">
                  <QrCode className="w-5 h-5" />
                  Сканируйте QR код для оплаты
                </h4>
                <div className="bg-white rounded-lg p-4 inline-block">
                  <img 
                    src={paymentData.qrUrl} 
                    alt="VietQR Payment Code"
                    className="w-64 h-64 object-contain"
                  />
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-lg font-medium text-white mb-3">Реквизиты для перевода</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">ID заказа:</span>
                    <span className="text-white font-mono text-xs">{paymentData.orderId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Банк:</span>
                    <span className="text-white">{paymentData.bankName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Номер счета:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono text-xs">{paymentData.accountNo}</span>
                      <button 
                        onClick={() => copyToClipboard(paymentData.accountNo)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Сумма:</span>
                    <span className="text-green-400 font-semibold">{paymentData.amount}₫</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                <h4 className="text-blue-400 font-medium mb-2">Инструкция по оплате:</h4>
                <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
                  <li>Отсканируйте QR код камерой телефона</li>
                  <li>Или переведите указанную сумму на реквизиты</li>
                  <li>Обязательно укажите комментарий к переводу</li>
                  <li>Нажмите "Создать заказ" для подтверждения</li>
                </ol>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-700 flex-shrink-0">
                <button 
                  onClick={closePayment}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium"
                >
                  Отмена
                </button>
                <button 
                  onClick={createOrder}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
                >
                  Создать заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game Access Modal */}
      {showGameAccess && gameAccessData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">{gameAccessData.game_title}</h3>
              <button 
                onClick={closeGameAccess}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Platform</span>
                        <span className="text-white font-semibold">{gameAccessData.platform}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Login</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-mono">{gameAccessData.gi_login}</span>
                          <button 
                            onClick={() => copyToClipboard(gameAccessData.gi_login)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Password</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-mono">{gameAccessData.gi_password}</span>
                          <button 
                            onClick={() => copyToClipboard(gameAccessData.gi_password)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center border-t border-gray-600 pt-3">
                        <span className="text-gray-400 text-sm">Одноразовый код</span>
                        <div className="flex items-center gap-2">
                          {gameAccessData.gi_one_time_code ? (
                            <>
                              <span className="text-green-400 font-mono text-lg font-bold">
                                {gameAccessData.gi_one_time_code}
                              </span>
                              <button 
                                onClick={() => copyToClipboard(gameAccessData.gi_one_time_code)}
                                className="text-blue-400 hover:text-blue-300"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <span className="text-gray-500">Ожидайте...</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {gameAccessData.gi_one_time_code && (
                    <div className="text-center">
                      <button 
                        onClick={() => {
                          const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
                          setGameAccessData(prev => ({ ...prev, gi_one_time_code: newCode }));
                        }}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Обновить страницу
                      </button>
                      <p className="text-gray-400 text-xs mt-2">
                        Если код не пришел в течении 5 минут, обновите страницу
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                    <h4 className="text-blue-400 font-medium mb-3">Как играть?</h4>
                    <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
                      <li>Откройте сайт/программу указанной платформы</li>
                      <li>Введите на платформе указанные Логин и Пароль</li>
                      <li>Получите одноразовый код и войдите в аккаунт</li>
                    </ol>
                  </div>

                  <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-2">В случае возникновения ошибки, обратитесь в поддержку</p>
                    <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm w-full">
                      Написать в Zalo
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-red-400 font-medium">Осталось времени</span>
                  <div className="flex items-center gap-4">
                    <span className="text-white text-2xl font-mono font-bold">
                      {formatTime(timeRemaining)}
                    </span>
                    <button
                      onClick={handleExtendTime}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      Продлить
                    </button>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${(timeRemaining / (gameAccessData.hours * 60 * 60)) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Extend Time Modal */}
      {showExtendTime && extendPaymentData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Продлить время</h3>
              <button 
                onClick={closeExtendTime}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-lg font-medium text-white mb-3">Продление для: {gameAccessData?.game_title}</h4>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Добавить часов:</span>
                    <button 
                      onClick={() => handleExtendHoursChange(-1)}
                      className="bg-gray-600 hover:bg-gray-500 text-white w-8 h-8 rounded flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-white font-medium w-8 text-center">{extendHours}</span>
                    <button 
                      onClick={() => handleExtendHoursChange(1)}
                      className="bg-gray-600 hover:bg-gray-500 text-white w-8 h-8 rounded flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-semibold text-green-400">
                      {extendPaymentData.amount}₫
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-lg font-medium text-white mb-4 flex items-center justify-center gap-2">
                  <QrCode className="w-5 h-5" />
                  QR код для продления
                </h4>
                <div className="bg-white rounded-lg p-4 inline-block">
                  <img 
                    src={extendPaymentData.qrUrl} 
                    alt="VietQR Payment Code"
                    className="w-48 h-48 object-contain"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={closeExtendTime}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium"
                >
                  Отмена
                </button>
                <button 
                  onClick={confirmExtendPayment}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium"
                >
                  Подтвердить продление
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Computer Confirmation Modal */}
      {deletingComputer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Удалить компьютер</h3>
                <p className="text-gray-400 text-sm">Это действие нельзя отменить</p>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Monitor className="w-5 h-5 text-blue-400" />
                <span className="font-medium text-white">{deletingComputer.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(deletingComputer.status)}`}>
                  {getStatusText(deletingComputer.status)}
                </span>
              </div>
              
              {deletingComputer.status === 'occupied' && (
                <div className="bg-red-500/10 border border-red-500/20 rounded p-3 mb-3">
                  <p className="text-red-400 text-sm font-medium">⚠️ Внимание!</p>
                  <p className="text-red-300 text-sm">
                    Компьютер сейчас занят игрой: <strong>{deletingComputer.game}</strong>
                  </p>
                  <p className="text-red-300 text-sm">
                    Осталось времени: <strong>{deletingComputer.timeLeft}</strong>
                  </p>
                </div>
              )}

              <div className="text-sm text-gray-300">
                <p><span className="text-gray-400">Логин:</span> {deletingComputer.login}</p>
                <p><span className="text-gray-400">Пароль:</span> {deletingComputer.password}</p>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-6">
              Вы действительно хотите удалить компьютер <strong className="text-white">{deletingComputer.name}</strong>? 
              Все связанные данные будут потеряны безвозвратно.
            </p>

            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Computer Modal */}
      {editingComputer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Редактировать {editingComputer.name}</h3>
              <button
                onClick={() => setEditingComputer(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Логин</label>
                <input
                  type="text"
                  value={editingComputer.login}
                  onChange={(e) => setEditingComputer(prev => ({ ...prev, login: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Пароль</label>
                <input
                  type="text"
                  value={editingComputer.password}
                  onChange={(e) => setEditingComputer(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Статус</label>
                <select
                  value={editingComputer.status}
                  onChange={(e) => setEditingComputer(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="available">Свободен</option>
                  <option value="occupied">Занят</option>
                  <option value="maintenance">Обслуживание</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setEditingComputer(null)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
                >
                  Отмена
                </button>
                <button
                  onClick={saveComputerChanges}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkingGameCatalog;