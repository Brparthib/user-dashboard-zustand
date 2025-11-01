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
import { useRef } from "react";
import type { User } from "@/types/user";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.email(),
  bio: z.string().min(2, {
    message: "Bio must be at least 2 characters.",
  }),
  image: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export function UserForm() {
  const {
    addUser,
    updateUser,
    getUser,
    setModalOpen,
    seletedUserId,
    setSelectedUserId,
  } = useUserStore();
  const { imagePreview, setImagePreview } = useFormStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: getUser(seletedUserId as number)?.name,
      email: getUser(seletedUserId as number)?.email,
      bio: getUser(seletedUserId as number)?.bio,
      image: "",
    },
  });

  // image upload
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      form.setError("image", { message: "Please upload an image file" });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      form.setError("image", { message: "File size should be less than 5MB" });
      return;
    }

    // Create Preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewUrl = e.target?.result as string;
      setImagePreview(previewUrl);
      form.setValue("image", previewUrl);
    };
    reader.readAsDataURL(file);
  };

  // form submission
  const onSubmit = async (data: FormData) => {
    if (seletedUserId) {
      updateUser(seletedUserId, data);
      setModalOpen(false);
      setSelectedUserId(0);
    } else {
      addUser(data as User);
      setModalOpen(false);
    }
    // addUser(data as User);
  };

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
                    className="text-xs"
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
                    className="text-xs"
                    placeholder="Your email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* dob, gender and designation field */}
        <div className="space-y-4 md:space-y-0 md:flex justify-between items-start gap-4">
          {/* date picker */}
          <div className="grow items-start">
            <DateInput />
          </div>
          {/* gender */}
          <div className="grow items-start">
            <Label className="mb-4">Gender</Label>
            <RadioGroup className="flex items-center">
              {["male", "female"].map((gender, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <RadioGroupItem value={gender} id={gender} />
                  <Label htmlFor="option-one" className="capitalize">
                    {gender}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          {/* select */}
          <div className="grow">
            <Label className="mb-2">Designation</Label>
            <Select options={designations} />
          </div>
        </div>
        {/* skills field */}
        <div className="">
          <Label className="mb-2">Skills</Label>
          <Select
            defaultValue={[skillOptions[1], skillOptions[2]]}
            isMulti
            name="skills"
            options={skillOptions}
            classNamePrefix="select"
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
                    className="text-xs"
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
          <Button type="submit" className="">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
