import { initialUsers } from "@/constants/data";
import type { User } from "@/types/user";
import { create } from "zustand";

interface UserState {
  users: User[];
  modalOpen: boolean;
  formType: "create" | "update";
  dob: string;
  seletedUserId: number | null;
  alertOpen: boolean;
  // new states for filtering pagination and search
  filters: {
    gender: string;
    designation: string;
    dobYear: string;
  };
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
  sidebarOpen: boolean;
  loading: boolean;
  // setters
  setModalOpen: (value: boolean) => void;
  setFormType: (value: "create" | "update") => void;
  setDob: (value: string) => void;
  setSelectedUserId: (id: number) => void;
  setAlertOpen: (value: boolean) => void;
  setFilters: (filters: Partial<UserState["filters"]>) => void;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (page: number) => void;
  setSidebarOpen: (value: boolean) => void;
  setLoading: (loading: boolean) => void;
  // actions
  addUser: (user: User) => void;
  updateUser: (id: number, user: Partial<User>) => void;
  deleteUser: (id: number) => void;
  getUser: (id: number) => User | undefined;
  // computed values
  getFilteredUsers: () => User[];
  getPaginatedUsers: () => User[];
  getTotalPages: () => number;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: initialUsers,
  modalOpen: false,
  formType: "create",
  dob: "",
  seletedUserId: null,
  alertOpen: false,
  filters: {
    gender: "",
    designation: "",
    dobYear: "",
  },
  searchQuery: "",
  currentPage: 1,
  itemsPerPage: 5,
  sidebarOpen: true,
  loading: false,

  setModalOpen: (value: boolean) => {
    set({ modalOpen: value });
  },

  setFormType: (value: "create" | "update") => {
    set({ formType: value });
  },

  setDob: (value: string) => {
    set({ dob: value });
  },

  setSelectedUserId: (value: number | null) => {
    set({ seletedUserId: value });
  },

  setAlertOpen: (value: boolean) => {
    set({ alertOpen: value });
  },

  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
      currentPage: 1,
    }));
  },

  setSearchQuery: (query) => {
    set({
      searchQuery: query,
      currentPage: 1,
    });
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  setItemsPerPage: (items) => {
    set({ itemsPerPage: items });
  },

  setSidebarOpen: (value) => {
    set({ sidebarOpen: value });
  },

  setLoading: (loading) => {
    set({ loading });
  },

  addUser: (user: User) => {
    const newUser = {
      ...user,
      id: get().users.length + 1,
    };

    set((state) => ({
      users: [...state.users, newUser],
      loading: false,
    }));
  },

  updateUser: (id: number, updatedUser: Partial<User>) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      ),
    }));
  },

  deleteUser: (id: number) => {
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    }));
  },

  getUser: (id: number) => {
    return get().users.find((user) => user.id === id);
  },

  // filter users
  getFilteredUsers: () => {
    const { users, filters, searchQuery } = get();

    return users.filter((user) => {
      // search filter name, email and phone
      const matchesSearch =
        searchQuery === "" ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery);

      //gender filter
      const matchesGender =
        filters.gender === "" || user.gender === filters.gender;

      // designation filter
      const matchesDesignation =
        filters.designation === "" ||
        user.designation
          .toLowerCase()
          .includes(filters.designation.toLowerCase());

      const matchesDobYear =
        filters.dobYear === "" ||
        new Date(user.dob).getFullYear().toString() === filters.dobYear;

      return (
        matchesSearch && matchesGender && matchesDesignation && matchesDobYear
      );
    });
  },

  // get user per page
  getPaginatedUsers: () => {
    const filteredUsers = get().getFilteredUsers();
    const { currentPage, itemsPerPage } = get();

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredUsers.slice(startIndex, endIndex);
  },

  // total pages
  getTotalPages: () => {
    const filteredUsers = get().getFilteredUsers();
    const { itemsPerPage } = get();

    return Math.ceil(filteredUsers.length / itemsPerPage);
  },
}));
