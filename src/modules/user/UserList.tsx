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
import { PaginationButtons } from "@/components/shared/PaginationButtons";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import Loader from "@/components/shared/Loader";

export default function UserList() {
  const {
    modalOpen,
    setModalOpen,
    formType,
    setFormType,
    alertOpen,
    setAlertOpen,
    filters,
    setFilters,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    getPaginatedUsers,
    getTotalPages,
    loading,
  } = useUserStore();

  const [searchInput, setSearchInput] = useState(searchQuery);

  // get unique gender and designation for filters
  const uniqueGenders = Array.from(
    new Set(useUserStore.getState().users.map((user) => user.gender))
  );
  const uniqueDesignations = Array.from(
    new Set(useUserStore.getState().users.map((user) => user.designation))
  );

  // get dob year from user
  const dobYears = Array.from(
    new Set(
      useUserStore
        .getState()
        .users.map((user) => new Date(user.dob).getFullYear().toString())
    )
  ).sort((a, b) => parseInt(a) - parseInt(b));

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, setSearchQuery]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters({ [key]: value });
  };

  const hanglePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayedUsers = getPaginatedUsers();
  const totalPages = getTotalPages();

  if(loading){
    return <Loader />
  }

  return (
    <>
      <div>
        <div className="flex justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              {/* search input */}
              <Input
                placeholder="Search by name, email or phone."
                className="md:w-[300px]"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {/* gender filter */}
              <Select
                onValueChange={(value) => handleFilterChange("gender", value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueGenders.map((gender) => (
                    <SelectItem value={gender}>{gender}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* designation filter */}
              <Select
                onValueChange={(value) =>
                  handleFilterChange("designation", value)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Designation" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueDesignations.map((designation) => (
                    <SelectItem value={designation}>{designation}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* dob year filter */}
              <Select
                onValueChange={(value) => handleFilterChange("dobYear", value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Birth Year" />
                </SelectTrigger>
                <SelectContent>
                  {dobYears.map((year) => (
                    <SelectItem value={year}>{year}</SelectItem>
                  ))}
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
            {displayedUsers.length > 0 ? (
              displayedUsers?.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {(currentPage - 1) * 10 + index + 1}
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.dob}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="select-none capitalize"
                    >
                      {user.gender}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.designation}</TableCell>
                  <TableCell className="flex justify-end">
                    <ActionButton id={user.id as number} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={hanglePageChange}
        />

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
