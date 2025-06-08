import AuthForm from "@/components/auth-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import { z } from "zod/v4";

const searchSchema = z.object({
  tab: z.enum(["login", "signup"]).default("login"),
});

export const Route = createFileRoute("/")({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { auth, trpc, queryClient } = Route.useRouteContext();
  const { tab } = Route.useSearch();

  const hello = useQuery(trpc.generic.hello.queryOptions());
  const helloWithName = useQuery(
    trpc.generic.helloWithName.queryOptions({ name: "Harry" }),
  );
  const helloProtected = useQuery(trpc.generic.helloProtected.queryOptions());

  const { data: authData } = auth.useSession();

  useEffect(() => {
    if (authData?.session) helloProtected.refetch();
  }, [authData]);

  const alerts = useMemo(
    () => [
      {
        title: "Welcome!",
        description:
          "This is a new TFS app. You can find detailed documentation for getting started soon. For now, it's all code lead.",
      },
      {
        title: "Public API Call Example",
        description: `Initial API Call: ${hello.data?.message}`,
      },
      {
        title: "API Call with input & forced delay",
        description: `API Call with name: ${helloWithName.isLoading ? "Loading..." : helloWithName.data?.greeting}`,
      },
      {
        title: "Protected API Call Example",
        description: `Protected API Call: ${
          helloProtected.isSuccess
            ? `${helloProtected.data?.message ? helloProtected.data?.message : "Not logged in"}`
            : helloProtected.isLoading
              ? "Loading..."
              : "Not logged in"
        }`,
      },
    ],
    [
      helloProtected.data,
      helloProtected.isSuccess,
      helloProtected.isLoading,
      hello.data,
      helloWithName.data,
    ],
  );

  return (
    <div className="p-4 grid grid-cols-1 gap-4">
      {alerts.map((alert) => (
        <Alert key={alert.title} variant="default">
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </Alert>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>Auth</CardTitle>
        </CardHeader>
        <CardContent>
          {authData?.session ? (
            <Button
              type="button"
              onClick={() =>
                auth.signOut(
                  {},
                  {
                    onSuccess: async () => {
                      await queryClient.invalidateQueries({
                        queryKey: [trpc.generic.helloProtected.queryKey],
                      });
                      helloProtected.refetch();
                      toast.success("Signout successful");
                    },
                  },
                )
              }
            >
              Sign Out
            </Button>
          ) : (
            <Tabs defaultValue={tab} className="w-[400px]">
              <TabsList>
                <TabsTrigger
                  value="login"
                  onClick={() =>
                    navigate({
                      search: (prev) => ({ ...prev, tab: "login" }),
                    })
                  }
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  onClick={() =>
                    navigate({ search: (prev) => ({ ...prev, tab: "signup" }) })
                  }
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <AuthForm signup={false} />
              </TabsContent>
              <TabsContent value="signup">
                <AuthForm signup={true} />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
