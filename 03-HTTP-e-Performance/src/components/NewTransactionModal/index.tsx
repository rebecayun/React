import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const {
    register,
    handleSubmit,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema)
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(data);
    
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>New transaction</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder='Description'
            {...register('description')}
          />
          <input
            type="number"
            placeholder='Price'
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder='Category'
            {...register('category')}
          />

          <TransactionType>
            <TransactionTypeButton variant='income' value='income'>
              <ArrowCircleUp />
              Income
            </TransactionTypeButton>

            <TransactionTypeButton variant='outcome' value='outcome'>
              <ArrowCircleDown />
              Expense
            </TransactionTypeButton>
          </TransactionType>

          <button type='submit'>Register</button>
        </form>

      </Content>
    </Dialog.Portal>
  )
}
