import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      const users = res.data;

      // Sort users by latestMessage timestamp (desc)
      users.sort((a, b) => {
        const aTime = new Date(a.latestMessage?.createdAt || 0);
        const bTime = new Date(b.latestMessage?.createdAt || 0);
        return bTime - aTime;
      });

      set({ users });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
    }
    set({ isUsersLoading: false });
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
    }
    set({ isMessagesLoading: false });
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newChat", (newChat) => {
      // this is used to only update the message of the selected user
      if (newChat.senderId !== selectedUser._id) return;

      set({
        messages: [...get().messages, newChat],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newChat");
  },

  subscribeToSidebar: () => {
    const socket = useAuthStore.getState().socket;

    if (!socket) {
      console.warn("Socket not available yet");
      return;
    }

    // Clear any previous listener first to avoid duplicates
    socket.off("sidebarUpdate");

    socket.on("sidebarUpdate", () => {
      get().getUsers(); // Re-fetch users when sidebar needs update
    });
  },

  unsubscribeFromSidebar: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("sidebarUpdate");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
