import { useState } from "react";

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
  predicate: string;
}

interface ScoreProps {
  scores: Score[];
  onUpdateScores: (newScores: Score[]) => void;
}

const API_BASE_URI: string = import.meta.env.VITE_API_BASE_URI as string

export default function Scoring({ scores, onUpdateScores }: ScoreProps) {
  const [scoresList, setScoresList] = useState<Score[]>(scores);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newOperator, setNewOperator] = useState<Operator>(Operator.IN_RANGE);
  const [newPredicate, setNewPredicate] = useState<string>("New Status");
  const [newUpper, setNewUpper] = useState<number>(0);
  const [newLower, setNewLower] = useState<number>(0);

  const handleEditButton = (index: number) => {
    setEditIndex(index);
    setNewOperator(scoresList[index].operator);
    setNewUpper(scoresList[index].upper);
    setNewLower(scoresList[index].lower);
    setNewPredicate(scoresList[index].predicate);
  };

  const handleCancelButton = () => {
    setEditIndex(null);
  };

  const handleEditOperator = (operator: Operator) => {
    setNewOperator(operator);
  };

  const handleSaveEdit = (index: number) => {
    const updatedScores = scoresList.map((score, i) =>
      i === index
        ? {
            operator: newOperator,
            upper: newUpper,
            lower: newLower,
            predicate: newPredicate,
          }
        : score
    );
    const updatedScoreGrade = scores[index].predicate;
    fetch(`${API_BASE_URI}/api/grades?`+new URLSearchParams({grade: updatedScoreGrade as string}), {
      mode: "cors",
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"grade": newPredicate, "upperLimit": newUpper, "lowerLimit": newLower})
    }).then()
    setScoresList(updatedScores);
    setEditIndex(null);
    onUpdateScores(updatedScores);
  };

  const handleAddScore = () => {
    const updatedScores = [
      ...scoresList,
      {
        operator: Operator.IN_RANGE,
        upper: 1,
        lower: 0,
        predicate: "New Score",
      },
    ];
    fetch(`${API_BASE_URI}/api/grades`, {
      mode: "cors",
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"grade": "New Score", "upperLimit": 1, "lowerLimit": 0})
    }).then()
    setScoresList(updatedScores);
    onUpdateScores(updatedScores);
  };

  const handleDeleteScore = (index: number) => {
    const updatedScores = scoresList.filter((_, i) => i !== index);
    const deletedGrade = scores[index].predicate
    fetch(`${API_BASE_URI}/api/grades?`+new URLSearchParams({grade: deletedGrade as string}), {
      mode: "cors",
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    }).then()
    setScoresList(updatedScores);
    onUpdateScores(updatedScores);
  };

  return (
    <div className="container">
      <div className="d-flex align-items-center gap-2 mb-3">
        <h4 className="m-0">Scoring:</h4>
        <button className="btn btn-primary" onClick={handleAddScore}>
          Tambah Penilaian
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover w-100">
          <thead>
            <tr>
              <th>Value</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {scoresList.map((score, index) => (
              <tr key={index}>
                {editIndex === index ? (
                  <>
                    <td>
                      <label htmlFor="SelectOperator">Select Operator</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        id="SelectOperator"
                        value={newOperator}
                        onChange={(e) =>
                          handleEditOperator(Number(e.target.value))
                        }
                      >
                        <option value={Operator.IN_RANGE}>Range</option>
                        <option value={Operator.GREATER_THAN_OR_EQUAL}>
                          {">="}
                        </option>
                        <option value={Operator.LESS_THAN_OR_EQUAL}>
                          {"<="}
                        </option>
                      </select>
                      {newOperator === Operator.IN_RANGE ? (
                        <>
                          <label htmlFor="SelectRangeAtas"> Batas atas </label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Batas Atas"
                            id="SelectRangeAtas"
                            value={newUpper}
                            onChange={(e) =>
                              setNewUpper(parseInt(e.target.value))
                            }
                            onBlur={(e) => {
                              if (e.target.value === "") {
                                setNewUpper(0);
                              }
                            }}
                            min={0}
                          />
                          <label htmlFor="SelectRangeBawah">Batas Bawah </label>{" "}
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Batas Bawah"
                            id="SelectRangeBawah"
                            value={newLower}
                            onChange={(e) =>
                              setNewLower(parseInt(e.target.value))
                            }
                            onBlur={(e) => {
                              if (e.target.value === "") {
                                setNewLower(0);
                              }
                            }}
                            min={0}
                          />
                        </>
                      ) : (newOperator === Operator.GREATER_THAN_OR_EQUAL ? 
                            (<>
                              <label htmlFor="InputValue"></label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Nilai"
                                id="InputValue"
                                value={newLower}
                                onChange={(e) =>
                                  setNewLower(Number(e.target.value))
                                }
                              />
                            </>)
                            : (<>
                              <label htmlFor="InputValue"></label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Nilai"
                                id="InputValue"
                                value={newUpper}
                                onChange={(e) =>
                                  setNewLower(Number(e.target.value))
                                }
                              />
                            </>)
                      )}
                    </td>
                    <td>
                      <label htmlFor="InputStatus">Status</label>
                      <input
                        type="text"
                        className="form-control"
                        id="iInputStatus"
                        value={newPredicate}
                        onChange={(e) => setNewPredicate(e.target.value)}
                      />
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2 mb-3">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleSaveEdit(index)}
                        >
                          Simpan
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={handleCancelButton}
                        >
                          Batal
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      {score.operator === Operator.IN_RANGE
                        ? `${score.upper} - ${score.lower}`
                        : score.operator === Operator.GREATER_THAN
                        ? `> ${score.lower}`
                        : score.operator === Operator.LESS_THAN
                        ? `< ${score.upper}`
                        : score.operator === Operator.GREATER_THAN_OR_EQUAL
                        ? `>= ${score.lower}`
                        : `<= ${score.upper}`}
                    </td>
                    <td>{score.predicate}</td>
                    <td className="d-flex gap-2">
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEditButton(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteScore(index)}
                      >
                        Hapus
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
