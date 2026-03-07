import LeadForm from "@/components/LeadForm";

const RequestDemo = () => (
  <LeadForm
    title="Request a Demo"
    subtitle="See our SILIR platforms and KitHub IoT cloud in action."
    projectTypes={["Mushroom Farming", "Poultry Farming", "PostHarvest", "Smart Irrigation", "Polyhouse", "IoT Cloud Platform", "Other"]}
    submitLabel="Request Demo"
  />
);

export default RequestDemo;
