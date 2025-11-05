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
import { genderOptions, perPageOptions } from "@/constants/selectOptions";

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
          <div className="react-select-container">
            <Select
              classNamePrefix="react-select"
              className="w-[100px]"
              options={perPageOptions}
              onChange={(
                value: SingleValue<{
                  value: number;
                  label: number;
                }>
              ) => setItemsPerPage(Number(value?.value))}
            />
          </div>
          {/* create user button */}
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
        {/* filters */}
        <div
          className={`${onFilters ? "flex" : "hidden"} items-center gap-2 mb-4`}
        >
          {/* search input */}
          <Input
            placeholder="Search by name, email or phone."
            className="md:w-[250px]"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {/* gender filter */}
          <Select
            ref={genderSelectRef}
            className="w-[150px]"
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
            ref={designationSelectRef}
            className="w-[180px]"
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
            ref={dobYearSelectRef}
            className="w-[130px]"
            options={dobYearOptions}
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
            className="active:scale-95 cursor-pointer"
            onClick={handleClearFilters}
          >
            Clear Filters
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
              <TableHead className="text-center dark:text-black">
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
                      className="select-none capitalize dark:bg-primary dark:text-black"
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
