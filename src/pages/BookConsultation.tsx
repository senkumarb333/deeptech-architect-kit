import LeadForm from "@/components/LeadForm";

const BookConsultation = () => (
  <LeadForm
    title="Book a Consultation"
    subtitle="Discuss your agricultural technology needs with our experts."
    projectTypes={["Technology Assessment", "Architecture Design", "Implementation Planning", "Training Program", "Design Thinking", "Innovation Coaching"]}
    submitLabel="Book Consultation"
  />
);

export default BookConsultation;
