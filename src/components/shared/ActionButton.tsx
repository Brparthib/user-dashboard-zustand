import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/userStore";

export default function ActionButton({ id }: { id: number }) {
  const { setModalOpen, setFormType, setSelectedUserId, setAlertOpen } =
    useUserStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" className="cursor-pointer" size="sm">
          Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Take Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Print</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setSelectedUserId(id);
            setFormType("update");
            setModalOpen(true);
          }}
          className="cursor-pointer"
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setSelectedUserId(id);
            setAlertOpen(true);
          }}
          className="cursor-pointer"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
