test('getProducts', () => {
    const state = createCatalogState();
    expect(getProducts(state)).toBe(state.catalog.products);
  });
   
  test('getProductSkus', () => {
    const state = createCatalogState();
    expect(getProductSkus(state)).toBe(state.catalog.productSkus);
  });
   
  test('getCatalog', () => {
    const state = createCatalogState();
    expect(getCatalog(state).length).toBe(3);
  });
   
  test('getCartItems', () => {
    const state = createCartState();
    expect(getCartItems(state)).toBe(state.cart.cartItems);
  });
   
  test('getAllCartSummary', () => {
    const state = createState();
    expect(getAllCartSummary(state)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          product: expect.objectContaining({
            sku: 'PRODUCT-AAA',
          }),
        }),
        expect.objectContaining({
          product: expect.objectContaining({
            sku: 'PRODUCT-CCC',
          }),
        }),
      ]),
    );
  });
   
  test('getCartSummary', () => {
    const state = createState();
    expect(getCartSummary(state)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          product: expect.objectContaining({
            sku: 'PRODUCT-AAA',
          }),
        }),
      ]),
    );
  });