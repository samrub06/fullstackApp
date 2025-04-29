import axios from 'axios';

export interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
  };
  phone: string;
  dob: {
    date: string;
    age: number;
  };
  isSaved?: boolean;
  id?: {
    value: string;
  };
}

export interface UserUpdate {
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
}

    
export interface UserRequest {
  picture: {
    thumbnail: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  gender: string;
  country: string;
  phone: string;
  email: string;

}

export interface UserResponse {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

const API_URL = process.env.REACT_APP_API_URL

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<UserResponse>('https://randomuser.me/api/?results=10');
    return response.data.results;
  } catch (error) {
    console.error('Error while fetching users:', error);
    throw error;
  }
};

export const saveUser = async (user: UserRequest): Promise<UserRequest> => {
  try {
    const response = await axios.post<UserRequest>(`${API_URL}/users`, user);
    return { ...response.data };
  } catch (error: any) {
    if (error.response?.data?.message === 'User already exists') {
      throw new Error('User already exists');
    }
    console.error('Error saving user:', error);
    throw error;
  }
};

export const getSavedUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${API_URL}/users`);
    return response.data.map(user => ({ ...user, isSaved: true }));
  } catch (error) {
    console.error('Error while fetching saved users:', error);
    throw error;
  }
}; 

export const updateUser = async (user: UserUpdate): Promise<UserRequest> => {
  try {
    const response = await axios.put<UserRequest>(`${API_URL}/users`, user);
    return { ...response.data };
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}; 