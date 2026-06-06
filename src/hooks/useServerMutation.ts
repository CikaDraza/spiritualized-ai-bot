import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

export type MutationRequestOptions = {
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
  invalidateQueries?: Array<readonly string[]>;
};

export function useServerMutation<TData, TVariables = unknown>(
  endpoint: string,
  options: MutationRequestOptions = {},
) {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables: TVariables) => {
      return fetcher<TData>(endpoint, {
        method: options.method ?? "POST",
        body: JSON.stringify(variables),
      });
    },
    onSuccess: () => {
      options.invalidateQueries?.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });
    },
  });
}
