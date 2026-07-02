import { useEffect, useRef, useState } from 'react';
import ePub, { Rendition } from 'epubjs';

function App() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [rendition, setRendition] = useState<Rendition | null>(null);

  useEffect(() => {
    if (viewerRef.current) {
      const book = ePub('/sherlock2.epub');
      const newRendition = book.renderTo(viewerRef.current, {
        width: "100%",
        height: "500px" 
      });
      newRendition.display();
      setRendition(newRendition);
    }
  }, []);

  // Thêm logic bắt sự kiện bàn phím
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!rendition) return;

      if (event.key === 'ArrowLeft') {
        rendition.prev(); // Mũi tên trái -> trang trước
      } else if (event.key === 'ArrowRight') {
        rendition.next(); // Mũi tên phải -> trang sau
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Dọn dẹp sự kiện khi component bị hủy để tránh lỗi
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [rendition]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <div ref={viewerRef} style={{ border: '2px solid red', marginBottom: '20px' }} />
      
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => rendition?.prev()}>Trang trước</button>
        <button onClick={() => rendition?.next()} style={{ marginLeft: '10px' }}>Trang sau</button>
      </div>
      <p style={{ marginTop: '10px', color: '#666' }}>
        💡 Mẹo: Bạn có thể dùng phím ⬅️ và ➡️ để lật trang!
      </p>
    </div>
  );
}

export default App;