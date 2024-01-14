import { useState } from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

export default function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Form method="post" className={classes.form}>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}

        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Signup" : "Login"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}
