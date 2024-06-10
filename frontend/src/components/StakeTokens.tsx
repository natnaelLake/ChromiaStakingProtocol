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
  // background-color: #f0f2f5;
`;

const Card = styled(MuiCard)`
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
  border-radius: 1rem;
  height: auto;
`;

const GreenTextField = styled(TextField)`
  & .MuiInputBase-input {
    background-color: #e0f7fa;
  }
`;

const validationSchema = Yup.object({
  amount: Yup.number()
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .required("Amount is required"),
});

const StakeTokens: React.FC = () => {
  const session = useSessionContext();
  const [message, setMessage] = React.useState<string>("");

  const handleStake = async (values: { amount: string }) => {
    if (!session) return;
    try {
      await session.call({
        name: "stake_tokens",
        args: [parseInt(values.amount)],
      });
      setMessage("Tokens staked successfully");
    } catch (error) {
      setMessage("Error staking tokens");
      console.error(error);
    }
  };

  return (
    <CardContainer>
      <Card>
        <Typography variant="h4" component="h1" gutterBottom>
          Stake Your Tokens
        </Typography>
        <Typography variant="body1" gutterBottom>
          Stake your tokens to earn rewards. Enter the amount of tokens you want
          to stake below.
        </Typography>
        <Formik
          initialValues={{ amount: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleStake(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field
                as={GreenTextField}
                name="amount"
                type="number"
                label="Amount"
                fullWidth
                margin="normal"
                variant="outlined"
                error={touched.amount && Boolean(errors.amount)}
                helperText={touched.amount && errors.amount}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "1rem" }}
                disabled={isSubmitting}
              >
                Stake
              </Button>
            </Form>
          )}
        </Formik>
        {message && (
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ marginTop: "1rem" }}
          >
            {message}
          </Typography>
        )}
      </Card>
    </CardContainer>
  );
};

export default StakeTokens;
