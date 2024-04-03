import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';

import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput } from "./styles";
import { useState } from "react";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Name your task'),
  minutesAmount: zod
    .number()
    .min(5, 'Minimum 5 minutes')
    .max(60, 'Maximum 60 minutes')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
}

export function Home() {
  const {cycles, setCycles} = useState([])

  const {activeCycleId, setActiveCycleId} = useState<string | null>(null)

  const {amountSecondsPassed, setAmountSecondsPassed} = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount
    }

    setCycles([...cycles, newCycle])
    setActiveCycleId(id)
    reset();
  }

  // const activeCycle = cycles.find((cycle) => cycle.id == activeCycle.id)

  // const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  // const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  // const minutesAmount = Math.floor(currentSeconds / 60)
  // const secondsAmount = currentSeconds / 60

  // const minutes = String(minutesAmount).padStart(2, '0')
  // const seconds = String(secondsAmount).padStart(2, '0')

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="tatsk">I'm going to work on</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="To do task"
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
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutes.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled} >
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
