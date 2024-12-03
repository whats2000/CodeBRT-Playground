import torch
from sentence_transformers import SentenceTransformer
from typing import List, Union

class HybridBertEmbedding:
    def __init__(self, 
                 sbert_model_name: str = 'paraphrase-MiniLM-L6-v2',
                 secbert_model_name: str = 'microsoft/secbert-base',
                 device: str = None):
        """
        初始化混合BERT嵌入模型
        
        Args:
            sbert_model_name: SBERT模型名稱
            secbert_model_name: SECBERT模型名稱
            device: 運行設備 ('cuda' 或 'cpu')
        """
        if device is None:
            self.device = 'cuda' if torch.cuda.is_available() else 'cpu'
        else:
            self.device = device
            
        # 加載模型
        self.sbert_model = SentenceTransformer(sbert_model_name)
        self.secbert_model = SentenceTransformer(secbert_model_name)
        
        # 將模型移至指定設備
        self.sbert_model = self.sbert_model.to(self.device)
        self.secbert_model = self.secbert_model.to(self.device)
        
    def encode(self, 
              sentences: Union[str, List[str]], 
              batch_size: int = 32,
              show_progress_bar: bool = False,
              normalize_embeddings: bool = True) -> torch.Tensor:
        """
        為輸入文本生成混合嵌入向量
        
        Args:
            sentences: 輸入文本或文本列表
            batch_size: 批處理大小
            show_progress_bar: 是否顯示進度條
            normalize_embeddings: 是否對嵌入向量進行正規化
            
        Returns:
            混合嵌入向量
        """
        # 獲取SBERT嵌入
        sbert_embeddings = self.sbert_model.encode(
            sentences,
            batch_size=batch_size,
            show_progress_bar=show_progress_bar,
            convert_to_tensor=True,
            normalize_embeddings=normalize_embeddings
        )
        
        # 獲取SECBERT嵌入
        secbert_embeddings = self.secbert_model.encode(
            sentences,
            batch_size=batch_size,
            show_progress_bar=show_progress_bar,
            convert_to_tensor=True,
            normalize_embeddings=normalize_embeddings
        )
        
        # 連接兩個嵌入向量
        combined_embeddings = torch.cat([sbert_embeddings, secbert_embeddings], dim=-1)
        
        # 如果需要，對結合後的向量進行正規化
        if normalize_embeddings:
            combined_embeddings = torch.nn.functional.normalize(combined_embeddings, p=2, dim=1)
            
        return combined_embeddings
    
    def get_embedding_dimension(self) -> int:
        """
        獲取混合嵌入向量的維度
        
        Returns:
            混合嵌入向量的總維度
        """
        return self.sbert_model.get_sentence_embedding_dimension() + \
               self.secbert_model.get_sentence_embedding_dimension()

# 使用示例
if __name__ == "__main__":
    # 初始化混合模型
    hybrid_model = HybridBertEmbedding()
    
    # 準備示例文本
    texts = [
        "這是第一個測試句子。",
        "這是另一個測試句子。",
        "我們正在測試混合BERT嵌入模型。"
    ]
    
    # 生成混合嵌入
    embeddings = hybrid_model.encode(texts)
    
    # 打印嵌入維度和形狀
    print(f"混合嵌入維度: {hybrid_model.get_embedding_dimension()}")
    print(f"嵌入張量形狀: {embeddings.shape}")