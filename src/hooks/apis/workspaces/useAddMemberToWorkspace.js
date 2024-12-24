import { useMutation } from '@tanstack/react-query';

import { addMemberToWorkspaceRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';

export const useAddMemberToWorkspace = (workspaceId) => {
  const { auth } = useAuth();
  const {
    mutateAsync: addMemberToWorkspaceMutation,
    error,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: async () =>
      addMemberToWorkspaceRequest({ workspaceId, token: auth?.token }),
    onSuccess: () => {
      console.log('Member added to workspace successfully');
    },
    onError: () => {
      console.log('Error in Member addeding to workspace', error);
    },
  });
  return {
    addMemberToWorkspaceMutation,
    error,
    isPending,
    isSuccess,
  };
};
