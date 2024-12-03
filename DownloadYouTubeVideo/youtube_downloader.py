import yt_dlp
import sys

def download_youtube_video(url, output_path=None):
    """
    下载YouTube视频的函数
    
    参数:
    url (str): YouTube视频链接
    output_path (str, 可选): 自定义下载路径和文件名模板
    """
    ydl_opts = {
        'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
        'outtmpl': output_path if output_path else '%(title)s.%(ext)s',
        'merge_output_format': 'mp4',
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            print(f"正在下载: {url}")
            ydl.download([url])
        print("下载完成！")
    except Exception as e:
        print(f"下载出错: {e}")

def main():
    if len(sys.argv) < 2:
        print("请提供YouTube视频链接")
        print("用法: python youtube_downloader.py [视频链接] [可选:下载路径]")
        sys.exit(1)
    
    url = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else None
    
    download_youtube_video(url, output_path)

if __name__ == '__main__':
    main()