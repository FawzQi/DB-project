import { useState } from "react";
import ChapterF from "./Chapter";
import Scoring from "./Scoring";

interface Subaspect {
  id: number,
  name: string;
  value: number;
}

interface Aspect {
  id: number,
  name: string,
  totalMistakes: number,
  subaspects: Subaspect[]
}

interface Chapter {
  id: number,
  no_chapter: number;
  chapter_name: string;
  chapter_weight: number;
  aspects: Aspect[];
}

interface Score {
  operator: number;
  upper: number;
  lower: number;
  predicate: string;
}

interface FormData {
  id: number,
  name: string;
  gradingDate: Date,
  chapters: Chapter[],
  totalChapterWeight: number,
  finalScore: number,
  totalMistakes: number,
  grade: string,
  scores: Score[],
  catatan: string,
  status: string
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
        <div className="container mt-2">
          <div className="row justify-content-center">
            <div className="col-md-30">
              <div className="card shadow-lg p-3">
                <div className="card-body">
                  <h3 className="card-title text-center">Config Form</h3>
                  <div className="py-3"> </div>
                  {/* Form Input untuk Nama, Versi, No Bab, Nama Bab, dan Bobot Bab */}
                  <div className="mb-3">
                    <h5 style={{ textAlign: "left" }}>Nama Project</h5>
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
                  {/* <div className="mb-3">
                    <h5 style={{ textAlign: "left" }}>Versi Dokumen</h5>
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
                  </div> */}
                  <ChapterF
                    project_id={localFormData.id}
                    chapter={localFormData.chapters}
                    onUpdateChapter={(newChapters) =>
                      setLocalFormData({
                        ...localFormData,
                        chapters: newChapters,
                      })
                    }
                  />
                  <hr className="my-4" />

                  {/* Kirim fungsi update ke Scoring */}
                  <Scoring
                    scores={localFormData.scores}
                    onUpdateScores={(newScores) =>
                      setLocalFormData({ ...localFormData, scores: newScores })
                    }
                  />
                  {/* Tombol Simpan Perubahan */}
                  {/* Form Input untuk Catatan */}
                  <div className="mb-3 mt-3">
                    <h5 className="form-label  " style={{ textAlign: "left" }}>
                      Catatan
                    </h5>
                    <textarea
                      className="form-control"
                      value={localFormData.catatan}
                      onChange={(e) =>
                        setLocalFormData({
                          ...localFormData,
                          catatan: e.target.value,
                        })
                      }
                    ></textarea>
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
        </div>
      </header>
    </div>
  );
}
