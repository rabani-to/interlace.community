# Interlace Community Platform

InterLace platform is built for decentralized organizations to connect with individual problem solvers. Our goal is to build a contributor marketplace that fosters a connection between DAOs and contributors that embodies transparency and accountability for mission-driven action and fair payment.

## Solution

![solution](https://user-images.githubusercontent.com/119949978/206903286-237952ab-d618-411b-a4ac-a4ff17ad64c9.png)

Website - https://www.interlace.community/

Development URL - https://interlace-community.vercel.app/

Codebase -https://github.com/rabani-to/interlace.community

This repository serves to demonstrate how the current workings of the Interlace repo. This repository is in continual development and tracking issues here.

There are a number of subdirectories in the project that represent the moving pieces of the Interlace platform:

**_ high level here _**

# Current Features

On the Interlace website, users can do the following:

- Contributors can create profiles to showcase their mission, values, skills, and other personal attributes.
- Contributors can easily search and filter DAOs by need or mission. Even find potential roles in their own DAOs.
- Contributors can connect wallet or utilize magic link
- Decentralized organizations can fill out a form that lists how potential contributors can help.
- TBD - Decentralized organizations can easily search and filter contributors by task or skillset. Even find potential contributors in their own communities.
- TBD - Finally, contributors and DAOs can connect via chat.

# Current Data Flow

![dataflow](https://user-images.githubusercontent.com/119949978/206903333-7674e048-9899-4a4b-aa85-a34e24ba5c46.png)

# Data Schema

```ts
type Experience = {
  role: string
  expertise: string[]
  description: string
  portfolio: string
}

type Preferences = {
  commitment: string
  paymentOptions: string
  hourlyRate: string
  workingTime: string
}

type Details = {
  address: string
  telegram?: string
  twitter?: string
  refCode?: string
  profileImage?: File
}

// Main profile object required for registration
type Profile = Details & Preferences & Experience

type AboutExtras = {
  mission: string
  contribution: string
  whatILookFor: string
}

// Optional definitions user can add after profile is created
type ProfileExtras = {
  headline?: string
  name?: string
  about?: AboutExtras
}
```

# Product Wiki

## The problem that the customers have:

1. **Connection**
2. **Onboarding**
3. **Scoping**

<table>
  <thead>
    <tr>
      <th>Problem</th>
      <th>DAOs</th>
      <th>Contributors</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Discovery and Connection
      </td>
      <td>
        DAOs have large communities but struggle to enable community members to become contributors. DAOs can find talent through job boards or freelancers, but these individuals may not line up with their mission.
      </td>
      <td>
        No easy way to put yourself out there as a contributor to find DAOs. Most potential contributors put an enormous amount of time in Discord and Telegram to find the right DAO before contributing.
      </td>
    </tr>
    <tr>
      <td>
        Onboarding
      </td>
      <td>
        It takes hours to get a contributor up to speed with the right information and access rights. Even harder connecting the contributor to the right people in DAO. It takes an immense amount of organization to onboard a contributor.
      </td>
      <td>
        Discords lacks process for members to gain context and information. Making it difficult to get the right information and resources at the right time. Onboarding is typically the major hurdle to adding valuable contributions.
      </td>
    </tr>
    <tr>
      <td>
        Contribution
      </td>
      <td>
        DAOs struggle to scope out work for contributors. Creating issues due to lack of transparency around roles and responsibilities.
      </td>
      <td>
        Contributors struggle with DAOs paying for their contributions.
      </td>
    </tr>
  </tbody>
</table>

## Phase 1 - DAO and Skills Profile

### **Overview:**

Our **solution** to Web3 Discovery:

- Contributors can create profiles to showcase their mission, values, skills, and other personal attributes.
- Contributors can easily search and filter DAOs by need or mission. Even find potential roles in their own DAOs.
- Decentralized organizations can easily search and filter contributors by task or skillset. Even find potential contributors in their own communities.
- Decentralized organizations can create a profile that lists how potential contributors can help.
- Finally, contributors and DAOs can connect via chat.

### **KPIs**

- **# of Wallets Connected**

### V1.0 - **Web3 Skills Profile**

After setting up their wallet, contributors can build a web3 skills profile that includes:

- One sentence of what they can contribute
- Roles they are looking for
- Portfolio Link
- Skill Sets
- List of DAOs they are apart of
- Industry Interest
- Preferred Payment Type
- Mission
- Values
- Timezone
- Commitment Level

**Purpose:**

Start gathering contributors and building a pipeline of contributors

### V1.1 - **DAO Profile**

After connecting their wallet, DAOs can create a profile that lists how potential contributors can help. Additionally, DAOs are able to list the following attributes about their organization:

- Overview
- Mission
- Vision
- Values
- Discord
- Telegram
- Twitter
- Website

### V1.2 - **Work Marketplace (Browse DAOs Projects and Contributors) 💰**

- Contributors can easily search and filter DAOs by need or mission. Even find potential roles in their own DAOs.
- Decentralized organizations can easily search and filter contributors by task or skillset.

### V1.3 - **Connect Via Chat**

Contributors and DAOs can contact one another via chat.

## Phase 2 - Onboarding and Talent Dashboards

### Overview

Our **solution** to Web3 Onboarding

- After finding a contributor that a decentralized organization is eager to work with, they can streamline the onboarding process with Interlace.
  - DAOs are able to invite contributors to onboard onto their DAO
  - Provide access links to role specific tools such as Discord, Google Docs, Figma, Github, Vercel, etc.
  - Additionally, onboarding information such as mission, vision, values are shared to contributor to help ensure fit into the culture of the organization
  - Key contacts and work streams are shared with the contributor to enable them in their role
  - Onboarding check list provided for contributor to complete such as sending wallet to HR subDAO, requesting additional access, or completing legal forms
- Now the DAO has a database of contributors that are actively working and can label them in work streams.

### **KPIs**

- **# of Wallets Connected**
- **Time to Meaning First Contribution**

### V2.0 - **POAPs for Contributors and Community (Possible Partnership)**

POAPs are to be used by DAOs to “label” contributors and community members with a Soul Bound Token. This POAP will be displayed on the contributor’s skills profile. This is a stepping stone for Talent Dashboard.

### V2.1 - **Talent Dashboards for Current Contributors and Community**

Once the POAP is attributed to the contributor or community, DAOs are able to get a dashboard of their current contributors and talent in their community.

### V2.2 - **Onboarding Checklist**

- After finding a contributor that a decentralized organization is eager to work with, they can streamline the onboarding process with Interlace.
  - DAOs are able to invite contributors to onboard onto their DAO
  - Provide access links to role specific tools such as Discord, Google Docs, Figma, Github, Vercel, etc.
  - Additionally, onboarding information such as mission, vision, values are shared to contributor to help ensure fit into the culture of the organization
  - Key contacts and work streams are shared with the contributor to enable them in their role
  - Onboarding check list provided for contributor to complete such as sending wallet to HR subDAO, requesting additional access, or completing legal forms

### V2.3 - **Referral System**

Referral system will be used to connect DAOs and contributors fulfilling roles. TBD on how the referral system will work.

## Phase 3 - Escrow Contracts

### **Overview**

Once a decentralized organization finds a suitable contributor for the task and both parties are aligned, interlace built-In automation will kick in, which allows for a seamless task process and payment transparency with our **scope of work** and **escrow contracts.**

### **KPIs**

- **# of Wallets Connected**
- **Time to Meaning First Contribution**
- **# of Escrow Contracts**
- **Aggregated $ in Escrow Contracts**

### V3.0 - **Scope and Escrow Contracts 💰**

1. Escrow contract that allows DAOs and contributor to agree upon terms and contract
2. DAO send funds to once contract is agreed upon by both parties to start the contract of “work”
3. If work is complete and both parties agree that the work is complete, the funds from the contract are sent to the contributor
4. If there is a discrepancy
   1. Interlace steps into to determine who receives the funds or partial amount of the funds
5. If work is not complete, then DAO is returned funds.

### V3.1 - **Other DAO-Contributor Partnership Integrations**

Additionally, we want Interlace to become the go to place for DAOs and contributors for all their working needs. [Potential Partnerships and Operation Tools](https://www.notion.so/Potential-Partnerships-and-Operation-Tools-f02d530f750841b9937846e4c15ed3a2) will be integrated to enable this.

## Phase 4 - Tinder for DAOs and Proof of Work Verification

### **Overview**

TBD

### **KPIs**

- **# of Wallets Connected**
- **Time to Meaning First Contribution**
- **# of Escrow Contracts**
- **Aggregated $ in Escrow Contracts**
- **Number of Verifiers**

### V4.0 - **Proof of Work Decentralized Verification 💰**

TBD

### V4.1 - **Tinder for DAOs**

TBD

---

Find more on https://interlace.community.

Follow us on [Twitter](https://twitter.com/Interlacehq)
