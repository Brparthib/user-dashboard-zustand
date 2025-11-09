import { DesignationChart } from "@/components/analytics/DesignationChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserStore } from "@/store/userStore";
import { Users } from "lucide-react";

export default function Overview() {
  const { users, getTotalByGender } = useUserStore();
  return (
    <>
      <div className="px-6 w-full">
        {/* Top Grid: Users */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* total user */}
          <Card className="gap-2 py-4 h-[130px] bg-linear-to-r from-amber-500 to-orange-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6" /> Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{users?.length || 0}</p>
              <p className="text-sm opacity-80">Active: {users?.length || 0}</p>
            </CardContent>
          </Card>
          {/* total male user */}
          <Card className="gap-2 py-4 h-[130px] bg-linear-to-r from-emerald-500 to-teal-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6" /> Total Male
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {getTotalByGender().totalMaleUser || 0}
              </p>
              <p className="text-sm opacity-80">
                Active: {getTotalByGender().totalMaleUser || 0}
              </p>
            </CardContent>
          </Card>
          {/* total female user */}
          <Card className="gap-2 py-4 h-[130px] bg-linear-to-r from-sky-500 to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6" /> Total Female
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {getTotalByGender().totalFemaleUser || 0}
              </p>
              <p className="text-sm opacity-80">
                Active: {getTotalByGender().totalFemaleUser || 0}
              </p>
            </CardContent>
          </Card>
        </div>

        <DesignationChart />
      </div>
    </>
  );
}
