import PageHeader from "@/components/visuals/PageHeader";

const Terms = () => (
  <div>
    <PageHeader tag="Legal" title="Terms of Service" description="Terms governing the use of iYarKai Tech Lab services and platforms." />
    <section className="py-16 lg:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl prose prose-sm text-muted-foreground">
          <p className="text-sm text-muted-foreground mb-4">Last updated: March 2026</p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">1. Acceptance of Terms</h2>
          <p>By accessing and using the iYarKai Tech Lab website and services, you agree to be bound by these Terms of Service. If you do not agree, please discontinue use of our services.</p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">2. Services</h2>
          <p>iYarKai Tech Lab Pvt Ltd provides DeepTech and AgriTech solutions including the SILIR Smart Farming Systems, KitHub IoT Cloud Platform, technology consulting, and related services as described on our website.</p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">3. Intellectual Property</h2>
          <p>All content, trademarks, logos, and intellectual property on this website are the property of iYarKai Tech Lab Pvt Ltd. You may not reproduce, distribute, or use any content without prior written consent.</p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">4. User Submissions</h2>
          <p>Information submitted through our forms (demo requests, consultation bookings, partner applications) will be used solely for the purposes described in our Privacy Policy.</p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">5. Limitation of Liability</h2>
          <p>iYarKai Tech Lab Pvt Ltd shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or services.</p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">6. Governing Law</h2>
          <p>These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the jurisdiction of courts in Chennai, Tamil Nadu.</p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">7. Contact</h2>
          <p>For questions about these terms, contact iYarKai Tech Lab Pvt Ltd, Chennai, India.</p>
        </div>
      </div>
    </section>
  </div>
);

export default Terms;
