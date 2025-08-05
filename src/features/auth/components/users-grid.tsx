"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AllCommunityModule,
  ColDef,
  colorSchemeLightWarm,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import { toast } from "sonner";
import { UserType } from "../schemas/user";
import { setRole } from "../server/actions/set-role";
import { BanUser } from "./ban-user";
import { UnbanUser } from "./unban-user";

ModuleRegistry.registerModules([AllCommunityModule]);
const theme = themeQuartz.withPart(colorSchemeLightWarm).withParams({
  headerBackgroundColor: "var(--secondary)",
  backgroundColor: "var(--card)",
  fontFamily: "var(--font-sans)",
  headerFontWeight: "bold",
  headerRowBorder: {
    width: 3,
  },
});

export function UsersGrid({
  userId,
  posts,
}: {
  userId: string;
  posts: UserType[];
}) {
  const columnDefs: ColDef<
    UserType & {
      actions?: unknown;
    }
  >[] = [
    {
      field: "name",
      flex: 6,
      minWidth: 300,
      filter: true,
    },
    {
      field: "email",
      flex: 5,
      minWidth: 200,
      filter: true,
    },
    {
      field: "emailVerified",
      flex: 2,
      minWidth: 140,
      filter: true,
      cellRenderer: (data: CustomCellRendererProps) =>
        data.value ? "Yes" : "No",
      resizable: false,
    },
    {
      field: "banned",
      flex: 2,
      minWidth: 140,
      filter: true,
      cellRenderer: (data: CustomCellRendererProps) =>
        data.value ? "Yes" : "No",
      resizable: false,
    },
    {
      field: "role",
      width: 130,
      filter: true,
      cellRenderer: (row: CustomCellRendererProps) => (
        <div className="flex h-full items-center-safe">
          <Select
            disabled={userId === row.data.id}
            defaultValue={row.data.role}
            onValueChange={(value) => {
              const role = value as "adminRole" | "userRole";
              if (value === row.data.role) return;
              const action = setRole(row.data.id, role);
              toast.promise(
                async () => {
                  const result = await action;
                  if (result.success) {
                    return result.message;
                  } else throw new Error(result.message);
                },
                {
                  loading: "Updating Role...",
                  success: (message) => message,
                  error: (error: Error) => error.message,
                },
              );
            }}
          >
            <SelectTrigger className="w-full focus-visible:ring-transparent">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="adminRole">Admin</SelectItem>
              <SelectItem value="userRole">User</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      field: "actions",
      flex: 1,
      minWidth: 100,
      headerName: "Actions",
      cellRenderer: (row: CustomCellRendererProps) => (
        <div className="flex h-full w-full items-center-safe">
          <BanUser
            id={row.data.id}
            disabled={row.data.id === userId || row.data.banned}
          />
          <UnbanUser
            id={row.data.id}
            disabled={row.data.id === userId || !row.data.banned}
          />
        </div>
      ),
      resizable: false,
      sortable: false,
    },
  ];

  return (
    <div className="h-full w-full py-4">
      <AgGridReact
        columnDefs={columnDefs}
        rowData={posts}
        theme={theme}
        suppressMovableColumns
        suppressDragLeaveHidesColumns
        suppressCellFocus
      />
    </div>
  );
}
