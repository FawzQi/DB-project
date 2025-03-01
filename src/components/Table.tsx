import React from "react";

interface Subaspect {
  name: string;
  value: number;
}

interface Aspect {
  name: string;
  subaspects: Subaspect[];
}

interface AspectProps {
  aspect: Aspect[];
}

enum Operator {
  IN_RANGE = 1,
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
  formDatas: FormData[];
}

export default function ScoringTable({ formDatas }: FormDataProps) {
  const getIndexWithMostSubaspects = (aspects: Aspect[]): number => {
    let maxSubaspects = 0;
    let indexWithMostSubaspects = -1;

    aspects.forEach((aspect, index) => {
      if (aspect.subaspects.length > maxSubaspects) {
        maxSubaspects = aspect.subaspects.length;
        indexWithMostSubaspects = index;
      }
    });

    return indexWithMostSubaspects;
  };

  const indexWithMostSubaspects = getIndexWithMostSubaspects(
    formDatas[0].aspect
  );
  console.log("Index with most subaspects:", indexWithMostSubaspects);

  return (
    <>
      {formDatas.map((formData, formIndex) => (
        <div className="container mt-4" key={formIndex}>
          <h4 className="text-center mb-3">LEMBAR PENILAIAN</h4>

          <div className="mb-3 border p-3">
            <strong>Nama Project: {formData.name}</strong>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Masukkan nama project..."
            />
          </div>

          <table className="table table-bordered text-center">
            <thead className="table-success">
              <tr>
                <th colSpan={2 * formData.aspect.length}>
                  Nama Project: {formData.name}
                </th>
                <th colSpan={2}>Doc V8976479649298</th>
              </tr>
              <tr>
                <th rowSpan={2}>NO</th>
                <th rowSpan={2}>Chapter</th>
                {formData.aspect.map((aspect, aspectIndex) => (
                  <th key={aspectIndex} colSpan={2}>
                    {aspect.name}
                  </th>
                ))}
              </tr>
              <tr>
                {formData.aspect.map((_, aspectIndex) => (
                  <React.Fragment key={aspectIndex}>
                    <th>Sub-Aspek</th>
                    <th>Jumlah Kesalahan</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {formData.aspect[indexWithMostSubaspects]?.subaspects.map(
                (_, subIndex) => (
                  <tr key={subIndex}>
                    {subIndex === 0 && (
                      <>
                        <td
                          rowSpan={
                            formData.aspect[indexWithMostSubaspects]?.subaspects
                              .length
                          }
                        ></td>
                        <td
                          rowSpan={
                            formData.aspect[indexWithMostSubaspects]?.subaspects
                              .length
                          }
                        ></td>
                      </>
                    )}
                    {formData.aspect.map((aspect, aspectIndex) => (
                      <React.Fragment key={aspectIndex}>
                        <td>{aspect.subaspects[subIndex]?.name || "-"}</td>
                        <td>{aspect.subaspects[subIndex]?.value ?? "-"}</td>
                      </React.Fragment>
                    ))}
                  </tr>
                )
              )}
              <tr className="table-warning">
                <td colSpan={2}>Total Kesalahan</td>
                <td colSpan={2}>V = a+b+c+d</td>
                <td colSpan={2}>W</td>
                <td colSpan={2}>X</td>
                <td colSpan={2}>Y</td>
              </tr>
            </tbody>
          </table>

          <div className="border p-3 mt-3">
            <p>
              <strong>Bobot Chapter:</strong> TOTAL KESALAHAN = V + W + X + Y
            </p>
            <p>
              <strong>Nilai Bobot Chapter:</strong> TOTAL NILAI = 90 - [TOTAL
              KESALAHAN]
            </p>
            <p>
              <strong>Predikat:</strong> <span className="border p-2"></span>
            </p>
            <p>
              <strong>Status:</strong> [LANJUT] [ULANG]
            </p>
          </div>

          <div className="mt-3 row">
            <div className="col-md-6">
              <strong>Catatan Penguji:</strong>
              <textarea className="form-control mt-2" rows={3}></textarea>
            </div>
            <div className="col-md-6 text-end">
              <strong>Tanda Tangan Penguji:</strong>
              <div className="border mt-2 p-4"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
