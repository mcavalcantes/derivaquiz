import { useEffect } from "react";
import { createQueryString } from "../lib/createQueryString";
import type { FormData } from "../types/types";

interface DelayOption {
  value: number;
  label: string;
}

const DELAY_OPTIONS: Array<DelayOption> = [
  { value: 500, label: "0,5 segundo" },
  { value: 1000, label: "1 segundo" },
  { value: 2000, label: "2 segundos" },
  { value: 4000, label: "4 segundos" },
];

export function Form({
  formData,
  setFormData,
  setQueryString,
}: {
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  setQueryString: React.Dispatch<React.SetStateAction<string>>,
}) {
  useEffect(() => {
    setQueryString(createQueryString(formData.queryParams));
  }, [formData.queryParams, setQueryString]);

  const handleCheckboxChange = (name: string, checked: boolean) => {
    if (name === "autoskip") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({
        ...prev,
        queryParams: {
          ...prev.queryParams,
          [name]: checked,
        },
      }));
    }
  };

  const handleRadioChange = (value: number) => {
    setFormData((prev) => ({ ...prev, autoskipDelay: value }));
  };
  
  return (
    <form className="xl:mt-16 flex flex-col gap-4">
      <fieldset>
        <legend className="text-lg font-semibold">Tipo</legend>
        <div className="flex flex-col gap-0.5 px-2">
          {[
            { name: "limit", label: "Limites" },
            { name: "derivative", label: "Derivadas" },
            { name: "integral", label: "Integrais" },
          ].map(({ name, label }) => (
            <div key={name} className="flex gap-1">
              <input
                id={name}
                name={name}
                type="checkbox"
                onChange={(e) => handleCheckboxChange(name, e.target.checked)}
                checked={formData.queryParams[name as keyof typeof formData.queryParams]}
              />
              <label htmlFor={name}>{label}</label>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-lg font-semibold">Dificuldade</legend>
        <div className="flex flex-col gap-0.5 px-2">
          {[
            { name: "easy", label: "Fáceis 😎" },
            { name: "medium", label: "Médias 🤔" },
            { name: "hard", label: "Difíceis 🤯" },
            { name: "legendary", label: "Lendárias 💀" },
          ].map(({ name, label }) => (
            <div key={name} className="flex gap-1">
              <input
                id={name}
                name={name}
                type="checkbox"
                onChange={(e) => handleCheckboxChange(name, e.target.checked)}
                checked={formData.queryParams[name as keyof typeof formData.queryParams]}
              />
              <label htmlFor={name}>{label}</label>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <div className="flex gap-1">
          <input
            id="autoskip"
            name="autoskip"
            type="checkbox"
            onChange={(e) => handleCheckboxChange("autoskip", e.target.checked)}
            checked={formData.autoskip}
          />
          <label htmlFor="autoskip">Avançar automaticamente</label>
        </div>
        
        {formData.autoskip && (
          <div className="flex flex-col gap-1 mt-2">
            <label>Intervalo do avanço</label>
            <div className="px-2">
              {DELAY_OPTIONS.map((option) => (
                <div key={option.value} className="flex items-center gap-1">
                  <input
                    id={`delay-${option.value}`}
                    name="autoskipDelay"
                    type="radio"
                    value={option.value}
                    onChange={() => handleRadioChange(option.value)}
                    checked={formData.autoskipDelay === option.value}
                  />
                  <label htmlFor={`delay-${option.value}`}>{option.label}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      </fieldset>
    </form>
  );
}
