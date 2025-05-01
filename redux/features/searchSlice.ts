import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchQuery: string;
  isSearchOpen: boolean;
  loading: boolean;
  results: {
    team: any[];
    services: any[];
    blog: any[];
  };
}

const initialState: SearchState = {
  searchQuery: "",
  isSearchOpen: false,
  loading: false,
  results: {
    team: [],
    services: [],
    blog: [],
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (
      state,
      action: PayloadAction<SearchState["results"]>
    ) => {
      state.results = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    openSearch: (state) => {
      state.isSearchOpen = true;
    },
    closeSearch: (state) => {
      state.isSearchOpen = false;
    },
  },
});

export const {
  setSearchQuery,
  setSearchResults,
  setLoading,
  toggleSearch,
  openSearch,
  closeSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
