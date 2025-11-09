import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DateInput from "@/components/shared/DateInput";
import Select, { type MultiValue, type SingleValue } from "react-select";
import { TrashIcon } from "lucide-react";
import { designations, skillOptions } from "@/constants/selectOptions";
import { useUserStore } from "@/store/userStore";
import { useFormStore } from "@/store/formStore";
import { useRef, useState } from "react";
import type { User } from "@/types/user";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.email(),
  phone: z.string(),
  bio: z.string().min(2, {
    message: "Bio must be at least 2 characters.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export function UserForm() {
  const {
    addUser,
    updateUser,
    getUser,
    setModalOpen,
    selectedUserId,
    setSelectedUserId,
    dob,
  } = useUserStore();
  const { imagePreview, setImagePreview } = useFormStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [gender, setGender] = useState<string>("male");
  const [designation, setDesignation] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: getUser(selectedUserId as number)?.name,
      email: getUser(selectedUserId as number)?.email,
      phone: getUser(selectedUserId as number)?.phone,
      bio: getUser(selectedUserId as number)?.bio,
    },
  });

  // image upload
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      console.log("Please upload an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      console.log("File size should be less than 5MB");
      return;
    }

    // Create Preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewUrl = e.target?.result as string;
      setImagePreview(previewUrl);
    };
    reader.readAsDataURL(file);
  };

  // form submission
  const onSubmit = async (data: FormData) => {
    const toastId = selectedUserId
      ? toast.loading("Updating User...")
      : toast.loading("Creating User...");
    const userData: User = {
      ...data,
      phone: "01234567891",
      dob,
      gender,
      designation,
      skills,
      image: "",
    };

    if (selectedUserId) {
      updateUser(selectedUserId, userData);
      setModalOpen(false);
      setSelectedUserId(0);
      toast.success("User Updated successfully.", { id: toastId });
    } else {
      addUser(userData as User);
      setModalOpen(false);
      toast.success("User Created Successfully.", { id: toastId });
    }
  };

  const defaultDesignation = {
    value: getUser(selectedUserId as number)?.designation as string,
    label: getUser(selectedUserId as number)?.designation as string,
  };

  const defaultGender = getUser(selectedUserId as number)?.gender;

  const defaultSkills = getUser(selectedUserId as number)?.skills?.map(
    (skill: string) => ({
      value: skill,
      label: skill,
    })
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* name and email field */}
        <div className="flex justify-between items-top gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel className="text-sm">Full Name</FormLabel>
                <FormControl>
                  <Input
                    className="text-xs h-8 focus-visible:ring-0"
                    placeholder="Your full name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel className="text-sm">Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-xs h-8 focus-visible:ring-0"
                    placeholder="Your email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* phone and designation field */}
        <div className="md:flex justify-between items-center gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel className="text-sm">Phone</FormLabel>
                <FormControl>
                  <Input
                    className="text-xs h-8 focus-visible:ring-0"
                    placeholder="Your email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* select */}
          <div className="w-1/2">
            <Label className="mb-3">Designation</Label>
            <Select
              unstyled
              className="react-select-shadcn"
              classNamePrefix="react-select"
              options={designations}
              defaultValue={defaultDesignation}
              placeholder="Select designation"
              onChange={(
                value: SingleValue<{ value: string; label: string }>
              ) => setDesignation(value?.value as string)}
            />
          </div>
        </div>
        {/* dob and gender field */}
        <div className="space-y-4 md:space-y-0 md:flex justify-between items-start gap-4">
          {/* date picker */}
          <div className="grow items-start">
            <DateInput />
          </div>
          {/* gender */}
          <div className="grow items-start">
            <Label className="mb-4">Gender</Label>
            <RadioGroup
              value={gender}
              onValueChange={setGender}
              className="flex items-center"
            >
              {["male", "female"].map((gender, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <RadioGroupItem
                    defaultChecked={
                      gender === defaultGender || gender === "Male"
                    }
                    defaultValue={defaultGender}
                    value={gender}
                    id={gender}
                  />
                  <Label htmlFor="option-one" className="capitalize">
                    {gender}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
        {/* skills field */}
        <div className="">
          <Label className="mb-2">Skills</Label>
          <Select
            unstyled
            className="react-select-shadcn"
            classNamePrefix="react-select"
            defaultValue={defaultSkills}
            isMulti
            name="skills"
            options={skillOptions}
            onChange={(
              values: MultiValue<{ value: string; label: string }>
            ) => {
              const selectedSkills = values.map((v) => v.value);
              setSkills(selectedSkills);
            }}
          />
        </div>
        {/* bio field */}
        <div className="flex justify-between items-center gap-4">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel className="text-sm">Bio</FormLabel>
                <FormControl>
                  <Textarea
                    className="text-xs focus-visible:ring-0"
                    placeholder="Your full name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* image field */}
        <div className="flex justify-between items-center gap-4">
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="picture">Upload Your Photo</Label>
            <Input
              onChange={handleImage}
              accept="image/*"
              id="picture"
              type="file"
              className="cursor-pointer"
              ref={fileInputRef}
            />
            {imagePreview && (
              <div className="flex items-start mt-5 gap-2">
                <div className="w-[150px] h-[150px]">
                  {imagePreview && <img src={imagePreview} alt="Preview" />}
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setImagePreview("");
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  size="sm"
                  className="active:scale-95 rounded text-rose-600 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                >
                  <TrashIcon />
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end items-center gap-2">
          <Button type="submit" className="cursor-pointer active:scale-95">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
