import useSWR, { useSWRConfig } from "swr";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Group, Stack, Title } from "@mantine/core";
import { TbArrowLeft } from "react-icons/tb";

import { getMonthDate } from "@/shared/utils";
import { usePersistedDate } from "@/shared/hooks";
import { ReviseListDTO, reviseObjectsUrl } from "@/entities/revise-object";
import {
  PaymentsSystem,
  createPaymentsSystem,
  deletePaymentsSystem,
  updatePaymentsSystem,
  mapPaymentsSystem,
  paymentSystemUrl,
  mapPaymentSystem,
} from "@/entities/payments-system";
import { SystemsList } from "@/widgets/system-list";
import { SystemForm, SystemsFormValues } from "@/widgets/system-form";
import { MonthPickerInput } from "@mantine/dates";

export function SystemPage() {
  const [date, setDate] = usePersistedDate();
  const [formTarget, setFormTarget] = useState<
    PaymentsSystem["id"] | "new" | null
  >(null);
  const { mutate } = useSWRConfig();
  const { data: systemsData, isLoading } = useSWR<ReviseListDTO>(
    reviseObjectsUrl(date)
  );
  const systems = mapPaymentsSystem(systemsData);
  const { data: systemData } = useSWR(
    formTarget && formTarget !== "new" ? paymentSystemUrl(formTarget) : null
  );
  const targetSystem = systems.find((s) => s.id === formTarget);
  const system =
    targetSystem && systemData && mapPaymentSystem(targetSystem, systemData);

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
    mutate(reviseObjectsUrl(date));
  }
  async function onFormSubmit(values: SystemsFormValues) {
    if (!formTarget) return;
    if (formTarget === "new") {
      const res = await createPaymentsSystem(date, values);
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

    mutate(reviseObjectsUrl(date));
    setFormTarget(null);
  }
  async function onDuplicate() {
    // TODO: show confirm

    if (systems.length) {
      console.log("Payments systems list is not nil"); // TODO
      return;
    }

    // const res = await duplicatePaymentsSystems();
    // if (!res.ok) {
    //   // TODO: handle
    //   return;
    // }

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
          <Button size="sm" style={{ flex: 2 }} onClick={onDuplicate} disabled>
            Скопировать из прошлого месяца
          </Button>
          <Button size="sm" style={{ flex: 1 }} onClick={onCreateSystem}>
            Создать
          </Button>
        </Group>
      </Stack>
      <SystemForm
        target={formTarget ? system || "new" : null}
        onCancel={onFormCancel}
        onSubmit={onFormSubmit}
      />
    </Group>
  );
}
