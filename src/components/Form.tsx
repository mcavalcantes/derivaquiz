// import { useEffect } from "react";
// import { Checkbox } from "@headlessui/react";
// import { Switch } from "@headlessui/react";
// import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
// import { createQueryString } from "../lib/createQueryString";
// import type { FormData } from "../types/types";

// interface DelayOption {
//   value: number;
//   label: string;
// }

// const DELAY_OPTIONS: Array<DelayOption> = [
//   { value: 500, label: "0,5 segundo" },
//   { value: 1000, label: "1 segundo" },
//   { value: 2000, label: "2 segundos" },
//   { value: 4000, label: "4 segundos" },
// ];

// export function Form({
//   formData,
//   setFormData,
//   setQueryString,
// }: {
//   formData: FormData,
//   setFormData: React.Dispatch<React.SetStateAction<FormData>>,
//   setQueryString: React.Dispatch<React.SetStateAction<string>>,
// }) {
//   useEffect(() => {
//     setQueryString(createQueryString(formData.queryParams));
//   }, [formData.queryParams, setQueryString]);

//   const handleCheckboxChange = (name: string, checked: boolean) => {
//     if (name === "autoskip") {
//       setFormData((prev) => ({ ...prev, [name]: checked }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         queryParams: {
//           ...prev.queryParams,
//           [name]: checked,
//         },
//       }));
//     }
//   };

//   const handleRadioChange = (value: number) => {
//     setFormData((prev) => ({ ...prev, autoskipDelay: value }));
//   };
  
//   return (
//     <form className="xl:mt-16 flex flex-col gap-4">
//       <fieldset>
//         <legend className="text-lg font-semibold">Tipo</legend>
//         <div className="flex flex-col gap-0.5 px-2">
//           {[
//             { name: "limit", label: "Limites" },
//             { name: "derivative", label: "Derivadas" },
//             { name: "integral", label: "Integrais" },
//           ].map(({ name, label }) => (
//             <div key={name} className="flex items-center gap-1">
//               <Checkbox
//                 id={name}
//                 name={name}
//                 checked={formData.queryParams[name as keyof typeof formData.queryParams]}
//                 onChange={(checked) => handleCheckboxChange(name, checked)}
//                 className="cursor-pointer group block size-4 rounded border data-[checked]:border-none bg-white data-[checked]:bg-blue-500"
//               >
//                 <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
//                   <path d="M3 8L6 11L11 3.5" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </Checkbox>
//               <label htmlFor={name}>{label}</label>
//             </div>
//           ))}
//         </div>
//       </fieldset>

//       <fieldset>
//         <legend className="text-lg font-semibold">Dificuldade</legend>
//         <div className="flex flex-col gap-0.5 px-2">
//           {[
//             { name: "easy", label: "Fáceis 😎" },
//             { name: "medium", label: "Médias 🤔" },
//             { name: "hard", label: "Difíceis 🤯" },
//             { name: "legendary", label: "Lendárias 💀" },
//           ].map(({ name, label }) => (
//             <div key={name} className="flex items-center gap-1">
//               <Checkbox
//                 id={name}
//                 name={name}
//                 checked={formData.queryParams[name as keyof typeof formData.queryParams]}
//                 onChange={(checked) => handleCheckboxChange(name, checked)}
//                 className="cursor-pointer group block size-4 rounded border data-[checked]:border-none bg-white data-[checked]:bg-blue-500"
//               >
//                 <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
//                   <path d="M3 8L6 11L11 3.5" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </Checkbox>
//               <label htmlFor={name}>{label}</label>
//             </div>
//           ))}
//         </div>
//       </fieldset>

//       <fieldset>
//         <div className="flex items-center gap-2">
//           <Switch
//             id="autoskip"
//             name="autoskip"
//             onChange={(checked) => handleCheckboxChange("autoskip", checked)}
//             checked={formData.autoskip}
//             className="cursor-pointer group inline-flex h-5 w-10 items-center rounded-full bg-gray-300 dark:bg-stone-400 transition data-[checked]:bg-blue-500"
//           >
//             <span className="size-3 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
//           </Switch>
//           <label htmlFor="autoskip">Avançar automaticamente</label>
//         </div>

//         {formData.autoskip && (
//           <div className="flex flex-col gap-1 mt-2">
//             <label className="text-lg font-semibold">Intervalo do avanço</label>
//             <RadioGroup
//               value={formData.autoskipDelay}
//               onChange={(value) => handleRadioChange(value)}
//               className="px-2"
//               aria-label="Intervalo entre os avanços automáticos"
//             >
//               {DELAY_OPTIONS.map((option: DelayOption) => (
//                 <Field key={option.value} className="py-0.5 flex items-center gap-2">
//                   <Radio
//                     value={option.value}
//                     className="cursor-pointer group flex size-4 items-center justify-center rounded-full border data-[checked]:border-none bg-white data-[checked]:bg-blue-500"
//                   >
//                     <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
//                   </Radio>
//                   <Label>{option.label}</Label>
//                 </Field>
//               ))}
//             </RadioGroup>
//           </div>
//         )}
//       </fieldset>
//     </form>
//   );
// }

import React from 'react';
import { useApp } from '../AppContext';

export function Form() {
  const { state, dispatch } = useApp();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    const newFormData = { ...state.formData };
    
    if (type === 'checkbox') {
      if (name.includes('.')) {
        // Handle nested properties like "queryParams.limit"
        const [parent, child] = name.split('.');
        newFormData[parent][child] = checked;
      } else {
        newFormData[name] = checked;
      }
    } else {
      // Handle inputs like number inputs
      newFormData[name] = type === 'number' ? parseInt(value) : value;
    }
    
    dispatch({ type: 'UPDATE_FORM_DATA', payload: newFormData });
  };
  
  return (
    <form className="w-full p-4">
      <div className="mb-4">
        <label className="block mb-2">
          <input
            type="checkbox"
            name="autoskip"
            checked={state.formData.autoskip}
            onChange={handleChange}
          />
          <span className="ml-2">Auto Skip</span>
        </label>
        
        {state.formData.autoskip && (
          <div className="ml-6">
            <label className="block">
              <span>Delay (ms):</span>
              <input
                type="number"
                name="autoskipDelay"
                value={state.formData.autoskipDelay}
                onChange={handleChange}
                min="500"
                max="10000"
                step="500"
                className="ml-2 w-20 border rounded p-1"
              />
            </label>
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <h3 className="font-bold mb-2">Question Types</h3>
        <label className="block">
          <input
            type="checkbox"
            name="queryParams.limit"
            checked={state.formData.queryParams.limit}
            onChange={handleChange}
          />
          <span className="ml-2">Limits</span>
        </label>
        <label className="block">
          <input
            type="checkbox"
            name="queryParams.derivative"
            checked={state.formData.queryParams.derivative}
            onChange={handleChange}
          />
          <span className="ml-2">Derivatives</span>
        </label>
        <label className="block">
          <input
            type="checkbox"
            name="queryParams.integral"
            checked={state.formData.queryParams.integral}
            onChange={handleChange}
          />
          <span className="ml-2">Integrals</span>
        </label>
      </div>
      
      <div>
        <h3 className="font-bold mb-2">Difficulty</h3>
        <label className="block">
          <input
            type="checkbox"
            name="queryParams.easy"
            checked={state.formData.queryParams.easy}
            onChange={handleChange}
          />
          <span className="ml-2">Easy</span>
        </label>
        <label className="block">
          <input
            type="checkbox"
            name="queryParams.medium"
            checked={state.formData.queryParams.medium}
            onChange={handleChange}
          />
          <span className="ml-2">Medium</span>
        </label>
        <label className="block">
          <input
            type="checkbox"
            name="queryParams.hard"
            checked={state.formData.queryParams.hard}
            onChange={handleChange}
          />
          <span className="ml-2">Hard</span>
        </label>
        <label className="block">
          <input
            type="checkbox"
            name="queryParams.legendary"
            checked={state.formData.queryParams.legendary}
            onChange={handleChange}
          />
          <span className="ml-2">Legendary</span>
        </label>
      </div>
    </form>
  );
}
