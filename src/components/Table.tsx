import React from "react";
interface Subaspect {
  name: string;
  value: number;
}

interface Aspect {
  name: string;
  subaspects: Subaspect[];
}

// interface AspectProps {
//   aspect: Aspect[];
// }

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
  aspect: Aspect[];
  scores: Score[];
}

interface FormDataProps {
  formData: FormData;
}

export default function FormTable({ formData }: FormDataProps) {
  const getAspectIndexWithMaxSubaspect = (aspects: Aspect[]) => {
    let max = 0;
    let index = 0;
    aspects.forEach((aspect, aspectIndex) => {
      if (aspect.subaspects.length > max) {
        max = aspect.subaspects.length;
        index = aspectIndex;
      }
    });
    return index;
  };

  // const FormDataAspectIndexWithMostSubaspect: number[] = [];
  // formData.map((formData) => {
  //   FormDataAspectIndexWithMostSubaspect.push(
  //     getAspectIndexWithMaxSubaspect(formData.aspect)
  //   );
  // });

  const getMaxSubaspect = (aspects: Aspect[]) => {
    let max = 0;
    aspects.forEach((aspect) => {
      if (aspect.subaspects.length > max) {
        max = aspect.subaspects.length;
      }
    });
    return max;
  };

  // const FormDataMaxSubAspect: number[] = [];
  // formDatas.map((formData) => {
  //   FormDataMaxSubAspect.push(getMaxSubaspect(formData.aspect));
  //   console.log(getMaxSubaspect(formData.aspect));
  // });

  const operatorSign = ["-", ">", "<", ">=", "<="];

  return (
    <>
      {/* {formDatas.map((formData, formIndex) => ( */}
      {/* <div key={`${formData.name}-${formIndex}`}> */}
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th
              className="table-success "
              colSpan={formData.aspect.length * 2 + 2}
            >
              lembar penilaian
            </th>
          </tr>
          <tr>
            <th
              colSpan={formData.aspect.length * 2}
              style={{ textAlign: "left" }}
            >
              Project Name {formData.name}
            </th>
            <th colSpan={2} style={{ textAlign: "left" }}>
              Doc
            </th>
          </tr>
          <tr>
            <th rowSpan={2}>No</th>
            <th rowSpan={2}>Chapter</th>
            {formData.aspect.map((aspect, index) => (
              <th key={`${aspect.name}-${index}`} colSpan={2}>
                {aspect.name}{" "}
              </th>
            ))}
          </tr>
          <tr>
            {formData.aspect.map((_, index) => (
              <React.Fragment key={`subaspect-header-${index}`}>
                <th>Sub-Aspek </th>
                <th>Kesalahan </th>
              </React.Fragment>
            ))}
          </tr>
          <tr>
            <th
              className="table-success"
              colSpan={formData.aspect.length * 2 + 2}
            ></th>
          </tr>
        </thead>
        <tbody>
          {formData.aspect[
            getAspectIndexWithMaxSubaspect(formData.aspect)
          ].subaspects.map((_, subaspectIndex) => (
            <React.Fragment key={`subaspect-row-${subaspectIndex}`}>
              <tr>
                {subaspectIndex == 0 && (
                  <>
                    <td rowSpan={getMaxSubaspect(formData.aspect) + 2}> a</td>
                    <td rowSpan={getMaxSubaspect(formData.aspect) + 2}>a </td>
                  </>
                )}
                {formData.aspect.map((aspect, index) => (
                  <React.Fragment key={`${aspect.name}-subaspect-${index}`}>
                    {subaspectIndex < aspect.subaspects.length ? (
                      <>
                        <td>{aspect.subaspects[subaspectIndex].name}</td>
                        <td>{aspect.subaspects[subaspectIndex].value}</td>
                      </>
                    ) : (
                      <>
                        <td>-</td>
                        <td>-</td>
                      </>
                    )}
                  </React.Fragment>
                ))}
              </tr>
            </React.Fragment>
          ))}
          <tr>
            <th
              className="table-success"
              colSpan={formData.aspect.length * 2}
            ></th>
          </tr>
          <tr>
            {formData.aspect.map((aspect, index) => {
              let totalKesalahan = 0;
              aspect.subaspects.forEach((subaspect) => {
                totalKesalahan += subaspect.value;
              });
              return (
                <React.Fragment key={`total-kesalahan-${index}`}>
                  <td>total Kesalahan </td>
                  <td>{totalKesalahan} </td>
                </React.Fragment>
              );
            })}
          </tr>
          <tr>
            <th
              className="table-success"
              colSpan={formData.aspect.length * 2 + 2}
            ></th>
          </tr>
          <tr style={{ textAlign: "left" }}>
            <th colSpan={2}>Bobot Chapter</th>
            <th colSpan={formData.aspect.length - 1}>Total Kesalahan :</th>
            <th className="table-success"></th>
            <th colSpan={formData.aspect.length}>Predikat</th>
          </tr>
          <tr style={{ textAlign: "left" }}>
            <th colSpan={2}>Nilai Bobot Chapter</th>
            <th colSpan={formData.aspect.length - 1}>Total Nilai :</th>
            <th className="table-success"></th>
            <th colSpan={formData.aspect.length}>Status</th>
          </tr>
          <tr>
            <th
              colSpan={formData.aspect.length * 2 + 2}
              className="table-success"
            ></th>
          </tr>
          {formData.scores.map((score, scoreIndex) => (
            <tr key={`score-row-${scoreIndex}`}>
              {score.operator === Operator.IN_RANGE ? (
                <td>
                  {" "}
                  {`${score.upper} ${operatorSign[score.operator]} ${
                    score.lower
                  }`}{" "}
                </td>
              ) : (
                <td> {`${operatorSign[score.operator]} ${score.lower}`} </td>
              )}
              <td>{score.status}</td>
              {scoreIndex === 0 && (
                <>
                  <td
                    colSpan={formData.aspect.length * 2 - 1}
                    rowSpan={formData.aspect.length}
                  >
                    catatan penguji:
                  </td>
                  <td rowSpan={formData.scores.length}>tanda tangan penguji</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="py-3"> </div>
      {/* </div> */}
      {/* ))} */}
    </>
  );
}
