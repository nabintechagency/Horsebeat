/**
 * HORSEBEAT - EQUESTRIAN ATELIER
 * Application Controller & Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // App State
  const state = {
    currency: 'BDT',
    cart: JSON.parse(localStorage.getItem('horsebeat_cart')) || [
      {
        id: 'merlot-dressage-pad',
        name: 'Dressage Saddle Pad – Merlot Velvet',
        size: 'Full',
        price: 15500,
        image: 'assets/images/merlot_set.jpg',
        quantity: 1,
        colorName: 'Merlot Velvet'
      }
    ],
    wishlist: JSON.parse(localStorage.getItem('horsebeat_wishlist')) || ['merlot-dressage-pad', 'denali-navy-jacket'],
    activeCategory: 'all',
    activeSetId: 'merlot-matching-set',
    discountCode: null,
    discountRate: 0,
    quickViewProduct: null,
    selectedSize: null
  };

  const FREE_SHIPPING_THRESHOLD_BDT = 18000;

  // Formatting Helpers
  function formatMoney(amount) {
    const curr = CURRENCIES[state.currency] || CURRENCIES.BDT;
    const converted = amount * curr.rate;
    if (state.currency === 'BDT') {
      return `৳${Math.round(converted).toLocaleString('en-US')}`;
    }
    return `${curr.symbol}${converted.toFixed(0)}`;
  }

  // Toast Alerts
  function showToast(message) {
    const toast = document.getElementById('app-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast.timeoutId);
    toast.timeoutId = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Save State
  function saveCart() {
    localStorage.setItem('horsebeat_cart', JSON.stringify(state.cart));
    updateCartUI();
  }

  function saveWishlist() {
    localStorage.setItem('horsebeat_wishlist', JSON.stringify(state.wishlist));
    updateWishlistUI();
  }

  // Announcement Ticker
  function initAnnouncementTicker() {
    const items = document.querySelectorAll('.ticker-item');
    if (items.length <= 1) return;
    let currentIndex = 0;
    setInterval(() => {
      items[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % items.length;
      items[currentIndex].classList.add('active');
    }, 4500);
  }

  // Currency Selector (Desktop & Mobile Synchronized)
  function initCurrencySelector() {
    const desktopSelector = document.getElementById('currency-select');
    const mobileSelector = document.getElementById('mobile-currency-select');

    if (desktopSelector) desktopSelector.value = state.currency;
    if (mobileSelector) mobileSelector.value = state.currency;

    function handleCurrencyChange(newCurrency) {
      state.currency = newCurrency;
      if (desktopSelector) desktopSelector.value = newCurrency;
      if (mobileSelector) mobileSelector.value = newCurrency;
      renderAllDynamicContent();
      showToast(`Currency changed to ${state.currency}`);
    }

    if (desktopSelector) {
      desktopSelector.addEventListener('change', (e) => handleCurrencyChange(e.target.value));
    }
    if (mobileSelector) {
      mobileSelector.addEventListener('change', (e) => handleCurrencyChange(e.target.value));
    }
  }

  // Header Scroll Effect
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ==========================================
  // MATCHING CONCEPT STUDIO RENDERER
  // ==========================================
  function renderMatchingStudio() {
    const container = document.getElementById('matching-studio-container');
    if (!container) return;

    const currentSet = MATCHING_SETS.find(s => s.id === state.activeSetId) || MATCHING_SETS[0];

    // Build Colorway Tabs
    let tabsHtml = '';
    MATCHING_SETS.forEach(set => {
      const isActive = set.id === currentSet.id ? 'active' : '';
      tabsHtml += `
        <button class="color-tab-btn ${isActive}" data-set-id="${set.id}">
          <span class="swatch-circle" style="background-color: ${set.colorHex};"></span>
          <span>${set.collectionName}</span>
        </button>
      `;
    });

    // Build Items List
    let itemsHtml = '';
    currentSet.items.forEach(item => {
      itemsHtml += `
        <div class="set-item-row">
          <div class="set-item-left">
            <span class="set-item-type">${item.type}</span>
            <span class="set-item-name">${item.name} (${item.size})</span>
          </div>
          <span class="set-item-price">${formatMoney(item.price)}</span>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="studio-color-tabs">
        ${tabsHtml}
      </div>

      <div class="studio-stage">
        <div class="studio-showcase-visual">
          <img src="${currentSet.heroImage}" alt="${currentSet.title}">
          <div class="studio-hardware-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
            ${currentSet.hardware} Finish Hardware
          </div>
        </div>

        <div class="studio-set-details">
          <div class="set-header">
            <span class="eyebrow">${currentSet.collectionName} Atelier</span>
            <h3>${currentSet.title}</h3>
            <p class="set-tagline">${currentSet.tagline}</p>
            <p class="set-description">${currentSet.description}</p>
          </div>

          <div class="set-items-list">
            ${itemsHtml}
          </div>

          <div class="set-purchase-box">
            <div class="price-summary-row">
              <span class="eyebrow" style="margin-bottom:0">Exclusive 4-Piece Bundle</span>
              <span class="bundle-savings-badge">${currentSet.savingsText}</span>
            </div>
            <div class="bundle-pricing">
              <span class="bundle-price-current">${formatMoney(currentSet.bundlePrice)}</span>
              <span class="bundle-price-old">${formatMoney(currentSet.originalPrice)}</span>
            </div>
          </div>

          <button class="btn btn-primary btn-block add-bundle-to-cart-btn" data-set-id="${currentSet.id}">
            ADD COMPLETE 4-PIECE MATCHING SET • ${formatMoney(currentSet.bundlePrice)}
          </button>
        </div>
      </div>
    `;

    // Attach event listeners for tabs
    container.querySelectorAll('.color-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeSetId = btn.dataset.setId;
        renderMatchingStudio();
      });
    });

    // Attach event for bundle purchase
    const bundleBtn = container.querySelector('.add-bundle-to-cart-btn');
    if (bundleBtn) {
      bundleBtn.addEventListener('click', () => {
        currentSet.items.forEach(item => {
          const matchedProd = PRODUCTS.find(p => p.name.includes(item.type)) || PRODUCTS[0];
          addToCart({
            id: `${currentSet.id}-${item.name}`,
            name: item.name,
            size: item.size,
            price: item.price,
            image: currentSet.heroImage,
            colorName: currentSet.collectionName,
            quantity: 1
          }, false);
        });
        openCartDrawer();
        showToast(`Added complete 4-piece ${currentSet.collectionName} set to your bag!`);
      });
    }
  }

  // ==========================================
  // PRODUCT CATALOG GRID RENDERER
  // ==========================================
  function renderProductsGrid() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    let filtered = PRODUCTS;
    if (state.activeCategory === 'saddle-pads') {
      filtered = PRODUCTS.filter(p => p.category === 'saddle-pads');
    } else if (state.activeCategory === 'rider') {
      filtered = PRODUCTS.filter(p => p.category === 'rider');
    } else if (state.activeCategory === 'boots') {
      filtered = PRODUCTS.filter(p => p.category === 'boots');
    } else if (state.activeCategory === 'ear-bonnets') {
      filtered = PRODUCTS.filter(p => p.category === 'ear-bonnets');
    } else if (state.activeCategory === 'new') {
      filtered = PRODUCTS.filter(p => p.badge === 'NEW SEASON' || p.badge === 'LIMITED EDITION');
    }

    if (state.hardwareFilter && state.hardwareFilter !== 'all') {
      if (state.hardwareFilter === 'rosegold') {
        filtered = filtered.filter(p => p.hardware.toLowerCase().includes('rose gold'));
      } else if (state.hardwareFilter === 'silver') {
        filtered = filtered.filter(p => p.hardware.toLowerCase().includes('silver'));
      } else if (state.hardwareFilter === 'brass') {
        filtered = filtered.filter(p => p.hardware.toLowerCase().includes('brass') || p.hardware.toLowerCase().includes('gold'));
      }
    }

    grid.innerHTML = filtered.map(product => {
      const isWishlisted = state.wishlist.includes(product.id);
      const badgeClass = product.badge === 'NEW SEASON' ? 'badge-new' : (product.badge === 'LIMITED EDITION' ? 'badge-limited' : '');

      return `
        <div class="product-card" data-product-id="${product.id}">
          <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            
            <div class="card-badges-wrapper">
              <span class="card-badge ${badgeClass}">${product.badge}</span>
            </div>

            <button class="wishlist-toggle-btn ${isWishlisted ? 'active' : ''}" data-product-id="${product.id}" title="Save to Wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>

            <button class="quick-view-overlay-btn" data-product-id="${product.id}">
              QUICK VIEW & SIZE
            </button>
          </div>

          <div class="product-meta">
            <div class="product-colorway">
              <span>${product.colorName}</span>
              <span class="product-hardware">${product.hardware}</span>
            </div>
            
            <h4 class="product-title">${product.name}</h4>

            <div class="product-rating">
              <span>★★★★★</span>
              <span class="review-count">(${product.reviewsCount})</span>
            </div>

            <div class="product-price-row">
              <span class="product-price">${formatMoney(product.price)}</span>
              <button class="quick-add-btn" data-product-id="${product.id}">
                + ADD
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach Wishlist buttons
    grid.querySelectorAll('.wishlist-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWishlist(btn.dataset.productId);
      });
    });

    // Attach Quick View buttons
    grid.querySelectorAll('.quick-view-overlay-btn, .product-card').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('.wishlist-toggle-btn') || e.target.closest('.quick-add-btn')) return;
        const prodId = el.dataset.productId || el.closest('.product-card').dataset.productId;
        openQuickView(prodId);
      });
    });

    // Quick Add button
    grid.querySelectorAll('.quick-add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const product = PRODUCTS.find(p => p.id === btn.dataset.productId);
        if (product) {
          addToCart({
            id: product.id,
            name: product.name,
            size: product.sizes[0],
            price: product.price,
            image: product.image,
            colorName: product.colorName,
            quantity: 1
          });
          openCartDrawer();
          showToast(`Added ${product.name} to bag`);
        }
      });
    });
  }

  // Filter Tabs & Hardware Filter Handler
  function initFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.activeCategory = tab.dataset.filter;
        renderProductsGrid();
      });
    });

    // Support links with data-filter-link across the page
    document.querySelectorAll('[data-filter-link]').forEach(link => {
      link.addEventListener('click', () => {
        const filterVal = link.dataset.filterLink;
        const matchingTab = document.querySelector(`.filter-tab-btn[data-filter="${filterVal}"]`);
        if (matchingTab) {
          matchingTab.click();
        }
      });
    });

    // Support Hardware dropdown filter
    const sortDropdown = document.getElementById('catalog-sort');
    if (sortDropdown) {
      sortDropdown.addEventListener('change', (e) => {
        state.hardwareFilter = e.target.value;
        renderProductsGrid();
      });
    }
  }

  // ==========================================
  // LOOKBOOK HOTSPOTS
  // ==========================================
  function initLookbookHotspots() {
    const stage = document.querySelector('.lookbook-stage');
    if (!stage) return;

    LOOKBOOK_HOTSPOTS.forEach(spot => {
      const pin = document.createElement('div');
      pin.className = 'hotspot-pin';
      pin.style.top = spot.top;
      pin.style.left = spot.left;
      pin.dataset.spotId = spot.id;

      const popover = document.createElement('div');
      popover.className = 'hotspot-card-preview';
      popover.style.top = spot.top;
      popover.style.left = spot.left;
      popover.innerHTML = `
        <div class="preview-title">${spot.title}</div>
        <div style="font-size:0.7rem; color:var(--color-mid-gray); margin-bottom:4px;">${spot.subtitle}</div>
        <div class="preview-price">${formatMoney(spot.price)}</div>
        <button class="btn btn-primary btn-sm btn-block hotspot-buy-btn" data-product-id="${spot.productId}">
          VIEW PIECE
        </button>
      `;

      pin.addEventListener('mouseenter', () => {
        document.querySelectorAll('.hotspot-card-preview').forEach(p => p.classList.remove('active'));
        popover.classList.add('active');
      });

      // Mobile Touch Support: Click toggles hotspot popover
      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        const wasActive = popover.classList.contains('active');
        document.querySelectorAll('.hotspot-card-preview').forEach(p => p.classList.remove('active'));
        if (!wasActive) popover.classList.add('active');
      });

      stage.appendChild(pin);
      stage.appendChild(popover);

      popover.querySelector('.hotspot-buy-btn').addEventListener('click', () => {
        openQuickView(spot.productId);
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.hotspot-pin') && !e.target.closest('.hotspot-card-preview')) {
        document.querySelectorAll('.hotspot-card-preview').forEach(p => p.classList.remove('active'));
      }
    });
  }

  // ==========================================
  // CART DRAWER LOGIC
  // ==========================================
  function addToCart(item, notify = true) {
    const existingIndex = state.cart.findIndex(i => i.id === item.id && i.size === item.size);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += item.quantity;
    } else {
      state.cart.push(item);
    }
    saveCart();
    if (notify) {
      showToast(`Added ${item.name} to your bag`);
    }
  }

  function updateCartUI() {
    // Header cart badge
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cart-badge-count');
    if (cartCountEl) {
      cartCountEl.textContent = totalCount;
      if (totalCount > 0) {
        cartCountEl.classList.add('highlight');
      } else {
        cartCountEl.classList.remove('highlight');
      }
    }

    // Free Shipping Progress
    const subtotalUSD = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const meterFill = document.getElementById('cart-meter-fill');
    const meterText = document.getElementById('cart-meter-text');

    if (meterFill && meterText) {
      const remainingUSD = Math.max(0, FREE_SHIPPING_THRESHOLD_BDT - subtotalUSD);
      const percent = Math.min(100, Math.round((subtotalUSD / FREE_SHIPPING_THRESHOLD_BDT) * 100));
      meterFill.style.width = `${percent}%`;

      if (remainingUSD === 0) {
        meterText.innerHTML = `🎉 You have qualified for <strong>FREE EXPRESS SHIPPING!</strong>`;
      } else {
        meterText.innerHTML = `Add <strong>${formatMoney(remainingUSD)}</strong> more to unlock <strong>FREE EXPRESS SHIPPING</strong>`;
      }
    }

    // Cart Items Container
    const body = document.getElementById('cart-drawer-items');
    if (!body) return;

    if (state.cart.length === 0) {
      body.innerHTML = `
        <div class="empty-cart-view">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <h4 style="font-size:1.4rem; margin-bottom:8px;">Your Shopping Bag is Empty</h4>
          <p style="font-size:0.85rem; margin-bottom:20px;">Explore our signature matching collections and find your favorite set.</p>
          <button class="btn btn-primary btn-sm close-cart-btn" onclick="document.getElementById('cart-drawer').classList.remove('open'); document.getElementById('drawer-backdrop').classList.remove('open');">
            START SHOPPING
          </button>
        </div>
      `;
    } else {
      body.innerHTML = state.cart.map((item, index) => `
        <div class="cart-item-card" data-cart-index="${index}">
          <div class="cart-item-thumb">
            <img src="${item.image}" alt="${item.name}">
          </div>

          <div class="cart-item-info">
            <h5 class="cart-item-title">${item.name}</h5>
            <div class="cart-item-variant">Size: <strong>${item.size}</strong> • ${item.colorName || 'Atelier'}</div>
            <div class="cart-item-quantity-row">
              <div class="qty-control">
                <button class="qty-btn dec-qty" data-index="${index}">−</button>
                <span class="qty-num">${item.quantity}</span>
                <button class="qty-btn inc-qty" data-index="${index}">+</button>
              </div>
            </div>
          </div>

          <div class="cart-item-right">
            <span class="cart-item-price">${formatMoney(item.price * item.quantity)}</span>
            <button class="cart-item-remove" data-index="${index}">Remove</button>
          </div>
        </div>
      `).join('');

      // Attach Qty & Remove Listeners
      body.querySelectorAll('.dec-qty').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.index, 10);
          if (state.cart[idx].quantity > 1) {
            state.cart[idx].quantity -= 1;
          } else {
            state.cart.splice(idx, 1);
          }
          saveCart();
        });
      });

      body.querySelectorAll('.inc-qty').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.index, 10);
          state.cart[idx].quantity += 1;
          saveCart();
        });
      });

      body.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.index, 10);
          state.cart.splice(idx, 1);
          saveCart();
        });
      });
    }

    // Totals
    const subtotalEl = document.getElementById('cart-subtotal-price');
    const totalEl = document.getElementById('cart-total-price');
    const discountRow = document.getElementById('cart-discount-row');
    const discountValEl = document.getElementById('cart-discount-val');

    let finalTotalUSD = subtotalUSD;
    if (state.discountRate > 0) {
      const discountUSD = subtotalUSD * state.discountRate;
      finalTotalUSD = subtotalUSD - discountUSD;
      if (discountRow) discountRow.style.display = 'flex';
      if (discountValEl) discountValEl.textContent = `-${formatMoney(discountUSD)}`;
    } else {
      if (discountRow) discountRow.style.display = 'none';
    }

    if (subtotalEl) subtotalEl.textContent = formatMoney(subtotalUSD);
    if (totalEl) totalEl.textContent = formatMoney(finalTotalUSD);
  }

  function openCartDrawer() {
    document.getElementById('mobile-nav-drawer')?.classList.remove('open');
    document.getElementById('cart-drawer')?.classList.add('open');
    document.getElementById('drawer-backdrop')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    document.getElementById('cart-drawer')?.classList.remove('open');
    if (!document.getElementById('mobile-nav-drawer')?.classList.contains('open')) {
      document.getElementById('drawer-backdrop')?.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // ==========================================
  // WISHLIST LOGIC
  // ==========================================
  function toggleWishlist(productId) {
    const idx = state.wishlist.indexOf(productId);
    if (idx > -1) {
      state.wishlist.splice(idx, 1);
      showToast('Removed item from your wishlist');
    } else {
      state.wishlist.push(productId);
      showToast('Saved item to your wishlist ❤️');
    }
    saveWishlist();
    renderProductsGrid();
  }

  function updateWishlistUI() {
    const countEl = document.getElementById('wishlist-badge-count');
    if (countEl) {
      countEl.textContent = state.wishlist.length;
    }

    const modalList = document.getElementById('wishlist-items-container');
    if (!modalList) return;

    if (state.wishlist.length === 0) {
      modalList.innerHTML = `<p style="text-align:center; padding:30px; color:var(--color-mid-gray);">No saved items in your wishlist yet.</p>`;
    } else {
      const savedItems = PRODUCTS.filter(p => state.wishlist.includes(p.id));
      modalList.innerHTML = savedItems.map(p => `
        <div class="cart-item-card">
          <div class="cart-item-thumb"><img src="${p.image}"></div>
          <div class="cart-item-info">
            <h5 class="cart-item-title">${p.name}</h5>
            <div class="cart-item-variant">${p.colorName} • ${p.hardware}</div>
            <button class="btn btn-primary btn-sm" onclick="window.addToCartDirect('${p.id}')">ADD TO BAG</button>
          </div>
          <div class="cart-item-right">
            <span class="cart-item-price">${formatMoney(p.price)}</span>
            <button class="cart-item-remove" onclick="window.toggleWishlistDirect('${p.id}')">Remove</button>
          </div>
        </div>
      `).join('');
    }
  }

  // Global window helpers for inline handlers
  window.addToCartDirect = (prodId) => {
    const p = PRODUCTS.find(x => x.id === prodId);
    if (p) {
      addToCart({
        id: p.id,
        name: p.name,
        size: p.sizes[0],
        price: p.price,
        image: p.image,
        colorName: p.colorName,
        quantity: 1
      });
      openCartDrawer();
    }
  };

  window.toggleWishlistDirect = (prodId) => {
    toggleWishlist(prodId);
  };

  // ==========================================
  // QUICK VIEW MODAL
  // ==========================================
  function openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    state.quickViewProduct = product;
    state.selectedSize = product.sizes[0];

    const modal = document.getElementById('quick-view-modal');
    const content = document.getElementById('quick-view-content');

    content.innerHTML = `
      <button class="modal-close-btn" id="modal-close-btn">&times;</button>
      
      <div class="modal-gallery">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="modal-details">
        <span class="eyebrow">${product.collectionId.toUpperCase()} COLLECTION • ${product.hardware}</span>
        <h3 class="product-title">${product.name}</h3>
        
        <div class="product-rating" style="margin-bottom:12px;">
          <span>★★★★★</span>
          <span class="review-count">${product.rating} (${product.reviewsCount} verified riders)</span>
        </div>

        <div class="product-price">${formatMoney(product.price)}</div>

        <p style="font-size:0.88rem; color:var(--color-dark-gray); line-height:1.6; margin-bottom:20px;">
          ${product.description}
        </p>

        <div class="modal-selector-group">
          <span class="modal-selector-label">Select Size / Cut:</span>
          <div class="size-pill-group">
            ${product.sizes.map((size, idx) => `
              <button class="size-pill ${idx === 0 ? 'active' : ''}" data-size="${size}">${size}</button>
            `).join('')}
          </div>
        </div>

        <ul class="features-bullet-list">
          ${product.features.map(f => `<li>${f}</li>`).join('')}
        </ul>

        <div style="display:flex; gap:12px; margin-top:auto;">
          <button class="btn btn-primary btn-block" id="modal-add-to-cart-btn">
            ADD TO BAG • ${formatMoney(product.price)}
          </button>
        </div>
      </div>
    `;

    modal.classList.add('open');

    // Attach Size Switcher
    content.querySelectorAll('.size-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        content.querySelectorAll('.size-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.selectedSize = pill.dataset.size;
      });
    });

    // Close button
    content.querySelector('#modal-close-btn').addEventListener('click', () => {
      modal.classList.remove('open');
    });

    // Add to Cart
    content.querySelector('#modal-add-to-cart-btn').addEventListener('click', () => {
      addToCart({
        id: product.id,
        name: product.name,
        size: state.selectedSize || product.sizes[0],
        price: product.price,
        image: product.image,
        colorName: product.colorName,
        quantity: 1
      });
      modal.classList.remove('open');
      openCartDrawer();
    });
  }

  // ==========================================
  // PREDICTIVE SEARCH MODAL
  // ==========================================
  function initSearchModal() {
    const modal = document.getElementById('search-modal');
    const input = document.getElementById('search-query-input');
    const resultsContainer = document.getElementById('search-results-list');
    const openBtn = document.getElementById('open-search-btn');
    const closeBtn = document.getElementById('close-search-btn');

    if (!modal || !input) return;

    openBtn.addEventListener('click', () => {
      modal.classList.add('open');
      input.focus();
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });

    input.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        resultsContainer.innerHTML = `<p style="color:var(--color-mid-gray); text-align:center; padding:20px;">Type a product name, colorway (e.g. "Velvet", "Merlot", "Sycamore", "Jacket")...</p>`;
        return;
      }

      const matches = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.colorName.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        resultsContainer.innerHTML = `<p style="color:var(--color-mid-gray); text-align:center; padding:20px;">No equestrian pieces found matching "${q}".</p>`;
      } else {
        resultsContainer.innerHTML = matches.map(p => `
          <div class="cart-item-card" style="cursor:pointer;" onclick="window.openProductFromSearch('${p.id}')">
            <div class="cart-item-thumb"><img src="${p.image}"></div>
            <div class="cart-item-info">
              <h5 class="cart-item-title">${p.name}</h5>
              <div class="cart-item-variant">${p.colorName} • ${p.hardware} Finish</div>
            </div>
            <div class="cart-item-right">
              <span class="cart-item-price">${formatMoney(p.price)}</span>
              <span style="font-size:0.7rem; color:var(--color-merlot); text-transform:uppercase;">View →</span>
            </div>
          </div>
        `).join('');
      }
    });

    window.openProductFromSearch = (id) => {
      modal.classList.remove('open');
      openQuickView(id);
    };
  }

  // ==========================================
  // PROMO CODE HANDLER
  // ==========================================
  function initPromoDiscount() {
    const applyBtn = document.getElementById('apply-discount-btn');
    const input = document.getElementById('discount-code-input');

    if (!applyBtn || !input) return;

    applyBtn.addEventListener('click', () => {
      const code = input.value.trim().toUpperCase();
      if (code === 'HORSEBEAT10' || code === 'DHAKA10') {
        state.discountRate = 0.10;
        state.discountCode = code;
        updateCartUI();
        showToast('VIP Promo Code Applied: 10% Off Entire Order!');
        input.value = '';
      } else if (code === 'OLYMPIC15') {
        state.discountRate = 0.15;
        state.discountCode = code;
        updateCartUI();
        showToast('Olympic Rider Code Applied: 15% Off!');
        input.value = '';
      } else {
        showToast('Invalid code. Try "HORSEBEAT10" for 10% off.');
      }
    });
  }

  // ==========================================
  // NEWSLETTER & CHECKOUT HANDLERS
  // ==========================================
  function initCheckoutAndNewsletter() {
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (state.cart.length === 0) {
          showToast('Your shopping bag is empty.');
          return;
        }
        showToast('Directing to secure encrypted checkout...');
        setTimeout(() => {
          alert(`Thank you for shopping at Horsebeat!\n\nOrder Total: ${document.getElementById('cart-total-price').textContent}\nItems: ${state.cart.length}\n\nAtelier Address: 307/1, Dhanmondi 8/A, Dhaka, Bangladesh, 1209.\nYour equestrian order is being prepared.`);
          state.cart = [];
          saveCart();
          closeCartDrawer();
        }, 800);
      });
    }

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        if (email) {
          showToast(`Welcome to the Horsebeat Circle. Code HORSEBEAT10 sent to ${email}`);
          newsletterForm.reset();
        }
      });
    }

    const contactForm = document.getElementById('contact-us-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name')?.value || 'Rider';
        showToast(`Thank you, ${name}! Your inquiry has been sent to our Dhaka atelier.`);
        contactForm.reset();
      });
    }
  }

  // Drawers and Modals Toggle Listeners
  function initDrawersAndModals() {
    const backdrop = document.getElementById('drawer-backdrop');
    const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMobileBtn = document.getElementById('close-mobile-menu-btn');

    function openMobileNav() {
      document.getElementById('cart-drawer')?.classList.remove('open');
      mobileNavDrawer?.classList.add('open');
      backdrop?.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
      mobileNavDrawer?.classList.remove('open');
      if (!document.getElementById('cart-drawer')?.classList.contains('open')) {
        backdrop?.classList.remove('open');
        document.body.style.overflow = '';
      }
    }

    // Cart Drawer Toggle
    document.getElementById('open-cart-btn')?.addEventListener('click', openCartDrawer);
    document.getElementById('close-cart-btn')?.addEventListener('click', closeCartDrawer);

    // Mobile Menu Toggle
    mobileMenuBtn?.addEventListener('click', openMobileNav);
    closeMobileBtn?.addEventListener('click', closeMobileNav);

    // Mobile drawer logo click closes drawer and scrolls to top
    document.getElementById('mobile-drawer-brand')?.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileNav();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Backdrop click closes any active drawer
    backdrop?.addEventListener('click', () => {
      closeCartDrawer();
      closeMobileNav();
    });

    // Auto-close mobile drawer on link click and handle filter links
    mobileNavDrawer?.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const filterType = link.getAttribute('data-filter-link');
        if (filterType) {
          e.preventDefault();
          state.activeCategory = filterType;
          document.querySelectorAll('.filter-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === filterType);
          });
          renderProductsGrid();
          closeMobileNav();
          const catalogEl = document.getElementById('catalog');
          if (catalogEl) {
            catalogEl.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          closeMobileNav();
        }
      });
    });

    // Wishlist Modal Toggle
    const wishlistModal = document.getElementById('wishlist-modal');
    document.getElementById('open-wishlist-btn')?.addEventListener('click', () => {
      updateWishlistUI();
      wishlistModal?.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    document.getElementById('close-wishlist-btn')?.addEventListener('click', () => {
      wishlistModal?.classList.remove('open');
      document.body.style.overflow = '';
    });
    wishlistModal?.addEventListener('click', (e) => {
      if (e.target === wishlistModal) {
        wishlistModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Quick View Backdrop click
    const qvModal = document.getElementById('quick-view-modal');
    qvModal?.addEventListener('click', (e) => {
      if (e.target === qvModal) {
        qvModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Escape Key Listener to dismiss any open modal/drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCartDrawer();
        closeMobileNav();
        wishlistModal?.classList.remove('open');
        qvModal?.classList.remove('open');
        document.getElementById('search-modal')?.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Refresh all currency-sensitive components
  function renderAllDynamicContent() {
    renderMatchingStudio();
    renderProductsGrid();
    updateCartUI();
    updateWishlistUI();
  }

  // Initial Boot
  initAnnouncementTicker();
  initCurrencySelector();
  initHeaderScroll();
  initFilterTabs();
  initLookbookHotspots();
  initSearchModal();
  initPromoDiscount();
  initCheckoutAndNewsletter();
  initDrawersAndModals();
  renderAllDynamicContent();
});
