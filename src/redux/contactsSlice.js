import { createSlice } from "@reduxjs/toolkit";

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
      state.isLoading = false;
    })
      .addCase(fetchContacts.pending, (state, action) => {
        state.isLoading = true;
        state.errore = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.errore = true;
        // state.errore = action.payload;
      })
     .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(contact => contact.id !== action.payload.id);
        state.isLoading = false;
      })
    .addCase(addContact.fulfilled, (state, action) => {
       state.items.push(action.payload);
        state.isLoading= true;
      })
  }
});

export default contactsSlice.reducer;
// export const { addContact } = contactsSlice.actions;
export const selectContacts = state => state.contacts.items;

export const selectIsLoading = state => state.contacts.isLoading;
export const selectIsError = state => state.contacts.isError;