import { forwardRef } from 'react';
import { useUserStore } from "@/store/userStore";
import type { User } from "@/types/user";

interface UserDetailsPrintProps {
  id: number;
}

const UserDetailsPrint = forwardRef<HTMLDivElement, UserDetailsPrintProps>(
  ({ id }, ref) => {
    const { getUser } = useUserStore();
    const user: User = getUser(id) as User;

    if (!user) {
      return <div>User not found</div>;
    }

    return (
      <div ref={ref} className="p-8 bg-white print:p-0">
        {/* Print-specific styles */}
        <style>
          {`
            @media print {
              body {
                margin: 0;
                padding: 0;
                background: white !important;
                -webkit-print-color-adjust: exact;
              }
              .print-container {
                box-shadow: none !important;
                border: none !important;
              }
              .no-break {
                page-break-inside: avoid;
              }
            }
            
            @page {
              margin: 1cm;
              size: A4;
            }
          `}
        </style>

        <div className="max-w-4xl mx-auto print-container bg-white rounded-lg print:rounded-none">
          {/* Header */}
          <div className="border-b-2 border-gray-200 pb-6 mb-6 no-break">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  User Profile
                </h1>
                <p className="text-gray-600 text-sm">
                  Generated on {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <div className="w-20 h-20 rounded-full border-2 border-gray-300 overflow-hidden">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 no-break">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Personal Information
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="font-medium text-gray-600">Full Name:</span>
                  <span className="text-gray-800">{user.name}</span>
                </div>
                
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="font-medium text-gray-600">Email:</span>
                  <span className="text-gray-800 break-all">{user.email}</span>
                </div>
                
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="font-medium text-gray-600">Phone:</span>
                  <span className="text-gray-800">{user.phone}</span>
                </div>
                
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="font-medium text-gray-600">Date of Birth:</span>
                  <span className="text-gray-800">
                    {new Date(user.dob).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="font-medium text-gray-600">Gender:</span>
                  <span className="text-gray-800">{user.gender}</span>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Professional Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <span className="font-medium text-gray-600 block mb-1">
                    Designation:
                  </span>
                  <span className="text-gray-800 text-lg font-semibold">
                    {user.designation}
                  </span>
                </div>
                
                <div>
                  <span className="font-medium text-gray-600 block mb-2">
                    Skills:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium print:bg-gray-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mb-8 no-break">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              About
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg print:bg-gray-100">
              <p className="text-gray-700 leading-relaxed">{user.bio}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-gray-200 pt-4 text-center text-gray-500 text-sm no-break">
            <p>User ID: {user.id} | This document is system generated</p>
          </div>
        </div>
      </div>
    );
  }
);

UserDetailsPrint.displayName = 'UserDetailsPrint';

export default UserDetailsPrint;