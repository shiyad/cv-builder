export default function CVFormattingBestPractices() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 prose dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6">CV Formatting Best Practices</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        The formatting of your CV plays a crucial role in making a strong first
        impression. A clean, well-structured, and easy-to-read CV will help you
        stand out to recruiters and ensure your information is noticed quickly.
        Follow these best practices to ensure your CV is both professional and
        impactful.
      </p>

      <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">
          Key Formatting Guidelines
        </h2>
        <ul className="space-y-2">
          <li>✓ Keep the CV layout clean and simple</li>
          <li>✓ Use clear section headings and bullet points</li>
          <li>✓ Limit the use of colors, keep it professional</li>
          <li>✓ Stick to standard fonts like Arial, Helvetica, or Georgia</li>
          <li>✓ Keep the CV length to 1-2 pages</li>
        </ul>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          1. Choose the Right Layout
        </h2>
        <p>
          Choose a layout that highlights the most important information at the
          top and is easy to follow. Typically, a reverse chronological format
          is most effective. This allows the recruiter to see your most recent
          work experience first.
        </p>

        <div className="mt-8 mb-8 flex justify-center">
          <img
            src="/opengraph-image6.png"
            alt="CV Layout Example"
            className="rounded-lg"
          />
        </div>

        <p>
          The layout above illustrates how you should organize your information:
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Top section: Name, Contact Information, LinkedIn</li>
            <li>
              Middle section: Professional Summary, Skills, Work Experience
            </li>
            <li>
              Bottom section: Education, Certifications, and Additional
              Information
            </li>
          </ul>
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          2. Font Choices and Readability
        </h2>
        <p>
          A clean, readable font makes a big difference in your CV's
          presentation. Avoid using decorative or script fonts, and stick to
          professional fonts. Here are some of the best font choices for your
          CV:
        </p>

        <div className="grid md:grid-cols-3 gap-4 my-8">
          <div className="p-4 border rounded text-center">
            <p className="font-serif text-lg">Georgia</p>
            <p className="text-sm text-gray-500">
              Classic, professional, and easy to read
            </p>
          </div>
          <div className="p-4 border rounded text-center">
            <p className="font-sans text-lg">Helvetica</p>
            <p className="text-sm text-gray-500">
              Modern and clean with great readability
            </p>
          </div>
          <div className="p-4 border rounded text-center">
            <p className="font-sans text-lg">Arial</p>
            <p className="text-sm text-gray-500">
              Simple, clear, and effective
            </p>
          </div>
        </div>

        <p className="mt-4">
          Make sure to use font sizes that are easy to read, typically around
          10-12 pt for body text and 14-16 pt for headings.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          3. Color and Contrast
        </h2>
        <p>
          Colors should be used sparingly and only for headings or accents.
          Stick to neutral tones like black, gray, or dark blue for the main
          text. Bright, bold colors should be avoided unless you're applying for
          a creative role that may allow for a bit more flexibility.
        </p>

        <div className="flex flex-wrap gap-3 my-6">
          <div className="w-12 h-12 bg-blue-600 rounded"></div>
          <div className="w-12 h-12 bg-gray-800 rounded"></div>
          <div className="w-12 h-12 bg-green-700 rounded"></div>
        </div>

        <p>
          These colors provide a clean, professional look. Avoid using too many
          different colors, as it can distract from the content.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          4. Section Headings and Structure
        </h2>
        <p>
          Proper headings and structure are essential for easy scanning. Here’s
          a general guideline on how to structure your CV:
        </p>

        <div className="my-8 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
          <h3 className="font-semibold mb-2">Recommended Sections:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Contact Information</li>
            <li>Professional Summary</li>
            <li>Skills</li>
            <li>Work Experience</li>
            <li>Education</li>
            <li>Certifications</li>
            <li>Additional Information (Languages, Volunteer Work, etc.)</li>
          </ul>
        </div>

        <p>
          Use clear headings for each section to guide the recruiter’s eye.
          Consistent heading sizes and fonts will help improve readability.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          5. Final CV Formatting Checklist
        </h2>
        <div className="space-y-4">
          <label className="flex items-start">
            <input type="checkbox" className="mt-1 mr-3" />
            <span>Professional and clean layout</span>
          </label>
          <label className="flex items-start">
            <input type="checkbox" className="mt-1 mr-3" />
            <span>Fonts are clear and consistent</span>
          </label>
          <label className="flex items-start">
            <input type="checkbox" className="mt-1 mr-3" />
            <span>Use of color is minimal and professional</span>
          </label>
          <label className="flex items-start">
            <input type="checkbox" className="mt-1 mr-3" />
            <span>Sections are well-structured and easy to navigate</span>
          </label>
          <label className="flex items-start">
            <input type="checkbox" className="mt-1 mr-3" />
            <span>CV is no longer than 2 pages</span>
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
