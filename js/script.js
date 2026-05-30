(function() {
    // DOM要素
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const bodyEl = document.body;
    
    // モバイルメニューを閉じる関数
    function closeMobileMenu() {
      if (mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        if (hamburger) hamburger.classList.remove('active');
        // スクロール制限解除 (もし設定していたら解除)
        bodyEl.style.overflow = '';
      }
    }
    
    // モバイルメニューを開く関数
    function openMobileMenu() {
      if (!mobileMenu.classList.contains('open')) {
        mobileMenu.classList.add('open');
        if (hamburger) hamburger.classList.add('active');
        // モバイルメニューオープン時は背景スクロール禁止（より良い体験）
        // ただし、メニュー内でスクロールできるようにしたい場合はbody固定しつつメニュー内スクロール可とする
        // メニューに高さ制限はないが、オーバーフロー防止のため（任意）
        bodyEl.style.overflow = 'hidden';
        // モバイルメニュー自体はスクロール可能に(メニュー内コンテンツが多い場合)
        mobileMenu.style.overflowY = 'auto';
        mobileMenu.style.maxHeight = 'calc(100vh - 80px)';
      } else {
        closeMobileMenu();
      }
    }
    
    // トグル処理
    function toggleMobileMenu() {
      if (mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    }
    
    // ハンバーガークリックでトグル
    if (hamburger) {
      hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
      });
    }
    
    // モバイルメニュー内の各リンクをクリックしたら自動でメニューを閉じる (自然な動作)
    const mobileNavItems = document.querySelectorAll('.mobile-nav-links li');
    const mobileCta = document.querySelector('.mobile-cta');
    const mobileContactBlock = document.querySelector('.mobile-contact-block');
    
    function closeMenuOnAction() {
      closeMobileMenu();
      // Close mobile menu when a nav link is clicked
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMobileMenu(); // Your existing close function
  });
});
    }
    
    mobileNavItems.forEach(item => {
      item.addEventListener('click', () => {
        closeMenuOnAction();
      });
    });
    
    if (mobileCta) {
      mobileCta.addEventListener('click', () => {
        // CTAボタン本来のアクションはアラートなど追加可能ですが、閉じる動作を優先
        closeMenuOnAction();
        // デモのためにオプション: アラートで「無料相談ボタンがクリックされました」
        // 実際のプロジェクトではフォームなどに繋がる
        console.log('無料相談ボタン (モバイル) がクリックされました');
        alert('無料相談 デモアクション');
      });
    }
    
    // デスクトップ用のCTAボタンもインタラクション追加（念のため）
    const desktopCta = document.querySelector('.desktop-contact-cta-group .cta-button');
    if (desktopCta) {
      desktopCta.addEventListener('click', () => {
        alert('無料相談 デモ (デスクトップ)');
      });
    }
    
    // デスクトップナビゲーションリンクでも利用体験のためコンソールログ（任意）
    const desktopNavLinks = document.querySelectorAll('.nav-list li');
    desktopNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        console.log(`デスクトップナビ: ${link.innerText} がクリックされました`);
      });
    });
    
    // モバイルナビリンクでも同じく軽いフィードバック（閉じる前に少しアクション）
    mobileNavItems.forEach(link => {
      const originalText = link.innerText;
      link.addEventListener('click', () => {
        console.log(`モバイルメニュー: ${originalText} が選択されました`);
        // 閉じる処理は上記で実行済み
      });
    });
    
    // リサイズ時の処理: 画面幅が769px以上になったらメニューを強制的に閉じ、スタイルリセット
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth >= 769) {
          // デスクトップサイズではモバイルメニューを閉じて、bodyのoverflowを通常に戻す
          if (mobileMenu.classList.contains('open')) {
            closeMobileMenu();
          }
          // 念のためスクロール制限を解除
          bodyEl.style.overflow = '';
          mobileMenu.style.maxHeight = '';
          // ハンバーガーのactiveクラス削除
          if (hamburger) hamburger.classList.remove('active');
        } else {
          // モバイルサイズでメニューが開いていた時の高さ制限を再適用（もし開いているなら）
          if (mobileMenu.classList.contains('open')) {
            mobileMenu.style.maxHeight = 'calc(100vh - 80px)';
          }
        }
      }, 150);
    });
    
    // モバイルでメニュー外をクリックしても閉じるように (オプション: 良いUX)
    // メニューの外側 (ドキュメント全体) をクリックした場合、メニューが開いていたら閉じる。ただしハンバーガー自体は除外
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = mobileMenu.contains(event.target);
      const isClickOnHamburger = hamburger && hamburger.contains(event.target);
      const isMobileMenuOpen = mobileMenu.classList.contains('open');
      
      if (isMobileMenuOpen && !isClickInsideMenu && !isClickOnHamburger) {
        closeMobileMenu();
      }
    });
    
    // エスケープキーでもメニューを閉じる機能
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
    
    // 初期ロード時にウィンドウサイズによってハンバーガーの状態を適切にする
    const initMobileCheck = () => {
      if (window.innerWidth >= 769) {
        if (mobileMenu.classList.contains('open')) closeMobileMenu();
        if (hamburger) hamburger.classList.remove('active');
      } else {
        // モバイルサイズであれば特に何もしない（閉じた状態から開始）
        if (mobileMenu.classList.contains('open')) closeMobileMenu();
      }
    };
    initMobileCheck();
  })();