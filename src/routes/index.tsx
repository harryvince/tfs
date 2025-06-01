import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { trpc, auth } = Route.useRouteContext();

  const session = auth.useSession();

  const hello = useQuery(trpc.generic.hello.queryOptions());
  const helloWithName = useQuery(
    trpc.generic.helloWithName.queryOptions({
      name: "Harry",
    }),
  );

  const helloProtected = useQuery(trpc.generic.helloProtected.queryOptions());

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      signup: false,
    },
    onSubmit: ({ value }) => {
      if (!value.signup) {
        auth.signIn
          .email({
            email: value.email,
            password: value.password,
          })
          .then(({ error }) => {
            if (error) alert(JSON.stringify(error));
            else {
              form.reset();
              helloProtected.refetch();
            }
          });
      } else {
        auth.signUp
          .email({
            email: value.email,
            password: value.password,
            name: value.name,
          })
          .then(({ data, error }) => {
            if (error) alert(JSON.stringify(error));
            else {
              alert(JSON.stringify(data));
              form.setFieldValue("signup", false);
            }
          });
      }
    },
  });

  return (
    <div>
      <p>Initial API Call: {hello.data?.message}</p>
      <p>API Call with name: {helloWithName.data?.greeting}</p>

      <p>Session: {JSON.stringify(session)}</p>
      {helloProtected.data?.message ? (
        <p>Protected API Call: {helloProtected.data?.message}</p>
      ) : (
        <p>Protected API Call: Not logged in</p>
      )}

      <form onSubmit={form.handleSubmit}>
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
        <form.Field
          name="signup"
          children={(field) => (
            <>
              <span>Signup</span>
              <input
                name={field.name}
                value={field.state.value.toString()}
                onBlur={field.handleBlur}
                type="checkbox"
                onChange={(e) => field.handleChange(e.target.checked)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Signup"
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
    </div>
  );
}
