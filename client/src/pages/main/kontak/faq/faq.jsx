import React, { useState } from "react";
import FaqItem from "../../../../components/ui/faqitem";
import faqData from "../../../../data/datafaq";

const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="shadow-md p-7 rounded-xl flex flex-col gap-5">
      <h1 className="text-main font-semibold text-2xl">
        Pertanyaan yang sering ditanyakan
      </h1>
      {faqData.map((faq) => (
        <FaqItem
          key={faq.id}
          id={faq.id}
          question={faq.question}
          answer={faq.answer}
          openFaq={openFaq}
          setOpenFaq={setOpenFaq}
        />
      ))}
    </div>
  );
};

export default FaqSection;
