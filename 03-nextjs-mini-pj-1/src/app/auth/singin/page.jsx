"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  InputGroup,
} from "@heroui/react";
import {Eye, EyeSlash} from "@gravity-ui/icons";
import { Are_You_Serious } from "next/font/google";
import { toast } from "react-toastify";
import { useState } from "react";

export default function SignInPage() {
  const [isVisible, setIsVisible]  = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    console.log("userData = ", userData);

    const { data, error } = await authClient.signIn.email({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      callbackURL: "/",
    });

    if (error) {
      toast.error("Please SignUp First.");
    }

    if (data) {
      toast.success("SingIn Successfully.");
    }
  };

  return (
    <div className="flex flex-col items-center py-20">
      <h1 className="font-bold text-2xl mb-6">Sign In</h1>
      <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
        {/* Email */}
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }

            return null;
          }}
        >
          <Label>Email</Label>
          <Input name="email" placeholder="Enter Your Email" />
          <FieldError />
        </TextField>

        {/* passWord */}
        <TextField className="w-full " name="password">
          <Label>Password</Label>
          <InputGroup>
            <InputGroup.Input
              className="w-full"
              type={isVisible ? "text" : "password"}
              name="password"
              placeholder="Enter Your Password"
            />
            <InputGroup.Suffix className="pr-0">
              <Button
                isIconOnly
                aria-label={isVisible ? "Hide password" : "Show password"}
                size="sm"
                variant="ghost"
                onPress={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>
        </TextField>

        <div className="flex gap-2">
          <Button type="submit">
            <Check />
            Submit
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
}
