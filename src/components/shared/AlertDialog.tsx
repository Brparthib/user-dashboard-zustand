import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useUserStore } from "@/store/userStore";

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Alert({ isOpen, onClose }: AlertDialogProps) {
  const { selectedUserId, deleteUser } = useUserStore();
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-linear-to-b border-none from-rose-50 to-red-200 
            hover:from-rose-100 hover:to-red-300 text-red-700 hover:text-red-700 
            font-normal active:scale-95 cursor-pointer transition-all duration-300"
            onClick={() => {
              deleteUser(selectedUserId as number);
            }}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
