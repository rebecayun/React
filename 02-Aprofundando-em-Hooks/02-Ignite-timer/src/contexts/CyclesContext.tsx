import { ReactNode, createContext, useState, useReducer, useEffect } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleFinishedAction } from "../reducers/cycles/action";
import { differenceInSeconds } from "date-fns";


interface CreateCycleData {
  task: string
  minutesAmount: number
}




interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined;
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CycleContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}



export function CyclesContextProvider({ children }: CyclesContextProviderProps) {

  const [cyclesState, dispatch] = useReducer(cyclesReducer,
    {
      cycles: [],
      activeCycleId: null
    }, (initialState) => {
      const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    }
  )

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate)
      )
    }
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])


  function markCurrentCycleFinished() {
    dispatch(markCurrentCycleFinishedAction())

    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id == activeCycleId) {
    //       return { ...cycle, finishedDate: new Date()}
    //     } else {
    //       return cycle
    //     }
    //   })
    // )
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    // 1
    // setCycles((state) => [...state, newCycle])
    // setActiveCycleId(id)

    // 2
    // dispatch({
    //   type: ActionTypes.ADD_NEW_CYCLE,
    //   payload: {
    //     newCycle
    //   }
    // })

    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0)

  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id == activeCycleId) {
    //       return { ...cycle, interruptedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   })
    // )

    // setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        createNewCycle,
        setSecondsPassed,
        markCurrentCycleFinished,
        interruptCurrentCycle
      }}>
        {children}
    </CyclesContext.Provider>
  )
}
