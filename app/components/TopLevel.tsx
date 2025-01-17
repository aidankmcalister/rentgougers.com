import { RowData } from "~/types/RowData";
import Showcase from "./Showcase";

export default function TopLevel({ data }: { data: RowData[] }) {
  return (
    <div>
      <Showcase data={data} />
    </div>
  );
}
