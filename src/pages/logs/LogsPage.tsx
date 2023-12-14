import { notifications } from "@mantine/notifications";
import { TbCheck } from "react-icons/tb";

import { LogsFormValues, reviseLogs } from "@/entities/logs";
import { LogsForm } from "@/widgets/logs-form";
import { getError } from "@/shared/utils/error";

export function LogsPage() {
  async function onSubmit(data: LogsFormValues) {
    const nId = notifications.show({
      loading: true,
      title: "Сверка логов",
      message: "Данные в процессе обработки",
      autoClose: false,
      withCloseButton: false,
    });

    const res = await reviseLogs(data);
    if (!res.ok) {
      let r: { error?: string } | undefined;
      try {
        r = await res.json();
      } catch (err) {
        console.error(err);
      } finally {
        notifications.update({
          id: nId,
          color: "red",
          message: getError(r),
          loading: false,
          withCloseButton: true,
          autoClose: 10_000,
        });
      }
    } else {
      notifications.update({
        id: nId,
        color: "teal",
        message: "Начинается скачивание файла...",
        icon: <TbCheck size={18} />,
        loading: false,
        withCloseButton: true,
        autoClose: 5_000,
      });

      const url = window.URL.createObjectURL(await res.blob());
      const link = document.createElement("a");
      link.href = url;
      const date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toJSON()
        .split(".")[0]
        .replace("T", "-")
        .replace(/:/g, "-");
      link.setAttribute("download", `logs-revise-${date}.xlsx`);

      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    }
  }
  return <LogsForm onSubmit={onSubmit} />;
}
