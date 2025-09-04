// 音乐元数据结构
export interface MusicMetadata {
  id: string;
  name: string;
  artist: string;
  album: string;
  duration?: number;
  url: string;
  pic_url?: string;
  source?: string;
}

// 音乐字典类型定义
export interface MusicItem {
  name: string;
  url: string;
  id?: string;
}

// 预设音乐字典
export const MUSIC_DICT: Record<string, string> = {
  'Stal': "https://m701.music.126.net/20250905061623/56b08bf6628076c0f626ec8f5c9612e7/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/27979907781/5b87/a0b2/bcd0/9d0b44d4bf4a239c7f728d812c368edc.mp3",
  'Cat': "https://m701.music.126.net/20250905061349/78d04b3d4a4f363d1be5de9743cb4daf/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/15034083571/f0c7/cbb8/2ddc/2a704cd2b93e9cc4f352017f87ccf005.mp3",
  'Minecraft': 'https://m801.music.126.net/20250905053724/1e0109d1cab5cff04f73be75dbc45971/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/15034086247/9ea2/cad2/42a3/c7f4dcbd4951840881e0f3ad9bddfac3.mp3'
}

// 音乐服务类
export class MusicService {
  private static instance: MusicService;
  private musicDict: Record<string, string> = MUSIC_DICT;
  private metadataCache: Record<string, MusicMetadata> = {};

  // 单例模式
  public static getInstance(): MusicService {
    if (!MusicService.instance) {
      MusicService.instance = new MusicService();
    }
    return MusicService.instance;
  }

  // 获取音乐字典
  public getMusicDict(): Record<string, string> {
    return this.musicDict;
  }

  // 根据名称获取音乐URL
  public getMusicUrl(name: string): string | undefined {
    return this.musicDict[name];
  }

  // 添加音乐到字典
  public addMusic(name: string, url: string): void {
    this.musicDict[name] = url;
  }

  // 移除音乐
  public removeMusic(name: string): boolean {
    if (name in this.musicDict) {
      delete this.musicDict[name];
      return true;
    }
    return false;
  }

  // 获取所有音乐名称列表
  public getMusicNames(): string[] {
    return Object.keys(this.musicDict);
  }

  // 获取所有音乐项目
  public getAllMusicItems(): MusicItem[] {
    return Object.entries(this.musicDict).map(([name, url]) => ({
      name,
      url,
      id: this.extractMusicId(url)
    }));
  }

  // 从URL中提取音乐ID（简单实现）
  private extractMusicId(url: string): string {
    // 从URL中提取可能的ID，这里可以根据实际URL格式调整
    const match = url.match(/\/([a-f0-9]{32})\//);
    return match ? match[1] : '';
  }

  // 设置音乐元数据
  public setMusicMetadata(id: string, metadata: MusicMetadata): void {
    this.metadataCache[id] = metadata;
    console.log('音乐元数据已缓存:', metadata);
  }

  // 获取音乐元数据
  public getMusicMetadata(id: string): MusicMetadata | undefined {
    return this.metadataCache[id];
  }

  // 获取所有缓存的元数据
  public getAllMetadata(): Record<string, MusicMetadata> {
    return this.metadataCache;
  }

  // 清除元数据缓存
  public clearMetadataCache(): void {
    this.metadataCache = {};
  }

  // 导出音乐字典为JSON
  public exportMusicDict(): string {
    return JSON.stringify(this.musicDict, null, 2);
  }

  // 从JSON导入音乐字典
  public importMusicDict(jsonString: string): boolean {
    try {
      const imported = JSON.parse(jsonString);
      if (typeof imported === 'object' && imported !== null) {
        this.musicDict = { ...this.musicDict, ...imported };
        return true;
      }
      return false;
    } catch (error) {
      console.error('导入音乐字典失败:', error);
      return false;
    }
  }

  // 导出元数据为JSON
  public exportMetadata(): string {
    return JSON.stringify(this.metadataCache, null, 2);
  }

  // 从JSON导入元数据
  public importMetadata(jsonString: string): boolean {
    try {
      const imported = JSON.parse(jsonString);
      if (typeof imported === 'object' && imported !== null) {
        this.metadataCache = { ...this.metadataCache, ...imported };
        return true;
      }
      return false;
    } catch (error) {
      console.error('导入元数据失败:', error);
      return false;
    }
  }
}

// 导出单例实例
export const musicService = MusicService.getInstance();

// 便捷方法
export const getMusicUrl = (name: string) => musicService.getMusicUrl(name);
export const addMusic = (name: string, url: string) => musicService.addMusic(name, url);
export const getMusicNames = () => musicService.getMusicNames();
export const getAllMusicItems = () => musicService.getAllMusicItems();
export const setMusicMetadata = (id: string, metadata: MusicMetadata) => musicService.setMusicMetadata(id, metadata);
export const getMusicMetadata = (id: string) => musicService.getMusicMetadata(id);