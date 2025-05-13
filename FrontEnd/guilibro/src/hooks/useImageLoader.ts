import { useState, useEffect } from 'react';

export const useImageLoader = (url: string) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadImage = (url: string) => {
    if (!url) return;
    
    const cleanUrl = url.replace(/^\/api\/image-proxy\?url=/, '');
    const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(cleanUrl)}`;
    
    const img = new Image();
    img.src = proxyUrl;
    
    img.onload = () => {
      setImageUrl(proxyUrl);
      setLoading(false);
    };
    
    img.onerror = (error) => {
      console.error('Image failed to load:', error);
      setError('Failed to load image');
      setLoading(false);
    };
  };

  useEffect(() => {
    loadImage(url);
  }, [url]);

  return { imageUrl, loading, error };
};