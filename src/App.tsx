import ConfigBox from "./components/ConfigBox";
import FormTable from "./components/Table";
import { useState } from "react";
import React from "react";

const myData = [
  {
    name: "Employee Performance Review",

    chapters: [
      {
        no_chapter: 1,
        chapter_name: "Introduction",
        chapter_weight: 5,
        aspects: [
          {
            name: "Overview",
            subaspects: [
              { name: "Purpose", value: 10 },
              { name: "Scope", value: 8 },
            ],
          },
        ],
      },
      {
        no_chapter: 2,
        chapter_name: "Performance Metrics",
        chapter_weight: 40,
        aspects: [
          {
            name: "Quality of Work",
            subaspects: [
              { name: "Accuracy", value: 15 },
              { name: "Consistency", value: 10 },
            ],
          },
          {
            name: "Efficiency",
            subaspects: [
              { name: "Time Management", value: 10 },
              { name: "Resource Utilization", value: 5 },
            ],
          },
        ],
      },
      {
        no_chapter: 3,
        chapter_name: "Behavioral Assessment",
        chapter_weight: 30,
        aspects: [
          {
            name: "Teamwork",
            subaspects: [
              { name: "Collaboration", value: 12 },
              { name: "Conflict Resolution", value: 8 },
            ],
          },
          {
            name: "Communication",
            subaspects: [
              { name: "Clarity", value: 10 },
              { name: "Responsiveness", value: 10 },
            ],
          },
        ],
      },
      {
        no_chapter: 4,
        chapter_name: "Final Evaluation",
        chapter_weight: 25,
        aspects: [
          {
            name: "Overall Performance",
            subaspects: [
              { name: "Achievement of Goals", value: 20 },
              { name: "Adaptability", value: 5 },
            ],
          },
        ],
      },
    ],
    scores: [
      {
        operator: 0,
        upper: 90,
        lower: 70,
        status: "Satisfactory",
      },
      {
        operator: 1,
        upper: 100,
        lower: 91,
        status: "Excellent",
      },
      {
        operator: 2,
        upper: 69,
        lower: 50,
        status: "Needs Improvement",
      },
    ],
    catatan:
      "Employee has shown consistent improvement over the review period.",
  },
  {
    name: "Employee Performance Review",

    chapters: [
      {
        no_chapter: 1,
        chapter_name: "Introduction",
        chapter_weight: 5,
        aspects: [
          {
            name: "Overview",
            subaspects: [
              { name: "Purpose", value: 10 },
              { name: "Scope", value: 8 },
            ],
          },
        ],
      },
      {
        no_chapter: 2,
        chapter_name: "Performance Metrics",
        chapter_weight: 40,
        aspects: [
          {
            name: "Quality of Work",
            subaspects: [
              { name: "Accuracy", value: 15 },
              { name: "Consistency", value: 10 },
            ],
          },
          {
            name: "Efficiency",
            subaspects: [
              { name: "Time Management", value: 10 },
              { name: "Resource Utilization", value: 5 },
            ],
          },
        ],
      },
      {
        no_chapter: 3,
        chapter_name: "Behavioral Assessment",
        chapter_weight: 30,
        aspects: [
          {
            name: "Teamwork",
            subaspects: [
              { name: "Collaboration", value: 12 },
              { name: "Conflict Resolution", value: 8 },
            ],
          },
          {
            name: "Communication",
            subaspects: [
              { name: "Clarity", value: 10 },
              { name: "Responsiveness", value: 10 },
            ],
          },
        ],
      },
      {
        no_chapter: 4,
        chapter_name: "Final Evaluation",
        chapter_weight: 25,
        aspects: [
          {
            name: "Overall Performance",
            subaspects: [
              { name: "Achievement of Goals", value: 20 },
              { name: "Adaptability", value: 5 },
            ],
          },
        ],
      },
    ],
    scores: [
      {
        operator: 0,
        upper: 90,
        lower: 70,
        status: "Satisfactory",
      },
      {
        operator: 1,
        upper: 100,
        lower: 91,
        status: "Excellent",
      },
      {
        operator: 2,
        upper: 69,
        lower: 50,
        status: "Needs Improvement",
      },
    ],
    catatan:
      "Employee has shown consistent improvement over the review period.",
  },
];

enum Operator {
  IN_RANGE = 0,
  GREATER_THAN,
  LESS_THAN,
  GREATER_THAN_OR_EQUAL,
  LESS_THAN_OR_EQUAL,
}
interface Subaspect {
  name: string;
  value: number;
}

interface Aspect {
  name: string;
  subaspects: Subaspect[];
}

interface Chapter {
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
  name: string;

  chapters: Chapter[];
  scores: Score[];
  catatan: string;
}

interface FormTableProps {
  formData: FormData;
}

export default function App() {
  const [configState, setConfigState] = useState<boolean>(false);
  const [configIndex, setConfigIndex] = useState<number>(0);
  const [formData, setFormData] = useState(myData);
  const initialIndexHideTable = Array(myData.length).fill(false);
  const [indexHideTable, setIndexHideTable] = useState<boolean[]>(
    initialIndexHideTable
  );
  const updateFormData = (newData: FormData, index: number) => {
    const newFormData = [...formData];
    newFormData[index] = newData;
    setFormData(newFormData);
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
  const [newProjectName, setNewProjectName] = useState<string>();

  const handleAddProject = () => {
    const newProject: FormData = {
      name: newProjectName || "New Project",

      chapters: [],
      scores: [],
      catatan: "",
    };
    setFormData([...formData, newProject]);
  };
  const handleDeleteProject = (index: number) => {
    const updatedFormData = formData.filter((_, i) => i !== index);
    const updatedIndexHideTable = indexHideTable.filter((_, i) => i !== index);
    setFormData(updatedFormData);
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
