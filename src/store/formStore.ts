import type { User } from "@/types/user";
import { create } from "zustand";

interface FormState {
  formData: Partial<User>;
  imagePreview: string;
  //   setFormField: <K extends keyof User>(field: K, value: User[K]) => void;
  setImagePreview: (previewUrl: string) => void;
  //   setFormData: (data: Partial<User>) => void;
//   resetForm: () => void;
}

const initialFormData: Partial<User> = {
  name: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  designation: "",
  bio: "",
  skills: [],
  image: "",
};

export const useFormStore = create<FormState>((set) => ({
  formData: initialFormData,
  imagePreview: "",

  setImagePreview: (previewUrl: string) => {
    set({ imagePreview: previewUrl });
  },

}));
