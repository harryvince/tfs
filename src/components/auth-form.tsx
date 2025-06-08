import { auth } from "@/auth/client";
import { useForm } from "@tanstack/react-form";
import { Route } from "@/routes/__root";
import { toast } from "sonner";

type Props = { signup: boolean };

export default function AuthForm(props: Props) {
  const { queryClient, trpc } = Route.useRouteContext();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      if (!props.signup) {
        await auth.signIn.email(
          { email: value.email, password: value.password },
          {
            onError: (error) => {
              toast.error(JSON.stringify(error));
            },
            onSuccess: async () => {
              form.reset();
              await queryClient.invalidateQueries({
                queryKey: [trpc.generic.helloProtected.queryKey],
              });
              toast.success("Login successful");
            },
          },
        );
      } else {
        await auth.signUp.email(
          { email: value.email, password: value.password, name: value.name },
          {
            onError: (error) => {
              toast.error(JSON.stringify(error));
            },
            onSuccess: () => {
              toast.success("Signup successful");
            },
          },
        );
      }
    },
  });

  return (
    <form onSubmit={form.handleSubmit} className="grid grid-cols-1 gap-4 pt-4">
      {props.signup && (
        <form.Field
          name="name"
          children={(field) => (
            <>
              <input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="text"
                onChange={(e) => field.handleChange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
              />
              {!field.state.meta.isValid && (
                <em>{field.state.meta.errors.join(",")}</em>
              )}
            </>
          )}
        />
      )}
      <form.Field
        name="email"
        children={(field) => (
          <>
            <input
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              type="email"
              onChange={(e) => field.handleChange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
            {!field.state.meta.isValid && (
              <em>{field.state.meta.errors.join(",")}</em>
            )}
          </>
        )}
      />
      <form.Field
        name="password"
        children={(field) => (
          <>
            <input
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              type="password"
              onChange={(e) => field.handleChange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
            {!field.state.meta.isValid && (
              <em>{field.state.meta.errors.join(",")}</em>
            )}
          </>
        )}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
}
