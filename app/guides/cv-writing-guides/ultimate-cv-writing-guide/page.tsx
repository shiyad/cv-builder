export default function TheUltimateCVWritingGuide() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 prose dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6">The Ultimate CV Writing Guide</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Crafting a compelling CV is your first step toward landing your dream
        job. This comprehensive guide will walk you through every element of
        creating a CV that stands out to recruiters and hiring managers.
      </p>

      <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Key Takeaways</h2>
        <ul className="space-y-2">
          <li>✓ Ideal CV length is 1-2 pages maximum</li>
          <li>✓ Tailor your CV for each job application</li>
          <li>✓ Use strong action verbs and quantify achievements</li>
          <li>✓ Optimize for Applicant Tracking Systems (ATS)</li>
          <li>✓ Keep design clean and professional</li>
        </ul>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          1. CV Structure Essentials
        </h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">Contact Information</h3>
        <p>
          Include your full name, professional email, phone number, and LinkedIn
          profile.
          <span className="font-semibold"> Never include:</span> marital status,
          age, or unnecessary personal details.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          Professional Summary
        </h3>
        <p>
          A 3-4 sentence overview of your career highlights and what you bring
          to the table:
        </p>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded my-4">
          <p className="italic">
            "Results-driven marketing professional with 5+ years experience in
            digital campaign management. Specialized in SEO and content
            strategy, having increased organic traffic by 150% for previous
            employers. Seeking to leverage analytical skills and creative
            approach at XYZ Company."
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Work Experience</h3>
        <p>List in reverse chronological order with these elements:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Job title, company name, location, dates</li>
          <li>3-5 bullet points per position</li>
          <li>Focus on achievements rather than duties</li>
          <li>Use strong action verbs (led, implemented, increased)</li>
          <li>Quantify results where possible</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          2. Writing Powerful Bullet Points
        </h2>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded">
            <h4 className="font-semibold text-red-600 dark:text-red-400">
              Weak Example
            </h4>
            <p className="mt-2">"Responsible for social media management"</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded">
            <h4 className="font-semibold text-green-600 dark:text-green-400">
              Strong Example
            </h4>
            <p className="mt-2">
              "Grew company Instagram following from 1K to 25K in 6 months
              through strategic content calendar and influencer partnerships,
              driving 20% increase in website traffic"
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          Achievement Formulas
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Action + Result:</strong> "Implemented new CRM system,
            reducing customer response time by 40%"
          </li>
          <li>
            <strong>Skill + Impact:</strong> "Used Python to automate reporting,
            saving 15 hours per week"
          </li>
          <li>
            <strong>Problem + Solution:</strong> "Identified inventory
            discrepancies and created new tracking system, reducing errors by
            75%"
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          3. ATS Optimization
        </h2>

        <p>
          Applicant Tracking Systems scan your CV before it reaches human eyes.
          Follow these tips:
        </p>

        <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-lg mt-4">
          <h3 className="text-lg font-semibold mb-3">Do's and Don'ts</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium">✅ Do</h4>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Use standard headings (Experience, Education)</li>
                <li>Incorporate keywords from job description</li>
                <li>Save as PDF (unless specified otherwise)</li>
                <li>Use simple, clean formatting</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium">❌ Don't</h4>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Use headers/footers</li>
                <li>Include images/graphics</li>
                <li>Use fancy fonts or tables</li>
                <li>Submit as .pages or other uncommon formats</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          4. Design & Formatting
        </h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">Font Choices</h3>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <li className="p-3 border rounded">
            <p className="font-serif text-lg">Georgia</p>
            <p className="text-sm text-gray-500">Classic and professional</p>
          </li>
          <li className="p-3 border rounded">
            <p className="font-sans text-lg">Helvetica</p>
            <p className="text-sm text-gray-500">Clean and modern</p>
          </li>
          <li className="p-3 border rounded">
            <p className="font-sans text-lg">Calibri</p>
            <p className="text-sm text-gray-500">Default but effective</p>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Color Guidelines</h3>
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded"></div>
          <div className="w-12 h-12 bg-gray-800 rounded"></div>
          <div className="w-12 h-12 bg-green-700 rounded"></div>
          <div className="w-12 h-12 bg-blue-800 rounded"></div>
        </div>
        <p>
          Use color sparingly - only for headings or accents. Black text on
          white background is safest.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          5. Final Checklist
        </h2>

        <div className="space-y-4">
          <label className="flex items-start">
            <input type="checkbox" className="mt-1 mr-3" />
            <span>Spellchecked and grammar checked</span>
          </label>
          <label className="flex items-start">
            <input type="checkbox" className="mt-1 mr-3" />
            <span>Consistent formatting throughout</span>
          </label>
          <label className="flex items-start">
            <input type="checkbox" className="mt-1 mr-3" />
            <span>Tailored to the specific job</span>
          </label>
          <label className="flex items-start">
            <input type="checkbox" className="mt-1 mr-3" />
            <span>Saved with professional filename</span>
          </label>
          <label className="flex items-start">
            <input type="checkbox" className="mt-1 mr-3" />
            <span>Kept to 1-2 pages maximum</span>
          </label>
        </div>
      </section>

      <div className="mt-12 pt-6 border-t">
        <h2 className="text-xl font-semibold mb-4">Need More Help?</h2>
        <p className="mb-4">
          Try our{" "}
          <a
            href="/templates"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            professional CV templates
          </a>{" "}
          or our{" "}
          <a
            href="/sign-up"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            AI-powered CV builder
          </a>{" "}
          to create a job-winning CV in minutes.
        </p>
        <a
          href="/guides"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to all guides
        </a>
      </div>
    </div>
  );
}
