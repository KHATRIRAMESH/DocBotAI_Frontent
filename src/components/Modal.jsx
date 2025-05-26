import {
  useState,
  useMemo,
  Fragment,
  useEffect,
  useCallback,
  memo,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import loanFormConfig from "../app/lib/loanConfig.js";


const buildInitialData = (steps,loanType) => {
  const data = { termsAccepted: false, documents: [] ,loanType}; 
  steps.flat().forEach((f) => {
    if (f.type === "file" && f.multiple) data[f.name] = [];
    else data[f.name] = f.type === "file" ? null : "";
  });
  return data;
};

const ProgressHeader = memo(({ step, loanType, onClose }) => {
  const titles = [
    "Loan Information",
    "Personal Details",
    "Address Information",
    "Bank Details",
    "Document Upload",
    "Terms & Conditions",
  ];
  const max = titles.length - 1;
  return (
    <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-10 py-4">
      <div className="flex items-center justify-center mb-4 relative">
        <h2 className="text-xl font-bold text-gray-800">Applying for {loanType}</h2>
        <button onClick={onClose} className="absolute right-0 p-1 px-2 rounded-full hover:bg-red-300/80 text-gray-500 hover:text-gray-700">✕</button>
      </div>
      <div className="flex justify-center mt-4 text-blue-600 font-semibold text-base">{titles[step]}</div>
      <div className="relative mx-[-24px] mt-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${Math.min((step / max) * 100, 100)}%` }} />
        </div>
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex justify-between px-1 select-none">
          {titles.map((_, i) => {
            const past = i < step;
            const current = i === step;
            return (
              <div key={i} className="flex justify-center items-center w-6 h-6">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${past ? "bg-blue-600 text-white" : current ? "bg-blue-200 text-blue-700" : "bg-gray-300 text-gray-600"}`}>{past ? "✓" : i + 1}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

const FormInput = memo(({ field, value, onChange }) => {
  if (field.type === "file") {
    const label = field.multiple
      ? value?.length
        ? `${value.length} file${value.length > 1 ? "s" : ""} selected`
        : "No files chosen"
      : value?.name || "No file chosen";
    return (
      <div className="relative">
        <div className="flex items-center gap-2">
          <label htmlFor={field.name} className="cursor-pointer rounded bg-blue-600 px-3 py-1.5 text-white text-sm">Choose File{field.multiple ? "s" : ""}</label>
          <span className="text-base text-gray-600">{label}</span>
        </div>
        <input type="file" id={field.name} name={field.name} multiple={field.multiple} onChange={onChange} className="hidden" />
      </div>
    );
  }
  return <input type={field.type} name={field.name} value={value ?? ""} onChange={onChange} className="w-full rounded border p-2 text-sm" autoComplete="off" />;
});

const StepContent = memo(({ step, loanType, steps, formData, handleChange }) => {
  if (step === 0) {
    const docs = loanFormConfig[loanType]?.requiredDocs ?? loanFormConfig[loanType]?.steps.flat().filter((f) => f.type === "file").map((f) => f.label);
    return (
      <div className="space-y-6 pt-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Loan Details:</h3>
          <p className="text-gray-700">{loanFormConfig[loanType]?.description}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Prepare these documents:</h3>
          <ul className="list-disc pl-5 space-y-1">
            {docs.map((d, i) => (<li key={i} className="text-gray-700">{d}</li>))}
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
          <div key={f.name} className="space-y-1">
            <label htmlFor={f.name} className="block text-base font-medium text-gray-700">{f.label}</label>
            <FormInput field={f} value={formData[f.name]} onChange={handleChange} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
        I accept the terms & conditions.
      </label>
    </div>
  );
});

const MultiStepModal = ({ loanType }) => {
  const { steps } = useMemo(() => ({ steps: (loanFormConfig[loanType] || { steps: [] }).steps }), [loanType]);
  const totalSteps = steps.length + 1;

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(() => buildInitialData(steps, loanType));

  useEffect(() => { setFormData(buildInitialData(steps ,loanType)); }, [steps]);

  const isStepValid = useCallback(() => {
    if (step === 0) return true;
    if (step === totalSteps) return formData.termsAccepted;
    const fields = steps[step - 1];
    return fields.every((f) => {
      const v = formData[f.name];
      return f.type === "file" ? (f.multiple ? v.length : v !== null) : Boolean(v);
    });
  }, [step, totalSteps, formData, steps]);

  const closeModal = () => { setIsOpen(false); setStep(0); setFormData(buildInitialData(steps, loanType)); };


  const handleChange = (e) => {
    const { name, files, type, checked, value, multiple } = e.target;
    if (files) {
      const filesArr = multiple ? Array.from(files) : [files[0]];
      const docObjs = filesArr.map((f) => ({ fieldName: name, file: f }));
      setFormData((prev) => ({
        ...prev,
        [name]: multiple ? filesArr : filesArr[0],
        documents: [
          ...prev.documents.filter((d) => d.fieldName !== name),
          ...docObjs,
        ],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("loanType", formData.loanType);
    formPayload.append("loanType", loanType);
  
    Object.entries(formData).forEach(([k, v]) => {
      if (["termsAccepted", "documents"].includes(k)) return;
      if (v instanceof File || Array.isArray(v) && v[0] instanceof File) return; 
      formPayload.append(k, v);
    });

    formData.documents.forEach((d) => formPayload.append("documents", d.file));
    formPayload.append("documentsMeta", JSON.stringify(formData.documents.map((d) => ({
      fieldName: d.fieldName,
      originalName: d.file.name,
      mimeType: d.file.type,
    }))));

    console.log("formdata",formData)

    closeModal();
    toast.success("Application submitted!");

    /*
    fetch("/api/upload-docs", { method: "POST", body: formPayload })
      .then((res) => {
        if (!res.ok) throw new Error("Submission failed");
        toast.success("Application submitted!");
        closeModal();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to submit. Please try again.");
      });
    */
  };

  const [direction, setDirection] = useState("none");
  const goNext = () => { setDirection("left"); setTimeout(() => setStep((s) => s + 1), 50); };
  const goBack = () => { setDirection("right"); setTimeout(() => setStep((s) => s - 1), 50); };
  useEffect(() => {
    if (direction !== "none") {
      const t = setTimeout(() => setDirection("none"), 300);
      return () => clearTimeout(t);
    }
  }, [direction]);

  return (
    <>
      <button
        onClick={() => { setFormData(buildInitialData(steps ,loanType)); setStep(0); setIsOpen(true); }}
        className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
      >
        Apply <ArrowRight className="h-4 w-4 group-hover:translate-x-1" />
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
                <Dialog.Panel className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                  <ProgressHeader step={step} loanType={loanType} onClose={closeModal} />

                  <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <StepContent
                      step={step}
                      loanType={loanType}
                      steps={steps}
                      formData={formData}
                      handleChange={handleChange}
                    />

                    <div className="flex justify-between pt-4">
                      {step > 0 ? (
                        <button type="button" className="flex items-center gap-1 rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300" onClick={goBack}>
                          <ChevronLeft className="h-4 w-4" /> Back
                        </button>
                      ) : <div />}

                      {step < totalSteps ? (
                        <button type="button" disabled={!isStepValid()} className="flex items-center gap-1 rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50 hover:bg-blue-700" onClick={goNext}>
                          Next <ChevronRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <button type="submit" disabled={!isStepValid()} className="rounded bg-green-600 px-4 py-2 text-sm text-white disabled:opacity-50 hover:bg-green-700">
                          Submit
                        </button>
                      )}
                    </div>
                  </form>
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
