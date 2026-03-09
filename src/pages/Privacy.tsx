import PageHeader from "@/components/visuals/PageHeader";

const Privacy = () => (
  <div>
    <PageHeader tag="Legal" title="Privacy Policy" description="How iYarKai Tech Lab Pvt Ltd handles your data." />
    <section className="py-16 lg:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl prose prose-sm text-muted-foreground">
          <p className="text-sm text-muted-foreground mb-4">Last updated: March 2026</p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">1. Information We Collect</h2>
          <p>When you use our website or submit forms (Request Demo, Book Consultation, Partner Application, Investor Inquiry), we collect the information you provide, including your name, email address, phone number, organization, and project details.</p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">2. How We Use Your Information</h2>
          <p>We use the information collected to respond to your inquiries, provide product demonstrations, share relevant updates about our SILIR platforms and KitHub IoT Cloud, and improve our services.</p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">3. Data Sharing</h2>
          <p>We do not sell or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and conducting business, subject to confidentiality agreements.</p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">4. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">5. Cookies</h2>
          <p>Our website may use cookies and similar technologies to enhance your browsing experience and analyze site traffic. You can control cookie preferences through your browser settings.</p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">6. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at the details provided below.</p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">7. Contact</h2>
          <p>For privacy-related inquiries, contact iYarKai Tech Lab Pvt Ltd, Chennai, India.</p>
        </div>
      </div>
    </section>
  </div>
);

export default Privacy;
