import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ActionButton from "@/components/shared/ActionButton";
import Modal from "@/components/shared/Modal";
import { UserForm } from "./UserForm";
import { useUserStore } from "@/store/userStore";
import Alert from "@/components/shared/AlertDialog";
import { Pagination } from "@/components/ui/pagination";
import { PaginationButtons } from "@/components/shared/PaginationButtons";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserList() {
  const {
    modalOpen,
    setModalOpen,
    formType,
    setFormType,
    alertOpen,
    setAlertOpen,
    users, deleteUser
  } = useUserStore();

  return (
    <>
      <div>
        <div className="flex justify-between mb-4">
          <div>
            {/* search input */}
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search by name or phone."
                className="md:w-[300px]"
              />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={() => {
              setFormType("create");
              setModalOpen(true);
            }}
            variant="outline"
            className="hover:bg-primary hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
            size="sm"
          >
            Create User
          </Button>
        </div>
        {/* User list table */}
        <Table>
          <TableHeader className="bg-primary">
            <TableRow>
              <TableHead className="w-[100px] dark:text-black">Index</TableHead>
              <TableHead className="dark:text-black">Name</TableHead>
              <TableHead className="dark:text-black">Email</TableHead>
              <TableHead className="dark:text-black">Phone</TableHead>
              <TableHead className="dark:text-black">Date of birth</TableHead>
              <TableHead className="dark:text-black">Gender</TableHead>
              <TableHead className="dark:text-black">Designation</TableHead>
              <TableHead className="text-right dark:text-black">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.dob}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="select-none">
                    {user.gender}
                  </Badge>
                </TableCell>
                <TableCell>{user.designation}</TableCell>
                <TableCell className="flex justify-end">
                  <ActionButton id={user.id as number} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <PaginationButtons /> 

        {/* Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={formType === "create" ? "Create User" : "Update User"}
        >
          {formType === "create" ? <UserForm /> : <UserForm />}
        </Modal>

        {/* Alert  */}
        <div>
          <Alert isOpen={alertOpen} onClose={() => setAlertOpen(false)} />
        </div>
      </div>
    </>
  );
}
