import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/style.css';
import images from '@/layout/Gallery/Images.ts';

const PhotoGallery = () => {
  const smallItemStyles: React.CSSProperties = {
    objectFit: 'cover', // 전체 이미지가 보이도록 맞추고 싶을 때는 contain / 비율 유지하고 싶을 때는 cover
    width: '100px',
    height: '150px',
    userSelect: 'none',
    pointerEvents: 'none', // 이미지에 직접 터치/클릭 불가능하게 설정
    ...({
      WebkitUserDrag: 'none',
    } as React.CSSProperties),
  };
  const options = {
    // Disable zoom button
    zoom: false,
    // Disable pinch-to-zoom gesture
    pinchToZoom: false,
    // Disable wheel zoom
    wheelToZoom: false,
    // Disable pinch-to-close gesture
    pinchToClose: false,
    // Disable double-tap-to-zoom
    getDoubleTapZoom: () => 1,
    // Hide the zoom button in the UI
    zoomEl: false,
  };


  return (
    <Gallery options={options}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 0fr)',
          gridGap: 2,
        }}>
        {images.map((image, index) => {
          return (
            <Item
              key={index}
              cropped
              original={image.source}
              thumbnail={image.source}
              width={image.width}
              height={image.height}>
              {({ ref, open }) => (
                <div
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                    width: '100px',
                    height: '150px',
                  }}>
                  <img
                    style={smallItemStyles}
                    alt={image.alt}
                    src={image.source}
                    ref={ref as React.MutableRefObject<HTMLImageElement>}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                    onDragStart={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                    draggable={false}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      cursor: 'pointer',
                      zIndex: 1,
                    }}
                    onClick={open}
                  />
                </div>
              )}
            </Item>
          );
        })}
      </div>
    </Gallery>
  );
};

export default PhotoGallery;
