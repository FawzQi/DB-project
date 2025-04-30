import React from "react";

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
  status: string;
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

interface FormTableProps {
  formData: FormData;
}

const operatorSign = ["-", ">", "<", ">=", "<="];

const countAspectRowLength = (aspect: Aspect) => {
  return aspect.subaspects.length + 1; // +1 for the aspect row itself
};

const countChapterRowLength = (chapter: Chapter) => {
  return chapter.aspects.reduce((total, aspect) => {
    return total + countAspectRowLength(aspect);
  }, 1); // +1 for the chapter row itself
};

const calculateTotalChapterWeight = (formData: FormData) => {
  return formData.chapters.reduce(
    (total, chapter) => total + chapter.chapter_weight,
    0
  );
};

const calculateTotalErrors = (formData: FormData) => {
  return formData.chapters.reduce((totalErrors, chapter) => {
    return (
      totalErrors +
      chapter.aspects.reduce((aspectErrors, aspect) => {
        return (
          aspectErrors +
          aspect.subaspects.reduce((subErrors, subaspect) => {
            return subErrors + subaspect.value;
          }, 0)
        );
      }, 0)
    );
  }, 0);
};

export default function FormTable({ formData }: FormTableProps) {
  return (
    <table className="table table-bordered text-center">
      <thead>
        <tr>
          <th className="table-success" colSpan={6}>
            Lembar Penilaian
          </th>
        </tr>
        <tr>
          <th colSpan={6} style={{ textAlign: "left", fontWeight: "normal" }}>
            Project Name: {formData.name}
          </th>
          {/* <th colSpan={1} style={{ textAlign: "left", fontWeight: "normal" }}>
            Doc: {formData.doc_version}
          </th> */}
        </tr>
        <tr>
          <th rowSpan={2}>ID</th>
          <th rowSpan={2}>Chapter</th>
          <th colSpan={4} className="table-success">
            Parameter Penilaian
          </th>
        </tr>
        <tr>
          <th>Aspek</th>
          <th>Subaspek</th>
          <th>Jumlah Kesalahan</th>
          <th>Total kesalahan</th>
        </tr>
      </thead>
      <tbody>
        {formData.chapters.map((chapter) => (
          <React.Fragment key={`chapter-${chapter.id}`}>
            <tr style={{ borderWidth: "2px", borderStyle: "solid" }}>
              <td rowSpan={countChapterRowLength(chapter)}>
                {chapter.id}
              </td>
              <td rowSpan={countChapterRowLength(chapter) - 1}>
                {chapter.chapter_name}
              </td>
            </tr>

            {chapter.aspects.map((aspect, id) => (
              <React.Fragment key={`aspect-${aspect.name}`}>
                <tr>
                  <td rowSpan={countAspectRowLength(aspect)}>{aspect.name}</td>
                </tr>
                {aspect.subaspects.map((subaspect, index) => (
                  <tr key={`subaspect-${index}`}>
                    {id === chapter.aspects.length - 1 &&
                      index === aspect.subaspects.length - 1 && (
                        <td>Bobot Chapter : {chapter.chapter_weight}</td>
                      )}
                    <td>{subaspect.name}</td>
                    <td>{subaspect.value}</td>

                    {index === 0 && (
                      <td
                        rowSpan={aspect.subaspects.length}
                        className="align-middle"
                      >
                        {aspect.subaspects.reduce(
                          (sum, sub) => sum + sub.value,
                          0
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
        <tr>
          <td colSpan={6} className="table-success"></td>
        </tr>
        <tr>
          <td colSpan={2}>
            Total Bobot Chapter : {formData.totalChapterWeight}
          </td>
          <td>Total Kesalahan : {formData.totalMistakes}</td>
          <td className="table-success"></td>
          <td colSpan={2}>Predikat: {formData.grade}</td>
        </tr>
        <tr>
          <td colSpan={2}>Nilai Bobot Chapter</td>
          <td>Total Nilai : {formData.finalScore}</td>
          <td className="table-success"></td>
          <td colSpan={2}>Status: {formData.status}</td>
        </tr>
        <tr>
          <td colSpan={6} className="table-success"></td>
        </tr>
      </tbody>
      <tfoot>
        {formData.scores.map((score, index) => (
          <tr key={`score-${index}`}>
            {score.operator === 0 && (
              <td>
                {" "}
                {score.lower} {operatorSign[score.operator]} {score.upper}
              </td>
            )}
            {score.operator !== 0 && (
              <td>
                {operatorSign[score.operator]}
                {score.lower}
              </td>
            )}

            <td>{score.status}</td>
            {index === 0 && (
              <>
                <td rowSpan={formData.scores.length} colSpan={3}>
                  {formData.catatan}
                </td>
                <td rowSpan={formData.scores.length} colSpan={3}>
                  Tanda Tangan
                </td>
              </>
            )}
          </tr>
        ))}
      </tfoot>
    </table>
  );
}
