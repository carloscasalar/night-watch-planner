import { useMutation } from '@tanstack/react-query'
import { useAppDispatch, useAppSelector } from './../../app/store/hooks'
import { type PlanService } from '../../domain/PlanService'
import { setPlanGenerationError, setPlanFromRemoteAction } from './reducer'
import { getPlanRequest } from './getPlanRequest'

export const useGeneratePlan = (planService: PlanService) => {
  const dispatch = useAppDispatch()
  const planRequest = useAppSelector(getPlanRequest)
  const mutation = useMutation({
    mutationFn: async () => {
      return await planService.generatePlan(planRequest)
    },
    onSettled (data, error: Error | null) {
      if (error != null) {
        dispatch(setPlanGenerationError(`unexpected error: ${error.message}`))
        console.error('unexpected error generating plan', error)
        return
      }
      if (data === undefined) {
        dispatch(setPlanGenerationError('unexpected empty response'))
        return
      }
      const [plan, planError] = data
      if (planError !== null) {
        dispatch(setPlanGenerationError(planError.message))
        return
      }
      dispatch(setPlanFromRemoteAction(plan))
    }
  })

  const generatePlan = () => {
    mutation.mutate()
  }

  const { isError: isErrored, isSuccess: isLoaded, isLoading } = mutation

  return {
    generatePlan,
    isErrored,
    isLoaded,
    isLoading
  }
}
