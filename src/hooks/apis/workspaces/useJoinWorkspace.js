import { useMutation } from '@tanstack/react-query';

import { joinWorkspaceRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';

export const useJoinWorkspace = (workspaceId) => {
  const { auth } = useAuth();
  const {
    mutateAsync: joinWorkspaceMutation,
    error,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: async (joinCode) =>
      joinWorkspaceRequest({ workspaceId, joinCode, token: auth?.token }),
    onSuccess: () => {
      console.log('Member Joined to workspace successfully');
    },
    onError: () => {
      console.log('Error in Member joining to workspace', error);
    },
  });
  return {
    joinWorkspaceMutation,
    error,
    isPending,
    isSuccess,
  };
};
