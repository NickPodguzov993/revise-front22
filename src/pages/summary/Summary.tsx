import { useParams } from "react-router-dom";
import { Layout } from "@/shared/ui";

export function SummaryPage() {
  const params = useParams();
  const date = new Date(params.date!);
  const textDate = new Date(date).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <Layout>
      <span>
        Summary for {textDate[0].toLocaleUpperCase() + textDate.slice(1)}
      </span>
    </Layout>
  );
}
