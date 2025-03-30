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
  upper: number;
  lower: number;
  status: string;
}

interface FormData {
  name: string;
  doc_version: string;
  no_chapter: number;
  chapter_name: string;
  chapter_weight: number;
  aspect: Aspect[];
  scores: Score[];
  catatan: string;
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
                  {/* Form Input untuk Nama, Versi, No Bab, Nama Bab, dan Bobot Bab */}
                  <div className="mb-3">
                    <label className="form-label">Nama</label>
                    <input
                      type="text"
                      className="form-control"
                      value={localFormData.name}
                      onChange={(e) =>
                        setLocalFormData({
                          ...localFormData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Versi Dokumen</label>
                    <input
                      type="text"
                      className="form-control"
                      value={localFormData.doc_version}
                      onChange={(e) =>
                        setLocalFormData({
                          ...localFormData,
                          doc_version: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">No Bab</label>
                    <input
                      type="number"
                      className="form-control"
                      value={localFormData.no_chapter}
                      onChange={(e) =>
                        setLocalFormData({
                          ...localFormData,
                          no_chapter: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nama Bab</label>
                    <input
                      type="text"
                      className="form-control"
                      value={localFormData.chapter_name}
                      onChange={(e) =>
                        setLocalFormData({
                          ...localFormData,
                          chapter_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Bobot Bab</label>
                    <input
                      type="number"
                      className="form-control"
                      value={localFormData.chapter_weight}
                      onChange={(e) =>
                        setLocalFormData({
                          ...localFormData,
                          chapter_weight: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Catatan</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={localFormData.catatan}
                      onChange={(e) =>
                        setLocalFormData({
                          ...localFormData,
                          catatan: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>

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
