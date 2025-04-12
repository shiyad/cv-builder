export default function CareerProgressionStrategies() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 prose dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6">Career Progression Strategies</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Climbing the career ladder requires more than just doing your job well.
        This guide reveals proven strategies to systematically advance your
        career, whether you're aiming for a promotion, career change, or
        leadership position.
      </p>

      <div className="mb-8 p-6 bg-blue-50 dark:blue-900/20 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Key Takeaways</h2>
        <ul className="space-y-2">
          <li>✓ Master the art of strategic visibility</li>
          <li>✓ Build a personal board of advisors</li>
          <li>✓ Develop T-shaped skills for maximum impact</li>
          <li>✓ Create a 90-day plan for each role</li>
          <li>✓ Measure your progress with KPIs</li>
        </ul>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          1. The Promotion Roadmap
        </h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          Understand Your Company's Ladder
        </h3>
        <p>Research how promotions work in your organization. Identify:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Formal promotion cycles and timelines</li>
          <li>Key decision-makers in promotion processes</li>
          <li>Typical tenure before advancement</li>
          <li>Skills/achievements expected at each level</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          The 70-20-10 Development Rule
        </h3>
        <div className="grid md:grid-cols-3 gap-4 my-4">
          <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded">
            <h4 className="font-semibold">70% On-the-Job</h4>
            <p>Stretch assignments, new projects, job rotation</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded">
            <h4 className="font-semibold">20% Relationships</h4>
            <p>Mentors, sponsors, peer learning</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded">
            <h4 className="font-semibold">10% Formal Training</h4>
            <p>Courses, certifications, workshops</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          2. Skill Stacking for Advancement
        </h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          T-Shaped Competencies
        </h3>
        <div className="flex flex-col md:flex-row gap-8 items-center mb-6">
          <div className="w-full md:w-1/2">
            <p>
              Develop both <strong>breadth</strong> (horizontal bar) and{" "}
              <strong>depth</strong> (vertical stem):
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>1-2 deep expertise areas</li>
              <li>Working knowledge of adjacent functions</li>
              <li>Cross-functional collaboration ability</li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 bg-gray-100 dark:bg-gray-800 p-4 rounded">
            <div className="text-center">
              <div
                className="h-4 bg-blue-500 mx-auto"
                style={{ width: "80%" }}
              ></div>
              <div className="h-32 w-4 bg-blue-500 mx-auto mt-2"></div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          Future-Proof Skills Matrix
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="border p-3">Skill Category</th>
                <th className="border p-3">Current Level</th>
                <th className="border p-3">Target Level</th>
                <th className="border p-3">Development Plan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-3">Technical Expertise</td>
                <td className="border p-3">Intermediate</td>
                <td className="border p-3">Advanced</td>
                <td className="border p-3">Certification + mentorship</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <td className="border p-3">Leadership</td>
                <td className="border p-3">Basic</td>
                <td className="border p-3">Intermediate</td>
                <td className="border p-3">Lead cross-functional project</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          3. Strategic Visibility
        </h2>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded">
            <h4 className="font-semibold text-red-600 dark:text-red-400">
              Common Mistake
            </h4>
            <p className="mt-2">"My work should speak for itself"</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded">
            <h4 className="font-semibold text-green-600 dark:text-green-400">
              Better Approach
            </h4>
            <p className="mt-2">
              "I ensure decision-makers understand the impact of my work through
              regular updates and measurable results"
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Visibility Tactics</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="p-4 border rounded-lg">
            <h4 className="font-medium">📊 Results Dashboard</h4>
            <p className="mt-2 text-sm">
              Create a one-page summary of your key achievements and metrics
            </p>
          </li>
          <li className="p-4 border rounded-lg">
            <h4 className="font-medium">🗓️ Strategic Updates</h4>
            <p className="mt-2 text-sm">
              Monthly email to stakeholders highlighting contributions
            </p>
          </li>
          <li className="p-4 border rounded-lg">
            <h4 className="font-medium">🤝 Stakeholder Mapping</h4>
            <p className="mt-2 text-sm">
              Identify and build relationships with key influencers
            </p>
          </li>
          <li className="p-4 border rounded-lg">
            <h4 className="font-medium">🎤 Thought Leadership</h4>
            <p className="mt-2 text-sm">
              Contribute to internal newsletters or present at team meetings
            </p>
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          4. The 90-Day Advancement Plan
        </h2>

        <div className="flex flex-col md:flex-row gap-8 mb-6">
          <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">First 30 Days</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Establish quick wins</li>
              <li>Identify pain points</li>
              <li>Build key relationships</li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">Days 31-60</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Implement improvements</li>
              <li>Gather feedback</li>
              <li>Expand influence</li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">Days 61-90</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Deliver measurable results</li>
              <li>Document achievements</li>
              <li>Initiate promotion talk</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          Promotion Proposal Template
        </h3>
        <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-lg">
          <p className="font-medium mb-2">
            Subject: Career Growth Discussion - [Your Name]
          </p>
          <p className="mb-2">Dear [Manager],</p>
          <p className="mb-2">
            I'd like to discuss my career progression and how I can continue
            contributing at a higher level. Here's what I've accomplished in my
            current role:
          </p>
          <ul className="list-disc pl-6 mb-2">
            <li>[Quantified achievement 1]</li>
            <li>[Quantified achievement 2]</li>
            <li>[Additional responsibilities taken on]</li>
          </ul>
          <p>
            I'm excited to explore how I can bring even more value to the team
            at the [target position] level. When would be a good time to discuss
            this further?
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          5. Alternative Career Paths
        </h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          Growth Beyond Promotions
        </h3>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="border p-4 rounded-lg">
            <h4 className="font-semibold">Lateral Moves</h4>
            <p className="mt-2 text-sm">
              Gain experience in adjacent departments to build broader expertise
            </p>
          </div>
          <div className="border p-4 rounded-lg">
            <h4 className="font-semibold">Specialist Track</h4>
            <p className="mt-2 text-sm">
              Deepen technical expertise rather than moving into management
            </p>
          </div>
          <div className="border p-4 rounded-lg">
            <h4 className="font-semibold">Project Leadership</h4>
            <p className="mt-2 text-sm">
              Lead high-visibility projects to demonstrate leadership potential
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          When to Consider Changing Companies
        </h3>
        <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-lg">
          <ul className="list-disc pl-6 space-y-2">
            <li>No growth opportunities despite exceeding expectations</li>
            <li>Skills becoming outdated due to limited challenges</li>
            <li>Compensation significantly below market rate</li>
            <li>Values misalignment with company direction</li>
          </ul>
        </div>
      </section>

      <div className="mt-12 pt-6 border-t">
        <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
        <p className="mb-4">
          Ready to take action? Use our{" "}
          <a
            href="/templates"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            career progression planner template
          </a>{" "}
          or explore our{" "}
          <a
            href="/courses"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            professional development courses
          </a>{" "}
          to accelerate your growth.
        </p>
        <a
          href="/guides"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to all career guides
        </a>
      </div>
    </div>
  );
}
