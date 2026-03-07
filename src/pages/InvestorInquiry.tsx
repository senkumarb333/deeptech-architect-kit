import LeadForm from "@/components/LeadForm";

const InvestorInquiry = () => (
  <LeadForm
    title="Investor Inquiry"
    subtitle="Explore investment opportunities in DeepTech agricultural infrastructure."
    projectTypes={["Seed Stage", "Series A", "Strategic Investment", "Government Grant", "Other"]}
    submitLabel="Submit Inquiry"
  />
);

export default InvestorInquiry;
