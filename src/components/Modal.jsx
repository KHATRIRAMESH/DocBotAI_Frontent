import { useState, useMemo, Fragment, useEffect, useCallback, memo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowRight, ChevronLeft, ChevronRight, SendHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import loanFormConfig from "../app/lib/loanConfig.js"

const buildInitialData = (steps) => {
  const data = { termsAccepted: false };
  steps.flat().forEach((f) => {
    data[f.name] = f.type === "file" ? null : "";
  });
  return data;
};

const ProgressHeader = memo(({ step, totalSteps, loanType, onClose }) => {
  const stepTitles = [
    "Loan Information",
    "Personal Details",
    "Address Information",
    "Bank Details",
    "Document Upload",
    "Terms & Conditions",
  ];

  const maxStep = stepTitles.length - 1;

  return (
    <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-6 py-4">
      {/* Header */}
      <div className="flex items-center justify-center mb-4 relative">
  <h2 className="text-xl font-bold text-gray-800">Applying for {loanType}</h2>
  <button
    onClick={onClose}
    className="absolute right-0 cursor-pointer text-gray-500 hover:text-gray-700 rounded-full hover:bg-red-300/80 p-1 px-2"
    aria-label="Close form"
  >
    ✕
  </button>
</div>

      {/* Show only current step title */}
      <div className="flex justify-center mt-4">
        <div className="text-blue-600 font-semibold text-base">
          {stepTitles[step]}
        </div>
      </div>

      {/* Progress bar container with relative position to overlap step numbers */}
      <div className="relative mx-[-24px] mt-6">
        {/* Progress bar background */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{
              width: `${Math.min((step / maxStep) * 100, 100)}%`,
              maxWidth: "100%",
            }}
          />
        </div>

        {/* Step numbers overlapping progress bar */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex justify-between px-1 select-none">
          {stepTitles.map((_, index) => {
            const isPast = index < step;
            const isCurrent = index === step;
            return (
              <div
                key={index}
                className="flex justify-center items-center w-6 h-6 rounded-full"
                style={{ minWidth: "24px" }}
              >
                <span
                  className={`
                    inline-flex items-center justify-center w-6 h-6 rounded-full text-xs
                    ${
                      isPast
                        ? "bg-blue-600 text-white"
                        : isCurrent
                        ? "bg-blue-200 text-blue-700"
                        : "bg-gray-300 text-gray-600"
                    }
                  `}
                >
                  {isPast ? "✓" : index + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
})


const FormInput = memo(({ field, value, onChange }) => {
  if (field.type === "file") {
    return (
      <div className="relative">
        <div className="flex items-center gap-2">
          <label
            htmlFor={field.name}
            className="cursor-pointer rounded bg-blue-600 px-3 py-1.5 text-white text-sm"
          >
            Choose File
          </label>
          <span className="text-base text-gray-600">
            {value?.name || "No file chosen"}
          </span>
        </div>
        <input
          type="file"
          name={field.name}
          id={field.name}
          onChange={onChange}
          className="hidden"
          key={`file-${field.name}`}
        />
      </div>
    );
  }

  return (
    <input
      type={field.type}
      name={field.name}
      value={value ?? ""}
      onChange={onChange}
      className="w-full rounded border p-2 text-sm"
      autoComplete="off"
      key={`input-${field.name}`}
    />
  );
});

const StepContent = memo(({ step, loanType, steps, formData, handleChange }) => {
  if (step === 0) {
  const docs = loanFormConfig[loanType]?.requiredDocs
            ?? loanFormConfig[loanType]?.steps
                 .flat()
                 .filter(f => f.type === "file")
                 .map(f => f.label);

  return (
    <div className="space-y-6 pt-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Loan Details:</h3>
        <p className="text-gray-700">
          {loanFormConfig[loanType]?.description}
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">
         Please prepare the following documents before proceeding:
        </h3>

        <ul className="list-disc pl-5 space-y-1">
          {docs.map((doc, i) => (
            <li key={i} className="text-gray-700">
              {doc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


  if (step > 0 && step <= steps.length) {
    const fields = steps[step - 1];
    return (
      <div className="space-y-4">
        {fields.map((f) => (
          <div key={`field-${f.name}`} className="space-y-1">
            <label htmlFor={f.name} className="block text-base font-medium text-gray-700">
              {f.label}
            </label>
            <FormInput field={f} value={formData[f.name]} onChange={handleChange} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
          key="terms-checkbox"
        />
        I accept the terms & conditions.
      </label>
    </div>
  );
});

const MultiStepModal = ({ loanType }) => {
  const { steps, description } = useMemo(() => {
    const config = loanFormConfig[loanType] || { steps: [], description: "" };
    return {
      steps: config.steps,
      description: config.description,
    };
  }, [loanType]);

  const totalSteps = steps.length + 1;

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(() => buildInitialData(steps));

  useEffect(() => {
    setFormData(buildInitialData(steps));
  }, [steps]);

  const isStepValid = useCallback(() => {
    if (step === 0) return true;
    if (step === totalSteps) return formData.termsAccepted;

    const currentFields = steps[step - 1];
    return currentFields.every((f) => {
      const val = formData[f.name];
      return f.type === "file" ? val !== null : Boolean(val);
    });
  }, [step, totalSteps, formData, steps]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setStep(0);
    setFormData(buildInitialData(steps));
  }, [steps]);

 const handleChange = useCallback((e) => {
  const { name, value, type, checked, files } = e.target;
  const newValue = type === "checkbox" ? checked : files ? files[0] : value;
  console.log(`Field: ${name}, Value:`, newValue); // Add this line
  setFormData((prev) => ({
    ...prev,
    [name]: newValue,
  }));
  console.log("FormData before close:", formData);
}, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   toast.success("Documents Uploaded!")
  //   console.log("Submitting", loanType, formData);
  //   closeModal();
  // };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   const formPayload = new FormData();
//   formPayload.append("loanType", loanType);

//   Object.entries(formData).forEach(([key, value]) => {
//     if (value !== null) {
//       formPayload.append(key, value);
//     }
//   });

//   try {
//     const response = await fetch("/api/submit-loan", {
//       method: "POST",
//       body: formPayload,
//     });

//     if (!response.ok) throw new Error("Submission failed");

//     toast.success("Application submitted!");
//     closeModal();
//   } catch (error) {
//     console.error("Submission error:", error);
//     toast.error("Failed to submit. Please try again.");
//   }
// };


  
  const [direction, setDirection] = useState('none'); // 'left', 'right', 'none'

  const goNext = useCallback(() => {
    setDirection('left');
    setTimeout(() => setStep((s) => s + 1), 50);
  }, []);

  const goBack = useCallback(() => {
    setDirection('right');
    setTimeout(() => setStep((s) => s - 1), 50);
  }, []);

  // Reset direction after animation
  useEffect(() => {
    if (direction !== 'none') {
      const timer = setTimeout(() => setDirection('none'), 300);
      return () => clearTimeout(timer);
    }
  }, [direction]);

 return (
    <>
      <button
        onClick={() => {
          setFormData(buildInitialData(steps));
          setStep(0);
          setIsOpen(true);
        }}
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 cursor-pointer"
      >
        Apply
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                  <div className="p-6">
                    <ProgressHeader 
                      step={step} 
                      totalSteps={totalSteps} 
                      loanType={loanType}
                      onClose={closeModal}
                    />
                    
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                      <StepContent
                        step={step}
                        loanType={loanType}
                        steps={steps}
                        formData={formData}
                        handleChange={handleChange}
                      />
                      
                      <div className="flex justify-between pt-4">
                        {step > 0 ? (
                          <button
                            type="button"
                            className="flex items-center gap-1 rounded bg-gray-200 px-4 py-2 text-sm cursor-pointer hover:bg-gray-300"
                            onClick={() => setStep(s => s - 1)}
                          >
                            <ChevronLeft className="h-4 w-4" />
                            Back
                          </button>
                        ) : (
                          <div></div>
                        )}
                        
                        {step < totalSteps ? (
                          <button
                            type="button"
                            disabled={!isStepValid()}
                            className="flex items-center gap-1 rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50 cursor-pointer hover:bg-blue-700"
                            onClick={() => setStep(s => s + 1)}
                          >
                            Next
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            type="submit"
                            disabled={!isStepValid()}
                            className="rounded bg-green-600 px-4 py-2 text-sm text-white disabled:opacity-50 cursor-pointer hover:bg-green-700"
                          >
                            Submit 
                           
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MultiStepModal;