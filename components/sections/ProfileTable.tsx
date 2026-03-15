type ProfileTableColumn<T extends Record<string, string>> = {
  key: keyof T;
  label: string;
};

type ProfileTableProps<T extends Record<string, string>> = {
  columns: Array<ProfileTableColumn<T>>;
  rows: T[];
};

export function ProfileTable<T extends Record<string, string>>({ columns, rows }: ProfileTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full min-w-[420px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            {columns.map((column) => (
              <th key={String(column.key)} className="p-3 font-semibold text-primary">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-slate-200 last:border-b-0">
              {columns.map((column) => (
                <td key={String(column.key)} className="p-3 text-muted-foreground">
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
