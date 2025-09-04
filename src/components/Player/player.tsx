'use client';

import { motion } from "motion/react";
import Image from "next/image";
import { useState, useRef, useEffect } from 'react';
import { musicService, getAllMusicItems, type MusicItem } from '../../services/musicService';
import './index.css';

export default function Player() {
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);
    const [currentMusic, setCurrentMusic] = useState<MusicItem | null>(null);
    const [musicList, setMusicList] = useState<MusicItem[]>([]);
    const [musicDetails, setMusicDetails] = useState<Record<string, any>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.33); // 初始音量为1/3
    const playerRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const volumeBarRef = useRef<HTMLDivElement>(null);

    const togglePlayer = () => {
        setIsPlayerVisible(!isPlayerVisible);
    };

    // 获取音乐详细信息,这里结合api使用
    const fetchMusicDetails = async (music: MusicItem) => {
        if (!music.id) return null;
        
    };

    // 初始化音乐列表
    useEffect(() => {
        const initializeMusic = async () => {
            try {
                setIsLoading(true);
                const musicItems = getAllMusicItems();
                setMusicList(musicItems);
                
                if (musicItems.length > 0) {
                    setCurrentMusic(musicItems[0]);
                    
                    // 获取所有音乐的详细信息
                    const detailsPromises = musicItems.map(async (music) => {
                        const details = await fetchMusicDetails(music);
                        return { [music.id || music.name]: details };
                    });
                    
                    const detailsResults = await Promise.all(detailsPromises);
                    const combinedDetails = detailsResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});
                    setMusicDetails(combinedDetails);
                }
            } catch (error) {
                console.error('初始化音乐列表失败:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeMusic();
    }, []);

    // 切换音乐
    const switchMusic = async (music: MusicItem) => {
        setCurrentMusic(music);
        
        if (!musicDetails[music.id || music.name]) {
            const details = await fetchMusicDetails(music);
            if (details) {
                setMusicDetails(prev => ({
                    ...prev,
                    [music.id || music.name]: details
                }));
            }
        }
        
        // 切换音乐后自动播放
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch((error) => {
                    console.log('切换音乐后自动播放失败:', error);
                });
            }
        }, 100);
    };

    // 播放/暂停控制
    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // 前一首/后一首
    const playPrevious = () => {
        if (musicList.length === 0) return;
        
        const currentIndex = musicList.findIndex(music => music.id === currentMusic?.id || music.name === currentMusic?.name);
        const previousIndex = currentIndex > 0 ? currentIndex - 1 : musicList.length - 1;
        const previousMusic = musicList[previousIndex];
        
        if (previousMusic) {
            switchMusic(previousMusic);
        }
    };

    const playNext = () => {
        if (musicList.length === 0) return;
        
        const currentIndex = musicList.findIndex(music => music.id === currentMusic?.id || music.name === currentMusic?.name);
        const nextIndex = currentIndex < musicList.length - 1 ? currentIndex + 1 : 0;
        const nextMusic = musicList[nextIndex];
        
        if (nextMusic) {
            switchMusic(nextMusic);
        }
    };

    // 音频事件处理
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
            // 设置初始音量
            audioRef.current.volume = volume;
            // 自动播放
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch((error) => {
                console.log('自动播放失败:', error);
            });
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
    };

    // 音量控制
    const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
        if (volumeBarRef.current && audioRef.current) {
            const rect = volumeBarRef.current.getBoundingClientRect();
            const clickY = e.clientY - rect.top;
            const newVolume = Math.max(0, Math.min(1, 1 - (clickY / rect.height))); // 从底部开始计算
            setVolume(newVolume);
            audioRef.current.volume = newVolume;
        }
    };

    // 设置音频音量
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume, currentMusic]);

    // 点击外部区域关闭播放器
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (playerRef.current && !playerRef.current.contains(event.target as Node)) {
                setIsPlayerVisible(false);
            }
        };

        if (isPlayerVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPlayerVisible]);

    return (
        <div className="fixed top-10 left-5 w-32 h-32 z-[9999]" ref={playerRef}>
            <motion.div 
                className="w-32 h-32 cursor-pointer transition-transform duration-200 hover:scale-105"
                onClick={togglePlayer}
                whileTap={{ scale: 0.95 }}
            >
                <Image src="/Player/player.png" alt="Player" width={128} height={128} />
            </motion.div>
            
            {isPlayerVisible && (
                <div className="music-player" style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}>
                    {/* 主播放器区域 */}
                    <div className="player-main">
                        {/* 加载状态 */}
                        {isLoading && (
                            <div className="loading">
                                <div className="spinner"></div>
                                <span>加载中...</span>
                            </div>
                        )}
                        
                        {/* 播放器控件 */}
                        {currentMusic && (
                            <div className="player-controls">
                                {/* 进度条 */}
                                <div className="progress-container">
                                    <div 
                                        className="progress-bar"
                                        onClick={(e) => {
                                            if (audioRef.current && duration) {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                const clickX = e.clientX - rect.left;
                                                const newTime = (clickX / rect.width) * duration;
                                                audioRef.current.currentTime = newTime;
                                                setCurrentTime(newTime);
                                            }
                                        }}
                                    >
                                        <div 
                                            className="progress-fill"
                                            style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                                        ></div>
                                    </div>
                                    <div className="time-display">
                                        <span>{Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}</span>
                                        <span>{Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}</span>
                                    </div>
                                </div>
                                
                                {/* 控制按钮 */}
                                <div className="control-buttons">
                                    <button onClick={playPrevious} className="control-btn">
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"/>
                                        </svg>
                                    </button>
                                    
                                    <button onClick={togglePlayPause} className="control-btn play-btn">
                                        {isPlaying ? (
                                            <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                                            </svg>
                                        ) : (
                                            <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                                            </svg>
                                        )}
                                    </button>
                                    
                                    <button onClick={playNext} className="control-btn">
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* 音量控制列 */}
                    {currentMusic && (
                        <div className="volume-column">
                            <div className="volume-control">
                                <svg className="volume-icon" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4-3.816a1 1 0 011-.108zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd"/>
                                </svg>
                                <div 
                                    className="volume-bar"
                                    ref={volumeBarRef}
                                    onClick={handleVolumeChange}
                                >
                                    <div 
                                        className="volume-fill"
                                        style={{ height: `${volume * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {currentMusic && (
                <audio
                    ref={audioRef}
                    src={currentMusic.url}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleEnded}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    style={{ display: 'none' }}
                />
            )}
        </div>
    );
}