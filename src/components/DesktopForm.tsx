import type { FormData } from "../types/types";
import { createQueryString } from "../lib/createQueryString";

export function DesktopForm({
  formData,
  setFormData,
  setQueryString,
}: {
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  setQueryString: React.Dispatch<React.SetStateAction<string>>,
}) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked, value } = e.target;
    
    let newFormData;
    if (name === "autoskip") {
      newFormData = ({ ...formData, [name]: checked });
    } else if (name === "autoskipDelay") {
      newFormData = ({ ...formData, [name]: Number.parseFloat(value) });
    } else {
      newFormData = ({
        ...formData,
        params: {
          ...formData.params,
          [name]: checked,
        },
      });
    }

    const queryString = createQueryString(newFormData.params);

    setQueryString(queryString);
    setFormData(newFormData);
  }
  
  return (
    <form className="py-8 flex flex-col gap-4">
      <div>
        <p className="text-lg font-semibold">Tipo</p>
        <div className="flex flex-col gap-0.5 px-2">
          <div className="flex gap-1">
            <input
              name="limit"
              type="checkbox"
              onChange={handleChange}
              checked={formData.params.limit}
            />
            <label htmlFor="limit">Limites</label>
          </div>
          <div className="flex gap-1">
            <input
              name="derivative"
              type="checkbox"
              onChange={handleChange}
              checked={formData.params.derivative}
            />
            <label htmlFor="derivative">Derivadas</label>
          </div>
          <div className="flex gap-1">
            <input
              name="integral"
              type="checkbox"
              onChange={handleChange}
              checked={formData.params.integral}
            />
            <label htmlFor="integral">Integrais</label>
          </div>
        </div>
      </div>
      <div>
        <p className="text-lg font-semibold">Dificuldade</p>
        <div className="flex flex-col gap-0.5 px-2">
          <div className="flex gap-1">
            <input
              name="easy"
              type="checkbox"
              onChange={handleChange}
              checked={formData.params.easy}
            />
            <label htmlFor="easy">Fáceis 😎</label>
          </div>
          <div className="flex gap-1">
            <input
              name="medium"
              type="checkbox"
              onChange={handleChange}
              checked={formData.params.medium}
            />
            <label htmlFor="medium">Médias 🤔</label>
          </div>
          <div className="flex gap-1">
            <input
              name="hard"
              type="checkbox"
              onChange={handleChange}
              checked={formData.params.hard}
            />
            <label htmlFor="hard">Difíceis 🤯</label>
          </div>
          <div className="flex gap-1">
            <input
              name="legendary"
              type="checkbox"
              onChange={handleChange}
              checked={formData.params.legendary}
            />
            <label htmlFor="legendary">Lendárias 💀</label>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex gap-1">
          <input
            name="autoskip"
            type="checkbox"
            onChange={handleChange}
            checked={formData.autoskip}
          />
          <label htmlFor="autoskip">Avançar automaticamente</label>
        </div>
        {formData.autoskip &&
          <div className="flex flex-col gap-1">
            <label htmlFor="autoskip">Intervalo do avanço</label>
            <div className="px-2">
              <div className="flex items-center gap-1">
                <input
                  name="autoskipDelay"
                  type="radio"
                  value={0.5}
                  onChange={handleChange}
                  checked={formData.autoskipDelay.toString() === "0.5"}
                />
                <label>0,5 segundo</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  name="autoskipDelay"
                  type="radio"
                  value={1.0}
                  onChange={handleChange}
                  checked={formData.autoskipDelay.toString() === "1"}
                />
                <label>1 segundo</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  name="autoskipDelay"
                  type="radio"
                  value={2.0}
                  onChange={handleChange}
                  checked={formData.autoskipDelay.toString() === "2"}
                />
                <label>2 segundos</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  name="autoskipDelay"
                  type="radio"
                  value={4.0}
                  onChange={handleChange}
                  checked={formData.autoskipDelay.toString() === "4"}
                />
                <label>4 segundos</label>
              </div>
            </div>
          </div>
        }
      </div>
    </form>
  );
}
