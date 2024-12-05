import { createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";

import { fetchContacts, deleteContact, addContact} from "./contactsOps";

const initialState = {
  items: [],
  isLoading: false,
  errore: null,
  filter: "",
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
    
    // addContact: (state, action) => {
    //   state.items.push(action.payload);
    // },
    // deleteContact: (state, action) => {
    //   state.items = state.items.filter(contact => contact.id !== action.payload);
    // },
  },
 
  extraReducers: builder => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.items = action.payload;
    })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(contact => contact.id !== action.payload.id);
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        
      })
      // .addCase(fetchContacts.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.errore = true;
      //   // state.errore = action.payload;
      // })
      // .addCase(deleteContact.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.errore = true;
      // })
      // .addCase(addContact.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.errore = true;
      // })

      .addMatcher(isAnyOf(fetchContacts.pending, deleteContact.pending, addContact.pending), (
        state, action) => {
        state.isLoading = true;
        state.errore = false;
      })
    .addMatcher(isAnyOf(fetchContacts.fulfilled, deleteContact.fulfilled, addContact.fulfilled), (
        state, action) => {
        state.isLoading = false;
    })
    .addMatcher(isAnyOf(fetchContacts.rejected, deleteContact.rejected, addContact.rejected), (
        state, action) => {
        state.isLoading = false;
        state.errore = true;
      });
      
  },

});

export const { setFilter } = contactsSlice.actions;

export default contactsSlice.reducer;
// export const { addContact } = contactsSlice.actions;
export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectIsError = state => state.contacts.isError;
export const selectFilter = (state) => state.contacts.filter;

export const selectFilteredContactsMemo = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) =>
    contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
);
