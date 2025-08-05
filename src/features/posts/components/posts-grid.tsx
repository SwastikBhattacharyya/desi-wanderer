"use client";

import { Button } from "@/components/ui/button";
import { useGrid } from "@/features/grid/contexts/grid";
import {
  AllCommunityModule,
  ColDef,
  colorSchemeLightWarm,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import { Pencil } from "lucide-react";
import { PostType } from "../schemas/post";
import { DeletePost } from "./delete-post";

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

export function PostsGrid({ posts }: { posts: PostType[] }) {
  const { setSelectedRows } = useGrid();

  const columnDefs: ColDef<
    PostType & {
      actions?: unknown;
    }
  >[] = [
    {
      field: "title",
      flex: 3,
      minWidth: 300,
      filter: true,
    },
    {
      field: "author",
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
            className="cursor-pointer hover:bg-transparent hover:text-primary focus-visible:bg-transparent focus-visible:text-primary"
            variant="ghost"
            size="icon"
          >
            <Pencil />
          </Button>
          <DeletePost id={row.data.id} />
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
        rowSelection={{
          mode: "multiRow",
        }}
        suppressMovableColumns
        suppressDragLeaveHidesColumns
        suppressCellFocus
        onSelectionChanged={(event) => {
          const ids =
            event.selectedNodes?.map((post) => post.data?.id ?? "") ?? [];
          setSelectedRows(ids);
        }}
      />
    </div>
  );
}
