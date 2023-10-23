import { Card, Center, Text } from "@mantine/core";

import { PaymentsSystem } from "@/entities/payments-system";
import { SystemForm, SystemsFormValues } from "./SystemForm";
import { ScoreboardForm, ScoreboardFormValues } from "./ScoreboardForm";
import { Scoreboard } from "@/entities/scoreboard";

type SystemFormProps = {
  target?: PaymentsSystem | "new" | Scoreboard | null;
  onCancel?: () => void;
  onSubmit?: (values: SystemsFormValues | ScoreboardFormValues) => void;
};

export function ObjectForm({
  target,
  onCancel = () => {},
  onSubmit = () => {},
}: SystemFormProps) {
  return (
    <Card h="100%" p={0} withBorder>
      {!target ? (
        <Center h="100%">
          <Text maw={250} ta="center">
            Выберите объект настройки или создайте новый
          </Text>
        </Center>
      ) : (target as PaymentsSystem).name || target === "new" ? (
        <SystemForm
          target={target as PaymentsSystem | "new"}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      ) : (
        <ScoreboardForm
          target={target as Scoreboard}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      )}
    </Card>
  );
}
