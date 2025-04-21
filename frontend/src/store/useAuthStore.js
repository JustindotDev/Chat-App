import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSignup: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data, navigate) => {
    set({ isSignup: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data); //The data here is to be sent to the server
      set({ authUser: res.data });
      toast.success("Account Created Succesfully!");
      navigate("/");
    } catch (error) {
      console.error("Error caught:", error);

      // If the error has the structure with message, show it
      toast.error(error.response.data.message);
    } finally {
      set({ isSignup: false });
    }
  },

  logIn: async (data, navigate) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data); //The data here is to be sent to the server
      set({ authUser: res.data });
      toast.success("Logged In Successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error caught:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logOut: async (navigate) => {
    set({ isLoggingOut: true });
    try {
      const res = await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.error("Error caught:", error);
      toast.error(error.response.data.message);
    } finally {
      setTimeout(() => {
        set({ isLoggingOut: false });
        set({ authUser: null });
        navigate("/login");
        toast.success("Logged Out Successfully!");
      }, 1500);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile Updated Successfully!");
    } catch (error) {
      console.error("Error caught:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
