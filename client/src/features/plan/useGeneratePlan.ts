import { useMutation } from '@tanstack/react-query'
import { type PlanRequest, type PlanService } from '../../domain/PlanService'
import { type SetPlanGenerationErrorAction, type SetPlanFromRemoteAction } from './reducer'

export const useGeneratePlan = (planService: PlanService, setPlan: SetPlanFromRemoteAction, setError: SetPlanGenerationErrorAction) => {
  const mutation = useMutation({
    mutationFn: async (planRequest: PlanRequest) => {
      return await planService.generatePlan(planRequest)
    },
    onSettled (data, error: Error | null) {
      if (error != null) {
        setError({ message: `unexpected error: ${error.message}` })
        console.error('unexpected error generating plan', error)
        return
      }
      if (data === undefined) {
        setError({ message: 'unexpected empty response' })
        return
      }
      const [plan, planError] = data
      if (planError == null) {
        setError(planError)
        return
      }
      setPlan(plan)
    }
  })

  const generatePlan = (planRequest: PlanRequest) => {
    mutation.mutate(planRequest)
  }

  const { isError: isErrored, isSuccess: isLoaded, isLoading } = mutation

  return {
    generatePlan,
    isErrored,
    isLoaded,
    isLoading
  }
}
