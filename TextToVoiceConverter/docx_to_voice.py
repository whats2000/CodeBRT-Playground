
import docx
import requests
import os
from pydub import AudioSegment

TTS_API_URL = 'http://127.0.0.1:9880/tts/'

def text_to_speech(text: str) -> bytes:
    """
    與TTS API互動的函數
    這個函數將文本轉換為語音。
    TTS API的請求和響應如下:

    POST localhost:9880
    Request:
        {
            "ref_audio_path": "123.wav", // For APIv2
            "refer_wav_path": "123.wav",
            "prompt_text": "一二三。",
            "prompt_lang": "zh", // For APIv2
            "prompt_language": "zh",
            "text": "先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。",
            "text_lang": "zh", // For APIv2
            "text_language": "zh",
        }

    Response:
        成功: 直接返回 wav 音頻流， http code 200
        失敗: 返回包含錯誤信息的 json, http code 400

    Args:
        text (str): 要轉換的文本

    Returns:
        bytes: WAV 音頻流的二進位資料

    Raises:
        Exception: 當API回應錯誤或請求失敗時拋出異常。
    """
    try:
        response = requests.post(
            TTS_API_URL,
            json={
                "ref_audio_path": "C:/Users/user/Documents/GitHub/CodeBRT-Playground/TextToVoiceConverter/reference.wav",
                "refer_wav_path": "C:/Users/user/Documents/GitHub/CodeBRT-Playground/TextToVoiceConverter/reference.wav",
                "prompt_text": "午休时间到，我想喝树莓薄荷饮。用两个和太阳有关的故事和你换，好不好？",
                "prompt_lang": "zh",
                "prompt_language": "zh",
                "text": text,
                "text_language": "zh",
                "text_lang": "zh",
                "top_k": 5,                   # int. top k sampling
                "top_p": 1,                   # float. top p sampling
                "speed_factor":1.0,
            }
        )

        response.raise_for_status()  # 會根據狀態碼拋出異常

        if response.status_code == 200:
            return response.content  # 返回 wav 音頻流
        else:
            # 這裡通常不會走到，因為 response.raise_for_status() 已經處理錯誤狀態碼
            error_msg = response.json().get("error", "Unknown error occurred.")
            raise Exception(f"TTS API returned an error: {error_msg}")
    except requests.exceptions.RequestException as e:
        raise Exception(f"An error occurred while calling the TTS API: {e}")

def docx_to_voices(docx_path: str):
    """
    Converts each sentence in a Word document to an individual voice recording.

    Args:
        docx_path (str): The path to the Word document.
    """
    output_dir = "output_voices"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    try:
        doc = docx.Document(docx_path)
        full_text = []
        for paragraph in doc.paragraphs:
            full_text.append(paragraph.text)
        text = '\n'.join(full_text)
        sentences = text.split("\n\n")
        
        # Filter out empty string
        sentences = list(filter(bool, sentences))

        for i, sentence in enumerate(sentences):
            sentence = sentence.strip()
            if sentence:  # Avoid empty sentences
                try:
                    audio_data = text_to_speech(sentence)
                    if audio_data:
                        filename = os.path.join(output_dir, f"voice_{i}_{sentence[:20]}.wav")  # Use the first 20 characters of the sentence as the filename
                        with open(filename, "wb") as f:
                            f.write(audio_data)
                        print(f"Saved audio: {filename}")
                    else:
                        print(f"Failed to convert sentence {i}: {sentence}")
                except Exception as e:
                    print(f"Error converting sentence {i}: {sentence} - {e}")

    except FileNotFoundError:
        print(f"Error: The file {docx_path} was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    docx_to_voices("文稿.docx")
