import { useApp } from "@/AppContext";
import {
  Checkbox,
  Field,
  Label,
  Radio,
  RadioGroup,
  Switch,
  Transition,
} from "@headlessui/react";
import { createQueryString } from "@/lib/createQueryString";

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

interface QueryTypeOption {
  name: string;
  label: string;
}

const QUERY_TYPE_OPTIONS: Array<QueryTypeOption> = [
  { name: "type.limit", label: "Limites" },
  { name: "type.derivative", label: "Derivadas" },
  { name: "type.integral", label: "Integrais" },
];

interface QueryDifficultyOption {
  name: string;
  label: string;
}

const QUERY_DIFFICULTY_OPTIONS: Array<QueryDifficultyOption> = [
  { name: "difficulty.easy", label: "Fáceis 😎" },
  { name: "difficulty.medium", label: "Médias 🤔" },
  { name: "difficulty.hard", label: "Difíceis 🤯" },
  { name: "difficulty.legendary", label: "Lendárias 💀" },
];

export function Form() {
  const { state, dispatch } = useApp();

  function handleChange(
    event: boolean | number,
    fieldType: "checkbox" | "switch" | "radio",
    fieldName?: string,
  ) {
    const newFormData = { ...state.formData };

    if (fieldType === "checkbox" && typeof event === "boolean" && !event && fieldName) {
      let typeCount = 0;
      for (const key of Object.keys(newFormData.queryParams.type))
        if (newFormData.queryParams.type[key as keyof typeof newFormData.queryParams.type])
          typeCount++;

      let difficultyCount = 0;
      for (const key of Object.keys(newFormData.queryParams.difficulty))
        if (newFormData.queryParams.difficulty[key as keyof typeof newFormData.queryParams.difficulty])
          difficultyCount++;
      
      const field = fieldName.split(".")[1];

      if (
        typeCount === 1 && Object.keys(newFormData.queryParams.type).includes(field) ||
        difficultyCount === 1 && Object.keys(newFormData.queryParams.difficulty).includes(field)
      ) {
        dispatch({ type: "TOGGLE_DIALOG" });
        return;
      }
    }

    if (fieldType === "checkbox" && typeof event === "boolean" && fieldName) {
      const [prefix, suffix] = fieldName.split(".");
      newFormData.queryParams[prefix][suffix] = event;
    } else if (fieldType === "switch" && typeof event === "boolean") {
      newFormData.autoskip = event;
    } else if (fieldType === "radio" && typeof event === "number") {
      newFormData.autoskipDelay = event;
    }

    const newQueryString = createQueryString(newFormData.queryParams);

    dispatch({ type: "UPDATE_FORM_DATA", payload: newFormData });
    dispatch({ type: "UPDATE_QUERY_STRING", payload: newQueryString });
  }

  return (
    <form className="xl:mt-16 xl:px-12 w-full flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Tipos</h3>
        <div className="select-none flex flex-col gap-1 px-2">
          {QUERY_TYPE_OPTIONS.map((type: QueryTypeOption) => (
            <div key={type.name} className="flex items-center gap-2">
              <Checkbox
                name={type.name}
                checked={state.formData.queryParams.type[type.name.split(".").pop() as keyof typeof state.formData.queryParams.type]}
                onChange={(checked) => handleChange(checked, "checkbox", type.name)}
                className="
                  cursor-pointer group size-4 rounded-sm border border-[var(--border)]
                  data-[checked]:border-none bg-[var(--input-unchecked)]
                  data-[checked]:bg-[var(--input-checked)] transition duration-75
              ">
                <svg className="stroke-white transition duration-75 opacity-0 group-data-[checked]:opacity-100" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}>
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
          {QUERY_DIFFICULTY_OPTIONS.map((difficulty: QueryDifficultyOption) => (
            <div key={difficulty.name} className="flex items-center gap-2">
              <Checkbox
                name={difficulty.name}
                checked={state.formData.queryParams.difficulty[difficulty.name.split(".").pop() as keyof typeof state.formData.queryParams.difficulty]}
                onChange={(checked) => handleChange(checked, "checkbox", difficulty.name)}
                className="
                  cursor-pointer group size-4 rounded-sm border border-[var(--border)]
                  data-[checked]:border-none bg-[var(--input-unchecked)]
                  data-[checked]:bg-[var(--input-checked)] transition duration-75
              ">
                <svg className="stroke-white transition duration-75 opacity-0 group-data-[checked]:opacity-100" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </Checkbox>
              <span>{difficulty.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="select-none flex items-center gap-2">
          <Switch
            checked={state.formData.autoskip}
            onChange={(checked) => handleChange(checked, "switch", undefined)}
            className="
              cursor-pointer group inline-flex h-5 w-10 items-center rounded-full transition
              bg-[var(--input-unchecked)] data-[checked]:bg-[var(--input-checked)]
          ">
            <span className="size-3 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
          </Switch>
          <span>Avançar automaticamente</span>
        </label>

        <Transition show={state.formData.autoskip}>
          <div className="transition data-[closed]:opacity-0 duration-100">
            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold">Intervalo do avanço</span>
              <RadioGroup
                name="autoskipDelay"
                value={state.formData.autoskipDelay}
                onChange={(value) => handleChange(value, "radio", undefined)}
                className="select-none flex flex-col gap-1 px-2"
              >
                {DELAY_OPTIONS.map((option: DelayOption) => (
                  <Field key={option.value} className="flex items-center gap-2">
                    <Radio
                      value={option.value}
                      className="
                        cursor-pointer group size-4 flex items-center justify-center rounded-full
                        border border-[var(--border)] data-[checked]:border-none bg-[var(--input-unchecked)]
                        data-[checked]:bg-[var(--input-checked)] transition duration-100
                    ">
                      <span className="
                        invisible group-data-[checked]:visible rounded-full bg-white size-2
                      "/>
                    </Radio>
                    <Label>{option.label}</Label>
                  </Field>
                ))}
              </RadioGroup>
            </div>
          </div>
        </Transition>
      </div>
    </form>
  );
}
