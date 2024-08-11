import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("filter") ? JSON.parse(localStorage.getItem("filter")) : {categoryFilter: [], brandFilter: [], priceFilter: [], primaryCategoryFilter: false, includeOutOfStock: true}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryFilter: (state, action) => {
            state.categoryFilter = [...state.categoryFilter,action.payload];
            const filter = localStorage.getItem("filter") ? JSON.parse(localStorage.getItem("filter")) : {categoryFilter: [], brandFilter: [], priceFilter: [], primaryCategoryFilter: false, includeOutOfStock: true}; 
            filter.categoryFilter = state.categoryFilter;
            localStorage.setItem("filter", JSON.stringify(filter));
        },
        setBrandFilter: (state, action) => {
            state.brandFilter = [...state.brandFilter,action.payload];
            const filter = localStorage.getItem("filter") ? JSON.parse(localStorage.getItem("filter")) : {categoryFilter: [], brandFilter: [], priceFilter: [], primaryCategoryFilter: false, includeOutOfStock: true};
            filter.brandFilter = state.brandFilter;
            localStorage.setItem("filter", JSON.stringify(filter));
        },
        removeBrandFilter: (state, action) => {
            state.brandFilter = action.payload;
            const filter = localStorage.getItem("filter") ? JSON.parse(localStorage.getItem("filter")) : {categoryFilter: [], brandFilter: [], priceFilter: [], primaryCategoryFilter: false, includeOutOfStock: true};
            filter.brandFilter = action.payload;
            localStorage.setItem("filter", JSON.stringify(filter));
        },
        setPriceFilter: (state, action) => {
            state.priceFilter = action.payload;
            const filter = localStorage.getItem("filter") ? JSON.parse(localStorage.getItem("filter")) : {categoryFilter: [], brandFilter: [], priceFilter: [], primaryCategoryFilter: false, includeOutOfStock: true};
            filter.priceFilter = action.payload;
            localStorage.setItem("filter", JSON.stringify(filter));
        },
        removeCategoryFilter: (state, action) => {
            state.categoryFilter = action.payload;
            const filter = localStorage.getItem("filter") ? JSON.parse(localStorage.getItem("filter")) : {categoryFilter: [], brandFilter: [], priceFilter: [], primaryCategoryFilter: false, includeOutOfStock: true};
            filter.categoryFilter = action.payload;
            localStorage.setItem("filter", JSON.stringify(filter));
        },
        clearAllCategoryFilters: (state) => {
            state.categoryFilter = [];
            localStorage.removeItem("filter");
        },
        setPrimaryCategoryFilter: (state, action) => {
            state.primaryCategoryFilter = action.payload;
            const filter = localStorage.getItem("filter") ? JSON.parse(localStorage.getItem("filter")) : {categoryFilter: [], brandFilter: [], priceFilter: [], primaryCategoryFilter: false, includeOutOfStock: true};
            filter.primaryCategoryFilter = action.payload;
            localStorage.setItem("filter", JSON.stringify(filter));
        },
        setIncludeOutOfStock: (state, action) => {
            state.includeOutOfStock = action.payload;
            const filter = localStorage.getItem("filter") ? JSON.parse(localStorage.getItem("filter")) : {categoryFilter: [], brandFilter: [], priceFilter: [], primaryCategoryFilter: false, includeOutOfStock: true};
            filter.includeOutOfStock = action.payload;
            localStorage.setItem("filter", JSON.stringify(filter));
        }
    }
})

export const {setBrandFilter, setCategoryFilter, setPriceFilter, removeBrandFilter, removeCategoryFilter, clearAllCategoryFilters, setPrimaryCategoryFilter, setIncludeOutOfStock} = filterSlice.actions;

export default filterSlice.reducer;