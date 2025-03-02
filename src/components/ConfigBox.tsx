import { useState } from "react";
import Aspect from "./Aspects";
import Scoring from "./Scoring";

interface Subaspect {
  name: string;
  value: number;
}

interface Aspect {
  name: string;
  subaspects: Subaspect[];
}

enum Operator {
  IN_RANGE = 0,
  GREATER_THAN,
  LESS_THAN,
  GREATER_THAN_OR_EQUAL,
  LESS_THAN_OR_EQUAL,
}

interface Score {
  operator: Operator;
  value: number[];
  status: string;
}

interface FormData {
  name: string;
  aspect: Aspect[];
  scores: Score[];
}

interface FormDataProps {
  formData: FormData;
  index: number;
  updateFormData: (newData: FormData, index: number) => void;
}

export default function ConfigBox({
  formData,
  index,
  updateFormData,
}: FormDataProps) {
  const [localFormData, setLocalFormData] = useState(formData);

  return (
    <div className="App">
      <header className="App-header">
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card shadow-lg p-3">
                <div className="card-body">
                  <h3 className="card-title text-center">Config Form</h3>
                  <div className="py-3"> </div>

                  {/* Kirim fungsi update ke Aspect */}
                  <Aspect
                    aspect={localFormData.aspect}
                    onUpdateAspect={(newAspects) =>
                      setLocalFormData({ ...localFormData, aspect: newAspects })
                    }
                  />

                  <div className="mb-4 pb-3 border-bottom"></div>

                  {/* Kirim fungsi update ke Scoring */}
                  <Scoring
                    scores={localFormData.scores}
                    onUpdateScores={(newScores) =>
                      setLocalFormData({ ...localFormData, scores: newScores })
                    }
                  />

                  {/* Tombol Simpan Perubahan */}
                  <button
                    className="btn btn-primary mt-3"
                    onClick={() => updateFormData(localFormData, index)}
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
