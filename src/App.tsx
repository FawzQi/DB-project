import ConfigBox from "./components/ConfigBox";
import FormTable from "./components/Table";
import { useEffect, useState } from "react";
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

const API_BASE_URI: string = import.meta.env.VITE_API_BASE_URI as string

export default function App() {
  const [configState, setConfigState] = useState<boolean>(false);
  const [configIndex, setConfigIndex] = useState<number>(0);
  const [formData, setFormData] = useState<any[]>([]);
  const [indexHideTable, setIndexHideTable] = useState<boolean[]>(Array(formData.length).fill(false));
  const [newProjectName, setNewProjectName] = useState<string>();

  useEffect(()=>{
    const interval = setInterval(() => {
      fetch(`${API_BASE_URI}/api/tableShow`, {
      mode: "cors",
      method: "GET"}).then().
      then((tableData)=>tableData.json())
      .then((data)=>{console.log(data);setFormData(data)});
    }, 1000);
    return () => clearInterval(interval);
  }, [])
  
  const updateFormData = async (newData: FormData, index: number) => {
    const updatedFormDataID = formData[index].id;
    const updatedComment: string = newData.catatan || " "
    await fetch(`${API_BASE_URI}/api/projects?`+new URLSearchParams({project_id: updatedFormDataID}), {
      mode: "cors",
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"name": newData.name, "comment": updatedComment})
    })

    setConfigIndex(0);
    setConfigState(false);
  };

  const handleHideTable = (index: number) => {
    const updatedIndexHideTable = [...indexHideTable];
    updatedIndexHideTable[index] = !updatedIndexHideTable[index];
    setIndexHideTable(updatedIndexHideTable);
    setConfigState(false);
    setConfigIndex(0);
  };
  

  const handleAddProject = () => {
    const name = newProjectName || "New Project";
    fetch(`${API_BASE_URI}/api/projects`, {
      mode: "cors",
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"name": name})
    }).then()
    
  };
  const handleDeleteProject = (index: number) => {
    const updatedIndexHideTable = indexHideTable.filter((_, i) => i !== index);
    const deletedFormDataID = formData[index].id;
    console.log(deletedFormDataID);

    fetch(`${API_BASE_URI}/api/projects?`+new URLSearchParams({project_id: deletedFormDataID}).toString(), {
      mode: "cors",
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    }).then()
    setIndexHideTable(updatedIndexHideTable);
  };

  return (
    <>
      <div className="container mt-2">
        <div className="row justify-content-center">
          <div className="col-md-30">
            <div className="card shadow-lg p-3">
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Add New Project</label>
                  <div className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add New Project"
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={handleAddProject}
                    >
                      Add Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-2">
        <div className="row justify-content-center">
          <div className="col-md-30">
            <div className="card shadow-lg p-3">
              <h3 className="card-title text-center">List Project</h3>

              {formData.map((data, index) => (
                <React.Fragment key={`${data.name}-${index}`}>
                  <div className="card text-center">
                    <div className="card-header d-flex justify-content-between">
                      <span>{data.name}</span>
                      <span>Tanggal Penilaian: {data.gradingDate}</span>
                      <span>ID: {data.id}</span>
                      <ul className="nav nav-pills card-header-pills">
                        <li className="nav-item me-2">
                          <a
                            className="btn btn-primary"
                            onClick={() => handleHideTable(index)}
                          >
                            {indexHideTable[index] ? "Hide" : "Show"} Table
                          </a>
                        </li>
                        <li className="nav-item me-2">
                          <a
                            className="btn btn-warning"
                            onClick={() => {
                              setConfigState(true);
                              setConfigIndex(index);
                            }}
                          >
                            Edit
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="btn btn-danger"
                            onClick={() => handleDeleteProject(index)}
                          >
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      {configIndex === index && configState ? (
                        <ConfigBox
                          formData={formData[configIndex]}
                          index={configIndex}
                          updateFormData={updateFormData}
                        />
                      ) : (
                        <div>
                          {indexHideTable[index] && (
                            <div className="container-lg">
                              <FormTable formData={data} />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
