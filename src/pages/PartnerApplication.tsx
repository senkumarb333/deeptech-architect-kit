import LeadForm from "@/components/LeadForm";

const PartnerApplication = () => (
  <LeadForm
    title="Partner Application"
    subtitle="Join the iYarKai ecosystem as a technology or channel partner."
    projectTypes={["Technology Partner", "Channel Partner", "Distribution Partner", "Integration Partner", "Research Partner"]}
    submitLabel="Submit Application"
  />
);

export default PartnerApplication;
