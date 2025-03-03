import { useApp } from "@/AppContext";
import {
  Checkbox,
  Field,
  Label,
  Radio,
  RadioGroup,
  Switch,
} from "@headlessui/react";

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

interface TypeOption {
  name: string;
  label: string;
}

const TYPE_OPTIONS: Array<TypeOption> = [
  { name: "queryParams.limit", label: "Limites" },
  { name: "queryParams.derivative", label: "Derivadas" },
  { name: "queryParams.integral", label: "Integrais" },
];

interface DifficultyOption {
  name: string;
  label: string;
}

const DIFFICULTY_OPTIONS: Array<DifficultyOption> = [
  { name: "queryParams.easy", label: "Fáceis 😎" },
  { name: "queryParams.medium", label: "Médias 🤔" },
  { name: "queryParams.hard", label: "Difíceis 🤯" },
  { name: "queryParams.legendary", label: "Lendárias 💀" },
];

export function Form() {
  const { state, dispatch } = useApp();

  function handleChange(
    event: boolean | number,
    fieldName?: string,
    fieldType?: "checkbox" | "switch" | "radio",
  ) {
    const newFormData = { ...state.formData };

    if (fieldType === "checkbox" && typeof event === "boolean" && fieldName) {
      /* FormData.queryParams */
      const [field, nestedField] = fieldName.split(".");
      newFormData[field][nestedField] = event;
    } else if (fieldType === "switch" && typeof event === "boolean") {
      /* FormData.autoskip */
      newFormData["autoskip"] = event;
    } else if (fieldType === "radio" && typeof event === "number") {
      /* FormData.autoskipDelay */
      newFormData["autoskipDelay"] = event;
    }

    dispatch({ type: 'UPDATE_FORM_DATA', payload: newFormData });
  }

  return (
    <form className="xl:mt-16 xl:px-8 w-full flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Tipos</h3>
        <div className="select-none flex flex-col gap-1 px-2">
          {TYPE_OPTIONS.map((type: TypeOption) => (
            <div key={type.name} className="flex items-center gap-2">
              <Checkbox
                name={type.name}
                checked={state.formData.queryParams[type.name.split(".").pop() as keyof typeof state.formData.queryParams]}
                onChange={(checked) => handleChange(checked, type.name, "checkbox")}
                className="
                  cursor-pointer group size-4 rounded-sm border
                  border-[var(--border)] data-[checked]:border-none
                  bg-[var(--input-unchecked)] data-[checked]:bg-[var(--input-checked)]
              ">
                <svg className="stroke-white invisible group-data-[checked]:visible" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </Checkbox>
              <span>{type.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Dificuldades</h3>
        <div className="select-none flex flex-col gap-1 px-2">
          {DIFFICULTY_OPTIONS.map((type: TypeOption) => (
            <div key={type.name} className="flex items-center gap-2">
              <Checkbox
                name={type.name}
                checked={state.formData.queryParams[type.name.split(".").pop() as keyof typeof state.formData.queryParams]}
                onChange={(checked) => handleChange(checked, type.name, "checkbox")}
                className="
                  cursor-pointer group size-4 rounded-sm border
                  border-[var(--border)] data-[checked]:border-none
                  bg-[var(--input-unchecked)] data-[checked]:bg-[var(--input-checked)]
              ">
                <svg className="stroke-white invisible group-data-[checked]:visible" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </Checkbox>
              <span>{type.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="select-none flex items-center gap-2">
          <Switch
            checked={state.formData.autoskip}
            onChange={(checked) => handleChange(checked, undefined, "switch")}
            className="
              cursor-pointer group inline-flex h-5 w-10 items-center rounded-full transition
              bg-[var(--input-unchecked)] data-[checked]:bg-[var(--input-checked)]
          ">
            <span className="size-3 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
          </Switch>
          <span>Avançar automaticamente</span>
        </label>
        
        {state.formData.autoskip && (
          <div>
            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold">Intervalo do avanço</span>
              <RadioGroup
                name="autoskipDelay"
                value={state.formData.autoskipDelay}
                onChange={(value) => handleChange(value, undefined, "radio")}
                className="select-none flex flex-col gap-1 px-2"
              >
                {DELAY_OPTIONS.map((option: DelayOption) => (
                  <Field key={option.value} className="flex items-center gap-2">
                    <Radio
                      value={option.value}
                      className="
                        cursor-pointer group size-4 flex items-center justify-center rounded-full
                        border border-[var(--border)] data-[checked]:border-none
                        bg-[var(--input-unchecked)] data-[checked]:bg-[var(--input-checked)]
                    ">
                      <span className="invisible group-data-[checked]:visible size-2 rounded-full bg-white" />
                    </Radio>
                    <Label>{option.label}</Label>
                  </Field>
                ))}
              </RadioGroup>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
