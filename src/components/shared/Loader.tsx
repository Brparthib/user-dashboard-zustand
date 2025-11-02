import { useUserStore } from "@/store/userStore";

export default function Loader() {
  const { loading } = useUserStore();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="text-gray-700">Loading...</span>
        </div>
      </div>
    </div>
  );
}
