export const metadata = {
  title: "FAQ – The Referee Project",
  description: "Frequently asked questions about The Referee Project",
};

export default function FAQPage() {
  const faqs = [
    {
      question: "How will academic journals react?",
      answer: "We expect journals to be highly sceptical and dismissive at first. Eventually, however, they might even welcome the service Referee provides if they trust the results. One day we hope they even consider paying for bounties themselves."
    },
    {
      question: "What is the relationship with existing resources like PubPeer?",
      answer: "Referee intends to leverage many existing projects and tools, such as the comments in PubPeer. The first step would be to match those comments to the weaknesses enumerated in Referee's taxonomy of paper weaknesses, essentially claiming those bounties. The world of commentary on papers is very fragmented today (PubPeer, X, ReviewCommons, Retraction Watch, and many others) that it's hard for an outsider to know where to look if a paper has issues short of retractions. Even retracted papers get cited quite often. Referee can play a part in uniting all these efforts in a structured way."
    },
    {
      question: "Bug bounties may work for objects like image transpositions or duplications but many aspects of paper reliability are not binary. How can a bug bounty approach be effectively applied to the complex and often subjective field of academic research?",
      answer: "How are these nuanced, non-binary aspects of paper reliability determined today that are so worth protecting? It's determined by individuals likely with widely varying standards. How does the practice of reviewers applying their personal, non-transparent criteria to assess reliability contribute to advancing science openly and transparently? Yes, setting an explicit threshold for these cases is probably wrong but it promotes a shared understanding of what's expected. In addition, the discussion of what that threshold should be is exactly the type of meta-discussions academia should be having to improve the scientific process. And, believe it or not, generative AI can help here. They are consensus machines and although they hallucinate at times, this can be mitigated by collective action."
    },
    {
      question: "Given the vast diversity of disciplines and methodologies in academic research, how can a single framework for identifying and categorizing research weaknesses accommodate the intricacies and specificities of all fields?",
      answer: "Central to our approach is the belief that creating a universal standard for evaluating research integrity is only impossible if framed as a question, not a goal. Through continuous collaboration and refinement, our framework is designed to evolve, embracing the dynamic nature of academic research and promoting a standardized, yet sensitive, evaluation across all fields of study."
    },
    {
      question: "Can the quality and reliability of complex academic research genuinely be represented by a numerical score without oversimplifying or misrepresenting the nuances of the work?",
      answer: "Let's be clear: like any metric, a single reliability score will be flawed and crude. But it will be vastly better than the status quo, where information on flawed papers is widely scattered or tacitly held by experts. The outsider is forced to rely on citation numbers, which is even more flawed because of momentum effects."
    },
    {
      question: "With incentives in place for identifying flaws, how will the Referee Project prevent malicious actors from gaming the system, such as by introducing and then identifying their flaws for a reward?",
      answer: "No system escapes gaming, including academia. For example, we see academics gaming the current system via paper mills because of the over-emphasis on getting published. So we not only expect the Referee system to be gamed, we encourage it. Why? Because adversarial processes strengthen systems. Software systems are vastly more secure now than 20 years ago because of hackers. This observation doesn't condone criminal activity but recognises that learning how they game the software and networks has led to stronger and more resilient systems."
    },
    {
      question: "Given academia's gatekeeping and emphasis on peer credentials, how will the project overcome potential resistance to critiques from non-academics or those outside the conventional peer-review system?",
      answer: "We expect some academics to be offended by the Referee project's approach to allow 'non-experts' to pass judgment on their work. Bug bounties are focused on specific claims, and these claims can certainly be tested by someone without a Ph.D. We believe that a true academic welcomes criticism. They may also be offended that reviewers are motivated solely by financial gain. There seems to be an idea that academics only have pure motivations and that academia is a supportive community of mutual benevolence. If that were the case, then academics would be spending much more time doing the hard work of thoroughly refereeing papers. But all the evidence suggests that a small minority of academics are motivated to referee papers and to do it well. Referee is a response to this apathy. The validity of a research weakness stands on its own and doesn't depend on the motivation of the person pointing it out."
    },
    {
      question: "How will you address academic resistance to having their flaws pointed out, hurting the chance that the paper will be published in a top tier journal?",
      answer: "The question assumes Referee cares about sustaining individual academic career paths and the academic journal industry. We simply don't. Our focus is solely on improving the accuracy and reliability of human knowledge."
    },
    {
      question: "Considering the current limitations of AI in understanding the depth and context of academic content, how effective can AI and bots be in identifying research flaws without human oversight?",
      answer: "Again, bug bounties are placed on specific claims, ones that do not require an in-depth understanding of the domain. Modern AI models have blown past the Turing test. The distinction between an AI and a human submitting a claim, along with supporting evidence, becomes indistinguishable and, arguably, inconsequential. This principle extends to the evaluation of bounty claims. AI models serve as mechanisms for achieving consensus, demonstrating proficiency in pinpointing definitive answers—known as Schelling Points—to targeted questions. Acknowledging the potential for expert opinions to diverge, these models can be meticulously adjusted to align with those expert perspectives. Consequently, Referee incorporates the oversight of experts to ensure that decision-making processes are informed, precise, and reflective of deep disciplinary understanding. This layered approach not only leverages the efficiency and scalability of AI but also preserves the nuanced judgment that seasoned professionals contribute."
    },
    {
      question: "While anonymity might encourage more honest feedback, how does the project plan to maintain accountability and prevent abuse of the system?",
      answer: "The source of the bounty claimants is not important. That is a core feature of the system. There is a concern that academics might game the system by planting nuanced bugs and later claiming the bounty. However, such behaviour carries significant ethical implications and could jeopardize the individual's eligibility for future research funding. Moreover, for a bounty to be placed on a paper, the work must possess sufficient significance and relevance. This requirement serves as a deterrent, ensuring that only contributions of notable importance are subjected to this level of scrutiny."
    },
    {
      question: "In a landscape where funding is fiercely competitive and traditionally allocated towards research generation rather than evaluation, how will the Referee Project secure ongoing funding to incentivize reviews and maintain operations?",
      answer: "The initial focus of Referee is fixing the past and present. It does hope that funding bodies do reserve a part of their grants to validate the research they sponsor but it isn't concerned with funding competitiveness."
    },
    {
      question: "How will the project mitigate the potential demotivating effects of publicizing the flaws in researchers' work, especially considering the career implications in the highly competitive academic environment?",
      answer: "Referee hopes that it induces more effort at producing highly reliable research. It may be true that some may become depressed when their quality is made transparent, especially using a crude and necessarily flawed metric. We don't apologize for this, however. Perpetuating a system where no one's quality is judged or is judged in a highly idiosyncratic way by people with politicized agendas doesn't serve humanity."
    },
    {
      question: "How will the Referee Project handle the inherent subjectivity and variability in research design?",
      answer: "This issue is indeed significant. An intriguing study by Breznau and colleagues revealed that when researchers were given the same research question and dataset, they arrived at markedly different conclusions. This outcome underscores a critical point: if these varied results were presented sequentially rather than concurrently, they might each be deemed irreproducible, thereby garnering low-reliability ratings. However, this raises a pertinent question: if researchers can draw such divergent conclusions from the same dataset and hypothesis, isn't that indicative of a fundamental issue that demands addressing? This scenario prompts us to continue exploring potential solutions. The variance in academic interpretations signals a need for a more nuanced approach to evaluating research reliability. What we can state with certainty is that the prevailing system offers no remedy for this challenge. Our commitment is to delve deeper into this complex matter, aiming to devise strategies that can accommodate and perhaps even leverage the diversity of scholarly perspectives, thereby enriching the academic discourse."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          The following questions have been asked about the project. We present our responses here to inform others who may have the same questions.
        </p>
      </div>
      
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">
              {faq.question}
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
