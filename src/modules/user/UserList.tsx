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
import Select, { type SingleValue } from "react-select";
import { useEffect, useState, useRef } from "react";
import Loader from "@/components/shared/Loader";
import { FunnelPlus, FunnelX } from "lucide-react";
import {
  defaultPerPage,
  genderOptions,
  perPageOptions,
} from "@/constants/selectOptions";

export default function UserList() {
  const {
    modalOpen,
    setModalOpen,
    setSelectedUserId,
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
    setItemsPerPage,
    getPaginatedUsers,
    getTotalPages,
    loading,
  } = useUserStore();

  const [onFilters, setOnFilters] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState(searchQuery);

  // Refs for select components to clear their values
  const genderSelectRef = useRef<any>(null);
  const designationSelectRef = useRef<any>(null);
  const dobYearSelectRef = useRef<any>(null);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClearFilters = () => {
    // Clear all filters in store
    setFilters({
      gender: "",
      designation: "",
      dobYear: "",
    });

    // Clear search input
    setSearchInput("");

    // Clear select components using refs
    if (genderSelectRef.current) {
      genderSelectRef.current.setValue(null);
    }
    if (designationSelectRef.current) {
      designationSelectRef.current.setValue(null);
    }
    if (dobYearSelectRef.current) {
      dobYearSelectRef.current.setValue(null);
    }
  };

  const displayedUsers = getPaginatedUsers();
  const totalPages = getTotalPages();

  if (loading) {
    return <Loader />;
  }

  const designationOptions = uniqueDesignations.map((designation) => ({
    value: designation,
    label: designation,
  }));

  const dobYearOptions = dobYears.map((year) => ({
    value: year,
    label: year,
  }));

  return (
    <>
      <div className="px-6">
        <div className="flex justify-end gap-2 mb-4">
          {/* filters toggle button */}
          <Button
            onClick={() => setOnFilters(!onFilters)}
            variant="outline"
            size="sm"
            className="cursor-pointer"
          >
            {onFilters ? <FunnelPlus /> : <FunnelX />}
          </Button>
          {/* user per page */}
          <Select
            unstyled
            className="react-select-shadcn w-20"
            classNamePrefix="react-select"
            options={perPageOptions}
            defaultValue={defaultPerPage}
            onChange={(
              value: SingleValue<{
                value: number;
                label: number;
              }>
            ) => setItemsPerPage(Number(value?.value))}
          />
          {/* create user button */}
          <Button
            onClick={() => {
              setSelectedUserId(0);
              setFormType("create");
              setModalOpen(true);
            }}
            variant="outline"
            className="bg-linear-to-b border-none from-sky-50 to-blue-200 hover:from-sky-100 hover:to-blue-300 text-zinc-600 hover:text-zinc-800 font-normal active:scale-95 cursor-pointer transition-all duration-300"
            size="sm"
          >
            Create User
          </Button>
        </div>
        {/* filters */}
        <div
          className={`${onFilters ? "flex" : "hidden"} items-center gap-2 mb-4`}
        >
          {/* search input */}
          <Input
            placeholder="Search by name, email or phone."
            className="md:w-[250px] h-8 focus-visible:ring-0"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {/* gender filter */}
          <Select
            unstyled
            ref={genderSelectRef}
            className="react-select-shadcn w-[150px]"
            classNamePrefix="react-select"
            placeholder="Gender"
            options={genderOptions}
            onChange={(
              gender: SingleValue<{
                value: string;
                label: string;
              }>
            ) => {
              handleFilterChange("gender", gender?.value || "");
            }}
          />
          {/* designation filter */}
          <Select
            unstyled
            ref={designationSelectRef}
            className="react-select-shadcn w-36"
            classNamePrefix="react-select"
            placeholder="Designation"
            options={designationOptions}
            onChange={(
              designation: SingleValue<{
                value: string;
                label: string;
              }>
            ) => {
              handleFilterChange("designation", designation?.value || "");
            }}
          />

          {/* dob year filter */}
          <Select
            unstyled
            ref={dobYearSelectRef}
            className="react-select-shadcn w-30"
            classNamePrefix="react-select"
            options={dobYearOptions}
            placeholder="Birth Year"
            onChange={(
              birthYear: SingleValue<{
                value: string;
                label: string;
              }>
            ) => {
              handleFilterChange("dobYear", birthYear?.value || "");
            }}
          />

          {/* clear filters button */}
          <Button
            variant="outline"
            className="bg-linear-to-b border-none from-rose-50 to-red-200 hover:from-rose-100 hover:to-red-300 text-red-700 hover:text-red-700 font-normal active:scale-95 cursor-pointer transition-all duration-300"
            onClick={handleClearFilters}
            size="sm"
          >
            Clear Filters
          </Button>
        </div>
        {/* User list table */}
        <Table>
          <TableHeader className="bg-primary dark:bg-primary/20">
            <TableRow>
              <TableHead className="w-[100px] ">Index</TableHead>
              <TableHead className="">Name</TableHead>
              <TableHead className="">Email</TableHead>
              <TableHead className="">Phone</TableHead>
              <TableHead className="">Date of birth</TableHead>
              <TableHead className="">Gender</TableHead>
              <TableHead className="">Designation</TableHead>
              <TableHead className="text-center ">Action</TableHead>
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
                      className="select-none capitalize w-16 dark:bg-primary/30 dark:text-primary"
                    >
                      {user.gender}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.designation}</TableCell>
                  <TableCell className="flex justify-center">
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
          onPageChange={handlePageChange}
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
