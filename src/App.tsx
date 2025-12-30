import { useEffect, useRef, useState } from 'react';
import { Heading1 } from '@/components/Text.tsx';
import Wrapper from '@/components/Wrapper.tsx';
import Account from '@/layout/Account/Account.tsx';
import Container from '@/layout/Container.tsx';
import FloatingBar from '@/layout/FloatingBar/FloatingBar.tsx';
import GalleryWrap from '@/layout/Gallery/GalleryWrap.tsx';
import Guestbook from '@/layout/Guestbook/Guestbook.tsx';
import Invitation from '@/layout/Invitation/Invitation.tsx';
import Location from '@/layout/Location/Location.tsx';
import Main from '@/layout/Main/Main.tsx';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const galleryRef = useRef(null);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  // 이미지 다운로드 방지: 강화된 보호
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.closest('img')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.closest('img')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.closest('img')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+S, Ctrl+P 등 저장/인쇄 단축키 방지
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p' || e.key === 'S' || e.key === 'P')) {
        e.preventDefault();
        return false;
      }
      // F12 (개발자 도구) 방지
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
    };

    // 모든 이미지에 이벤트 리스너 추가
    const addImageProtection = () => {
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        img.addEventListener('contextmenu', handleContextMenu as EventListener, true);
        img.addEventListener('dragstart', handleDragStart as EventListener, true);
        img.addEventListener('selectstart', handleSelectStart, true);
        img.setAttribute('draggable', 'false');
      });
    };

    // 초기 이미지 보호
    addImageProtection();

    // 전역 이벤트 리스너 (capture phase)
    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('dragstart', handleDragStart, true);
    document.addEventListener('selectstart', handleSelectStart, true);
    document.addEventListener('keydown', handleKeyDown, true);

    // 새로운 이미지가 추가될 때마다 보호 적용
    const observer = new MutationObserver(() => {
      addImageProtection();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('dragstart', handleDragStart, true);
      document.removeEventListener('selectstart', handleSelectStart, true);
      document.removeEventListener('keydown', handleKeyDown, true);
      observer.disconnect();
    };
  }, []);

  const checkScrollPosition = () => {
    if (galleryRef.current) {
      const { offsetTop } = galleryRef.current;
      const scrollPosition = window.scrollY;

      if (scrollPosition >= offsetTop) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  return (
    <Container>
      <Wrapper style={{ paddingBottom: 10 }}>
        <Main />
      </Wrapper>
      <Wrapper style={{ paddingTop: 10 }}>
        <Heading1>모시는 글</Heading1>
        <Invitation />
      </Wrapper>
      <Wrapper ref={galleryRef}>
        <Heading1>Gallery</Heading1>
        <GalleryWrap />
      </Wrapper>
      <Wrapper>
        <Heading1>마음 전하실 곳</Heading1>
        <Account />
      </Wrapper>
      <Wrapper>
        <Heading1>오시는 길</Heading1>
        <Location />
      </Wrapper>
      <Wrapper style={{ paddingTop: 10 }}>
        <Heading1>신랑 신부에게</Heading1>
        <Guestbook />
      </Wrapper>
      <FloatingBar isVisible={isVisible} />
    </Container>
  );
}

export default App;
