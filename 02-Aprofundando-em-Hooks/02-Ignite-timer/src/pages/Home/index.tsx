import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { differenceInSeconds, interval } from "date-fns";

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { createContext, useEffect, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";



interface Cycle {
  id: string
  task: string
  minutesAmount:number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null
  markCurrentCycleFinished: () => void
}

export const CycleContext = createContext({} as CycleContextType)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)



  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId)

  function markCurrentCycleFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id == activeCycleId) {
          return { ...cycle, finishedDate: new Date()}
        } else {
          return cycle
        }
      })
    )
  }



  // function handleCreateNewCycle(data: NewCycleFormData) {
  //   const id = String(new Date().getTime())

  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   }

  //   setCycles((state) => [...state, newCycle])
  //   setActiveCycleId(id)
  //   setAmountSecondsPassed(0)

  //   reset();
  // }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id == activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      })
    )

    setActiveCycleId(null)
  }



  // const task = watch('task')
  // const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form /*onSubmit={handleSubmit(handleCreateNewCycle)}*/ action="">

        <CycleContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleFinished }}>
          {/* <NewCycleForm /> */}
          <Countdown />
        </CycleContext.Provider>

        { activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button" >
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
          ) : (
          <StartCountdownButton type="submit" /*disabled={isSubmitDisabled}*/ >
            <Play size={24} />
            Start
          </StartCountdownButton>
          )
        }
      </form>
    </HomeContainer>
  )
}
