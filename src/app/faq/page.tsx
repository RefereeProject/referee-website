export const metadata = {
  title: "FAQ – The Referee Project",
  description: "Frequently asked questions about The Referee Project",
};

export default function FAQPage() {
  const faqs = [
    {
      question: "What is The Referee Project?",
      answer: "The Referee Project is a non-profit initiative to create reliability scores for research papers, built on a standardized taxonomy of research weaknesses and a bug bounty mechanism for finding issues."
    },
    {
      question: "How will academic journals react?",
      answer: "We expect journals to be highly sceptical and dismissive at first. Eventually, however, they might even welcome the service Referee provides if they trust the results."
    },
    {
      question: "What is the relationship with existing resources like PubPeer?",
      answer: "Referee intends to leverage many existing projects and tools, such as the comments in PubPeer... The world of commentary on papers is very fragmented today."
    },
    {
      question: "How can a bug bounty approach be effectively applied to complex academic research?",
      answer: "How are these nuanced, non-binary aspects of paper reliability determined today that are so worth protecting? It's determined by individuals likely with widely varying standards."
    },
    {
      question: "How can a single framework accommodate the diversity of academic disciplines?",
      answer: "Central to our approach is the belief that creating a universal standard for evaluating research integrity is only impossible if framed as a question, not a goal."
    },
    {
      question: "Can research quality be represented by a numerical score?",
      answer: "Like any metric, a single reliability score will be flawed and crude. But it will be vastly better than the status quo, where information on flawed papers is widely scattered."
    },
    {
      question: "How will the project prevent system gaming?",
      answer: "No system escapes gaming... We not only expect the Referee system to be gamed, we encourage it. Why? Because adversarial processes strengthen systems."
    },
    {
      question: "How will the project overcome resistance from academic gatekeepers?",
      answer: "We expect some academics to be offended by the Referee project's approach to allow 'non-experts' to pass judgment on their work."
    },
    {
      question: "How will the project address academic resistance to having flaws pointed out?",
      answer: "The question assumes Referee cares about sustaining individual academic career paths and the academic journal industry. We simply don't."
    },
    {
      question: "How effective can AI be in identifying research flaws?",
      answer: "Bug bounties are placed on specific claims, ones that do not require an in-depth understanding of the domain. Modern AI models have blown past the Turing test."
    },
    {
      question: "How will anonymity be managed to prevent abuse?",
      answer: "The source of the bounty claimants is not important. That is a core feature of the system."
    },
    {
      question: "How can I get involved?",
      answer: "Follow updates and opportunities on our X account at @referee_project."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Common questions about The Referee Project&apos;s approach to research evaluation
        </p>
      </div>
      
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">
              {faq.question}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {faq.answer.includes('@referee_project') ? (
                <>
                  Follow updates and opportunities on our X account at{' '}
                  <a 
                    href="https://x.com/referee_project" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    @referee_project
                  </a>
                  .
                </>
              ) : (
                faq.answer
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


