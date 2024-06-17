Chromia Staking Protocol
Author Information

Name: Bewuketu Lake
Email: bewuketulake1212@gmail.com

Project Description

This project implements a staking protocol using Rell and the FT4 library as part of the Chromia online course. The protocol allows users to stake a custom FT4 token, earn a 10% annual yield, and manage their staking and unstaking requests through a simple frontend interface.
How It Works

The staking protocol operates as follows:

    Staking Tokens: Users can stake their FT4 tokens. The staked tokens start generating a 10% annual yield.
    Yield Calculation: The yield is calculated based on the amount of time the tokens have been staked and is accumulated in real-time.
    Claiming Yield: Users can claim their accumulated yield at any time.
    Unstaking Tokens: Users can initiate an unstake request. After a two-week notice period, they can complete the unstaking process and withdraw their tokens.
    Query Functions: Users can query their current yield and the status of their unstake requests.

Setup Instructions
Prerequisites

    Ensure you have Chromia Development Environment set up.
    Install necessary dependencies.

Dependencies

    Rell
    FT4 library
    Next.js
    postchain-client

Local Setup

    Clone the repository:

git clone https://github.com/natnaelLake/ChromiaStakingProtocol.git

Navigate to the project directory:

    cd backend
    chr install
    chr node start

Deploy the smart contract to your Chromia node:

Set up the frontend:

    cd frontend
    npm install
    npm run dev

Usage Instructions
Staking Tokens

    Navigate to the staking interface on the frontend.
    Connect your wallet.
    Enter the amount of FT4 tokens you wish to stake and confirm the transaction.

Claiming Yield

    Navigate to the yield section on the frontend.
    Click on "Claim Yield" to withdraw your accumulated yield.

Initiating Unstake

    Navigate to the unstake section on the frontend.
    Enter the amount of FT4 tokens you wish to unstake and initiate the request.

Completing Unstake

    After two weeks from initiating the unstake request, navigate to the unstake section.
    Complete the unstake process to withdraw your tokens.

Query Functions

    Current Yield: The current yield is displayed on the staking interface.
    Unstake Status: The status of unstake requests is displayed on the unstake section.
