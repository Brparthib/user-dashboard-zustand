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
import UserDetailsPrint from "@/modules/user/UserDetailsPrint";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function ActionButton({ id }: { id: number }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: `User_Profile_${id}`,
    pageStyle: `
      @media print {
        @page {
          margin: 1cm;
          size: A4;
        }
        body {
          -webkit-print-color-adjust: exact;
        }
      }
    `,
    onAfterPrint: () => console.log("Printed successfully!"),
  });
  const { setModalOpen, setFormType, setSelectedUserId, setAlertOpen } =
    useUserStore();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" className="cursor-pointer" size="sm">
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Take Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={reactToPrintFn} className="cursor-pointer">
            Print
          </DropdownMenuItem>
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
      <div style={{ display: "none" }}>
        <div ref={contentRef}>
          <UserDetailsPrint id={id} />
        </div>
      </div>
    </>
  );
}
