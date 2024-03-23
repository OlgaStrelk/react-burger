import "./AuthForm.css";
import { joiResolver } from "@hookform/resolvers/joi";

import { FormProvider, useForm } from "react-hook-form";
function AuthForm({ children, onSubmit, validationScema }) {
  const methods = useForm({
    resolver: joiResolver(validationScema),
    mode: "onChange",
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}

export default AuthForm;
