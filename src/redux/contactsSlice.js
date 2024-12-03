import { createSlice } from "@reduxjs/toolkit";

import { fetchContacts, deleteContact} from "./contactsOps";

const initialState = {
  items: [],
  loading: false,
  erroe: null,
  filter: "",
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.items.push(action.payload);
    },
    // deleteContact: (state, action) => {
    //   state.items = state.items.filter(contact => contact.id !== action.payload);
    // },
  },
  extraReducers: builder => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    })
      .addCase(fetchContacts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(contact => contact.id !== action.payload.id);
        state.loading = false;
      })
    
  }
});

export default contactsSlice.reducer;
export const { addContact } = contactsSlice.actions;
export const selectContacts = state => state.contacts.items;