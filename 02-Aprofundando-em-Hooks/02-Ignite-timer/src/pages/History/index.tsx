import { useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";

export function History () {
  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>All tasks</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutes</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true
                    })}
                  </td>
                  <td>
                    { cycle.finishedDate && (
                      <Status statusColor='green'>Done</Status>
                    )}

                    { cycle.interruptedDate && (
                      <Status statusColor='red'>Interrupted</Status>
                    )}

                    { !cycle.finishedDate && !cycle.interruptedDate && (
                      <Status statusColor='yellow'>On going</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
