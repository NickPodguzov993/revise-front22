import useSWR, { useSWRConfig } from "swr";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Group, Stack, Title } from "@mantine/core";
import { TbArrowLeft } from "react-icons/tb";

import { getMonthDate } from "@/shared/utils";
import { usePersistedDate } from "@/shared/hooks";
import {
  PaymentsSystem,
  SystemFormValues,
  createPaymentsSystem,
  deletePaymentsSystem,
  duplicatePaymentsSystems,
  paymentsSystemUrl,
  updatePaymentsSystem,
} from "@/entities/payments-system";
import { SystemsList } from "@/widgets/system-list";
import { SystemForm } from "@/widgets/system-form";
import { MonthPickerInput } from "@mantine/dates";
import { reviseObjectsUrl } from "@/entities/revise-object";

export function SystemPage() {
  const [date, setDate] = usePersistedDate();
  const [formTarget, setFormTarget] = useState<
    PaymentsSystem["id"] | "new" | null
  >(null);
  const { mutate } = useSWRConfig();
  const { data: systems, isLoading } = useSWR<PaymentsSystem[]>(
    paymentsSystemUrl(date)
  );

  function onDateChange(date: Date) {
    setDate(date);
    setFormTarget(null);
  }
  function onSystemSelect(id: PaymentsSystem["id"]) {
    setFormTarget(id);
  }
  function onCreateSystem() {
    setFormTarget("new");
  }
  function onFormCancel() {
    setFormTarget(null);
  }
  async function onDeleteSystem(id: number) {
    await deletePaymentsSystem(id);

    if (formTarget === id) {
      setFormTarget(null);
    }
    mutate(paymentsSystemUrl(date));
    mutate(reviseObjectsUrl(date));
  }
  async function onFormSubmit(values: SystemFormValues) {
    if (!formTarget) return;
    if (formTarget === "new") {
      const res = await createPaymentsSystem({
        ...values,
        date: getMonthDate(date),
      });
      if (!res.ok) {
        // TODO: handle
        return;
      }
    } else {
      const res = await updatePaymentsSystem(formTarget, values);
      if (!res.ok) {
        // TODO: handle
        return;
      }
    }

    mutate(paymentsSystemUrl(date));
    mutate(reviseObjectsUrl(date));
    setFormTarget(null);
  }
  async function onDuplicate() {
    // TODO: show confirm

    const res = await duplicatePaymentsSystems({ date: getMonthDate(date) });
    if (!res.ok) {
      // TODO: handle
      return;
    }

    mutate(paymentsSystemUrl(date));
    mutate(reviseObjectsUrl(date));
    setFormTarget(null);
  }

  return (
    <Group h="100%" grow>
      <Stack h="100%" pt="xs">
        <Group justify="space-between" pr="md">
          <Title order={2} fz="xl">
            Платежные системы
          </Title>
          <MonthPickerInput size="xs" value={date} onChange={onDateChange} />
        </Group>
        <SystemsList
          systems={systems || []}
          isLoading={isLoading}
          selected={formTarget !== "new" ? formTarget : null}
          onSelect={onSystemSelect}
          onDelete={onDeleteSystem}
        />
        <Group pr="md" mt="auto">
          <Button
            size="sm"
            component={Link}
            to={`/?date=${getMonthDate(date)}`}
            styles={{ root: { flex: 1 }, label: { gap: "0.5rem" } }}
          >
            <TbArrowLeft />
            Назад
          </Button>
          <Button size="sm" style={{ flex: 2 }} onClick={onDuplicate}>
            Скопировать из прошлого месяца
          </Button>
          <Button size="sm" style={{ flex: 1 }} onClick={onCreateSystem}>
            Создать
          </Button>
        </Group>
      </Stack>
      <SystemForm
        target={
          formTarget === "new"
            ? "new"
            : systems?.find((s) => s.id === formTarget)
        }
        onCancel={onFormCancel}
        onSubmit={onFormSubmit}
      />
    </Group>
  );
}
