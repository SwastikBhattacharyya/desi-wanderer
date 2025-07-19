"use client";

import { Button } from "@/components/ui/button";
import { IconPencil } from "@tabler/icons-react";
import {
  AllCommunityModule,
  ColDef,
  colorSchemeDarkWarm,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import { PostType } from "../types";
import { DeletePost } from "./delete-post";
import { usePost } from "./posts-provider";

ModuleRegistry.registerModules([AllCommunityModule]);
const theme = themeQuartz.withPart(colorSchemeDarkWarm).withParams({
  fontFamily: "Archivo",
  backgroundColor: "var(--color-surface)",
  headerFontFamily: "Montserrat",
  headerFontWeight: "bold",
  headerRowBorder: {
    width: 3,
  },
});

export function PostsGrid({ posts }: { posts: PostType[] }) {
  const { gridRef } = usePost();

  const columnDefs: ColDef<
    PostType & {
      actions: unknown;
    }
  >[] = [
    {
      field: "slug",
      flex: 1,
      minWidth: 100,
      filter: true,
      cellRenderer: (data: CustomCellRendererProps) =>
        data.value ?? <i>(Empty Slug)</i>,
    },
    {
      field: "title",
      flex: 3,
      minWidth: 300,
      filter: true,
      cellRenderer: (data: CustomCellRendererProps) =>
        data.value ?? <i>(Untitled Post)</i>,
    },
    {
      field: "authorName",
      headerName: "Author",
      flex: 2,
      minWidth: 150,
      filter: true,
    },
    {
      field: "published",
      flex: 1,
      minWidth: 140,
      filter: true,
      cellRenderer: (data: CustomCellRendererProps) =>
        data.value ? "Yes" : "No",
      resizable: false,
    },
    {
      field: "createdAt",
      flex: 1,
      minWidth: 160,
      filter: true,
      resizable: false,
      sort: "desc",
    },
    {
      field: "updatedAt",
      flex: 1,
      minWidth: 160,
      filter: true,
      resizable: false,
    },
    {
      field: "actions",
      flex: 1,
      minWidth: 100,
      headerName: "Actions",
      cellRenderer: (row: CustomCellRendererProps) => (
        <div className="flex h-full w-full items-center-safe">
          <Button
            className="bg-transparent text-on-surface hover:bg-transparent focus-visible:bg-transparent"
            icon
          >
            <IconPencil />
          </Button>
          <DeletePost id={row.data.id} />
        </div>
      ),
      resizable: false,
      sortable: false,
    },
  ];

  return (
    <AgGridReact
      ref={gridRef}
      columnDefs={columnDefs}
      rowData={posts}
      theme={theme}
      rowSelection={{
        mode: "multiRow",
      }}
      suppressMovableColumns
      suppressDragLeaveHidesColumns
      suppressCellFocus
    />
  );
}
