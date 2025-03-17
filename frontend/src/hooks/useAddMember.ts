import { useMutation } from '@tanstack/react-query'
import { Member } from '../types/member.types'
import { normalFetch } from '../utils/fetch'

const useAddMember = () => {
    const mutation = useMutation({
        mutationFn: async (member: Member) => {
            const response = await normalFetch(`/member`, "POST", member)
            return response.json()
        },
        onSuccess: () => {
            window.location.reload()
        }
    })

    return mutation
}

export default useAddMember