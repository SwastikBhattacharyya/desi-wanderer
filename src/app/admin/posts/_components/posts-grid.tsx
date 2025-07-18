"use client";

import {
  AllCommunityModule,
  ColDef,
  colorSchemeDarkWarm,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { PostType } from "../types";

ModuleRegistry.registerModules([AllCommunityModule]);
const theme = themeQuartz.withPart(colorSchemeDarkWarm).withParams({
  fontFamily: "Archivo",
  headerFontFamily: "Montserrat",
});

export function PostsGrid({ posts }: { posts: PostType[] }) {
  const columnDefs: ColDef<PostType>[] = [
    {
      field: "slug",
      flex: 1,
      minWidth: 100,
      filter: true,
      valueFormatter: (data) => data.value ?? "(Empty Slug)",
    },
    {
      field: "title",
      flex: 3,
      minWidth: 300,
      filter: true,
      valueFormatter: (data) => data.value ?? "(Untitled Post)",
    },
    {
      field: "authorName",
      flex: 2,
      minWidth: 150,
      filter: true,
    },
    {
      field: "published",
      flex: 1,
      minWidth: 100,
      editable: true,
      filter: true,
    },
    {
      field: "createdAt",
      flex: 1,
      minWidth: 100,
      filter: true,
    },
    {
      field: "updatedAt",
      flex: 1,
      minWidth: 100,
      filter: true,
    },
  ];

  return (
    <AgGridReact
      columnDefs={columnDefs}
      rowData={posts}
      theme={theme}
      rowSelection={{
        mode: "multiRow",
      }}
      suppressDragLeaveHidesColumns
    />
  );
}
