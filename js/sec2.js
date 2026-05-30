// Mobile layout restructuring for Section 2
(function() {
  const isMobile = window.matchMedia('(max-width: 768px)');
  const layoutContainer = document.querySelector('.sec2-problems-layout');
  
  if (!layoutContainer) return;
  
  function restructureForMobile() {
    if (isMobile.matches) {
      // Check if already restructured to avoid duplicates
      if (layoutContainer.hasAttribute('data-mobile-structured')) return;
      
      // Get all bubbles and characters
      const bubble1 = document.querySelector('.sec2-bubble-1');
      const bubble2 = document.querySelector('.sec2-bubble-2');
      const bubble3 = document.querySelector('.sec2-bubble-3');
      const bubble4 = document.querySelector('.sec2-bubble-4');
      const bubble5 = document.querySelector('.sec2-bubble-5');
      const char1 = document.querySelector('.sec2-character-1');
      const char2 = document.querySelector('.sec2-character-2');
      const char3 = document.querySelector('.sec2-character-3');
      const char4 = document.querySelector('.sec2-character-4');
      
      // Clear container
      while (layoutContainer.firstChild) {
        layoutContainer.removeChild(layoutContainer.firstChild);
      }
      
      // Create rows
      // Row 1: Left (Bubble 1 + Char 2) and Right (Bubble 2 + Char 3)
      const row1 = document.createElement('div');
      row1.className = 'sec2-mobile-row-1';
      row1.style.display = 'flex';
      row1.style.flexDirection = 'row';
      row1.style.gap = '16px';
      row1.style.justifyContent = 'space-between';
      
      const leftCol1 = document.createElement('div');
      leftCol1.style.flex = '1';
      leftCol1.style.display = 'flex';
      leftCol1.style.flexDirection = 'column';
      leftCol1.style.alignItems = 'center';
      leftCol1.style.gap = '12px';
      
      const rightCol1 = document.createElement('div');
      rightCol1.style.flex = '1';
      rightCol1.style.display = 'flex';
      rightCol1.style.flexDirection = 'column';
      rightCol1.style.alignItems = 'center';
      rightCol1.style.gap = '12px';
      
      if (bubble1) leftCol1.appendChild(bubble1.cloneNode(true));
      if (char2) leftCol1.appendChild(char2.cloneNode(true));
      if (bubble2) rightCol1.appendChild(bubble2.cloneNode(true));
      if (char3) rightCol1.appendChild(char3.cloneNode(true));
      
      row1.appendChild(leftCol1);
      row1.appendChild(rightCol1);
      
      // Row 2: Center (Bubble 4 alone)
      const row2 = document.createElement('div');
      row2.className = 'sec2-mobile-row-2';
      row2.style.display = 'flex';
      row2.style.justifyContent = 'center';
      row2.style.margin = '10px 0';
      if (bubble4) row2.appendChild(bubble4.cloneNode(true));
      
      // Row 3: Left (Bubble 5 + Char 1) and Right (Bubble 3 + Char 4)
      const row3 = document.createElement('div');
      row3.className = 'sec2-mobile-row-3';
      row3.style.display = 'flex';
      row3.style.flexDirection = 'row';
      row3.style.gap = '16px';
      row3.style.justifyContent = 'space-between';
      
      const leftCol3 = document.createElement('div');
      leftCol3.style.flex = '1';
      leftCol3.style.display = 'flex';
      leftCol3.style.flexDirection = 'column';
      leftCol3.style.alignItems = 'center';
      leftCol3.style.gap = '12px';
      
      const rightCol3 = document.createElement('div');
      rightCol3.style.flex = '1';
      rightCol3.style.display = 'flex';
      rightCol3.style.flexDirection = 'column';
      rightCol3.style.alignItems = 'center';
      rightCol3.style.gap = '12px';
      
      if (bubble5) leftCol3.appendChild(bubble5.cloneNode(true));
      if (char1) leftCol3.appendChild(char1.cloneNode(true));
      if (bubble3) rightCol3.appendChild(bubble3.cloneNode(true));
      if (char4) rightCol3.appendChild(char4.cloneNode(true));
      
      row3.appendChild(leftCol3);
      row3.appendChild(rightCol3);
      
      // Append all rows
      layoutContainer.appendChild(row1);
      layoutContainer.appendChild(row2);
      layoutContainer.appendChild(row3);
      
      layoutContainer.setAttribute('data-mobile-structured', 'true');
    } else {
      // Restore desktop layout (reload original structure)
      if (layoutContainer.hasAttribute('data-mobile-structured')) {
        location.reload(); // Simple reload to restore original DOM
      }
    }
  }
  
  // Initial check
  restructureForMobile();
  
  // Listen for resize events
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (isMobile.matches && !layoutContainer.hasAttribute('data-mobile-structured')) {
        restructureForMobile();
      } else if (!isMobile.matches && layoutContainer.hasAttribute('data-mobile-structured')) {
        location.reload();
      }
    }, 150);
  });
})();