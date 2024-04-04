import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from 'zod';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Name your task'),
  minutesAmount: zod
    .number()
    .min(5, 'Minimum 5 minutes')
    .max(60, 'Maximum 60 minutes')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  return (
    <FormContainer>
      <label htmlFor="tatsk">I'm going to work on</label>

      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="To do task"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions" >
        <option value="Project 1" />
        <option value="Project 2" />
        <option value="Project 3" />
      </datalist>

      <label htmlFor="">for</label>

      <MinutesAmountInput
        type="number"
        step={5}
        min={5}
        max={60}
        id="minutesAmount"
        placeholder="00"
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutes.</span>
    </FormContainer>
  )
}
