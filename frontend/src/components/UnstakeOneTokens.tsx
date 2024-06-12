'use client'
import React from "react";
import styled from "styled-components";
import { Button, TextField, Typography, Card as MuiCard } from "@mui/material";
import { useSessionContext } from "./ContextProvider";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

const Card = styled(MuiCard)`
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
  border-radius: 1rem;
`;

const StyledButton = styled(Button)`
  margin-top: 1rem;
  &:first-of-type {
    margin-right: 1rem;
  }
`;

const CustomTextField = styled(TextField)`
  & .MuiInputBase-root {
    background-color: ${(props) =>
      props.value ? "#e8f5e9" : "#e8f0fe"}; /* Green background if filled */
  }
`;

const validationSchema = Yup.object({
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive")
    .integer("Amount must be an integer"),
});

const UnstakeOneTokens: React.FC = () => {
  const session = useSessionContext();
  const [message, setMessage] = React.useState<string>("");

  const handleUnstake = async (values: { amount: string }) => {
    if (!session) return;
    try {
      await session.call({
        name: "initiate_unstake",
        args: [parseInt(values.amount)],
      });
      setMessage("Unstake request initiated successfully");
    } catch (error) {
      setMessage("Error initiating unstake request");
      console.error(error);
    }
  };

  const handleCompleteUnstake = async () => {
    if (!session) return;
    try {
      await session.call({
        name: "complete_unstake",
      });
      setMessage("Stake withdrawn successfully");
    } catch (error) {
      setMessage("Error withdrawing stake");
      console.error(error);
    }
  };

  return (
    <CardContainer>
      <Card>
        <Typography variant="h5" component="h2" gutterBottom>
          Unstake Tokens
        </Typography>
        <Formik
          initialValues={{ amount: "" }}
          validationSchema={validationSchema}
          onSubmit={handleUnstake}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <Field
                as={CustomTextField}
                type="number"
                name="amount"
                value={values.amount}
                onChange={handleChange}
                placeholder="Amount"
                fullWidth
                margin="normal"
                variant="outlined"
                InputProps={{
                  style: { backgroundColor: values.amount ? "#e8f5e9" : "#e8f0fe" },
                }}
                error={touched.amount && Boolean(errors.amount)}
                helperText={touched.amount && errors.amount}
              />
              <div>
                <StyledButton
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Unstake
                </StyledButton>
                <StyledButton
                  onClick={handleCompleteUnstake}
                  variant="contained"
                  color="success"
                >
                  Complete Unstake
                </StyledButton>
              </div>
              {message && (
                <Typography
                  variant="body1"
                  color="textSecondary"
                  style={{ marginTop: "1rem" }}
                >
                  {message}
                </Typography>
              )}
            </Form>
          )}
        </Formik>
      </Card>
    </CardContainer>
  );
};

export default UnstakeOneTokens;
