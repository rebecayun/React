import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Name your task'),
  minutesAmount: zod
    .number()
    .min(5, 'Minimum 5 minutes')
    .max(60, 'Maximum 60 minutes')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>




export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const { handleSubmit, watch } = newCycleForm












  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)} action="">


            <FormProvider {...newCycleForm}>
              <NewCycleForm />
            </FormProvider>
            <Countdown />


        { activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button" >
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
          ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled} >
            <Play size={24} />
            Start
          </StartCountdownButton>
          )
        }
      </form>
    </HomeContainer>
  )
}
