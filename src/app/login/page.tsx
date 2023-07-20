"use client";

import * as Yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Form from "@/app/components/Form";
import FormField from "@/app/components/FormField";
import Button from "@/app/components/Button";
import { AppContext } from "@/app/context/AppContext";
import useTest from "@/app/hooks/useTest";
import { Formik } from "formik";

const initialValues = {
  email: "",
  password: "",
};

const loginItem = [
  {
    id: 1,
    email: "basic@gmail.com",
    password: "basic",
  },
  {
    id: 2,
    email: "admin@gmail.com",
    password: "admin",
  },
  {
    id: 3,
    email: "superAdmin@gmail.com",
    password: "superAdmin",
  },
];

const SignUpSchema = Yup.object().shape({
  // email: Yup.string().email("Invalid email").required("Required"),
  // password: Yup.string()
  //   .required("No password provided.")
  //   .min(8, "Password is too short - should be 8 chars minimum.")
  //   .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const Page = () => {
  const router = useRouter();
  // @ts-ignore
  const { login, jwt } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  // const { signIn, error, setError } = useUser();/
  const handleFormSubmit = ({ email, password }) => {
    for (let item of loginItem) {
      if (item.email === email && item.password === password) {
        login(email);
        router.push("/");
        return;
      }
      console.log("failed");
    }

    // login.map((item) => {
    // });

    // setLoading(true);
    // login("JWT");
    // router.push("/");
  };

  useEffect(() => {
    if (jwt) {
      router.push("/");
    }
  }, []);

  // const handleSubmit = ({ email, password }) => {};

  return (
    <div className="w-full bg-gray-800 rounded-md max-w-lg m-auto py-10 mt-10 px-10 border">
      <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FormField name="email" type="email" label="E-mail" />
            <FormField name="password" type="password" label="Password" />
            <Button>Sign In</Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Page;
