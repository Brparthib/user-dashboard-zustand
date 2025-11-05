import type { User } from "@/types/user";

export interface DesignationData {
  designation: string;
  count: number;
  male: number;
  female: number;
}

export const getDesignationStats = (users: User[]): DesignationData[] => {
  const designationMap = new Map<string, { count: number; male: number; female: number }>();

  users.forEach((user) => {
    const current = designationMap.get(user.designation) || { count: 0, male: 0, female: 0 };
    
    designationMap.set(user.designation, {
      count: current.count + 1,
      male: current.male + (user.gender === "Male" ? 1 : 0),
      female: current.female + (user.gender === "Female" ? 1 : 0),
    });
  });

  return Array.from(designationMap.entries()).map(([designation, stats]) => ({
    designation,
    ...stats,
  }));
};