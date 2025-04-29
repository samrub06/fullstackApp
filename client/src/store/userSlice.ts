import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../services/userService';

interface UserState {
  users: User[];
  savedUsers: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  savedUsers: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setSavedUsers: (state, action: PayloadAction<User[]>) => {
      state.savedUsers = action.payload;
    },
    addSavedUser: (state, action: PayloadAction<User>) => {
      const user = { ...action.payload, isSaved: true };
      state.savedUsers.push(user);
      // Mettre à jour l'utilisateur dans la liste des utilisateurs si présent
      const index = state.users.findIndex(u => u.email === user.email);
      if (index !== -1) {
        state.users[index] = user;
      }
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const updatedUser = action.payload;
      debugger;
      // Mettre à jour dans la liste des utilisateurs
      const userIndex = state.users.findIndex(u => u.email === updatedUser.email);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...updatedUser };
      }
      // Mettre à jour dans la liste des utilisateurs sauvegardés
      const savedUserIndex = state.savedUsers.findIndex(u => u.email === updatedUser.email);
      if (savedUserIndex !== -1) {
        state.savedUsers[savedUserIndex] = { ...state.savedUsers[savedUserIndex], ...updatedUser };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setUsers, setSavedUsers, addSavedUser, updateUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer; 