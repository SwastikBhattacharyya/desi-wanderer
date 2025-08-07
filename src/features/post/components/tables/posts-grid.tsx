"use client";

import { useGrid } from "@/features/grid/contexts/grid";
import {
  AllCommunityModule,
  ColDef,
  colorSchemeLightWarm,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import moment from "moment";
import { PostType } from "../../schemas/post";
import { EditPost } from "../buttons/edit-post";
import { DeletePost } from "../dialogs/delete-post";

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
      filterParams: {
        includeTime: false,
      },
      resizable: false,
      cellRenderer: (data: CustomCellRendererProps) => {
        return moment(data.value).format("MM/DD/YYYY");
      },
    },
    {
      field: "updatedAt",
      flex: 1,
      minWidth: 160,
      filter: true,
      filterParams: {
        includeTime: false,
      },
      resizable: false,
      cellRenderer: (data: CustomCellRendererProps) => {
        return moment(data.value).format("MM/DD/YYYY");
      },
    },
    {
      field: "actions",
      flex: 1,
      minWidth: 100,
      headerName: "Actions",
      cellRenderer: (row: CustomCellRendererProps) => (
        <div className="flex h-full w-full items-center-safe">
          <EditPost id={row.data.id} />
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
