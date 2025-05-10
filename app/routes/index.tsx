import api from "@/api/general";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const apiCall = useQuery({
    queryKey: api.greet.key,
    queryFn: () => api.greet.handler({ data: { message: "From the api" } }),
  });

  return <div>Hello, {apiCall.data?.message}</div>;
}
